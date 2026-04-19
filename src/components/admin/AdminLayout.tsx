import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard, FileText, Users, MessageSquare, BookOpen,
  GraduationCap, Settings, LogOut, Menu, X,
} from "lucide-react";

const sidebarItems = [
  { label: "Dashboard", path: "/admin", icon: LayoutDashboard },
  { label: "Services", path: "/admin/services", icon: BookOpen },
  { label: "Blogs", path: "/admin/blogs", icon: FileText },
  { label: "Team", path: "/admin/team", icon: Users },
  { label: "Testimonials", path: "/admin/testimonials", icon: MessageSquare },
  { label: "Universities", path: "/admin/universities", icon: GraduationCap },
  { label: "Inquiries", path: "/admin/inquiries", icon: MessageSquare },
  { label: "Settings", path: "/admin/settings", icon: Settings },
];

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  return (
    <div className="min-h-screen bg-muted flex">
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-secondary text-secondary-foreground transform transition-transform lg:translate-x-0 lg:static ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-6 border-b border-secondary-foreground/20">
          <h2 className="font-heading font-bold text-lg">ProVisa Admin</h2>
        </div>
        <nav className="p-4 space-y-1">
          {sidebarItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setSidebarOpen(false)}
              className={`flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm transition-colors ${
                location.pathname === item.path
                  ? "bg-primary text-primary-foreground"
                  : "text-secondary-foreground/70 hover:bg-secondary-foreground/10"
              }`}
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="absolute bottom-4 left-4 right-4">
          <Link
            to="/"
            className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm text-secondary-foreground/70 hover:bg-secondary-foreground/10"
          >
            <LogOut className="h-4 w-4" />
            Back to Site
          </Link>
        </div>
      </aside>

      {/* Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-foreground/50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main */}
      <div className="flex-1 flex flex-col min-h-screen">
        <header className="bg-background border-b border-border px-6 py-4 flex items-center gap-4">
          <button
            className="lg:hidden text-foreground"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="h-5 w-5" />
          </button>
          <h1 className="font-heading font-semibold text-foreground">
            {sidebarItems.find((i) => i.path === location.pathname)?.label || "Admin"}
          </h1>
        </header>
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
};

export default AdminLayout;
