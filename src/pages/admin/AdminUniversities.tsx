import { useState, useEffect, useCallback } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import { resolveImageUrl, universitiesAPI } from '@/lib/api';
import { useToast } from '@/components/ui/use-toast';

interface University {
  _id: string;
  name: string;
  country: string;
  image?: string;
}

const fallbackImg = "https://via.placeholder.com/80x80?text=Uni";

const AdminUniversities = () => {
  const [items, setItems] = useState<University[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  // dialogs
  const [open, setOpen] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);
  const [confirmEdit, setConfirmEdit] = useState<University | null>(null);

  const { toast } = useToast();

  const [form, setForm] = useState({
    name: '',
    country: '',
    image: null as File | null
  });

  // LOAD DATA
  const loadData = useCallback(async () => {
    setLoading(true);
    try {
      const data = await universitiesAPI.getAll();
      setItems(Array.isArray(data) ? data : data?.data || []);
    } catch {
      toast({
        title: "⚠️ Error",
        description: "Failed to load universities",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  // SAVE
  const handleSave = async () => {
    if (!form.name || !form.country) {
      toast({
        title: "Validation error",
        description: "Name and country are required",
        variant: "destructive",
      });
      return;
    }

    setSaving(true);

    try {
      const formData = new FormData();
      formData.append('name', form.name);
      formData.append('country', form.country);
      if (form.image) formData.append('image', form.image);

      if (editingId) {
        await universitiesAPI.update(editingId, formData);

        toast({
          title: "✨ Updated",
          description: "University updated successfully",
        });
      } else {
        await universitiesAPI.create(formData);

        toast({
          title: "🎉 Created",
          description: "University added successfully",
        });
      }

      setOpen(false);
      setEditingId(null);
      setForm({ name: '', country: '', image: null });

      await loadData();

    } catch {
      toast({
        title: "❌ Error",
        description: "Operation failed. Please try again.",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  // EDIT (opens confirm modal)
  const handleEdit = (item: University) => {
    setConfirmEdit(item);
  };

  const confirmEditAction = () => {
    if (!confirmEdit) return;

    setEditingId(confirmEdit._id);
    setForm({
      name: confirmEdit.name,
      country: confirmEdit.country,
      image: null
    });

    setOpen(true);
    setConfirmEdit(null);

    toast({
      title: "✏️ Editing mode",
      description: `${confirmEdit.name} opened for editing`,
    });
  };

  // DELETE
  const handleDelete = (id: string) => {
    setConfirmDelete(id);
  };

  const confirmDeleteAction = async () => {
    if (!confirmDelete) return;

    try {
      await universitiesAPI.delete(confirmDelete);

      toast({
        title: "🗑️ Deleted",
        description: "University removed successfully",
      });

      await loadData();

    } catch {
      toast({
        title: "❌ Error",
        description: "Failed to delete university",
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
        <h2 className="font-semibold text-lg">Manage Universities</h2>

        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button
              onClick={() => {
                setEditingId(null);
                setForm({ name: '', country: '', image: null });
              }}
            >
              <Plus className="h-4 w-4 mr-2" />
              Add University
            </Button>
          </DialogTrigger>

          <DialogContent className="rounded-2xl">
            <DialogHeader>
              <DialogTitle>
                {editingId ? 'Edit' : 'Add'} University
              </DialogTitle>
            </DialogHeader>

            <div className="space-y-4">
              <Input
                placeholder="University name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />

              <Input
                placeholder="Country"
                value={form.country}
                onChange={(e) => setForm({ ...form, country: e.target.value })}
              />

              <input
                type="file"
                accept="image/*"
                onChange={(e) =>
                  setForm({ ...form, image: e.target.files?.[0] || null })
                }
                className="w-full border p-2 rounded"
              />

              <Button onClick={handleSave} disabled={saving} className="w-full">
                {saving ? "Saving..." : "Save"}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* TABLE */}
      <div className="bg-background border rounded-xl overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="p-4 text-left">Image</th>
              <th className="p-4 text-left">Name</th>
              <th className="p-4 text-left">Country</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td colSpan={4} className="p-8 text-center animate-pulse">
                  Loading universities...
                </td>
              </tr>
            ) : (
              items.map((u) => (
                <tr key={u._id} className="border-b hover:bg-muted/40">

                  <td className="p-4">
                    <img
                      src={resolveImageUrl(u.image || "") || fallbackImg}
                      className="h-10 w-10 rounded object-cover"
                    />
                  </td>

                  <td className="p-4 font-medium">{u.name}</td>
                  <td className="p-4">{u.country}</td>

                  <td className="p-4 text-right space-x-2">
                    <Button size="sm" variant="outline" onClick={() => handleEdit(u)}>
                      <Pencil className="h-4 w-4" />
                    </Button>

                    <Button size="sm" variant="destructive" onClick={() => handleDelete(u._id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </td>

                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* ✨ EDIT CONFIRM MODAL */}
      <Dialog open={!!confirmEdit} onOpenChange={() => setConfirmEdit(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Edit</DialogTitle>
          </DialogHeader>

          <p className="text-sm text-muted-foreground">
            Do you want to edit <b>{confirmEdit?.name}</b>?
          </p>

          <div className="flex gap-2 mt-4">
            <Button variant="outline" onClick={() => setConfirmEdit(null)}>
              Cancel
            </Button>
            <Button onClick={confirmEditAction}>
              Yes, Edit
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* ✨ DELETE CONFIRM MODAL */}
      <Dialog open={!!confirmDelete} onOpenChange={() => setConfirmDelete(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Delete</DialogTitle>
          </DialogHeader>

          <p className="text-sm text-muted-foreground">
            This action cannot be undone. Are you sure?
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

export default AdminUniversities;