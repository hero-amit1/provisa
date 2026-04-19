import AdminLayout from "@/components/admin/AdminLayout";

const AdminSettings = () => {
  return (
    <AdminLayout>
      <h2 className="font-heading font-semibold text-lg text-foreground mb-6">Settings</h2>
      <div className="bg-background border border-border rounded-xl p-6 space-y-6">
        <div>
          <label className="block text-sm font-medium text-foreground mb-1.5">Company Name</label>
          <input defaultValue="Professional Visa and Education Services Pvt. Ltd." className="w-full px-4 py-2.5 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
        </div>
        <div>
          <label className="block text-sm font-medium text-foreground mb-1.5">Email</label>
          <input defaultValue="admin@provisa.com.np" className="w-full px-4 py-2.5 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
        </div>
        <div>
          <label className="block text-sm font-medium text-foreground mb-1.5">Phone</label>
          <input defaultValue="+9779851101782, 01-4531819" className="w-full px-4 py-2.5 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
        </div>
        <div>
          <label className="block text-sm font-medium text-foreground mb-1.5">Address</label>
          <input defaultValue="Laxmi Plaza, Putalisadak, Padmodaya Mode, Kathmandu, Nepal" className="w-full px-4 py-2.5 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
        </div>
        <button className="bg-primary text-primary-foreground px-6 py-2.5 rounded-lg text-sm font-semibold hover:opacity-90 transition-opacity">
          Save Settings
        </button>
      </div>
    </AdminLayout>
  );
};

export default AdminSettings;
