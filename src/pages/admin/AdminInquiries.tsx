import { useState, useEffect } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Trash2 } from 'lucide-react';
import { inquiriesAPI } from '@/lib/api';

interface Inquiry {
  _id: string;
  name: string;
  email: string;
  subject: string;
  createdAt: string;
  status: string;
}

const AdminInquiries = () => {
  const [items, setItems] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const data = await inquiriesAPI.getAll();
      setItems(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await inquiriesAPI.delete(id);
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
      <h2 className="font-heading font-semibold text-lg text-foreground mb-6">Manage Inquiries</h2>
      <div className="bg-background border rounded-xl overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left p-4 font-medium text-muted-foreground">Name</th>
              <th className="text-left p-4 font-medium text-muted-foreground">Email</th>
              <th className="text-left p-4 font-medium text-muted-foreground">Subject</th>
              <th className="text-left p-4 font-medium text-muted-foreground">Date</th>
              <th className="text-left p-4 font-medium text-muted-foreground">Status</th>
              <th className="text-right p-4 font-medium text-muted-foreground">Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map((inquiry) => (
              <tr key={inquiry._id} className="border-b border-border hover:bg-muted/50">
                <td className="p-4">{inquiry.name}</td>
                <td className="p-4">{inquiry.email}</td>
                <td className="p-4">{inquiry.subject}</td>
                <td className="p-4">{new Date(inquiry.createdAt).toLocaleDateString()}</td>
                <td className="p-4">
                  <Badge variant={inquiry.status === 'read' ? 'default' : 'secondary'}>
                    {inquiry.status || 'New'}
                  </Badge>
                </td>
                <td className="p-4">
                  <Button variant="ghost" size="sm" onClick={() => handleDelete(inquiry._id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  );
};

export default AdminInquiries;
