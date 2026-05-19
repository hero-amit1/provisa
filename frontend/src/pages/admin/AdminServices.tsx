import { useState, useEffect } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { Plus, Pencil, Trash2, Loader2 } from "lucide-react";
import { servicesAPI } from "@/lib/api";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Service {
  _id: string;
  title: string;
  description: string;
  icon: string;
  order: number;
  isActive: boolean;
}

const AdminServices = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);

  const [form, setForm] = useState({
    title: "",
    description: "",
    icon: "Circle",
    order: 0,
    isActive: true,
  });

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    setLoading(true);

    try {
      const res = await servicesAPI.getAll();
      const serviceData = Array.isArray(res) ? res : res?.data || [];
      setServices(serviceData);
    } catch {
      console.error("Failed to fetch services");
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setForm({
      title: "",
      description: "",
      icon: "Circle",
      order: 0,
      isActive: true,
    });
    setEditingId(null);
  };

  const handleSubmit = async () => {
    setSaving(true);

    try {
      if (editingId) {
        await servicesAPI.update(editingId, form);
      } else {
        await servicesAPI.create(form);
      }

      setShowForm(false);
      resetForm();
      fetchServices();
    } catch {
      console.error("Save failed");
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (service: Service) => {
    setEditingId(service._id);
    setForm({
      title: service.title,
      description: service.description,
      icon: service.icon,
      order: service.order,
      isActive: service.isActive,
    });
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete service?")) return;

    try {
      await servicesAPI.delete(id);
      fetchServices();
    } catch {
      console.error("Delete failed");
    }
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      {/* HEADER */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-semibold text-lg">Manage Services</h2>

        <Button
          onClick={() => {
            setShowForm(true);
            resetForm();
          }}
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Service
        </Button>
      </div>

      {/* FORM */}
      {showForm && (
        <div className="bg-background border rounded-xl p-6 mb-6 space-y-4">
          <h3 className="font-semibold">
            {editingId ? "Edit Service" : "New Service"}
          </h3>

          <Input
            placeholder="Service Title"
            value={form.title}
            onChange={(e) =>
              setForm({ ...form, title: e.target.value })
            }
          />

          <Textarea
            placeholder="Description"
            value={form.description}
            onChange={(e) =>
              setForm({ ...form, description: e.target.value })
            }
          />

          <Input
            placeholder="Icon name"
            value={form.icon}
            onChange={(e) =>
              setForm({ ...form, icon: e.target.value })
            }
          />

          <Input
            type="number"
            value={form.order}
            onChange={(e) =>
              setForm({
                ...form,
                order: Number(e.target.value) || 0,
              })
            }
          />

          <Select
            value={form.isActive ? "true" : "false"}
            onValueChange={(v) =>
              setForm({ ...form, isActive: v === "true" })
            }
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="true">Active</SelectItem>
              <SelectItem value="false">Inactive</SelectItem>
            </SelectContent>
          </Select>

          <div className="flex gap-3">
            <Button onClick={handleSubmit} disabled={saving}>
              {saving && (
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              )}
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
        </div>
      )}

      {/* TABLE */}
      <div className="bg-background border rounded-xl overflow-hidden">
        {services.length === 0 ? (
          <div className="p-10 text-center text-muted-foreground">
            No services found. Add your first service!
          </div>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left p-4">Title</th>
                <th className="text-left p-4">Icon</th>
                <th className="text-left p-4">Order</th>
                <th className="text-left p-4">Status</th>
                <th className="text-right p-4">Actions</th>
              </tr>
            </thead>

            <tbody>
              {services.map((service) => (
                <tr
                  key={service._id}
                  className="border-b hover:bg-muted/50"
                >
                  <td className="p-4 font-medium">
                    {service.title}
                  </td>

                  <td className="p-4">{service.icon}</td>

                  <td className="p-4">{service.order}</td>

                  <td className="p-4">
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${service.isActive
                          ? "bg-green-100 text-green-800"
                          : "bg-gray-100 text-gray-800"
                        }`}
                    >
                      {service.isActive ? "Active" : "Inactive"}
                    </span>
                  </td>

                  <td className="p-4 text-right space-x-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleEdit(service)}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>

                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleDelete(service._id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </AdminLayout>
  );
};

export default AdminServices;