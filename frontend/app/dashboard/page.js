"use client";

import AnnouncementChat from "@/components/AnnouncementChat"
import AnnouncementInput from "@/components/AnnouncementInput";
import { getToken } from "@/lib/auth";

export default function DashboardPage() {
  const token = getToken();
  let role = null;

  if (token) {
    const payload = JSON.parse(atob(token.split(".")[1]));
    role = payload.role;
  }

  return (
    <div>
      <h1 className="text-10xl font-semibold">Announcements</h1>

      {role === "admin" && <AnnouncementInput />}

      <AnnouncementChat />
    </div>
  );
}