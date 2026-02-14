"use client";

import { useEffect, useState } from "react";
import { apiRequest } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function AnnouncementInput() {
  const [content, setContent] = useState("");
  const [users, setUsers] = useState([]);
  const [toUserId, setToUserId] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // fetch users for targeted announcements
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await apiRequest("/users");
        setUsers(data);
      } catch (err) {
        console.error("Failed to load users");
      }
    };

    fetchUsers();
  }, []);

  const handleSend = async () => {
    if (!content.trim()) return;

    setLoading(true);
    setError("");

    try {
      await apiRequest("/announcements", {
        method: "POST",
        body: JSON.stringify({
          content,
          toUserId: toUserId || undefined,
        }),
      });

      setContent("");
      setToUserId("");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-4 rounded border bg-white p-4 shadow-sm">
      <h3 className="mb-2 font-medium">Send Announcement</h3>

      <Input
        placeholder="Write an announcement..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />

      <div className="mt-2 flex gap-2">
        <select
          value={toUserId}
          onChange={(e) => setToUserId(e.target.value)}
          className="rounded border px-2 py-1 text-sm"
        >
          <option value="">Broadcast to all</option>
          {users.map((u) => (
            <option key={u._id} value={u._id}>
              {u.username}
            </option>
          ))}
        </select>

        <Button onClick={handleSend} disabled={loading}>
          {loading ? "Sending..." : "Send"}
        </Button>
      </div>

      {error && (
        <p className="mt-2 text-sm text-red-500">{error}</p>
      )}
    </div>
  );
}
