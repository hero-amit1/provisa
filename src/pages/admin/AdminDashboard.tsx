import { useState, useEffect } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { blogsAPI, teamAPI, testimonialsAPI, universitiesAPI, inquiriesAPI } from "@/lib/api";
import { FileText, Users, MessageSquare, GraduationCap, TrendingUp } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader } from "@/components/ui/card";

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    blogs: 0,
    team: 0,
    testimonials: 0,
    universities: 0,
    inquiries: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadStats = async () => {
      setLoading(true);
      try {
        const [
          blogs, team, testimonials, universities, inquiries
        ] = await Promise.all([
          blogsAPI.getAllPublic(),
          teamAPI.getAllPublic(),
          testimonialsAPI.getAllPublic(),
          universitiesAPI.getAllPublic(),
          inquiriesAPI.getAll()
        ]);
        setStats({
          blogs: blogs.length,
          team: team.length,
          testimonials: testimonials.length,
          universities: universities.length,
          inquiries: inquiries.length
        });
      } catch {}
      setLoading(false);
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
