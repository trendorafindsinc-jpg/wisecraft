"use client";

/**
 * Navigation Bar — Sprint 2
 * Enhanced with auth state, user avatar, and accessibility
 */

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { useTheme } from "@/context/ThemeContext";
import { cn } from "@/lib/utils";
import {
  Menu, X, Sun, Moon, LayoutDashboard, BookOpen, MessageSquare,
  BarChart3, User, LogOut, ChevronDown, Loader2
} from "lucide-react";

const navLinks = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Learn", href: "/learn", icon: BookOpen },
  { label: "Mentor", href: "/mentor", icon: MessageSquare },
  { label: "Progress", href: "/progress", icon: BarChart3 },
];

export function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { theme, toggleTheme, resolvedTheme } = useTheme();
  const { user, isAuthenticated, isLoading, logout } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const hideNavPaths = ["/", "/welcome", "/signin", "/signup"];
  if (hideNavPaths.includes(pathname)) return null;

  const handleLogout = async () => {
    setIsLoggingOut(true);
    await logout();
    setIsLoggingOut(false);
    setUserMenuOpen(false);
    router.push("/welcome");
  };

  const userInitial = user?.displayName?.charAt(0).toUpperCase() || user?.email?.charAt(0).toUpperCase() || "U";

  return (
    <nav className="sticky top-0 z-50 w-full bg-white/80 dark:bg-navy-900/80 backdrop-blur-xl border-b border-navy-100 dark:border-navy-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/dashboard" className="flex items-center gap-2.5">
            <Image
              src="/logo.jpg"
              alt="WISECRAFT"
              width={36}
              height={36}
              className="rounded-xl object-contain"
              priority
            />
            <span className="font-bold text-navy-900 dark:text-white text-lg tracking-wide hidden sm:block">
              WISECRAFT
            </span>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200",
                    isActive
                      ? "bg-navy-50 text-navy-900 dark:bg-navy-800 dark:text-white"
                      : "text-navy-500 hover:text-navy-900 hover:bg-navy-50 dark:text-navy-400 dark:hover:text-white dark:hover:bg-navy-800"
                  )}
                  aria-current={isActive ? "page" : undefined}
                >
                  <Icon size={18} aria-hidden="true" />
                  {link.label}
                </Link>
              );
            })}
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center gap-2">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2.5 rounded-xl text-navy-500 hover:text-navy-900 hover:bg-navy-50 dark:text-navy-400 dark:hover:text-white dark:hover:bg-navy-800 transition-all duration-200"
              aria-label={`Switch to ${resolvedTheme === "light" ? "dark" : "light"} mode`}
              title={`Switch to ${resolvedTheme === "light" ? "dark" : "light"} mode`}
            >
              {resolvedTheme === "light" ? <Moon size={20} aria-hidden="true" /> : <Sun size={20} aria-hidden="true" />}
            </button>

            {/* User Menu (Desktop) */}
            {isAuthenticated && !isLoading && (
              <div className="hidden md:block relative">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center gap-2 p-1.5 pr-3 rounded-xl hover:bg-navy-50 dark:hover:bg-navy-800 transition-colors"
                  aria-expanded={userMenuOpen}
                  aria-haspopup="menu"
                >
                  <div className="w-8 h-8 bg-navy rounded-lg flex items-center justify-center text-white text-sm font-bold">
                    {user?.photoURL ? (
                      <img src={user.photoURL} alt="" className="w-full h-full rounded-lg object-cover" />
                    ) : (
                      userInitial
                    )}
                  </div>
                  <span className="text-sm font-medium text-navy-700 dark:text-navy-300 hidden lg:block max-w-[100px] truncate">
                    {user?.displayName || user?.email?.split("@")[0] || "User"}
                  </span>
                  <ChevronDown size={14} className={cn("text-navy-400 transition-transform", userMenuOpen && "rotate-180")} aria-hidden="true" />
                </button>

                {userMenuOpen && (
                  <>
                    <div className="fixed inset-0 z-10" onClick={() => setUserMenuOpen(false)} aria-hidden="true" />
                    <div
                      className="absolute right-0 mt-2 w-48 bg-white dark:bg-navy-800 rounded-2xl shadow-elevated border border-navy-100 dark:border-navy-700 py-2 z-20"
                      role="menu"
                    >
                      <Link
                        href="/profile"
                        className="flex items-center gap-2 px-4 py-2.5 text-sm text-navy-700 dark:text-navy-300 hover:bg-navy-50 dark:hover:bg-navy-700 transition-colors"
                        onClick={() => setUserMenuOpen(false)}
                        role="menuitem"
                      >
                        <User size={16} aria-hidden="true" />
                        Profile
                      </Link>
                      <button
                        onClick={handleLogout}
                        disabled={isLoggingOut}
                        className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                        role="menuitem"
                      >
                        {isLoggingOut ? (
                          <Loader2 size={16} className="animate-spin" aria-hidden="true" />
                        ) : (
                          <LogOut size={16} aria-hidden="true" />
                        )}
                        {isLoggingOut ? "Signing out..." : "Sign Out"}
                      </button>
                    </div>
                  </>
                )}
              </div>
            )}

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2.5 rounded-xl text-navy-500 hover:text-navy-900 hover:bg-navy-50 dark:text-navy-400 dark:hover:text-white dark:hover:bg-navy-800 transition-all duration-200"
              aria-label="Toggle menu"
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
            >
              {mobileOpen ? <X size={22} aria-hidden="true" /> : <Menu size={22} aria-hidden="true" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div
          id="mobile-menu"
          className="md:hidden border-t border-navy-100 dark:border-navy-800 bg-white dark:bg-navy-900"
        >
          <div className="px-4 py-3 space-y-1">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200",
                    isActive
                      ? "bg-navy-50 text-navy-900 dark:bg-navy-800 dark:text-white"
                      : "text-navy-500 hover:text-navy-900 hover:bg-navy-50 dark:text-navy-400 dark:hover:text-white dark:hover:bg-navy-800"
                  )}
                  aria-current={isActive ? "page" : undefined}
                >
                  <Icon size={20} aria-hidden="true" />
                  {link.label}
                </Link>
              );
            })}
            <div className="h-px bg-navy-100 dark:border-navy-700 my-2" aria-hidden="true" />
            <Link
              href="/profile"
              onClick={() => setMobileOpen(false)}
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-navy-500 hover:text-navy-900 hover:bg-navy-50 dark:text-navy-400 dark:hover:text-white dark:hover:bg-navy-800 transition-all"
            >
              <User size={20} aria-hidden="true" />
              Profile
            </Link>
            <button
              onClick={() => {
                setMobileOpen(false);
                handleLogout();
              }}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20 transition-all"
            >
              <LogOut size={20} aria-hidden="true" />
              Sign Out
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
