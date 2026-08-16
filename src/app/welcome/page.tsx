"use client";

/**
 * Welcome Screen — Sprint 2
 * Enhanced with auth redirect for logged-in users
 */

import Link from "next/link";
import Image from "next/image";
import { useAuthGuard } from "@/hooks/useAuthGuard";
import { Button } from "@/components/ui/Button";
import { Loader2, ArrowRight, BookOpen, MessageSquare, TrendingUp } from "lucide-react";

const features = [
  { label: "Learn Skills", desc: "Practical, hands-on courses", icon: BookOpen },
  { label: "AI Mentor", desc: "Personalized 24/7 guidance", icon: MessageSquare },
  { label: "Grow Income", desc: "Real income strategies", icon: TrendingUp },
];

export default function WelcomePage() {
  const { isLoading } = useAuthGuard({ requireAuth: false, redirectTo: "/dashboard" });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-surface dark:bg-navy-900">
        <Loader2 className="w-8 h-8 animate-spin text-emerald" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-surface dark:bg-navy-900">
      <div className="absolute top-0 left-0 right-0 h-64 bg-navy rounded-b-[40px]" />

      <div className="relative flex-1 flex flex-col items-center justify-center px-6 py-12">
        <div className="mb-6 animate-fade-in-up">
          <Image
            src="/logo.jpg"
            alt="WISECRAFT"
            width={80}
            height={80}
            className="rounded-2xl object-contain shadow-card"
            priority
          />
        </div>

        <h1 className="text-white font-extrabold text-3xl sm:text-4xl text-center mb-4 leading-tight">
          Build Your Future
          <br />
          <span className="text-emerald">With AI</span>
        </h1>

        <p className="text-navy-200 text-center text-base sm:text-lg max-w-md mb-10 leading-relaxed px-4">
          WISECRAFT helps you learn practical skills, discover opportunities, and grow your income with personalized AI guidance.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full max-w-lg mb-10">
          {features.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.label}
                className="bg-white dark:bg-navy-800 rounded-2xl p-4 text-center shadow-soft border border-navy-100 dark:border-navy-700"
              >
                <div className="w-10 h-10 bg-emerald-50 dark:bg-emerald-900/20 rounded-xl flex items-center justify-center mx-auto mb-2">
                  <Icon size={20} className="text-emerald" aria-hidden="true" />
                </div>
                <p className="font-semibold text-navy-900 dark:text-white text-sm">{item.label}</p>
                <p className="text-navy-400 dark:text-navy-400 text-xs mt-1">{item.desc}</p>
              </div>
            );
          })}
        </div>

        <div className="w-full max-w-sm space-y-3">
          <Link href="/signup" className="block">
            <Button variant="primary" size="lg" fullWidth>
              Get Started
              <ArrowRight size={20} className="ml-2" aria-hidden="true" />
            </Button>
          </Link>

          <Link href="/signin" className="block">
            <Button variant="outline" size="lg" fullWidth>
              Sign In
            </Button>
          </Link>
        </div>

        <p className="text-navy-400 dark:text-navy-500 text-xs text-center mt-8 max-w-xs">
          By continuing you agree to the{" "}
          <Link href="#" className="underline hover:text-navy-600 dark:hover:text-navy-300 transition-colors">
            Terms
          </Link>{" "}
          and{" "}
          <Link href="#" className="underline hover:text-navy-600 dark:hover:text-navy-300 transition-colors">
            Privacy Policy
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
