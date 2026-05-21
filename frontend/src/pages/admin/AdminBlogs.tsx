import { useState, useEffect, useCallback } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { Plus, Pencil, Trash2, Loader2 } from "lucide-react";
import { blogsAPI, resolveImageUrl } from "@/lib/api";


import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const fallbackImage =
  "https://via.placeholder.com/100x100.png?text=No+Image";

type Blog = {
  _id: string;
  title: string;
  excerpt?: string;
  content?: string;
  status: "draft" | "published";
  image?: string;
  createdAt: string;
};

const AdminBlogs = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);

  // dialogs (same style as universities)
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);
  const [confirmEdit, setConfirmEdit] = useState<Blog | null>(null);

  const { toast } = useToast();

  const [form, setForm] = useState({
    title: "",
    excerpt: "",
    content: "",
    status: "draft" as "draft" | "published",
    image: null as File | null,
  });

  // LOAD
  const fetchBlogs = useCallback(async () => {
    setLoading(true);
    try {
      const res = await blogsAPI.getAll();
      const data = Array.isArray(res) ? res : res?.data || [];
      setBlogs(data);

      toast({
        title: "✨ Updated",
        description: "Latest blogs loaded successfully",
      });
    } catch {
      toast({
        title: "❌ Error",
        description: "Unable to load blogs",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    fetchBlogs();
  }, [fetchBlogs]);

  const resetForm = () => {
    setForm({
      title: "",
      excerpt: "",
      content: "",
      status: "draft",
      image: null,
    });
    setEditingId(null);
  };

  // SAVE
  const handleSubmit = async () => {
    if (!form.title.trim()) {
      toast({
        title: "Validation error",
        description: "Blog title is required",
        variant: "destructive",
      });
      return;
    }

    setSaving(true);

    try {
      const fd = new FormData();
      fd.append("title", form.title);
      fd.append("excerpt", form.excerpt);
      fd.append("content", form.content);
      fd.append("status", form.status);

      if (form.image) fd.append("image", form.image);

      if (editingId) {
        await blogsAPI.update(editingId, fd);

        toast({
          title: "✨ Updated",
          description: "Blog updated successfully",
        });
      } else {
        await blogsAPI.create(fd);

        toast({
          title: "🎉 Created",
          description: "Blog published successfully",
        });
      }

      setShowForm(false);
      resetForm();
      await fetchBlogs();
    } catch {
      toast({
        title: "❌ Error",
        description: "Save failed. Try again.",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  // EDIT (open confirm modal)
  const handleEdit = (blog: Blog) => {
    setConfirmEdit(blog);
  };

  const confirmEditAction = () => {
    if (!confirmEdit) return;

    setEditingId(confirmEdit._id);
    setForm({
      title: confirmEdit.title,
      excerpt: confirmEdit.excerpt || "",
      content: confirmEdit.content || "",
      status: confirmEdit.status,
      image: null,
    });

    setShowForm(true);
    setConfirmEdit(null);

    toast({
      title: "✏️ Edit mode",
      description: `"${confirmEdit.title}" opened for editing`,
    });
  };

  // DELETE (open confirm modal)
  const handleDelete = (id: string) => {
    setConfirmDelete(id);
  };

  const confirmDeleteAction = async () => {
    if (!confirmDelete) return;

    try {
      await blogsAPI.delete(confirmDelete);

      toast({
        title: "🗑️ Deleted",
        description: "Blog removed successfully",
      });

      await fetchBlogs();
    } catch {
      toast({
        title: "❌ Error",
        description: "Failed to delete blog",
        variant: "destructive",
      });
    } finally {
      setConfirmDelete(null);
    }
  };

  return (
    <AdminLayout>
      {/* HEADER */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold">Blog Management</h2>

        <Button
          onClick={() => {
            resetForm();
            setShowForm(true);
          }}
        >
          <Plus className="h-4 w-4 mr-2" />
          New Blog
        </Button>
      </div>

      {/* FORM */}
      {showForm && (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>
              {editingId ? "Edit Blog" : "Create Blog"}
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-4">
            <Input
              placeholder="Blog title"
              value={form.title}
              onChange={(e) =>
                setForm({ ...form, title: e.target.value })
              }
            />

            <Textarea
              placeholder="Excerpt"
              value={form.excerpt}
              onChange={(e) =>
                setForm({ ...form, excerpt: e.target.value })
              }
            />

            <Textarea
              placeholder="Content"
              rows={6}
              value={form.content}
              onChange={(e) =>
                setForm({ ...form, content: e.target.value })
              }
            />

            <input
              type="file"
              accept="image/*"
              onChange={(e) =>
                setForm({
                  ...form,
                  image: e.target.files?.[0] || null,
                })
              }
              className="w-full border p-2 rounded"
            />

            {form.image && (
              <img
                src={URL.createObjectURL(form.image)}
                className="w-28 h-28 object-cover rounded border"
              />
            )}

            <Select
              value={form.status}
              onValueChange={(v) =>
                setForm({ ...form, status: v as "draft" | "published" })
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="draft">Draft</SelectItem>
                <SelectItem value="published">Published</SelectItem>
              </SelectContent>
            </Select>

            <div className="flex gap-2">
              <Button onClick={handleSubmit} disabled={saving}>
                {saving ? "Saving..." : "Save"}
              </Button>

              <Button
                variant="outline"
                onClick={() => {
                  setShowForm(false);
                  resetForm();
                }}
              >
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* TABLE */}
      <Card>
        <CardContent className="p-0">
          {loading ? (
            <div className="p-10 flex justify-center">
              <Loader2 className="animate-spin" />
            </div>
          ) : (
            <table className="w-full">
              <thead className="border-b bg-muted/40">
                <tr>
                  <th className="text-left p-4">Image</th>
                  <th className="text-left p-4">Title</th>
                  <th className="text-left p-4">Status</th>
                  <th className="text-left p-4">Date</th>
                  <th className="text-right p-4">Actions</th>
                </tr>
              </thead>

              <tbody>
                {blogs.map((b) => (
                  <tr key={b._id} className="border-b hover:bg-muted/40">
                    <td className="p-4">
                      <img
                        src={resolveImageUrl(b.image) || fallbackImage}
                        className="w-12 h-12 object-cover rounded"
                      />
                    </td>

                    <td className="p-4 font-medium">{b.title}</td>

                    <td className="p-4">
                      <span className="text-xs px-2 py-1 rounded-full bg-muted">
                        {b.status}
                      </span>
                    </td>

                    <td className="p-4 text-sm text-muted-foreground">
                      {new Date(b.createdAt).toLocaleDateString()}
                    </td>

                    <td className="p-4 text-right space-x-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleEdit(b)}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>

                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleDelete(b._id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </CardContent>
      </Card>

      {/* EDIT CONFIRM */}
      <Dialog open={!!confirmEdit} onOpenChange={() => setConfirmEdit(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Edit</DialogTitle>
          </DialogHeader>

          <p className="text-sm text-muted-foreground">
            Edit <b>{confirmEdit?.title}</b>?
          </p>

          <div className="flex gap-2 mt-4">
            <Button variant="outline" onClick={() => setConfirmEdit(null)}>
              Cancel
            </Button>
            <Button onClick={confirmEditAction}>Yes, Edit</Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* DELETE CONFIRM */}
      <Dialog open={!!confirmDelete} onOpenChange={() => setConfirmDelete(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Delete</DialogTitle>
          </DialogHeader>

          <p className="text-sm text-muted-foreground">
            This action cannot be undone.
          </p>

          <div className="flex gap-2 mt-4">
            <Button variant="outline" onClick={() => setConfirmDelete(null)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={confirmDeleteAction}>
              Delete
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
};

export default AdminBlogs;