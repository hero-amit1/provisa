import { useState, useEffect } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Trash2, Calendar, Mail } from 'lucide-react';
import { inquiriesAPI } from '@/lib/api';

interface Inquiry {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  message?: string;
  subject?: string;
  type?: string;
  date?: string;
  time?: string;
  country?: string;
  createdAt: string;
  status: string;
}

type TabType = 'all' | 'contact' | 'appointment';

const AdminInquiries = () => {
  const [items, setItems] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<TabType>('all');

  useEffect(() => {
    loadData();
  }, [activeTab]);

  const loadData = async () => {
    setLoading(true);
    try {
      let data;
      if (activeTab === 'contact') {
        data = await inquiriesAPI.getContact();
      } else if (activeTab === 'appointment') {
        data = await inquiriesAPI.getAppointments();
      } else {
        data = await inquiriesAPI.getAll();
      }
      // Ensure data is always an array - handle error responses
      if (Array.isArray(data)) {
        setItems(data);
      } else {
        console.warn('API returned non-array response:', data);
        setItems([]);
      }
    } catch (error) {
      console.error('Error loading inquiries:', error);
      setItems([]);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this inquiry?')) return;
    try {
      await inquiriesAPI.delete(id);
      loadData();
    } catch (error) {
      console.error(error);
    }
  };

  const getStatusBadge = (status: string) => {
    const variants: Record<string, any> = {
      new: 'destructive',
      contacted: 'default',
      closed: 'secondary',
    };
    const labels: Record<string, string> = {
      new: 'New',
      contacted: 'Contacted',
      closed: 'Closed',
    };
    return (
      <Badge variant={variants[status] || 'secondary'}>
        {labels[status] || status || 'New'}
      </Badge>
    );
  };

  const renderContactRow = (inquiry: Inquiry) => (
    <tr key={inquiry._id} className="border-b border-border hover:bg-muted/50">
      <td className="p-4">{inquiry.name}</td>
      <td className="p-4">
        <a href={`mailto:${inquiry.email}`} className="text-primary hover:underline">
          {inquiry.email}
        </a>
      </td>
      <td className="p-4">{inquiry.phone || '-'}</td>
      <td className="p-4">{inquiry.subject || inquiry.message?.substring(0, 50) || '-'}</td>
      <td className="p-4">{new Date(inquiry.createdAt).toLocaleDateString()}</td>
      <td className="p-4">{getStatusBadge(inquiry.status)}</td>
      <td className="p-4">
        <Button variant="ghost" size="sm" onClick={() => handleDelete(inquiry._id)}>
          <Trash2 className="h-4 w-4 text-red-500" />
        </Button>
      </td>
    </tr>
  );

  const renderAppointmentRow = (inquiry: Inquiry) => (
    <tr key={inquiry._id} className="border-b border-border hover:bg-muted/50">
      <td className="p-4">{inquiry.name}</td>
      <td className="p-4">
        <a href={`mailto:${inquiry.email}`} className="text-primary hover:underline">
          {inquiry.email}
        </a>
      </td>
      <td className="p-4">{inquiry.phone || '-'}</td>
      <td className="p-4">{inquiry.country || '-'}</td>
      <td className="p-4">
        {inquiry.date ? new Date(inquiry.date).toLocaleDateString() : '-'}
      </td>
      <td className="p-4">{new Date(inquiry.createdAt).toLocaleDateString()}</td>
      <td className="p-4">{getStatusBadge(inquiry.status)}</td>
      <td className="p-4">
        <Button variant="ghost" size="sm" onClick={() => handleDelete(inquiry._id)}>
          <Trash2 className="h-4 w-4 text-red-500" />
        </Button>
      </td>
    </tr>
  );

  const contactCount = items.filter((i) => !i.type || i.type === 'contact').length;
  const appointmentCount = items.filter((i) => i.type === 'appointment').length;

  if (loading) {
    return (
      <AdminLayout>
        <div className="p-8 text-center">Loading...</div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-heading font-semibold text-lg text-foreground">
          Manage Inquiries
        </h2>
        <div className="flex gap-2">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
              activeTab === 'all'
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted text-muted-foreground hover:bg-muted/80'
            }`}
          >
            All ({items.length})
          </button>
          <button
            onClick={() => setActiveTab('contact')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition flex items-center gap-2 ${
              activeTab === 'contact'
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted text-muted-foreground hover:bg-muted/80'
            }`}
          >
            <Mail className="h-4 w-4" />
            Contact ({contactCount})
          </button>
          <button
            onClick={() => setActiveTab('appointment')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition flex items-center gap-2 ${
              activeTab === 'appointment'
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted text-muted-foreground hover:bg-muted/80'
            }`}
          >
            <Calendar className="h-4 w-4" />
            Appointment ({appointmentCount})
          </button>
        </div>
      </div>

      {activeTab === 'appointment' || activeTab === 'all' ? (
        <div className="bg-background border rounded-xl overflow-hidden mb-6">
          <div className="p-4 border-b border-border bg-orange-50 dark:bg-orange-950/20">
            <h3 className="font-semibold text-orange-600 flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Appointment Bookings
            </h3>
          </div>
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left p-4 font-medium text-muted-foreground">
                  Name
                </th>
                <th className="text-left p-4 font-medium text-muted-foreground">
                  Email
                </th>
                <th className="text-left p-4 font-medium text-muted-foreground">
                  Phone
                </th>
                <th className="text-left p-4 font-medium text-muted-foreground">
                  Country
                </th>
                <th className="text-left p-4 font-medium text-muted-foreground">
                  Appointment Date
                </th>
                <th className="text-left p-4 font-medium text-muted-foreground">
                  Submitted
                </th>
                <th className="text-center p-4 font-medium text-muted-foreground">
                  Status
                </th>
                <th className="text-right p-4 font-medium text-muted-foreground">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {items
                .filter((i) => i.type === 'appointment')
                .map(renderAppointmentRow)}
            </tbody>
          </table>
          {items.filter((i) => i.type === 'appointment').length === 0 && (
            <div className="p-8 text-center text-muted-foreground">
              No appointment bookings yet.
            </div>
          )}
        </div>
      ) : null}

      <div className="bg-background border rounded-xl overflow-hidden">
        <div className="p-4 border-b border-border bg-blue-50 dark:bg-blue-950/20">
          <h3 className="font-semibold text-blue-600 flex items-center gap-2">
            <Mail className="h-5 w-5" />
            Contact Messages
          </h3>
        </div>
        <table className="w-full">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left p-4 font-medium text-muted-foreground">
                Name
              </th>
              <th className="text-left p-4 font-medium text-muted-foreground">
                Email
              </th>
              <th className="text-left p-4 font-medium text-muted-foreground">
                Phone
              </th>
              <th className="text-left p-4 font-medium text-muted-foreground">
                Subject
              </th>
              <th className="text-left p-4 font-medium text-muted-foreground">
                Date
              </th>
              <th className="text-center p-4 font-medium text-muted-foreground">
                Status
              </th>
              <th className="text-right p-4 font-medium text-muted-foreground">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {items
              .filter((i) => !i.type || i.type === 'contact')
              .map(renderContactRow)}
          </tbody>
        </table>
        {items.filter((i) => !i.type || i.type === 'contact').length === 0 && (
          <div className="p-8 text-center text-muted-foreground">
            No contact messages yet.
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default AdminInquiries;
