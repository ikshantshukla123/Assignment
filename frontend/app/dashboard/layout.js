"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/Sidebar";
import { getUserFromToken, logout } from "@/lib/auth";
import { MenuIcon, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function DashboardLayout({ children }) {
  const router = useRouter();
  const [role, setRole] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    const user = getUserFromToken();
    if (!user) {
      router.push("/login");
      return;
    }

    setRole(user.role);
  }, [router]);

  const handleLogout = () => {
    logout();
    router.push("/login");
  };


  if (!role) return null;

  return (
    <div className="flex min-h-screen ">
      {role === "admin" && sidebarOpen && (
        <Sidebar onClose={() => setSidebarOpen(false)} />
      )}
      <main className={`flex-1 p-6 bg-gray-50 transition-all ${role === "admin" && sidebarOpen ? "ml-56" : ""}`}>
        <div className="mb-6 flex justify-end">
          <Button
            onClick={handleLogout}
            variant="outline"
            size="sm"
            className="flex items-center gap-2"
          >
            <LogOut className="h-4 w-4" />
            Logout
          </Button>
        </div>
        {role === "admin" && !sidebarOpen && (
          <button
            onClick={() => setSidebarOpen(true)}
            className="fixed top-3 left-3 z-50 rounded-lg bg-white p-2 shadow-md hover:bg-gray-100 transition"
            aria-label="Open menu"
          >
            <MenuIcon className="h-4 w-4 text-gray-700" />
          </button>
        )}
        {children}
      </main>
    </div>
  );
}
