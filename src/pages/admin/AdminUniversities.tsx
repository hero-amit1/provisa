import { useState, useEffect } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import { universitiesAPI } from '@/lib/api';

interface University {
  _id: string;
  name: string;
  country: string;
  image?: string;
}

const AdminUniversities = () => {
  const [items, setItems] = useState<University[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState({ name: '', country: '', image: '' });
  const [open, setOpen] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const data = await universitiesAPI.getAll();
      setItems(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      if (editingId) {
        await universitiesAPI.update(editingId, form);
      } else {
        await universitiesAPI.create(form);
      }
      loadData();
      setOpen(false);
      setEditingId(null);
      setForm({ name: '', country: '', image: '' });
    } catch (error) {
      console.error(error);
    }
  };

  const handleEdit = (item: University) => {
    setEditingId(item._id);
    setForm({
      name: item.name,
      country: item.country,
      image: item.image || ''
    });
    setOpen(true);
  };

  const handleDelete = async (id: string) => {
    try {
      await universitiesAPI.delete(id);
      loadData();
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) {
    return <AdminLayout><div className="p-8 text-center">Loading...</div></AdminLayout>;
  }

  return (
    <AdminLayout>
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-heading font-semibold text-lg text-foreground">
          Manage Universities
        </h2>

        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add University
            </Button>
          </DialogTrigger>

          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {editingId ? 'Edit' : 'Add'} University
              </DialogTitle>
            </DialogHeader>

            <div className="space-y-4">
              <Input
                placeholder="University name"
                value={form.name}
                onChange={(e) =>
                  setForm({ ...form, name: e.target.value })
                }
              />

              <Input
                placeholder="Country"
                value={form.country}
                onChange={(e) =>
                  setForm({ ...form, country: e.target.value })
                }
              />

              <Input
                placeholder="Image URL"
                value={form.image}
                onChange={(e) =>
                  setForm({ ...form, image: e.target.value })
                }
              />

              <Button onClick={handleSave} className="w-full">
                Save
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="bg-background border rounded-xl overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left p-4 font-medium text-muted-foreground">
                Image
              </th>
              <th className="text-left p-4 font-medium text-muted-foreground">
                University
              </th>
              <th className="text-left p-4 font-medium text-muted-foreground">
                Country
              </th>
              <th className="text-right p-4 font-medium text-muted-foreground">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {items.map((university) => (
              <tr
                key={university._id}
                className="border-b border-border hover:bg-muted/50"
              >
                <td className="p-4">
                  {university.image ? (
                    <img
                      src={university.image}
                      alt={university.name}
                      className="h-10 w-10 object-cover rounded"
                    />
                  ) : (
                    <div className="h-10 w-10 bg-muted rounded" />
                  )}
                </td>

                <td className="p-4 font-medium">
                  {university.name}
                </td>

                <td className="p-4">
                  {university.country}
                </td>

                <td className="p-4">
                  <div className="flex gap-2 justify-end">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleEdit(university)}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>

                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDelete(university._id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  );
};

export default AdminUniversities;