"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/Sidebar";
import { getToken } from "@/lib/auth";

export default function DashboardLayout({ children }) {
  const router = useRouter();
  const [role, setRole] = useState(null);

  useEffect(() => {
    const token = getToken();
    if (!token) {
      router.push("/login");
      return;
    }

   
    const payload = JSON.parse(atob(token.split(".")[1]));
    setRole(payload.role);
  }, [router]);

  if (!role) return null;

  return (
    <div className="flex min-h-screen">
      {role === "admin" && <Sidebar />}
      <main className="flex-1 p-6 bg-gray-50">{children}</main>
    </div>
  );
}
