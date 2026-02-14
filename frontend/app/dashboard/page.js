"use client";

import AnnouncementChat from "@/components/AnnouncementChat"
import AnnouncementInput from "@/components/AnnouncementInput";
import { getUserFromToken } from "@/lib/auth";

export default function DashboardPage() {
  const user = getUserFromToken();
  const role = user?.role || null;

  return (
    <div>
      <h1 className=" ml-6 text-4xl font-semibold">Announcements</h1>

      {role === "admin" && <AnnouncementInput />}

      <AnnouncementChat />
    </div>
  );
}