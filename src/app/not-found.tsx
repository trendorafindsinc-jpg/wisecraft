"use client";

/**
 * 404 Not Found Page
 * Custom error page for unmatched routes
 */

import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { ArrowLeft, Compass } from "lucide-react";

export default function NotFoundPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-surface dark:bg-navy-900 px-4">
      <div className="w-20 h-20 bg-navy-50 dark:bg-navy-800 rounded-3xl flex items-center justify-center mb-6">
        <Compass size={36} className="text-navy-400 dark:text-navy-500" />
      </div>
      <h1 className="text-4xl sm:text-5xl font-extrabold text-navy-900 dark:text-white mb-3">
        404
      </h1>
      <p className="text-lg text-navy-500 dark:text-navy-400 mb-2 text-center">
        Page not found
      </p>
      <p className="text-sm text-navy-400 dark:text-navy-500 mb-8 text-center max-w-sm">
        The page you are looking for does not exist or has been moved.
      </p>
      <Link href="/dashboard">
        <Button variant="primary" size="md">
          <ArrowLeft size={18} className="mr-2" />
          Back to Dashboard
        </Button>
      </Link>
    </div>
  );
}
