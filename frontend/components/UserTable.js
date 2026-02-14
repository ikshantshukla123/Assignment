"use client";

import { Button } from "@/components/ui/button";

export default function UserTable({
  title,
  data,
  onDelete,
  showDelete = true,
}) {
  return (
    <div className="rounded border bg-white p-4 shadow-sm">
      <h2 className="mb-4 text-lg font-semibold">{title}</h2>

      <table className="w-full border-collapse text-sm">
        <thead>
          <tr className="border-b">
            <th className="py-2 text-left">Username</th>
            <th className="py-2 text-left">Role</th>
            {showDelete && <th className="py-2">Actions</th>}
          </tr>
        </thead>

        <tbody>
          {data.length === 0 && (
            <tr>
              <td colSpan={3} className="py-4 text-center text-gray-500">
                No records found
              </td>
            </tr>
          )}

          {data.map((u) => (
            <tr key={u._id} className="border-b last:border-b-0">
              <td className="py-2">{u.username}</td>
              <td className="py-2 capitalize">{u.role}</td>
              {showDelete && (
                <td className="py-2 text-center">
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => onDelete(u._id)}
                  >
                    Delete
                  </Button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
