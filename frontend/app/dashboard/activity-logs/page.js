"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { apiRequest } from "@/lib/api";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function ActivityLogsPage() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const data = await apiRequest("/activity-logs");
        setLogs(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchLogs();
  }, []);

  const getActionBadge = (action) => {
    const badges = {
      CREATE_ADMIN: "bg-green-100 text-green-700",
      UPDATE_ADMIN: "bg-blue-100 text-blue-700",
      DELETE_ADMIN: "bg-red-100 text-red-700",
      CREATE_USER: "bg-green-100 text-green-700",
      UPDATE_USER: "bg-blue-100 text-blue-700",
      DELETE_USER: "bg-red-100 text-red-700",
    };

    return badges[action] || "bg-gray-100 text-gray-700";
  };

  const formatAction = (action) => {
    return action.replace(/_/g, " ");
  };

  if (loading) {
    return <p className="text-gray-500">Loading activity logs...</p>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-bold sm:text-3xl">Activity Logs</h1>
        <Link href="/dashboard">
          <Button variant="outline" size="sm">
            ← Back to Dashboard
          </Button>
        </Link>
      </div>

      <div className="overflow-x-auto rounded border bg-white shadow-sm">
        {logs.length === 0 ? (
          <p className="p-4 text-gray-500">No activity logs yet.</p>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="whitespace-nowrap">Date & Time</TableHead>
                <TableHead>Action</TableHead>
                <TableHead className="whitespace-nowrap">Performed By</TableHead>
                <TableHead className="whitespace-nowrap">Target User</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {logs.map((log) => (
                <TableRow key={log._id}>
                  <TableCell className="whitespace-nowrap text-sm text-gray-600">
                    {new Date(log.createdAt).toLocaleString()}
                  </TableCell>
                  <TableCell>
                    <span
                      className={`inline-block rounded px-2 py-1 text-xs font-medium ${getActionBadge(
                        log.action
                      )}`}
                    >
                      {formatAction(log.action)}
                    </span>
                  </TableCell>
                  <TableCell className="whitespace-nowrap font-medium">
                    {log.performedByUsername || "Unknown"}

                  </TableCell>
                  <TableCell className="whitespace-nowrap">
                    {log.targetUsername || "Unknown"}
                    <span className="ml-2 text-xs text-gray-500">
                      ({log.targetRole || "N/A"})
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>
    </div>
  );
}
