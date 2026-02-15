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



export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showError, setShowError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [editingUser, setEditingUser] = useState(null);
  const [editUsername, setEditUsername] = useState("");
  const [editPassword, setEditPassword] = useState("");
  const [deletingUser, setDeletingUser] = useState(null);

  const fetchUsers = async () => {
    try {
      const data = await apiRequest("/users");
      setUsers(data);
    } catch (error) {
      setErrorMessage(error.message);
      setShowError(true);
    } finally {
      setLoading(false);
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
    setDeletingUser(id);
  };

  const confirmDelete = async () => {
    try {
      await apiRequest(`/users/${deletingUser}`, { method: "DELETE" });
      setDeletingUser(null);
      fetchUsers();
    } catch (error) {
      setErrorMessage(error.message);
      setShowError(true);
      setDeletingUser(null);
    }
  };

  const handleUpdate = (user) => {
    setEditingUser(user);
    setEditUsername(user.username);
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

      await apiRequest(`/users/${editingUser._id}`, {
        method: "PUT",
        body: JSON.stringify(body),
      });

      setEditingUser(null);
      setEditUsername("");
      setEditPassword("");
      fetchUsers();
    } catch (error) {
      setErrorMessage(error.message);
      setShowError(true);
    }
  };
  if (loading) {
    return <p className="text-gray-500">Loading users...</p>;
  }



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
        onUpdate={handleUpdate}
      />










      <Dialog open={!!editingUser} onOpenChange={() => setEditingUser(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Update User</DialogTitle>
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
                onClick={() => setEditingUser(null)}
              >
                Cancel
              </Button>
              <Button onClick={handleSaveUpdate}>Save</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>










      <Dialog open={!!deletingUser} onOpenChange={() => setDeletingUser(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Delete</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <p className="text-gray-600">
              Are you sure you want to delete this user? This action cannot be
              reverted.
            </p>
            <div className="flex gap-2 justify-end mt-6">
              <Button
                variant="outline"
                onClick={() => setDeletingUser(null)}
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
