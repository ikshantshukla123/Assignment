"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/Sidebar";
import { getUserFromToken } from "@/lib/auth";
import { MenuIcon } from "lucide-react";

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

  if (!role) return null;

  return (
    <div className="flex min-h-screen mr-10 ">
      {role === "admin" && sidebarOpen && (
        <Sidebar onClose={() => setSidebarOpen(false)} />
      )}
      <main className={`flex-1 p-6 bg-gray-50 transition-all ${role === "admin" && sidebarOpen ? "ml-56" : "ml-10"}`}>
        {role === "admin" && !sidebarOpen && (
          <button
            onClick={() => setSidebarOpen(true)}
            className="fixed top-4 left-4 z-50 rounded-lg bg-white p-2 shadow-md hover:bg-gray-100 transition"
            aria-label="Open menu"
          >
            <MenuIcon className="h-6 w-6 text-gray-700" />
          </button>
        )}
        {children}
      </main>
    </div>
  );
}
