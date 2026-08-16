"use client";

/**
 * Error Boundary Page
 * Catches runtime errors in the app segment
 */

import { useEffect } from "react";
import { Button } from "@/components/ui/Button";
import { AlertTriangle, RefreshCw } from "lucide-react";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log error to monitoring service
    console.error("Application error:", error);
  }, [error]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-surface dark:bg-navy-900 px-4">
      <div className="w-20 h-20 bg-red-50 dark:bg-red-900/20 rounded-3xl flex items-center justify-center mb-6">
        <AlertTriangle size={36} className="text-red-500" />
      </div>
      <h1 className="text-2xl sm:text-3xl font-extrabold text-navy-900 dark:text-white mb-3">
        Something went wrong
      </h1>
      <p className="text-navy-500 dark:text-navy-400 mb-2 text-center max-w-md">
        We encountered an unexpected error. Our team has been notified.
      </p>
      {error.digest && (
        <p className="text-xs text-navy-400 dark:text-navy-500 mb-8 font-mono">
          Error ID: {error.digest}
        </p>
      )}
      <Button variant="primary" size="md" onClick={reset}>
        <RefreshCw size={18} className="mr-2" />
        Try Again
      </Button>
    </div>
  );
}
