import { useState, useEffect } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { blogsAPI, teamAPI, testimonialsAPI, universitiesAPI, inquiriesAPI } from "@/lib/api";
import { FileText, Users, MessageSquare, GraduationCap, TrendingUp, AlertCircle } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";


const AdminDashboard = () => {
  const [stats, setStats] = useState({
    blogs: 0,
    team: 0,
    testimonials: 0,
    universities: 0,
    inquiries: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { toast } = useToast();

  useEffect(() => {
    const loadStats = async () => {
      setLoading(true);
      setError('');
      try {
        const [
          blogs, team, testimonials, universities, inquiries
        ] = await Promise.all([
          blogsAPI.getAll(),
          teamAPI.getAll(),
          testimonialsAPI.getAll(),
          universitiesAPI.getAll(),
          inquiriesAPI.getAll()
        ]);
        setStats({
          blogs: Array.isArray(blogs) ? blogs.length : blogs?.data?.length || 0,
          team: Array.isArray(team) ? team.length : team?.data?.length || 0,
          testimonials: Array.isArray(testimonials) ? testimonials.length : testimonials?.data?.length || 0,
          universities: Array.isArray(universities) ? universities.length : universities?.data?.length || 0,
          inquiries: Array.isArray(inquiries) ? inquiries.length : inquiries?.data?.length || 0
        });
      } catch (err: any) {
        const msg = err.message || 'Failed to load dashboard';
        setError(msg);
        toast({
          title: "Dashboard Error",
          description: msg,
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };
    loadStats();
  }, []);

  if (loading) return <AdminLayout><div>Loading dashboard...</div></AdminLayout>;

  const statCards = [
    { label: "Blog Posts", value: stats.blogs, icon: FileText, color: "bg-destructive/10 text-destructive" },
    { label: "Team Members", value: stats.team, icon: Users, color: "bg-secondary text-secondary-foreground" },
    { label: "Testimonials", value: stats.testimonials, icon: MessageSquare, color: "bg-green-500/10 text-green-500" },
    { label: "Universities", value: stats.universities, icon: GraduationCap, color: "bg-blue-500/10 text-blue-500" },
    { label: "Inquiries", value: stats.inquiries, icon: TrendingUp, color: "bg-orange-500/10 text-orange-500" }
  ];

  return (
    <AdminLayout>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {statCards.map((stat, i) => (
          <Card key={i}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <stat.icon className={`h-8 w-8 ${stat.color}`} />
              <CardContent className="text-3xl font-bold">{stat.value}</CardContent>
            </CardHeader>
            <CardDescription>{stat.label}</CardDescription>
          </Card>
        ))}
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
