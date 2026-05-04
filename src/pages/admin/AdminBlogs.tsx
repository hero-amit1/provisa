import { useState, useEffect } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { Plus, Pencil, Trash2, Loader2 } from "lucide-react";
import { blogsAPI } from '@/lib/api';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue
} from '@/components/ui/select';

interface Blog {
  _id: string;
  title: string;
  excerpt: string;
  content: string;
  image?: string;
  status: 'draft' | 'published';
  createdAt: string;
}

const AdminBlogs = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);

  const [form, setForm] = useState({
    title: '',
    excerpt: '',
    content: '',
    status: 'draft' as const,
    image: null as File | null
  });

  useEffect(() => {
    fetchBlogs();
  }, []);

  // ======================
  // FETCH BLOGS
  // ======================
  const fetchBlogs = async () => {
    try {
      const res = await blogsAPI.getAll();

      const blogData = Array.isArray(res)
        ? res
        : res?.data || [];

      setBlogs(blogData);
    } catch (err) {
      console.error('Failed to fetch blogs');
    } finally {
      setLoading(false);
    }
  };

  // ======================
  // SUBMIT (WITH IMAGE)
  // ======================
  const handleSubmit = async () => {
    setSaving(true);

    try {
      const formData = new FormData();
      formData.append("title", form.title);
      formData.append("excerpt", form.excerpt);
      formData.append("content", form.content);
      formData.append("status", form.status);

      if (form.image) {
        formData.append("image", form.image);
      }

      if (editingId) {
        await blogsAPI.update(editingId, formData);
      } else {
        await blogsAPI.create(formData);
      }

      setShowForm(false);
      setEditingId(null);
      setForm({
        title: '',
        excerpt: '',
        content: '',
        status: 'draft',
        image: null
      });

      fetchBlogs();

    } catch (err) {
      console.error('Save failed');
    } finally {
      setSaving(false);
    }
  };

  // ======================
  // EDIT
  // ======================
  const handleEdit = (blog: Blog) => {
    setEditingId(blog._id);
    setForm({
      title: blog.title,
      excerpt: blog.excerpt || '',
      content: blog.content || '',
      status: blog.status || 'draft',
      image: null
    });
    setShowForm(true);
  };

  // ======================
  // DELETE
  // ======================
  const handleDelete = async (id: string) => {
    if (confirm('Delete blog?')) {
      try {
        await blogsAPI.delete(id);
        fetchBlogs();
      } catch {
        console.error('Delete failed');
      }
    }
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>

      {/* HEADER */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-semibold text-lg">Manage Blogs</h2>
        <Button onClick={() => {
          setShowForm(true);
          setEditingId(null);
          setForm({ title: '', excerpt: '', content: '', status: 'draft', image: null });
        }}>
          <Plus className="h-4 w-4 mr-2" /> Add Blog
        </Button>
      </div>

      {/* FORM */}
      {showForm && (
        <div className="bg-background border rounded-xl p-6 mb-6 space-y-4">
          <h3 className="font-semibold">
            {editingId ? 'Edit Blog' : 'New Blog'}
          </h3>

          <Input
            placeholder="Title"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
          />

          <Textarea
            placeholder="Excerpt"
            value={form.excerpt}
            onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
          />

          <Textarea
            placeholder="Content"
            rows={4}
            value={form.content}
            onChange={(e) => setForm({ ...form, content: e.target.value })}
          />

          {/* IMAGE UPLOAD */}
          <input
            type="file"
            accept="image/*"
            onChange={(e) =>
              setForm({ ...form, image: e.target.files?.[0] || null })
            }
          />

          {form.image && (
            <div>
              <img
                src={URL.createObjectURL(form.image)}
                alt="Preview"
                className="w-24 h-24 object-cover rounded-lg"
              />
            </div>
          )}

          <Select
            value={form.status}
            onValueChange={(v) => setForm({ ...form, status: v as 'draft' | 'published' })}
          >
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
              {saving && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
              {saving ? 'Saving...' : 'Save'}
            </Button>

            <Button
              variant="outline"
              onClick={() => {
                setShowForm(false);
                setEditingId(null);
              }}
            >
              Cancel
            </Button>
          </div>
        </div>
      )}

      {/* TABLE */}
      <div className="bg-background border rounded-xl overflow-hidden">
        {blogs.length === 0 ? (
          <div className="p-10 text-center text-muted-foreground">
            No blogs found
          </div>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left p-4 text-sm w-20">Image</th>
                <th className="text-left p-4 text-sm">Title</th>
                <th className="text-left p-4 text-sm w-24">Status</th>
                <th className="text-right p-4 text-sm w-28">Date</th>
                <th className="text-right p-4 text-sm w-32">Actions</th>
              </tr>
            </thead>

            <tbody>
              {blogs.map((blog) => (
                <tr key={blog._id} className="border-b hover:bg-muted/50">
                  <td className="p-4">
                    {blog.image ? (
                      <img src={blog.image} alt="" className="w-12 h-12 object-cover rounded" />
                    ) : (
                      <div className="w-12 h-12 bg-muted rounded flex items-center justify-center text-xs text-muted-foreground">
                        No img
                      </div>
                    )}
                  </td>
                  <td className="p-4 font-medium">
                    {blog.title}
                  </td>

                  <td>
                    <span className={`px-2 py-1 rounded-full text-xs ${blog.status === 'published'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-gray-100 text-gray-800'
                      }`}>
                      {blog.status}
                    </span>
                  </td>

                  <td className="p-4 text-sm text-muted-foreground">
                    {new Date(blog.createdAt).toLocaleDateString()}
                  </td>

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
        )}
      </div>

    </AdminLayout>
  );
};

export default AdminBlogs;

