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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Star } from 'lucide-react';
import { testimonialsAPI } from '@/lib/api';

interface Testimonial {
  _id: string;
  name: string;
  university: string;
  text: string;
  rating: number;
}

const AdminTestimonials = () => {
  const [items, setItems] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState({ name: '', university: '', text: '', rating: 5 });
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
      setItems([]);
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
      setForm({ name: '', university: '', text: '', rating: 5 });

    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : 'Save failed';
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
    setForm({ name: item.name, university: item.university, text: item.text, rating: item.rating || 5 });
    setOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this testimonial?')) return;

    try {
      await testimonialsAPI.delete(id);
      loadData();

      toast({
        title: "Deleted",
        description: "Testimonial removed successfully",
      });

    } catch (error) {
      toast({
        title: "Delete failed",
        description: error instanceof Error ? error.message : 'Unknown error',
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="p-8 text-center">Loading testimonials...</div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>

      {error && (
        <Alert variant="destructive" className="mb-6">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {/* HEADER */}
      <div className="flex items-center justify-between mb-8">
        <h2 className="font-heading font-semibold text-lg text-foreground">
          Manage Testimonials
        </h2>

        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Testimonial
            </Button>
          </DialogTrigger>

          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {editingId ? 'Edit' : 'Add'} Testimonial
              </DialogTitle>
              <DialogDescription>
                Add student testimonial details
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4">
              <Input
                placeholder="Student name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />

              <Input
                placeholder="University"
                value={form.university}
                onChange={(e) => setForm({ ...form, university: e.target.value })}
              />

              <Textarea
                placeholder="Testimonial text"
                value={form.text}
                onChange={(e) => setForm({ ...form, text: e.target.value })}
              />

              <Select value={form.rating.toString()} onValueChange={(v) => setForm({ ...form, rating: parseInt(v) })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {[1, 2, 3, 4, 5].map((r) => (
                    <SelectItem key={r} value={r.toString()}> {r} Stars </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Button onClick={handleSave} className="w-full">
                Save
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

        {items.map((t) => {
          const initials = t.name
            .split(" ")
            .map(n => n[0])
            .join("")
            .toUpperCase();

          return (
            <div
              key={t._id}
              className="group relative bg-gradient-to-br from-background to-muted/30 border border-border rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >

              {/* HEADER */}
              <div className="flex items-start justify-between mb-4">

                <div className="flex items-center gap-3">

                  {/* AVATAR */}
                  <div className="w-11 h-11 rounded-full bg-primary/10 text-primary flex items-center justify-center font-semibold text-sm">
                    {initials}
                  </div>

                  <div>
                    <h3 className="font-semibold text-foreground text-sm">
                      {t.name}
                    </h3>

                    <span className="inline-block mt-1 text-[11px] px-2 py-0.5 rounded-full bg-primary/10 text-primary">
                      {t.university}
                    </span>

                    <div className="flex items-center gap-1 ml-auto">
                      {Array.from({ length: 5 }, (_, i) => (
                        <Star key={i} className={`h-3 w-3 ${i < (t.rating || 5) ? 'text-yellow-400 fill-yellow-400' : 'text-muted-foreground'}`} />
                      ))}
                    </div>
                  </div>
                </div>

                {/* ACTIONS */}
                <div className="opacity-0 group-hover:opacity-100 transition flex gap-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleEdit(t)}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>

                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDelete(t._id)}
                  >
                    <Trash2 className="h-4 w-4 text-red-500" />
                  </Button>
                </div>
              </div>

              {/* QUOTE */}
              <div className="relative">
                <span className="text-3xl text-primary/20 absolute -top-2 -left-1">“</span>

                <p className="text-sm text-muted-foreground leading-relaxed pl-4 line-clamp-5">
                  {t.text}
                </p>

                <span className="text-3xl text-primary/20 absolute -bottom-4 right-0">”</span>
              </div>

            </div>
          );
        })}

      </div>
    </AdminLayout>
  );
};

export default AdminTestimonials;