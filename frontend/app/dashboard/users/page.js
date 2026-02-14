"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { apiRequest } from "@/lib/api";
import UserTable from "@/components/UserTable";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ErrorDialog from "@/components/ErrorDialog";

export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showError, setShowError] = useState(false);

  const fetchUsers = async () => {
    try {
      const data = await apiRequest("/users");
      setUsers(data);
    } catch (error) {
      setErrorMessage(error.message);
      setShowError(true);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleCreate = async () => {
    if (!username || !password) return;

    try {
      await apiRequest("/users", {
        method: "POST",
        body: JSON.stringify({ username, password }),
      });

      setUsername("");
      setPassword("");
      fetchUsers();
    } catch (error) {
      setErrorMessage(error.message);
      setShowError(true);
    }
  };

  const handleDelete = async (id) => {
    try {
      await apiRequest(`/users/${id}`, { method: "DELETE" });
      fetchUsers();
    } catch (error) {
      setErrorMessage(error.message);
      setShowError(true);
    }
  };



  return (
    <div className="space-y-6">
      <div className="rounded border bg-white p-4 shadow-sm">
        <Link href="/dashboard">
          <Button variant="outline" size="sm" className="mb-4">
            ← Back to Dashboard
          </Button>
        </Link>
        <h2 className="mb-2 font-medium">Add User</h2>
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
        title="Users"
        data={users}
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
