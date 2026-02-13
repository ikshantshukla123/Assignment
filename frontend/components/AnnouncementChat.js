"use client";

import { useEffect, useState, useCallback } from "react";
import { apiRequest } from "@/lib/api";
import {useSocket} from "@/hooks/useSocket"


export default function AnnouncementChat() {
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");


  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const data = await apiRequest("/announcements");
        setAnnouncements(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAnnouncements();
  }, []);

  const handleNewAnnouncement = useCallback((announcement) => {
  setAnnouncements((prev) => {
    const exists = prev.some((a) => a._id === announcement._id);
    if (exists) return prev;
    return [announcement, ...prev];
  });
}, []);
    useSocket(handleNewAnnouncement);

  if (loading) return <p>Loading announcements...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="mt-4 space-y-4">
      {announcements.length === 0 && (
        <p className="text-gray-500">No announcements yet.</p>
      )}

      {announcements.map((a) => (
        <div
          key={a._id}
          className="rounded border bg-white p-4 shadow-sm"
        >
          <p className="font-medium">{a.content}</p>
          <p className="mt-1 text-xs text-gray-500">
            by {a.fromAdmin?.username} •{" "}
            {new Date(a.createdAt).toLocaleString()}
          </p>
        </div>
      ))}
    </div>
  );
}