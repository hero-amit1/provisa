import { useState, useEffect } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { Plus, Pencil, Trash2, Loader2 } from "lucide-react";
import { blogsAPI } from '@/lib/api';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const AdminBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ title: '', excerpt: '', content: '', status: 'draft' });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const data = await blogsAPI.getAll();
      setBlogs(data);
    } catch (err) {
      console.error('Failed to fetch blogs');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    setSaving(true);
    try {
      if (editingId) {
        await blogsAPI.update(editingId, form);
      } else {
        await blogsAPI.create(form);
      }
      setShowForm(false);
      setEditingId(null);
      setForm({ title: '', excerpt: '', content: '', status: 'draft' });
      fetchBlogs();
    } catch (err) {
      console.error('Save failed');
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (blog) => {
    setEditingId(blog._id);
    setForm({ title: blog.title, excerpt: blog.excerpt, content: blog.content || '', status: blog.status });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (confirm('Delete blog?')) {
      try {
        await blogsAPI.delete(id);
        fetchBlogs();
      } catch (err) {
        console.error('Delete failed');
      }
    }
  };

  if (loading) return (
    <AdminLayout>
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    </AdminLayout>
  );

  return (
    <AdminLayout>
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-heading font-semibold text-lg text-foreground">Manage Blogs</h2>
        <Button onClick={() => { setShowForm(true); setEditingId(null); setForm({ title: '', excerpt: '', content: '', status: 'draft' }); }}>
          <Plus className="h-4 w-4 mr-2" /> Add Blog
        </Button>
      </div>

      {showForm && (
        <div className="bg-background border rounded-xl p-6 mb-6">
          <h3 className="font-heading font-semibold mb-6">{editingId ? 'Edit Blog' : 'New Blog'}</h3>
          <div className="space-y-4">
            <Input
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              placeholder="Title"
            />
            <Textarea
              value={form.excerpt}
              onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
              placeholder="Excerpt"
            />
            <Textarea
              value={form.content}
              onChange={(e) => setForm({ ...form, content: e.target.value })}
              placeholder="Content"
              rows={4}
            />
            <Select value={form.status} onValueChange={(v) => setForm({ ...form, status: v })}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="draft">Draft</SelectItem>
                <SelectItem value="published">Published</SelectItem>
              </SelectContent>
            </Select>
            <div className="flex gap-3">
              <Button onClick={handleSubmit} disabled={saving}>
                {saving ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : null}
                {saving ? 'Saving...' : 'Save'}
              </Button>
              <Button variant="outline" onClick={() => { setShowForm(false); setEditingId(null); }}>
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}

      <div className="bg-background border rounded-xl overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="text-left p-4 text-sm font-medium text-muted-foreground">Title</th>
              <th className="text-left p-4 text-sm font-medium text-muted-foreground">Status</th>
              <th className="text-left p-4 text-sm font-medium text-muted-foreground">Date</th>
              <th className="w-32"></th>
            </tr>
          </thead>
          <tbody>
            {blogs.map((blog) => (
              <tr key={blog._id} className="border-b last:border-0 hover:bg-muted/50">
                <td className="p-4 font-medium">{blog.title}</td>
                <td>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    blog.status === 'published' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                  }`}>
                    {blog.status}
                  </span>
                </td>
                <td className="p-4 text-sm text-muted-foreground">{new Date(blog.createdAt).toLocaleDateString()}</td>
                <td className="p-4 text-right space-x-2">
                  <Button size="sm" variant="outline" onClick={() => handleEdit(blog)}>
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="destructive" onClick={() => handleDelete(blog._id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  );
};

export default AdminBlogs;
