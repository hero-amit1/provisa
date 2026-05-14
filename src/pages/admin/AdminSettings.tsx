import { useEffect, useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { settingsAPI } from "@/lib/api";

type Settings = {
  companyName?: string;
  email?: string;
  phone?: string;
  address?: string;
};

const AdminSettings = () => {
  const [form, setForm] = useState<Settings>({
    companyName: "",
    email: "",
    phone: "",
    address: "",
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    settingsAPI
      .getAdmin()
      .then((data) => setForm(data as Settings))
      .catch(() => setForm({ companyName: "", email: "", phone: "", address: "" }))
      .finally(() => setLoading(false));
  }, []);

  const loadSettings = async () => {
    try {
      const data = await settingsAPI.getAdmin();
      setForm(data as Settings);
    } catch {
      setForm({ companyName: "", email: "", phone: "", address: "" });
    }
  };

  const handleSave = async () => {
    try {
      await settingsAPI.updateAdmin(form);
      alert("Settings saved successfully.");
      await loadSettings();
    } catch (e) {
      console.error(e);
      const message = e instanceof Error ? e.message : undefined;
      alert(message || "Error saving settings.");
    }

  };



  return (
    <AdminLayout>
      <h2 className="font-heading font-semibold text-lg text-foreground mb-6">Settings</h2>
      <div className="bg-background border border-border rounded-xl p-6 space-y-6">
        <div>
          <label className="block text-sm font-medium text-foreground mb-1.5">Company Name</label>
          <input
            value={form.companyName || ""}
            onChange={(e) => setForm({ ...form, companyName: e.target.value })}
            className="w-full px-4 py-2.5 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-foreground mb-1.5">Email</label>
          <input
            value={form.email || ""}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="w-full px-4 py-2.5 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-foreground mb-1.5">Phone</label>
          <input
            value={form.phone || ""}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            className="w-full px-4 py-2.5 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-foreground mb-1.5">Address</label>
          <input
            value={form.address || ""}
            onChange={(e) => setForm({ ...form, address: e.target.value })}
            className="w-full px-4 py-2.5 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>
        <button
          onClick={handleSave}
          disabled={loading}
          className="bg-primary disabled:opacity-60 text-primary-foreground px-6 py-2.5 rounded-lg text-sm font-semibold hover:opacity-90 transition-opacity"
        >
          Save Settings
        </button>
      </div>
    </AdminLayout>
  );
};

export default AdminSettings;

