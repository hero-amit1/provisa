import { useState, useEffect } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { Plus, Pencil, Trash2, Loader2 } from "lucide-react";
import { teamAPI } from '@/lib/api';

interface TeamMember {
  _id: string;
  name: string;
  role: string;
}

const AdminTeam = () => {
  const [team, setTeam] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<TeamMember | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name: "", role: "" });
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
      if (editing) {
        await teamAPI.update(editing._id, form);
      } else {
        await teamAPI.create(form);
      }
      loadTeam();
      setShowForm(false);
      setEditing(null);
      setForm({ name: "", role: "" });
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

  if (loading) return <AdminLayout><div className="flex items-center justify-center h-64"><Loader2 className="h-8 w-8 animate-spin mr-2" />Loading...</div></AdminLayout>;

  // handleSave implemented above

  return (
    <AdminLayout>
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-heading font-semibold text-lg text-foreground">Manage Team</h2>
        <button
          onClick={() => { setShowForm(true); setEditing(null); setForm({ name: "", role: "" }); }}
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
            <th className="text-left px-6 py-3 text-sm font-medium text-muted-foreground">Name</th>
            <th className="text-left px-6 py-3 text-sm font-medium text-muted-foreground">Role</th>
            <th className="text-right px-6 py-3 text-sm font-medium text-muted-foreground">Actions</th>
          </tr></thead>
          <tbody>
            {team.map((m) => (
              <tr key={m._id} className="border-b border-border last:border-0 hover:bg-muted">
                <td className="px-6 py-4 text-sm text-foreground font-medium">{m.name}</td>
                <td className="px-6 py-4 text-sm text-muted-foreground">{m.role}</td>
                <td className="px-6 py-4 text-right">
                  <button onClick={() => { setEditing(m); setForm({ name: m.name, role: m.role }); setShowForm(true); }} className="text-muted-foreground hover:text-primary p-1 mr-2">
                    <Pencil className="h-4 w-4" />
                  </button>
                  <button onClick={() => handleDelete(m._id)} className="text-muted-foreground hover:text-destructive p-1">
                    <Trash2 className="h-4 w-4" />
                  </button>
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
