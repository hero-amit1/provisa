import { useState, useEffect, useCallback } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus, Pencil, Trash2, Star } from "lucide-react";
import { testimonialsAPI } from "@/lib/api";
import { motion } from "framer-motion";
import { useToast } from "@/components/ui/use-toast";

const getArray = (res: unknown): Testimonial[] => {
  if (Array.isArray(res)) return res as Testimonial[];

  if (res && typeof res === "object") {
    const maybe = res as { data?: unknown };
    if (Array.isArray(maybe.data)) return maybe.data as Testimonial[];
  }

  return [];
};

interface Testimonial {
  _id: string;
  name: string;
  university: string;
  text: string;
  rating: number;
}

export default function AdminTestimonials() {
  const [items, setItems] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const { toast } = useToast();

  const [form, setForm] = useState<Testimonial>({
    _id: "",
    name: "",
    university: "",
    text: "",
    rating: 5,
  });

  // ✅ FIXED: stable function (removes react-hooks/exhaustive-deps warning)
  const load = useCallback(async () => {
    setLoading(true);
    try {
      const data = await testimonialsAPI.getAll();
      setItems(getArray(data));

      toast({
        title: "✨ Updated",
        description: "Testimonials loaded successfully",
      });
    } catch {
      toast({
        title: "❌ Error",
        description: "Failed to load testimonials",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    load();
  }, [load]);

  const handleSave = async () => {
    if (!form.name || !form.university || !form.text) {
      toast({
        title: "Validation error",
        description: "All fields are required",
        variant: "destructive",
      });
      return;
    }

    try {
      if (editingId) {
        await testimonialsAPI.update(editingId, form);

        toast({
          title: "✨ Updated",
          description: "Testimonial updated successfully",
        });
      } else {
        await testimonialsAPI.create(form);

        toast({
          title: "🎉 Created",
          description: "Testimonial added successfully",
        });
      }

      setOpen(false);
      setEditingId(null);
      setForm({
        _id: "",
        name: "",
        university: "",
        text: "",
        rating: 5,
      });

      await load();
    } catch {
      toast({
        title: "❌ Error",
        description: "Operation failed. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleEdit = (t: Testimonial) => {
    setEditingId(t._id);
    setForm(t);
    setOpen(true);

    toast({
      title: "✏️ Editing mode",
      description: `${t.name} opened for editing`,
    });
  };

  const handleDelete = async (id: string) => {
    const ok = window.confirm("Are you sure you want to delete this testimonial?");
    if (!ok) {
      toast({
        title: "Cancelled",
        description: "Delete action cancelled",
      });
      return;
    }

    try {
      await testimonialsAPI.delete(id);

      toast({
        title: "🗑️ Deleted",
        description: "Testimonial removed successfully",
      });

      await load();
    } catch {
      toast({
        title: "❌ Error",
        description: "Failed to delete testimonial",
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="p-10 text-center animate-pulse text-muted-foreground">
          Loading testimonials...
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      {/* HEADER */}
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-xl font-bold">Testimonials</h2>

        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button
              onClick={() => {
                setEditingId(null);
                setForm({
                  _id: "",
                  name: "",
                  university: "",
                  text: "",
                  rating: 5,
                });
              }}
            >
              <Plus className="w-4 h-4 mr-2" />
              Add
            </Button>
          </DialogTrigger>

          <DialogContent className="rounded-2xl">
            <DialogHeader>
            <DialogTitle>
                {editingId ? "Edit" : "Add"} Testimonial
              </DialogTitle>

              <DialogDescription>
                {editingId
                  ? "Update the testimonial details below."
                  : "Add a new testimonial details below."}
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-3">
              <Input
                placeholder="Name"
                value={form.name}
                onChange={(e) =>
                  setForm({ ...form, name: e.target.value })
                }
              />

              <Input
                placeholder="University"
                value={form.university}
                onChange={(e) =>
                  setForm({ ...form, university: e.target.value })
                }
              />

              <Textarea
                placeholder="Message"
                value={form.text}
                onChange={(e) =>
                  setForm({ ...form, text: e.target.value })
                }
              />

              <Input
                type="number"
                min={1}
                max={5}
                value={form.rating}
onChange={(e) => {
                  const raw = e.target.value;
                  const nextVal = raw === '' ? 5 : Number(raw);
                  const clamped = Number.isFinite(nextVal)
                    ? Math.min(5, Math.max(1, nextVal))
                    : 5;
                  setForm({ ...form, rating: clamped });
                }}
              />

              <Button onClick={handleSave} className="w-full">
                Save
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* GRID */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((t, i) => (
          <motion.div
            key={t._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            whileHover={{ scale: 1.03 }}
            className="relative p-6 rounded-2xl border bg-white shadow-sm hover:shadow-xl transition group"
          >
            {/* Actions */}
            <div className="absolute top-3 right-3 flex gap-1 opacity-0 group-hover:opacity-100">
              <Button size="icon" variant="ghost" onClick={() => handleEdit(t)}>
                <Pencil className="w-4 h-4" />
              </Button>

              <Button size="icon" variant="ghost" onClick={() => handleDelete(t._id)}>
                <Trash2 className="w-4 h-4 text-red-500" />
              </Button>
            </div>

            {/* Content */}
            <div className="mb-3">
              <h3 className="font-semibold">{t.name}</h3>
              <p className="text-xs text-muted-foreground">{t.university}</p>
            </div>

            {/* Stars */}
            <div className="flex gap-1 mb-3">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${i < t.rating
                      ? "fill-yellow-400 text-yellow-400"
                      : "text-gray-300"
                    }`}
                />
              ))}
            </div>

            {/* Text */}
            <p className="text-sm text-muted-foreground line-clamp-4">
              {t.text}
            </p>
          </motion.div>
        ))}
      </div>
    </AdminLayout>
  );
}