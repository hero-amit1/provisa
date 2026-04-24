import { useState, useEffect } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { Plus, Pencil, Trash2, Loader2, Users } from "lucide-react";
import { teamAPI } from '@/lib/api';

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
  const [editing, setEditing] = useState<TeamMember | null>(null);
  const [showForm, setShowForm] = useState(false);
const [form, setForm] = useState({ name: "", role: "", image: null as File | null, bio: "" });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    loadTeam();
  }, []);

  const loadTeam = async () => {
    try {
      const data = await teamAPI.getAll();
      setTeam(data);
    } catch (err) {
      console.error('Load failed', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const formData = new FormData();
      formData.append("name", form.name);
      formData.append("role", form.role);
      formData.append("bio", form.bio || '');
      if (form.image) {
        formData.append("image", form.image);
      }
      if (editing) {
        await teamAPI.update(editing._id, formData);
      } else {
        await teamAPI.create(formData);
      }
      loadTeam();
      setShowForm(false);
      setEditing(null);
setForm({ name: "", role: "", image: null as File | null, bio: "" });
    } catch (err) {
      alert('Save failed');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete team member?')) return;
    try {
      await teamAPI.delete(id);
      loadTeam();
    } catch (err) {
      alert('Delete failed');
    }
  };

  const handleEdit = (m: TeamMember) => {
    setEditing(m);
    setForm({ name: m.name, role: m.role, image: null as File | null, bio: m.bio || '' });
    setShowForm(true);
  };

  if (loading) return <AdminLayout><div className="flex items-center justify-center h-64"><Loader2 className="h-8 w-8 animate-spin mr-2" />Loading...</div></AdminLayout>;

  // handleSave implemented above

  return (
    <AdminLayout>
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-heading font-semibold text-lg text-foreground">Manage Team</h2>
        <button
onClick={() => { setShowForm(true); setEditing(null); setForm({ name: "", role: "", image: null }); }}
          className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg text-sm font-semibold"
        >
          <Plus className="h-4 w-4" /> Add Member
        </button>
      </div>

      {showForm && (
        <div className="bg-background border border-border rounded-xl p-6 mb-6">
          <h3 className="font-heading font-semibold mb-4">{editing ? "Edit Member" : "New Member"}</h3>
          <div className="space-y-4">
            <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Name" className="w-full px-4 py-2.5 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
            <input value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} placeholder="Role" className="w-full px-4 py-2.5 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
            <div>
              <label className="block text-sm font-medium text-muted-foreground mb-2">Image</label>
              <input type="file" accept="image/*" onChange={(e) => setForm({ ...form, image: e.target.files?.[0] || null })} className="w-full px-4 py-2.5 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
              {form.image && (
                <img src={URL.createObjectURL(form.image)} alt="Preview" className="w-20 h-20 rounded-full object-cover mt-2" />
              )}
            </div>
            <label className="block text-sm font-medium text-muted-foreground mb-2">Bio/Description</label>
            <textarea value={form.bio} onChange={(e) => setForm({ ...form, bio: e.target.value })} placeholder="Short bio..." rows={3} className="w-full px-4 py-2.5 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring resize-vertical" />
            <div className="flex gap-3">
  <button onClick={handleSave} disabled={saving} className="bg-primary text-primary-foreground px-6 py-2 rounded-lg text-sm font-semibold disabled:opacity-50">
              {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Save'}
            </button>
              <button onClick={() => { setShowForm(false); setEditing(null); }} className="bg-muted text-foreground px-6 py-2 rounded-lg text-sm">Cancel</button>
            </div>
          </div>
        </div>
      )}

      <div className="bg-background border border-border rounded-xl overflow-hidden">
        <table className="w-full">
<thead><tr className="border-b border-border">
<th className="w-16 text-center p-4"></th>
<th className="text-left p-4 text-sm font-medium text-muted-foreground">Name</th>
<th className="text-left p-4 text-sm font-medium text-muted-foreground">Role</th>
<th className="max-w-xs text-left p-4 text-sm font-medium text-muted-foreground">Bio</th>
<th className="text-right p-4 text-sm font-medium text-muted-foreground">Actions</th>
          </tr></thead>
          <tbody>
            {team.map((m) => (
              <tr key={m._id} className="border-b border-border last:border-0 hover:bg-muted">
                <td className="p-4">
                  {m.image ? (
                    <img src={`http://localhost:4000${m.image}`} alt={m.name} className="w-12 h-12 rounded-full object-cover" />
                  ) : (
                    <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center">
                      <Users className="h-6 w-6 text-muted-foreground" />
                    </div>
                  )}
                </td>
                <td className="p-4 font-medium text-sm">{m.name}</td>
                <td className="p-4 text-sm text-muted-foreground">{m.role}</td>
                <td className="p-4 text-sm text-muted-foreground max-w-xs">
                  {m.bio ? m.bio.substring(0, 50) + '...' : 'No bio'}
                </td>
                <td className="px-6 py-4 text-right space-x-2">
                  <Button variant="ghost" size="sm" onClick={() => handleEdit(m)}>
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => handleDelete(m._id)}>
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

export default AdminTeam;
