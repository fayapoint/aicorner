"use client";

import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { 
  LayoutDashboard, 
  FileText, 
  Video, 
  Users, 
  Settings, 
  LogOut,
  Menu,
  X,
  Bell,
  Search,
  Shield
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

interface AdminLayoutProps {
  children: React.ReactNode;
}

interface AdminUser {
  id: string;
  username: string;
  email: string;
  role: string;
}

export function AdminLayout({ children }: AdminLayoutProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [user, setUser] = useState<AdminUser | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const token = localStorage.getItem("admin_token");
      const userData = localStorage.getItem("admin_user");

      if (!token || !userData) {
        router.push("/admin/login");
        return;
      }

      // Verify token with server
      const response = await fetch("/api/auth/verify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ token })
      });

      if (!response.ok) {
        localStorage.removeItem("admin_token");
        localStorage.removeItem("admin_user");
        router.push("/admin/login");
        return;
      }

      // Parse and validate user data
      try {
        const parsedUser = JSON.parse(userData);
        // Ensure user has required properties
        if (parsedUser && parsedUser.username) {
          setUser(parsedUser);
        } else {
          throw new Error('Invalid user data');
        }
      } catch (parseError) {
        console.error('Error parsing user data:', parseError);
        localStorage.removeItem("admin_token");
        localStorage.removeItem("admin_user");
        router.push("/admin/login");
        return;
      }
    } catch (error) {
      console.error("Auth check failed:", error);
      router.push("/admin/login");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("admin_token");
    localStorage.removeItem("admin_user");
    router.push("/admin/login");
  };

  const navigation = [
    {
      name: "Dashboard",
      href: "/admin",
      icon: LayoutDashboard,
      current: pathname === "/admin"
    },
    {
      name: "News Articles",
      href: "/admin/news",
      icon: FileText,
      current: pathname.startsWith("/admin/news")
    },
    {
      name: "Videos",
      href: "/admin/videos",
      icon: Video,
      current: pathname.startsWith("/admin/videos")
    },
    {
      name: "Users",
      href: "/admin/users",
      icon: Users,
      current: pathname.startsWith("/admin/users")
    },
    {
      name: "Settings",
      href: "/admin/settings",
      icon: Settings,
      current: pathname.startsWith("/admin/settings")
    }
  ];

  if (loading || !user) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      {/* Sidebar */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            exit={{ x: -300 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-y-0 left-0 z-50 w-64 bg-slate-800 border-r border-gray-700"
          >
            <div className="flex flex-col h-full">
              {/* Logo */}
              <div className="flex items-center justify-between p-6 border-b border-gray-700">
                <div className="flex items-center gap-3">
                  <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-2 rounded-lg">
                    <Shield className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h1 className="text-lg font-bold">AInSeconds</h1>
                    <p className="text-xs text-gray-400">Admin Panel</p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSidebarOpen(false)}
                  className="lg:hidden"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>

              {/* Navigation */}
              <nav className="flex-1 p-4 space-y-2">
                {navigation.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link key={item.name} href={item.href}>
                      <Button
                        variant={item.current ? "default" : "ghost"}
                        className={`w-full justify-start ${
                          item.current 
                            ? "bg-purple-600 text-white" 
                            : "text-gray-300 hover:text-white hover:bg-slate-700"
                        }`}
                      >
                        <Icon className="w-4 h-4 mr-3" />
                        {item.name}
                      </Button>
                    </Link>
                  );
                })}
              </nav>

              {/* User Info */}
              <div className="p-4 border-t border-gray-700">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center">
                    <span className="text-sm font-bold">
                      {user?.username?.[0]?.toUpperCase() || 'A'}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{user?.username || 'Admin'}</p>
                    <p className="text-xs text-gray-400 truncate">{user?.email || 'admin@ainseconds.com'}</p>
                  </div>
                </div>
                <Button
                  onClick={handleLogout}
                  variant="outline"
                  size="sm"
                  className="w-full border-gray-600 text-gray-300 hover:bg-gray-700"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className={`transition-all duration-300 ${sidebarOpen ? 'lg:ml-64' : 'ml-0'}`}>
        {/* Top Bar */}
        <header className="bg-slate-800 border-b border-gray-700 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSidebarOpen(!sidebarOpen)}
              >
                <Menu className="w-4 h-4" />
              </Button>
              <h2 className="text-xl font-semibold">
                {navigation.find(item => item.current)?.name || "Dashboard"}
              </h2>
            </div>

            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm">
                <Search className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <Bell className="w-4 h-4" />
              </Button>
              <Link href="/" target="_blank">
                <Button variant="outline" size="sm" className="border-gray-600 text-gray-300 hover:bg-gray-700">
                  View Site
                </Button>
              </Link>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-6">
          {children}
        </main>
      </div>

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
}
