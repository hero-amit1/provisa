import { useState, useEffect } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import {
  blogsAPI,
  teamAPI,
  testimonialsAPI,
  universitiesAPI,
} from "@/lib/api";

import {
  FileText,
  Users,
  MessageSquare,
  GraduationCap,
  TrendingUp,
  LogOut,
} from "lucide-react";

import { useToast } from "@/components/ui/use-toast";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  LineChart,
  Line,
  CartesianGrid,
} from "recharts";

/* ✅ DIALOG IMPORTS */
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

type ApiResponse<T = unknown> = {
  data?: T[];
};

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    blogs: 0,
    team: 0,
    testimonials: 0,
    universities: 0,
  });

  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  /* ✅ logout dialog state */
  const [logoutOpen, setLogoutOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    window.location.href = "/admin/login";
  };

  const getLength = (res: unknown): number => {
    if (Array.isArray(res)) return res.length;

    if (
      typeof res === "object" &&
      res !== null &&
      "data" in res &&
      Array.isArray((res as ApiResponse).data)
    ) {
      return (res as ApiResponse).data!.length;
    }

    return 0;
  };

  useEffect(() => {
    const loadStats = async () => {
      setLoading(true);

      try {
        const [blogs, team, testimonials, universities] =
          await Promise.all([
            blogsAPI.getAll(),
            teamAPI.getAll(),
            testimonialsAPI.getAll(),
            universitiesAPI.getAll(),
          ]);

        setStats({
          blogs: getLength(blogs),
          team: getLength(team),
          testimonials: getLength(testimonials),
          universities: getLength(universities),
        });
      } catch {
        toast({
          title: "Dashboard Error",
          description: "Failed to load dashboard data",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    loadStats();
  }, [toast]);

  const barData = [
    { name: "Blogs", value: stats.blogs },
    { name: "Team", value: stats.team },
    { name: "Testimonials", value: stats.testimonials },
    { name: "Universities", value: stats.universities },
  ];

  const viewsData = [
    { day: "Mon", views: 120 },
    { day: "Tue", views: 220 },
    { day: "Wed", views: 180 },
    { day: "Thu", views: 300 },
    { day: "Fri", views: 260 },
    { day: "Sat", views: 400 },
    { day: "Sun", views: 320 },
  ];

  const cards = [
    {
      label: "Blogs",
      value: stats.blogs,
      icon: FileText,
      gradient: "from-indigo-500 to-indigo-700",
    },
    {
      label: "Team",
      value: stats.team,
      icon: Users,
      gradient: "from-sky-500 to-blue-600",
    },
    {
      label: "Testimonials",
      value: stats.testimonials,
      icon: MessageSquare,
      gradient: "from-emerald-500 to-green-600",
    },
    {
      label: "Universities",
      value: stats.universities,
      icon: GraduationCap,
      gradient: "from-violet-500 to-purple-700",
    },
  ];

  return (
    <AdminLayout>
      {/* HEADER */}
      <div className="flex items-center justify-between mb-10">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Admin Dashboard
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Real-time insights across your platform
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 text-sm px-3 py-1 rounded-full bg-green-50 text-green-600 border">
            <TrendingUp className="h-4 w-4" />
            Live System
          </div>

          {/* LOGOUT BUTTON */}
          <button
            onClick={() => setLogoutOpen(true)}
            className="flex items-center gap-2 px-4 py-2 text-sm rounded-lg bg-red-500 text-white hover:bg-red-600 transition"
          >
            <LogOut className="h-4 w-4" />
            Logout
          </button>
        </div>
      </div>

      {/* 🔴 LOGOUT DIALOG */}
      <Dialog open={logoutOpen} onOpenChange={setLogoutOpen}>
        <DialogContent className="rounded-2xl">
          <DialogHeader>
            <DialogTitle>Confirm Logout</DialogTitle>
          </DialogHeader>

          <p className="text-sm text-muted-foreground">
            Are you sure you want to logout from admin panel?
          </p>

          <div className="flex justify-end gap-3 mt-4">
            <Button
              variant="outline"
              onClick={() => setLogoutOpen(false)}
            >
              Cancel
            </Button>

            <Button
              variant="destructive"
              onClick={handleLogout}
            >
              Yes, Logout
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* LOADING */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-28 rounded-xl bg-muted animate-pulse" />
          ))}
        </div>
      ) : (
        <>
          {/* KPI CARDS */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            {cards.map((item, i) => (
              <Card key={i} className="rounded-2xl border bg-white/70 shadow-sm">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm text-muted-foreground">
                    {item.label}
                  </CardTitle>
                  <item.icon className="h-5 w-5 text-primary" />
                </CardHeader>

                <CardContent>
                  <p className="text-4xl font-bold">{item.value}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* CHARTS */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Content Distribution</CardTitle>
              </CardHeader>

              <CardContent className="h-[320px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={barData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="value" fill="#6366f1" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Weekly Traffic</CardTitle>
              </CardHeader>

              <CardContent className="h-[320px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={viewsData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Tooltip />
                    <Line dataKey="views" stroke="#22c55e" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </>
      )}
    </AdminLayout>
  );
};

export default AdminDashboard;