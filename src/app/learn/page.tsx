"use client";

/**
 * Learn Screen — Sprint 2
 * Course catalog with real data from knowledge service
 * Search, filter, and progress tracking
 */

import { useState, useEffect, useCallback, Suspense } from "react";
import { useAuth } from "@/context/AuthContext";
import { useAuthGuard } from "@/hooks/useAuthGuard";
import { useAsync } from "@/hooks/useAsync";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/Card";
import { CardSkeleton } from "@/components/skeletons/CardSkeleton";
import { EmptyState } from "@/components/empty-states/EmptyState";
import { ErrorState } from "@/components/empty-states/ErrorState";
import { searchCourses, getCategories } from "@/services/knowledge.service";
import { cn } from "@/lib/utils";
import type { Course, ContentCategory } from "@/types";
import {
  BookOpen, Clock, BarChart2, Lock, Search, SlidersHorizontal,
  ChevronRight, Star, Users, X
} from "lucide-react";

const levelColors = {
  beginner: "bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
  intermediate: "bg-gold-50 text-gold-700 dark:bg-gold-900/30 dark:text-gold-400",
  advanced: "bg-red-50 text-red-700 dark:bg-red-900/30 dark:text-red-400",
};

function LearnContent() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [categories, setCategories] = useState<ContentCategory[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedLevel, setSelectedLevel] = useState<string>("all");
  const [showFilters, setShowFilters] = useState(false);

  const loadCourses = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const [result, cats] = await Promise.all([
        searchCourses({
          query: searchQuery || undefined,
          category: selectedCategory !== "all" ? selectedCategory : undefined,
          level: selectedLevel !== "all" ? (selectedLevel as any) : undefined,
          limit: 20,
        }),
        getCategories(),
      ]);
      setCourses(result.items);
      setCategories(cats);
    } catch (err) {
      setError("Failed to load courses");
    } finally {
      setIsLoading(false);
    }
  }, [searchQuery, selectedCategory, selectedLevel]);

  useEffect(() => {
    loadCourses();
  }, [loadCourses]);

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedCategory("all");
    setSelectedLevel("all");
  };

  const hasFilters = searchQuery || selectedCategory !== "all" || selectedLevel !== "all";

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-navy-900 dark:text-white mb-2">
          Learn
        </h1>
        <p className="text-navy-500 dark:text-navy-400">
          Practical skills to build your financial future.
        </p>
      </div>

      {/* Search & Filters */}
      <div className="mb-6 space-y-3">
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-navy-400" aria-hidden="true" />
            <input
              type="text"
              placeholder="Search courses..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-2xl border border-navy-200 bg-white px-4 py-3 pl-11 text-navy-900 placeholder:text-navy-400 focus:border-royal-500 focus:outline-none focus:ring-2 focus:ring-royal-200 dark:border-navy-600 dark:bg-navy-800 dark:text-white dark:focus:border-royal-400 dark:focus:ring-royal-900 transition-all"
              aria-label="Search courses"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-navy-400 hover:text-navy-600"
                aria-label="Clear search"
              >
                <X size={16} />
              </button>
            )}
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={cn(
              "p-3 rounded-2xl border transition-all",
              showFilters
                ? "bg-navy-50 border-navy-300 text-navy-900 dark:bg-navy-800 dark:border-navy-600 dark:text-white"
                : "bg-white border-navy-200 text-navy-500 hover:bg-navy-50 dark:bg-navy-800 dark:border-navy-700 dark:text-navy-400 dark:hover:bg-navy-700"
            )}
            aria-label="Toggle filters"
            aria-expanded={showFilters}
          >
            <SlidersHorizontal size={20} aria-hidden="true" />
          </button>
        </div>

        {showFilters && (
          <div className="flex flex-wrap gap-2 p-3 rounded-2xl bg-white dark:bg-navy-800 border border-navy-100 dark:border-navy-700">
            {/* Category filters */}
            <button
              onClick={() => setSelectedCategory("all")}
              className={cn(
                "px-3 py-1.5 rounded-xl text-sm font-medium transition-all",
                selectedCategory === "all"
                  ? "bg-navy text-white"
                  : "bg-navy-50 text-navy-600 hover:bg-navy-100 dark:bg-navy-700 dark:text-navy-300 dark:hover:bg-navy-600"
              )}
            >
              All
            </button>
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={cn(
                  "px-3 py-1.5 rounded-xl text-sm font-medium transition-all",
                  selectedCategory === cat.id
                    ? "bg-navy text-white"
                    : "bg-navy-50 text-navy-600 hover:bg-navy-100 dark:bg-navy-700 dark:text-navy-300 dark:hover:bg-navy-600"
                )}
              >
                {cat.name}
              </button>
            ))}

            {/* Level filters */}
            <div className="w-full h-px bg-navy-100 dark:bg-navy-700 my-1" />
            {(["all", "beginner", "intermediate", "advanced"] as const).map((level) => (
              <button
                key={level}
                onClick={() => setSelectedLevel(level)}
                className={cn(
                  "px-3 py-1.5 rounded-xl text-sm font-medium transition-all capitalize",
                  selectedLevel === level
                    ? "bg-navy text-white"
                    : "bg-navy-50 text-navy-600 hover:bg-navy-100 dark:bg-navy-700 dark:text-navy-300 dark:hover:bg-navy-600"
                )}
              >
                {level}
              </button>
            ))}
          </div>
        )}

        {hasFilters && (
          <button
            onClick={clearFilters}
            className="text-sm text-royal-600 hover:text-royal-700 dark:text-royal-400 dark:hover:text-royal-300 font-medium transition-colors"
          >
            Clear all filters
          </button>
        )}
      </div>

      {/* Course Grid */}
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <CardSkeleton count={6} />
        </div>
      ) : error ? (
        <ErrorState title="Failed to load courses" description={error} onRetry={loadCourses} />
      ) : courses.length === 0 ? (
        <EmptyState
          icon={BookOpen}
          title="No courses found"
          description={hasFilters ? "Try adjusting your filters or search terms." : "No courses available at the moment."}
          action={hasFilters ? { label: "Clear Filters", onClick: clearFilters } : undefined}
        />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {courses.map((course) => (
            <Card
              key={course.id}
              variant={course.isLocked ? "outlined" : "default"}
              padding="md"
              className={cn(
                "group cursor-pointer",
                course.isLocked ? "opacity-60" : "hover:shadow-elevated transition-all duration-200"
              )}
              tabIndex={0}
              role="button"
              aria-label={`${course.title}, ${course.level}, ${course.duration}`}
              onKeyDown={(e) => e.key === "Enter" && !course.isLocked && console.log("Open course", course.id)}
            >
              <CardHeader>
                <div className="flex items-start justify-between mb-2">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-900/20 flex items-center justify-center">
                    {course.isLocked ? (
                      <Lock size={20} className="text-navy-400" aria-hidden="true" />
                    ) : (
                      <BookOpen size={20} className="text-emerald" aria-hidden="true" />
                    )}
                  </div>
                  <span className={cn("text-xs font-semibold px-2.5 py-1 rounded-lg", levelColors[course.level])}>
                    {course.level}
                  </span>
                </div>
                <CardTitle className="text-base group-hover:text-emerald transition-colors">{course.title}</CardTitle>
                <CardDescription>{course.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 text-xs text-navy-500 dark:text-navy-400">
                    <span className="flex items-center gap-1">
                      <Clock size={14} aria-hidden="true" />
                      {course.duration}
                    </span>
                    <span className="flex items-center gap-1">
                      <Star size={14} className="text-gold" aria-hidden="true" />
                      {course.rating}
                    </span>
                    <span className="flex items-center gap-1">
                      <Users size={14} aria-hidden="true" />
                      {course.enrolledCount.toLocaleString()}
                    </span>
                  </div>
                  <ChevronRight size={18} className="text-navy-300 group-hover:text-navy-600 dark:text-navy-600 dark:group-hover:text-navy-300 transition-colors" aria-hidden="true" />
                </div>
                {course.progress !== undefined && course.progress > 0 && !course.isLocked && (
                  <div className="mt-3">
                    <div className="flex justify-between text-xs text-navy-500 dark:text-navy-400 mb-1">
                      <span>Progress</span>
                      <span>{course.progress}%</span>
                    </div>
                    <div className="w-full h-1.5 bg-navy-100 dark:bg-navy-700 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-emerald rounded-full transition-all duration-500"
                        style={{ width: `${course.progress}%` }}
                        aria-valuenow={course.progress}
                        aria-valuemin={0}
                        aria-valuemax={100}
                        role="progressbar"
                      />
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

export default function LearnPage() {
  const { isLoading: authLoading } = useAuthGuard({ requireAuth: true, redirectTo: "/welcome" });

  if (authLoading) {
    return (
      <div className="min-h-screen bg-surface dark:bg-navy-900">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="h-8 bg-navy-200 dark:bg-navy-700 rounded-lg w-32 mb-8 animate-pulse" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <CardSkeleton count={6} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-surface dark:bg-navy-900">
      <Suspense fallback={
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <CardSkeleton count={6} />
          </div>
        </div>
      }>
        <LearnContent />
      </Suspense>
    </div>
  );
}
