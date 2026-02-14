"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { XIcon } from "lucide-react";

export default function Sidebar({ onClose }) {
  const pathname = usePathname();

  const linkClass = (path) =>
    `block rounded px-3 py-2 transition ${pathname === path
      ? "bg-blue-100 text-blue-700 font-medium"
      : "hover:bg-blue-50 text-gray-700"
    }`;


  return (
    <aside className="fixed top-0 left-0 h-screen w-56 border-r bg-white p-4 overflow-y-auto z-40">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">Admin</h2>
        <button
          onClick={onClose}
          className="rounded p-1 hover:bg-gray-100 transition"
          aria-label="Close sidebar"
        >
          <XIcon className="h-5 w-5 text-gray-600" />
        </button>
      </div>
      <nav className="space-y-1">
        <Link href="/dashboard/admins" className={linkClass("/dashboard/admins")} >
          Admins
        </Link>
        <Link href="/dashboard/users" className={linkClass("/dashboard/users")}>
          Users
        </Link>
        <Link href="/dashboard/activity-logs" className={linkClass("/dashboard/activity-logs")}>
          Activity Logs
        </Link>
      </nav>
    </aside>
  );
}
