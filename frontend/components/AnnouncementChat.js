"use client";

import { useEffect, useState, useCallback } from "react";
import { apiRequest } from "@/lib/api";
import { useSocket } from "@/hooks/useSocket";

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
        <div key={a._id} className="rounded border bg-white p-4 shadow-sm">
          <div
            className="announcement-content"
            dangerouslySetInnerHTML={{ __html: a.content }}
          />
          <div className="mt-3 flex items-center gap-2 border-t pt-2 text-xs text-gray-500">
            <span>
              <span className="font-semibold">from: </span>
              <span className="font-medium text-blue-600">
                {a.fromAdmin?.username || "Admin"}
              </span>
            </span>
            {a.toUser && (
              <>
                <span>•</span>
                <span>
                  <span className="font-semibold">to: </span>
                  <span className="font-medium text-red-600">{a.toUser.username}</span>
                </span>
              </>
            )}
            <span>•</span>
            <span>{new Date(a.createdAt).toLocaleString()}</span>
          </div>
        </div>
      ))}

      <style jsx global>{`
        .announcement-content b,
        .announcement-content strong {
          font-weight: 700;
        }
        .announcement-content i,
        .announcement-content em {
          font-style: italic;
        }
        .announcement-content u {
          text-decoration: underline;
        }
        .announcement-content ul,
        .announcement-content ol {
          padding-left: 1.5rem;
          margin: 0.5rem 0;
        }
        .announcement-content ul {
          list-style-type: disc;
        }
        .announcement-content ol {
          list-style-type: decimal;
        }
      `}</style>
    </div>
  );
}