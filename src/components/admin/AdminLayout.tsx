import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard, FileText, Users, MessageSquare, BookOpen,
  GraduationCap, Settings, LogOut, Menu, X, ChevronLeft, ChevronRight
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
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname.startsWith(path);
  };

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-950">

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 ${
          collapsed ? "w-20" : "w-64"
        } bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-r border-slate-200 dark:border-slate-800 shadow-xl transform transition-all duration-300
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0 lg:static`}
      >
        {/* Logo */}
        <div className="flex items-center justify-between p-5 border-b border-slate-200 dark:border-slate-800">
          {!collapsed && (
            <h2 className="font-bold text-lg tracking-wide">
              🚀 ProVisa
            </h2>
          )}

          <button
            onClick={() => setCollapsed(!collapsed)}
            className="hidden lg:flex p-2 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-800 transition"
          >
            {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
          </button>
        </div>

        {/* Menu */}
        <nav className="p-3 space-y-2">
          {sidebarItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setSidebarOpen(false)}
              className={`group flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200
              ${
                isActive(item.path)
                  ? "bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-md"
                  : "text-slate-600 dark:text-slate-400 hover:bg-slate-200/70 dark:hover:bg-slate-800"
              }`}
            >
              <item.icon className="h-5 w-5" />

              {!collapsed && (
                <span className="transition-all duration-200">
                  {item.label}
                </span>
              )}
            </Link>
          ))}
        </nav>

        {/* Bottom */}
        <div className="absolute bottom-4 left-0 w-full px-3">
          <Link
            to="/"
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-slate-500 hover:bg-red-100 dark:hover:bg-red-900/30 hover:text-red-500 transition"
          >
            <LogOut className="h-5 w-5" />
            {!collapsed && "Back to Site"}
          </Link>
        </div>
      </aside>

      {/* Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main */}
      <div className="flex-1 flex flex-col min-h-screen">

        {/* Header */}
        <header className="sticky top-0 z-30 bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl border-b border-slate-200 dark:border-slate-800 px-6 py-4 flex items-center justify-between">

          <div className="flex items-center gap-4">
            <button
              className="lg:hidden"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu className="h-6 w-6" />
            </button>

            <h1 className="text-lg font-semibold tracking-tight">
              {sidebarItems.find((i) =>
                location.pathname.startsWith(i.path)
              )?.label || "Admin"}
            </h1>
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 text-white flex items-center justify-center text-sm font-semibold">
              A
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 p-6">
          <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm p-6 border border-slate-200 dark:border-slate-800">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;