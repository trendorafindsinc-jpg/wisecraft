"use client";

/**
 * useAuthGuard Hook
 * Protects routes by redirecting unauthenticated users
 * Usage: Call at the top of protected page components
 */

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

interface UseAuthGuardOptions {
  redirectTo?: string;
  requireAuth?: boolean;
}

export function useAuthGuard(options: UseAuthGuardOptions = {}) {
  const { redirectTo = "/welcome", requireAuth = true } = options;
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading) {
      if (requireAuth && !isAuthenticated) {
        router.push(redirectTo);
      } else if (!requireAuth && isAuthenticated) {
        router.push("/dashboard");
      }
    }
  }, [isAuthenticated, isLoading, requireAuth, redirectTo, router]);

  return { isLoading, isAuthenticated };
}
