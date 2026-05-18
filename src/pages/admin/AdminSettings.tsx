import { useEffect, useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { settingsAPI } from "@/lib/api";
import { useToast } from "@/components/ui/use-toast";

type Settings = {
  companyName: string;
  email: string;
  phone: string;
  address: string;
};

const defaultSettings: Settings = {
  companyName: "",
  email: "",
  phone: "",
  address: "",
};

const AdminSettings = () => {
  const [form, setForm] = useState<Settings>(defaultSettings);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const { toast } = useToast();

  useEffect(() => {
    const fetchSettings = async () => {
      setLoading(true);

      try {
        const res = await settingsAPI.getAdmin();

        setForm({
          companyName: res?.companyName || "",
          email: res?.email || "",
          phone: res?.phone || "",
          address: res?.address || "",
        });

        toast({
          title: "✨ Loaded",
          description: "Settings loaded successfully",
        });
      } catch {
        toast({
          title: "❌ Error",
          description: "Failed to load settings",
          variant: "destructive",
        });

        setForm(defaultSettings);
      } finally {
        setLoading(false);
      }
    };

    fetchSettings();
  }, [toast]);

  const handleSave = async () => {
    if (!form.companyName || !form.email) {
      toast({
        title: "Validation error",
        description: "Company name and email are required",
        variant: "destructive",
      });
      return;
    }

    setSaving(true);

    try {
      await settingsAPI.updateAdmin(form);

      toast({
        title: "✨ Updated",
        description: "Settings saved successfully",
      });
    } catch {
      toast({
        title: "❌ Error",
        description: "Failed to save settings",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="p-6 text-sm text-muted-foreground animate-pulse">
          Loading settings...
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <h2 className="text-lg font-semibold mb-6">Settings</h2>

      <div className="border rounded-xl p-6 space-y-5 bg-background">
        {/* Company Name */}
        <div>
          <label className="text-sm font-medium">Company Name</label>
          <input
            value={form.companyName}
            onChange={(e) =>
              setForm({ ...form, companyName: e.target.value })
            }
            className="w-full mt-1 px-4 py-2 border rounded-lg text-sm"
          />
        </div>

        {/* Email */}
        <div>
          <label className="text-sm font-medium">Email</label>
          <input
            value={form.email}
            onChange={(e) =>
              setForm({ ...form, email: e.target.value })
            }
            className="w-full mt-1 px-4 py-2 border rounded-lg text-sm"
          />
        </div>

        {/* Phone */}
        <div>
          <label className="text-sm font-medium">Phone</label>
          <input
            value={form.phone}
            onChange={(e) =>
              setForm({ ...form, phone: e.target.value })
            }
            className="w-full mt-1 px-4 py-2 border rounded-lg text-sm"
          />
        </div>

        {/* Address */}
        <div>
          <label className="text-sm font-medium">Address</label>
          <input
            value={form.address}
            onChange={(e) =>
              setForm({ ...form, address: e.target.value })
            }
            className="w-full mt-1 px-4 py-2 border rounded-lg text-sm"
          />
        </div>

        {/* Save Button */}
        <button
          onClick={handleSave}
          disabled={saving}
          className="bg-primary text-white px-6 py-2 rounded-lg text-sm font-semibold disabled:opacity-60"
        >
          {saving ? "Saving..." : "Save Settings"}
        </button>
      </div>
    </AdminLayout>
  );
};

export default AdminSettings;