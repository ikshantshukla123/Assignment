"use client";

import { useEffect, useState } from "react";
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

  const fetchAdmins = async () => {
    const data = await apiRequest("/admins");
    setAdmins(data);
  };

  useEffect(() => {
    fetchAdmins();
  }, []);

  const handleCreate = async () => {
    if (!username || !password) return;

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

  return (
    <div className="space-y-6">
      <div className="rounded border bg-white p-4 shadow-sm">
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
