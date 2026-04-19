import { useState, useEffect } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { DialogDescription } from '@/components/ui/dialog';
import { testimonialsAPI } from '@/lib/api';

interface Testimonial {
  _id: string;
  name: string;
  university: string;
  text: string;
}

const AdminTestimonials = () => {
  const [items, setItems] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState({ name: '', university: '', text: '' });
  const [open, setOpen] = useState(false);
  const [error, setError] = useState('');
  const { toast } = useToast();

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const data = await testimonialsAPI.getAll();
      setItems(data);
    } catch (error) {
      console.error(error);
      setItems([]); // fallback empty list, no JSON.parse
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!form.name.trim() || !form.university.trim() || !form.text.trim()) {
      toast({
        title: "Validation Error",
        description: "All fields are required",
        variant: "destructive",
      });
      return;
    }
    try {
      if (editingId) {
        await testimonialsAPI.update(editingId, form);
      } else {
        await testimonialsAPI.create(form);
      }
      loadData();
      setOpen(false);
      setEditingId(null);
      setForm({ name: '', university: '', text: '' });
    } catch (error) {
      console.error(error);
      const errorMsg = error.message || 'Save failed - check backend and console';
      setError(errorMsg);
      toast({
        title: "Save failed",
        description: errorMsg,
        variant: "destructive",
      });
    }
  };

  const handleEdit = (item: Testimonial) => {
    setEditingId(item._id);
    setForm({ name: item.name, university: item.university, text: item.text });
    setOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this testimonial?')) return;
    try {
      await testimonialsAPI.delete(id);
      loadData();
      toast({ title: "Deleted", description: "Testimonial removed successfully" });
    } catch (error) {
      console.error(error);
      toast({
        title: "Delete failed",
        description: error.message || 'Unknown error',
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return <AdminLayout><div className="p-8 text-center">Loading testimonials...</div></AdminLayout>;
  }

  if (items.length === 0) {
    return <AdminLayout><div className="p-8 text-center text-muted-foreground">No testimonials yet. Add one!</div></AdminLayout>;
  }

  return (
    <AdminLayout>
      {error && (
        <Alert variant="destructive" className="mb-6">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-heading font-semibold text-lg text-foreground">Manage Testimonials</h2>
        <Dialog open={open} onOpenChange={setOpen}> 
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Testimonial
            </Button>
          </DialogTrigger>
<DialogContent>
            <DialogHeader>
              <DialogTitle>{editingId ? 'Edit' : 'Add'} Testimonial</DialogTitle>
              <DialogDescription>Add testimonial details</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-1">
                <Input
                  required
                  placeholder="Student name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
              </div>
                <div className="space-y-1">
                <Input
                  required
                  placeholder="University"
                  value={form.university}
                  onChange={(e) => setForm({ ...form, university: e.target.value })}
                />
              </div>
              <Textarea
                placeholder="Testimonial text"
                value={form.text}
                onChange={(e) => setForm({ ...form, text: e.target.value })}
              />
              <Button onClick={handleSave} className="w-full">
                Save
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {items.map((testimonial) => (
          <div key={testimonial._id} className="bg-background border border-border rounded-xl p-6 hover:shadow-md transition-all">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="font-semibold text-foreground text-base">{testimonial.name}</h3>
                <p className="text-sm text-muted-foreground">{testimonial.university}</p>
              </div>
              <div className="flex gap-1">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleEdit(testimonial)}
                >
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleDelete(testimonial._id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed line-clamp-4">
              "{testimonial.text}"
            </p>
          </div>
        ))}
      </div>
    </AdminLayout>
  );
};

export default AdminTestimonials;
