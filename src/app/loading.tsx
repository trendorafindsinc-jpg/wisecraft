/**
 * Global Loading State
 * Displayed while page content is loading
 */

export default function LoadingPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-surface dark:bg-navy-900">
      <div className="w-12 h-12 border-2 border-navy-200 dark:border-navy-700 border-t-emerald rounded-full animate-spin mb-4" />
      <p className="text-sm text-navy-500 dark:text-navy-400 font-medium">Loading...</p>
    </div>
  );
}
