"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar() {
  const pathname = usePathname();

  const linkClass = (path) =>
    `block rounded px-3 py-2 ${
      pathname === path ? "bg-gray-200 font-medium" : "hover:bg-gray-100"
    }`;

  return (
    <aside className="w-56 border-r bg-white p-4">
      <h2 className="mb-4 text-lg font-semibold">Admin</h2>
      <nav className="space-y-1">
        <Link href="/dashboard/admins" className={linkClass("/dashboard/admins")}>
          Admins
        </Link>
        <Link href="/dashboard/users" className={linkClass("/dashboard/users")}>
          Users
        </Link>
      </nav>
    </aside>
  );
}
