"use client";

/**
 * Profile Screen — Sprint 2
 * User settings with Firebase logout, preferences, and accessibility
 */

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { useAuthGuard } from "@/hooks/useAuthGuard";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { EmptyState } from "@/components/empty-states/EmptyState";
import { cn } from "@/lib/utils";
import {
  User, Mail, Globe, Bell, Shield, LogOut, Loader2, Camera, Check
} from "lucide-react";

export default function ProfilePage() {
  const { isLoading: authLoading, isAuthenticated } = useAuthGuard({ requireAuth: true, redirectTo: "/welcome" });
  const { user, logout } = useAuth();
  const router = useRouter();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [savedMessage, setSavedMessage] = useState("");

  const handleLogout = async () => {
    setIsLoggingOut(true);
    const result = await logout();
    setIsLoggingOut(false);
    if (result.success) {
      router.push("/welcome");
    }
  };

  const handleSave = () => {
    setSavedMessage("Profile updated successfully");
    setTimeout(() => setSavedMessage(""), 3000);
  };

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-surface dark:bg-navy-900">
        <Loader2 className="w-8 h-8 animate-spin text-emerald" />
      </div>
    );
  }

  if (!isAuthenticated || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-surface dark:bg-navy-900">
        <EmptyState
          icon={User}
          title="Not signed in"
          description="Please sign in to view your profile."
          action={{ label: "Sign In", onClick: () => router.push("/signin") }}
        />
      </div>
    );
  }

  const displayName = user.displayName || "User";
  const email = user.email || "";
  const initial = displayName.charAt(0).toUpperCase();

  const preferences = [
    { label: "Email Notifications", desc: "Receive weekly progress summaries", icon: Bell, enabled: true },
    { label: "AI Mentor Suggestions", desc: "Get proactive tips based on your goals", icon: Shield, enabled: true },
    { label: "Weekly Digest", desc: "Sunday roundup of your learning activity", icon: Mail, enabled: false },
  ];

  return (
    <div className="min-h-screen bg-surface dark:bg-navy-900">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-navy-900 dark:text-white mb-2">
            Profile
          </h1>
          <p className="text-navy-500 dark:text-navy-400">
            Manage your account and preferences.
          </p>
        </div>

        {/* Profile Header */}
        <Card variant="default" padding="lg" className="mb-6">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="w-20 h-20 bg-navy rounded-3xl flex items-center justify-center text-white text-3xl font-extrabold">
                {user.photoURL ? (
                  <img src={user.photoURL} alt={displayName} className="w-full h-full rounded-3xl object-cover" />
                ) : (
                  initial
                )}
              </div>
              <button
                className="absolute -bottom-1 -right-1 w-8 h-8 bg-emerald rounded-full flex items-center justify-center text-white shadow-sm hover:bg-emerald-600 transition-colors"
                aria-label="Change profile photo"
              >
                <Camera size={14} aria-hidden="true" />
              </button>
            </div>
            <div>
              <h2 className="text-xl font-bold text-navy-900 dark:text-white">{displayName}</h2>
              <p className="text-sm text-navy-500 dark:text-navy-400">{email}</p>
              <p className="text-xs text-navy-400 dark:text-navy-500 mt-1">Member since July 2026</p>
            </div>
          </div>
        </Card>

        {/* Personal Information */}
        <Card variant="default" padding="lg" className="mb-6">
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
            <CardDescription>Update your basic details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {savedMessage && (
              <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 text-emerald-600 dark:text-emerald-400 text-sm font-medium flex items-center gap-2">
                <Check size={16} aria-hidden="true" />
                {savedMessage}
              </div>
            )}
            <Input
              label="Full Name"
              defaultValue={displayName}
              icon={<User size={18} aria-hidden="true" />}
            />
            <Input
              label="Email"
              type="email"
              defaultValue={email}
              icon={<Mail size={18} aria-hidden="true" />}
              disabled
            />
            <Input
              label="Country"
              defaultValue="United States"
              icon={<Globe size={18} aria-hidden="true" />}
            />
            <Button variant="secondary" size="md" className="mt-2" onClick={handleSave}>
              Save Changes
            </Button>
          </CardContent>
        </Card>

        {/* Preferences */}
        <Card variant="default" padding="lg" className="mb-6">
          <CardHeader>
            <CardTitle>Preferences</CardTitle>
            <CardDescription>Customize your experience</CardDescription>
          </CardHeader>
          <CardContent className="space-y-1">
            {preferences.map((pref) => {
              const Icon = pref.icon;
              return (
                <div
                  key={pref.label}
                  className="flex items-center justify-between p-3 rounded-xl hover:bg-navy-50 dark:hover:bg-navy-800 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-navy-50 dark:bg-navy-800 flex items-center justify-center">
                      <Icon size={18} className="text-navy-500 dark:text-navy-400" aria-hidden="true" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-navy-900 dark:text-white">{pref.label}</p>
                      <p className="text-xs text-navy-400 dark:text-navy-500">{pref.desc}</p>
                    </div>
                  </div>
                  <button
                    className={cn(
                      "w-11 h-6 rounded-full relative transition-colors",
                      pref.enabled ? "bg-emerald" : "bg-navy-200 dark:bg-navy-700"
                    )}
                    aria-label={`Toggle ${pref.label}`}
                    aria-pressed={pref.enabled}
                    role="switch"
                  >
                    <div
                      className={cn(
                        "absolute top-1 w-4 h-4 bg-white rounded-full shadow-sm transition-transform",
                        pref.enabled ? "right-1" : "left-1"
                      )}
                      aria-hidden="true"
                    />
                  </button>
                </div>
              );
            })}
          </CardContent>
        </Card>

        {/* Logout */}
        {showLogoutConfirm ? (
          <Card variant="default" padding="lg" className="border-red-200 dark:border-red-900 mb-6">
            <CardContent className="pt-4">
              <p className="text-sm text-navy-700 dark:text-navy-300 mb-4">
                Are you sure you want to sign out?
              </p>
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  size="md"
                  className="flex-1"
                  onClick={() => setShowLogoutConfirm(false)}
                >
                  Cancel
                </Button>
                <Button
                  variant="primary"
                  size="md"
                  className="flex-1 bg-red-600 hover:bg-red-700 text-white"
                  onClick={handleLogout}
                  isLoading={isLoggingOut}
                >
                  Sign Out
                </Button>
              </div>
            </CardContent>
          </Card>
        ) : (
          <Button
            variant="outline"
            size="lg"
            fullWidth
            className="text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700 dark:text-red-400 dark:border-red-900 dark:hover:bg-red-900/20"
            onClick={() => setShowLogoutConfirm(true)}
          >
            <LogOut size={18} className="mr-2" aria-hidden="true" />
            Sign Out
          </Button>
        )}
      </div>
    </div>
  );
}

