import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard, FileText, Users, MessageSquare,
  GraduationCap, Settings, LogOut, Menu,
  ChevronLeft, ChevronRight
} from "lucide-react";

const sidebarItems = [
  { label: "Dashboard", path: "/admin", icon: LayoutDashboard },
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
    <div className="min-h-screen flex bg-white">

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 ${
          collapsed ? "w-20" : "w-64"
        } bg-white border-r border-gray-200 shadow-sm transform transition-all duration-300
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0 lg:static`}
      >
        {/* Logo */}
        <div className="flex items-center justify-between p-5 border-b border-gray-200">
          {!collapsed && (
            <h2 className="font-bold text-lg text-orange-500">
              🚀 ProVisa
            </h2>
          )}

          <button
            onClick={() => setCollapsed(!collapsed)}
            className="hidden lg:flex p-2 rounded-lg hover:bg-orange-100 transition"
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
              className={`group flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all
              ${
                isActive(item.path)
                  ? "bg-orange-500 text-white shadow-md"
                  : "text-gray-600 hover:bg-orange-50 hover:text-orange-500"
              }`}
            >
              <item.icon className="h-5 w-5" />

              {!collapsed && <span>{item.label}</span>}
            </Link>
          ))}
        </nav>

        {/* Bottom */}
        <div className="absolute bottom-4 left-0 w-full px-3">
          <Link
            to="/"
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-gray-500 hover:bg-orange-50 hover:text-orange-500 transition"
          >
            <LogOut className="h-5 w-5" />
            {!collapsed && "Back to Site"}
          </Link>
        </div>
      </aside>

      {/* Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main */}
      <div className="flex-1 flex flex-col min-h-screen">

        {/* Header */}
        <header className="sticky top-0 z-30 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">

          <div className="flex items-center gap-4">
            <button
              className="lg:hidden"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu className="h-6 w-6" />
            </button>

            <h1 className="text-lg font-semibold text-gray-800">
              {sidebarItems.find((i) =>
                location.pathname.startsWith(i.path)
              )?.label || "Admin"}
            </h1>
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-orange-500 text-white flex items-center justify-center text-sm font-semibold">
              A
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 p-6 bg-gray-50">
          <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-200">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;