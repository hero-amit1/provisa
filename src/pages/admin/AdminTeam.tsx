import { useState, useEffect, useCallback } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import {
  Plus,
  Pencil,
  Trash2,
  Loader2,
  Users,
} from "lucide-react";
import { resolveImageUrl, teamAPI } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface TeamMember {
  _id: string;
  name: string;
  role: string;
  image?: string;
  bio?: string;
}

const AdminTeam = () => {
  const [team, setTeam] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editing, setEditing] = useState<TeamMember | null>(null);
  const [showForm, setShowForm] = useState(false);

  // confirm dialogs (same pattern as universities)
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);
  const [confirmEdit, setConfirmEdit] = useState<TeamMember | null>(null);

  const { toast } = useToast();

  const [form, setForm] = useState({
    name: "",
    role: "",
    image: null as File | null,
    bio: "",
  });

  const loadTeam = useCallback(async () => {
    setLoading(true);
    try {
      const data = await teamAPI.getAll();
      setTeam(Array.isArray(data) ? data : data?.data || []);

      toast({
        title: "✨ Updated",
        description: "Latest team loaded successfully",
      });
    } catch {
      toast({
        title: "❌ Error",
        description: "Failed to load team members",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    loadTeam();
  }, [loadTeam]);

  // SAVE
  const handleSave = async () => {
    if (!form.name || !form.role) {
      toast({
        title: "Validation error",
        description: "Name and role are required",
        variant: "destructive",
      });
      return;
    }

    setSaving(true);

    try {
      const fd = new FormData();
      fd.append("name", form.name);
      fd.append("role", form.role);
      fd.append("bio", form.bio || "");
      if (form.image) fd.append("image", form.image);

      if (editing) {
        await teamAPI.update(editing._id, fd);

        toast({
          title: "✨ Updated",
          description: "Team member updated successfully",
        });
      } else {
        await teamAPI.create(fd);

        toast({
          title: "🎉 Created",
          description: "Team member added successfully",
        });
      }

      setShowForm(false);
      setEditing(null);
      setForm({ name: "", role: "", image: null, bio: "" });

      await loadTeam();
    } catch {
      toast({
        title: "❌ Error",
        description: "Operation failed",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  // EDIT (open confirm modal)
  const handleEdit = (m: TeamMember) => {
    setConfirmEdit(m);
  };

  const confirmEditAction = () => {
    if (!confirmEdit) return;

    setEditing(confirmEdit);
    setForm({
      name: confirmEdit.name,
      role: confirmEdit.role,
      image: null,
      bio: confirmEdit.bio || "",
    });

    setShowForm(true);
    setConfirmEdit(null);

    toast({
      title: "✏️ Edit mode",
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
      await teamAPI.delete(confirmDelete);

      toast({
        title: "🗑️ Deleted",
        description: "Team member removed successfully",
      });

      await loadTeam();
    } catch {
      toast({
        title: "❌ Error",
        description: "Failed to delete member",
        variant: "destructive",
      });
    } finally {
      setConfirmDelete(null);
    }
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64 gap-2 animate-pulse">
          <Loader2 className="h-6 w-6 animate-spin" />
          Loading team...
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      {/* HEADER */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-semibold text-lg">Manage Team</h2>

        <Button
          onClick={() => {
            setShowForm(true);
            setEditing(null);
            setForm({ name: "", role: "", image: null, bio: "" });
          }}
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Member
        </Button>
      </div>

      {/* FORM */}
      {showForm && (
        <div className="bg-background border rounded-xl p-6 mb-6 space-y-4">
          <input
            className="w-full border p-2 rounded"
            placeholder="Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />

          <input
            className="w-full border p-2 rounded"
            placeholder="Role"
            value={form.role}
            onChange={(e) => setForm({ ...form, role: e.target.value })}
          />

          <input
            type="file"
            accept="image/*"
            onChange={(e) =>
              setForm({ ...form, image: e.target.files?.[0] || null })
            }
          />

          {form.image && (
            <img
              src={URL.createObjectURL(form.image)}
              className="h-16 w-16 rounded-full object-cover"
            />
          )}

          <textarea
            className="w-full border p-2 rounded"
            placeholder="Bio"
            value={form.bio}
            onChange={(e) => setForm({ ...form, bio: e.target.value })}
          />

          <div className="flex gap-3">
            <Button onClick={handleSave} disabled={saving}>
              {saving ? "Saving..." : "Save"}
            </Button>

            <Button
              variant="outline"
              onClick={() => {
                setShowForm(false);
                setEditing(null);
              }}
            >
              Cancel
            </Button>
          </div>
        </div>
      )}

      {/* TABLE */}
      <div className="border rounded-xl overflow-hidden bg-background">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="p-4 text-left">Avatar</th>
              <th className="p-4 text-left">Name</th>
              <th className="p-4 text-left">Role</th>
              <th className="p-4 text-left">Bio</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>

          <tbody>
            {team.map((m) => (
              <tr key={m._id} className="border-b hover:bg-muted/40">
                <td className="p-4">
                  {m.image ? (
                    <img
                      src={resolveImageUrl(m.image)}
                      className="h-10 w-10 rounded-full object-cover"
                    />
                  ) : (
                    <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center">
                      <Users className="h-5 w-5" />
                    </div>
                  )}
                </td>

                <td className="p-4 font-medium">{m.name}</td>
                <td className="p-4 text-muted-foreground">{m.role}</td>
                <td className="p-4 text-sm text-muted-foreground">
                  {m.bio?.slice(0, 40) || "No bio"}
                </td>

                <td className="p-4 text-right space-x-2">
                  <Button size="sm" variant="outline" onClick={() => handleEdit(m)}>
                    <Pencil className="h-4 w-4" />
                  </Button>

                  <Button size="sm" variant="destructive" onClick={() => handleDelete(m._id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* EDIT CONFIRM */}
      <Dialog open={!!confirmEdit} onOpenChange={() => setConfirmEdit(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Edit</DialogTitle>
          </DialogHeader>

          <p className="text-sm text-muted-foreground">
            Edit <b>{confirmEdit?.name}</b>?
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

export default AdminTeam;