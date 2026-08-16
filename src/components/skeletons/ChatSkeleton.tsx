"use client";

/**
 * Chat Skeleton Loader
 * Loading state for AI mentor conversation
 */

export function ChatSkeleton() {
  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4 animate-pulse">
      {/* AI message */}
      <div className="flex gap-3">
        <div className="w-8 h-8 bg-navy-200 dark:bg-navy-700 rounded-lg shrink-0" />
        <div className="max-w-[80%] space-y-2">
          <div className="h-3 bg-navy-200 dark:bg-navy-700 rounded-lg w-64" />
          <div className="h-3 bg-navy-200 dark:bg-navy-700 rounded-lg w-48" />
          <div className="h-3 bg-navy-100 dark:bg-navy-800 rounded-lg w-56" />
        </div>
      </div>

      {/* User message */}
      <div className="flex gap-3 flex-row-reverse">
        <div className="w-8 h-8 bg-navy-300 dark:bg-navy-600 rounded-lg shrink-0" />
        <div className="max-w-[80%] space-y-2">
          <div className="h-3 bg-navy-200 dark:bg-navy-700 rounded-lg w-52 ml-auto" />
          <div className="h-3 bg-navy-200 dark:bg-navy-700 rounded-lg w-40 ml-auto" />
        </div>
      </div>

      {/* AI message */}
      <div className="flex gap-3">
        <div className="w-8 h-8 bg-navy-200 dark:bg-navy-700 rounded-lg shrink-0" />
        <div className="max-w-[80%] space-y-2">
          <div className="h-3 bg-navy-200 dark:bg-navy-700 rounded-lg w-72" />
          <div className="h-3 bg-navy-100 dark:bg-navy-800 rounded-lg w-60" />
          <div className="h-3 bg-navy-100 dark:bg-navy-800 rounded-lg w-44" />
        </div>
      </div>
    </div>
  );
}
