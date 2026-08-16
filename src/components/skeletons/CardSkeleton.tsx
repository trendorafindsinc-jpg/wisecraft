"use client";

/**
 * Reusable Card Skeleton Loader
 * Used for course cards, stat cards, and content cards
 */

import { cn } from "@/lib/utils";

interface CardSkeletonProps {
  count?: number;
  className?: string;
  variant?: "default" | "horizontal" | "compact";
}

export function CardSkeleton({ count = 1, className, variant = "default" }: CardSkeletonProps) {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className={cn(
            "bg-white dark:bg-navy-800 rounded-3xl shadow-soft border border-navy-100 dark:border-navy-700 animate-pulse",
            variant === "horizontal" && "flex items-center gap-4 p-4",
            variant === "default" && "p-6",
            variant === "compact" && "p-4",
            className
          )}
        >
          {variant === "horizontal" ? (
            <>
              <div className="w-12 h-12 bg-navy-200 dark:bg-navy-700 rounded-xl shrink-0" />
              <div className="flex-1 min-w-0">
                <div className="h-5 bg-navy-200 dark:bg-navy-700 rounded-lg w-3/4 mb-2" />
                <div className="h-3 bg-navy-100 dark:bg-navy-800 rounded-lg w-1/2" />
              </div>
            </>
          ) : (
            <>
              <div className="flex items-start justify-between mb-4">
                <div className="w-10 h-10 bg-navy-200 dark:bg-navy-700 rounded-xl" />
                <div className="h-5 bg-navy-100 dark:bg-navy-800 rounded-lg w-16" />
              </div>
              <div className="h-5 bg-navy-200 dark:bg-navy-700 rounded-lg w-3/4 mb-2" />
              <div className="h-3 bg-navy-100 dark:bg-navy-800 rounded-lg w-full mb-1" />
              <div className="h-3 bg-navy-100 dark:bg-navy-800 rounded-lg w-2/3" />
            </>
          )}
        </div>
      ))}
    </>
  );
}
