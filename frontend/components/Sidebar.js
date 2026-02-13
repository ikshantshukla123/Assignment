"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar() {
  const pathname = usePathname();

 const linkClass = (path) =>
  `block rounded px-3 py-2 transition ${
    pathname === path
      ? "bg-blue-100 text-blue-700 font-medium"
      : "hover:bg-blue-50 text-gray-700"
  }`;

  
  return (
    <aside className="w-56 border-r bg-white p-4">
      <h2 className="mb-4 text-lg font-semibold">Admin</h2>
      <nav className="space-y-1">
        <Link href="/dashboard/admins" className={linkClass("/dashboard/admins")} >
          Admins
        </Link>
        <Link href="/dashboard/users" className={linkClass("/dashboard/users")}>
          Users
        </Link>
      </nav>
    </aside>
  );
}
