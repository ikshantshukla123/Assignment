import Link from "next/link";
import { Bell, Users, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-blue-50 to-white">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-2">
            <Bell className="h-6 w-6 text-blue-600" />
            <h1 className="text-xl font-bold text-gray-900">Announcements Platform</h1>
          </div>
          <Link href="/login">
            <Button variant="outline">Login</Button>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <main className="container mx-auto flex flex-1 flex-col items-center justify-center px-6 py-20 text-center">
        <div className="mb-8 inline-flex items-center gap-2 rounded-full bg-blue-100 px-4 py-2 text-sm text-blue-700">
          <Bell className="h-4 w-4" />
          <span>Organization Communication Made Easy</span>
        </div>

        <h2 className="mb-6 text-5xl font-bold text-gray-900">
          Organization Announcements Platform
        </h2>

        <p className="mb-12 max-w-2xl text-lg text-gray-600">
          A centralized platform for admins to broadcast important announcements to all members
          or send targeted messages to specific users in real-time.
        </p>

        <Link href="/login">
          <Button size="lg" className="px-8 py-6 text-lg">
            Get Started
          </Button>
        </Link>

       
        <div className="mt-20 grid gap-8 md:grid-cols-3">
          <div className="rounded-lg border bg-white p-6 shadow-sm">
            <div className="mb-4 inline-flex rounded-full bg-blue-100 p-3">
              <Bell className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="mb-2 text-lg font-semibold">Real-time Announcements</h3>
            <p className="text-sm text-gray-600">
              Broadcast messages instantly to all users or target specific individuals
            </p>
          </div>

          <div className="rounded-lg border bg-white p-6 shadow-sm">
            <div className="mb-4 inline-flex rounded-full bg-green-100 p-3">
              <Users className="h-6 w-6 text-green-600" />
            </div>
            <h3 className="mb-2 text-lg font-semibold">User Management</h3>
            <p className="text-sm text-gray-600">
              Admins can manage users and control who receives announcements
            </p>
          </div>

          <div className="rounded-lg border bg-white p-6 shadow-sm">
            <div className="mb-4 inline-flex rounded-full bg-purple-100 p-3">
              <Shield className="h-6 w-6 text-purple-600" />
            </div>
            <h3 className="mb-2 text-lg font-semibold">Role-based Access</h3>
            <p className="text-sm text-gray-600">
              Secure authentication with admin and user roles for better control
            </p>
          </div>
        </div>
      </main>

     
      <footer className="border-t bg-gray-50 py-6">
        <div className="container mx-auto px-6 text-center text-sm text-gray-600">
          © 2026 Organization Announcements Platform. Built for efficient communication.
        </div>
      </footer>
    </div>
  );
}
