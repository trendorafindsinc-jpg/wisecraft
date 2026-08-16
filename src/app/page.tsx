"use client";

/**
 * Splash Screen — Sprint 2
 * Auto-redirects authenticated users to dashboard
 */

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import Image from "next/image";

export default function SplashPage() {
  const router = useRouter();
  const { isAuthenticated, isLoading } = useAuth();

  useEffect(() => {
    if (isLoading) return;

    const timer = setTimeout(() => {
      if (isAuthenticated) {
        router.push("/dashboard");
      } else {
        router.push("/welcome");
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, [isAuthenticated, isLoading, router]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white dark:bg-navy-900 animate-fade-in">
      <div className="animate-fade-in-up mb-6">
        <Image
          src="/logo.jpg"
          alt="WISECRAFT"
          width={140}
          height={140}
          className="rounded-3xl object-contain shadow-card"
          priority
        />
      </div>

      <h1 className="text-navy font-extrabold text-3xl sm:text-4xl tracking-[0.2em] mb-2 animate-fade-in-up animation-delay-200">
        WISECRAFT
      </h1>

      <p className="text-emerald font-medium text-lg sm:text-xl tracking-widest mb-4 animate-fade-in-up animation-delay-400">
        Learn. Build. Prosper.
      </p>

      <p className="text-navy-400 dark:text-navy-500 text-sm tracking-wide animate-fade-in-up animation-delay-600">
        Powered by Trendorafinds
      </p>

      <div className="mt-8 animate-fade-in-up animation-delay-800">
        <div className="w-8 h-8 border-2 border-emerald/30 border-t-emerald rounded-full animate-spin" aria-hidden="true" />
      </div>
    </div>
  );
}
