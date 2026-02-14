"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { apiRequest } from "@/lib/api";
import UserTable from "@/components/UserTable";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ErrorDialog from "@/components/ErrorDialog";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { getUserFromToken } from "@/lib/auth";

export default function AdminsPage() {
  const [admins, setAdmins] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showError, setShowError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [editingAdmin, setEditingAdmin] = useState(null);
  const [editUsername, setEditUsername] = useState("");
  const [editPassword, setEditPassword] = useState("");
  const [deletingAdmin, setDeletingAdmin] = useState(null);

  const currentUser = getUserFromToken();

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
    setDeletingAdmin(id);
  };

  const confirmDelete = async () => {
    try {
      await apiRequest(`/admins/${deletingAdmin}`, { method: "DELETE" });
      setDeletingAdmin(null);
      fetchAdmins();
    } catch (error) {
      setErrorMessage(error.message);
      setShowError(true);
      setDeletingAdmin(null);
    }
  };

  const handleUpdate = (admin) => {
    setEditingAdmin(admin);
    setEditUsername(admin.username);
    setEditPassword("");
  };

  const handleSaveUpdate = async () => {
    if (!editUsername?.trim()) {
      setErrorMessage("Username is required");
      setShowError(true);
      return;
    }

    try {
      const body = { username: editUsername };
      if (editPassword) {
        if (editPassword.length < 6) {
          setErrorMessage("Password must be 6+ characters");
          setShowError(true);
          return;
        }
        body.password = editPassword;
      }

      await apiRequest(`/admins/${editingAdmin._id}`, {
        method: "PUT",
        body: JSON.stringify(body),
      });

      setEditingAdmin(null);
      setEditUsername("");
      setEditPassword("");
      fetchAdmins();
    } catch (error) {
      setErrorMessage(error.message);
      setShowError(true);
    }
  };
  //since admins were taking time to get fetched and when the ui was not clear that why added this
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
        onUpdate={handleUpdate}
        currentUserId={currentUser?.userId}
      />

      <Dialog open={!!editingAdmin} onOpenChange={() => setEditingAdmin(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Update Admin</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <Input
              placeholder="Username"
              value={editUsername}
              onChange={(e) => setEditUsername(e.target.value)}
            />
            <Input
              placeholder="New Password (optional)"
              type="password"
              value={editPassword}
              onChange={(e) => setEditPassword(e.target.value)}
            />
            <div className="flex gap-2 justify-end">
              <Button
                variant="outline"
                onClick={() => setEditingAdmin(null)}
              >
                Cancel
              </Button>
              <Button onClick={handleSaveUpdate}>Save</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={!!deletingAdmin} onOpenChange={() => setDeletingAdmin(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Delete</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <p className="text-gray-600">
              Are you sure you want to delete this admin? This action cannot be
              reverted.
            </p>
            <div className="flex gap-2 justify-end mt-6">
              <Button
                variant="outline"
                onClick={() => setDeletingAdmin(null)}
              >
                Cancel
              </Button>
              <Button variant="destructive" onClick={confirmDelete}>
                Delete
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <ErrorDialog
        open={showError}
        onClose={() => setShowError(false)}
        message={errorMessage}
      />
    </div>
  );
}
