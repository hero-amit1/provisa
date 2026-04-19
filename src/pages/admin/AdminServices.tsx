import { useState, useEffect } from 'react';
import AdminLayout from "@/components/admin/AdminLayout";
import { Plus, Pencil, Trash2, Loader2 } from "lucide-react";
import { servicesAPI } from '@/lib/api';

const AdminServices = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ title: '', description: '' });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    loadServices();
  }, []);

  const loadServices = async () => {
    try {
      const data = await servicesAPI.getAll();
      setServices(data);
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
        await servicesAPI.update(editing._id, form);
      } else {
        await servicesAPI.create(form);
      }
      loadServices();
      setShowForm(false);
      setEditing(null);
      setForm({ title: '', description: '' });
    } catch (err) {
      alert('Save failed');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete service?')) return;
    try {
      await servicesAPI.delete(id);
      loadServices();
    } catch (err) {
      alert('Delete failed');
    }
  };

  if (loading) return <AdminLayout><div className="flex items-center justify-center h-64"><Loader2 className="h-8 w-8 animate-spin mr-2" />Loading...</div></AdminLayout>;

  return (
    <AdminLayout>
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-heading font-semibold text-lg text-foreground">Manage Services</h2>
        <button
          onClick={() => { setShowForm(true); setEditing(null); }}
          className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg text-sm font-semibold"
        >
          <Plus className="h-4 w-4" /> Add Service
        </button>
      </div>

      {showForm && (
        <div className="bg-background border border-border rounded-xl p-6 mb-6 space-y-4">
          <h3 className="font-heading font-semibold">{editing ? 'Edit Service' : 'New Service'}</h3>
          <input
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            placeholder="Service Title"
            className="w-full px-4 py-2.5 bg-background border border-border rounded-lg"
          />
          <textarea
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            placeholder="Description"
            rows={3}
            className="w-full px-4 py-2.5 bg-background border border-border rounded-lg"
          />
          <div className="flex gap-3">
            <button onClick={handleSave} disabled={saving} className="bg-primary text-primary-foreground px-6 py-2 rounded-lg text-sm font-semibold disabled:opacity-50">
              {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Save'}
            </button>
            <button onClick={() => { setShowForm(false); setEditing(null); }} className="bg-muted text-foreground px-6 py-2 rounded-lg text-sm">Cancel</button>
          </div>
        </div>
      )}

      <div className="bg-background border border-border rounded-xl overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left px-6 py-3 text-sm font-medium text-muted-foreground">#</th>
              <th className="text-left px-6 py-3 text-sm font-medium text-muted-foreground">Title</th>
              <th className="text-left px-6 py-3 text-sm font-medium text-muted-foreground">Description</th>
              <th className="text-right px-6 py-3 text-sm font-medium text-muted-foreground">Actions</th>
            </tr>
          </thead>
          <tbody>
            {services.map((service, i) => (
              <tr key={service._id} className="border-b border-border last:border-0 hover:bg-muted">
                <td className="px-6 py-4 text-sm text-muted-foreground">{i + 1}</td>
                <td className="px-6 py-4 text-sm text-foreground font-medium">{service.title}</td>
                <td className="px-6 py-4 text-sm text-muted-foreground max-w-xs line-clamp-1">{service.description}</td>
                <td className="px-6 py-4 text-right">
                  <button
                    onClick={() => { setEditing(service); setForm({ title: service.title, description: service.description }); setShowForm(true); }}
                    className="text-muted-foreground hover:text-primary p-1 mr-2"
                  >
                    <Pencil className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(service._id)}
                    className="text-muted-foreground hover:text-destructive p-1"
                  >
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

export default AdminServices;
