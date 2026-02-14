"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { apiRequest } from "@/lib/api";
import UserTable from "@/components/UserTable";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ErrorDialog from "@/components/ErrorDialog";

export default function AdminsPage() {
  const [admins, setAdmins] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showError, setShowError] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchAdmins = async () => {
    try {
      const data = await apiRequest("/admins");
      setAdmins(data);
    } catch (error) {
      setErrorMessage(error.message);
      setShowError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdmins();
  }, []);

  const handleCreate = async () => {
    if (!username?.trim() || password.length < 6) {
      setErrorMessage("Username required and password must be 6+ chars");
      setShowError(true);
      return;
    }

    try {
      await apiRequest("/admins", {
        method: "POST",
        body: JSON.stringify({ username, password }),
      });

      setUsername("");
      setPassword("");
      fetchAdmins();
    } catch (error) {
      setErrorMessage(error.message);
      setShowError(true);
    }
  };

  const handleDelete = async (id) => {
    try {
      await apiRequest(`/admins/${id}`, { method: "DELETE" });
      fetchAdmins();
    } catch (error) {
      setErrorMessage(error.message);
      setShowError(true);
    }
  };

  if (loading) {
    return <p className="text-gray-500">Loading admins...</p>;
  }

  return (
    <div className="space-y-6">
      <div className="rounded border bg-white p-4 shadow-sm">
        <Link href="/dashboard">
          <Button variant="outline" size="sm" className="mb-4">
            ← Back to Dashboard
          </Button>
        </Link>
        <h2 className="mb-2 font-medium">Add Admin</h2>
        <div className="flex gap-2">
          <Input
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <Input
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button onClick={handleCreate}>Add</Button>
        </div>
      </div>

      <UserTable
        title="Admins"
        data={admins}
        onDelete={handleDelete}
      />

      <ErrorDialog
        open={showError}
        onClose={() => setShowError(false)}
        message={errorMessage}
      />
    </div>
  );
}
