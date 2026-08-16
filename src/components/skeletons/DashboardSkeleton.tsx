"use client";

/**
 * Dashboard Skeleton Loader
 * Shimmer loading state for dashboard content
 */

export function DashboardSkeleton() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-pulse">
      {/* Header skeleton */}
      <div className="mb-8">
        <div className="h-8 bg-navy-200 dark:bg-navy-700 rounded-lg w-48 mb-2" />
        <div className="h-4 bg-navy-100 dark:bg-navy-800 rounded-lg w-72" />
      </div>

      {/* Stats row skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="bg-white dark:bg-navy-800 rounded-3xl p-6 shadow-soft border border-navy-100 dark:border-navy-700 flex items-center gap-4"
          >
            <div className="w-12 h-12 bg-navy-200 dark:bg-navy-700 rounded-xl" />
            <div className="flex-1">
              <div className="h-6 bg-navy-200 dark:bg-navy-700 rounded-lg w-16 mb-1" />
              <div className="h-3 bg-navy-100 dark:bg-navy-800 rounded-lg w-24" />
            </div>
          </div>
        ))}
      </div>

      {/* Modules skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="bg-white dark:bg-navy-800 rounded-3xl p-6 shadow-soft border border-navy-100 dark:border-navy-700 h-48"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 bg-navy-200 dark:bg-navy-700 rounded-xl" />
              <div className="w-5 h-5 bg-navy-100 dark:bg-navy-800 rounded" />
            </div>
            <div className="h-5 bg-navy-200 dark:bg-navy-700 rounded-lg w-32 mb-2" />
            <div className="h-3 bg-navy-100 dark:bg-navy-800 rounded-lg w-full mb-1" />
            <div className="h-3 bg-navy-100 dark:bg-navy-800 rounded-lg w-3/4" />
          </div>
        ))}
      </div>

      {/* Activity skeleton */}
      <div className="bg-white dark:bg-navy-800 rounded-3xl p-6 shadow-soft border border-navy-100 dark:border-navy-700">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-5 h-5 bg-navy-200 dark:bg-navy-700 rounded" />
          <div className="h-5 bg-navy-200 dark:bg-navy-700 rounded-lg w-32" />
        </div>
        <div className="space-y-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="flex items-center gap-4">
              <div className="w-10 h-10 bg-navy-100 dark:bg-navy-800 rounded-lg" />
              <div className="flex-1">
                <div className="h-4 bg-navy-200 dark:bg-navy-700 rounded-lg w-3/4 mb-1" />
                <div className="h-3 bg-navy-100 dark:bg-navy-800 rounded-lg w-20" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
