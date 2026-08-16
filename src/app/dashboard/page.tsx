"use client";

/**
 * Dashboard — Sprint 2
 * Enhanced with data fetching, skeletons, empty states, and quick actions
 * Protected route with auth guard
 */

import React, { useEffect, useState, Suspense } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { useAuthGuard } from "@/hooks/useAuthGuard";
import { useAsync } from "@/hooks/useAsync";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { DashboardSkeleton } from "@/components/skeletons/DashboardSkeleton";
import { EmptyState } from "@/components/empty-states/EmptyState";
import { ErrorState } from "@/components/empty-states/ErrorState";
import { getRecommendations, getTrendingTopics } from "@/services/knowledge.service";
import { cn } from "@/lib/utils";
import type { Course, TrendingTopic, ActivityItem } from "@/types";
import {
  BookOpen, MessageSquare, BarChart3, TrendingUp, Zap,
  ArrowRight, Lightbulb, Award, Clock, Target, Compass,
  Flame, ChevronRight, Sparkles
} from "lucide-react";

const quickActions = [
  { label: "Continue Learning", href: "/learn", icon: BookOpen, color: "bg-emerald-50 text-emerald dark:bg-emerald-900/20" },
  { label: "Ask AI Mentor", href: "/mentor", icon: MessageSquare, color: "bg-royal-50 text-royal dark:bg-royal-900/20" },
  { label: "View Progress", href: "/progress", icon: BarChart3, color: "bg-gold-50 text-gold dark:bg-gold-900/20" },
];

const recentActivity: ActivityItem[] = [
  { id: "1", title: "Completed: Introduction to Freelancing", time: "2 hours ago", icon: "Award", type: "achievement" },
  { id: "2", title: "AI Mentor: Business Model Review", time: "5 hours ago", icon: "Lightbulb", type: "mentor" },
  { id: "3", title: "Goal Set: Launch First Side Project", time: "1 day ago", icon: "Target", type: "goal" },
  { id: "4", title: "Started: Personal Finance Fundamentals", time: "2 days ago", icon: "Clock", type: "course" },
];

const activityIconMap: Record<string, React.ElementType> = {
  Award, Lightbulb, Target, Clock, Flame, Compass, Sparkles
};

function DashboardContent() {
  const { user } = useAuth();
  const [recommendations, setRecommendations] = useState<Course[]>([]);
  const [trending, setTrending] = useState<TrendingTopic[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadData() {
      try {
        setIsLoading(true);
        const [recs, trend] = await Promise.all([
          getRecommendations(user?.uid || "guest", 3),
          getTrendingTopics(3),
        ]);
        setRecommendations(recs);
        setTrending(trend);
      } catch (err) {
        setError("Failed to load dashboard data");
      } finally {
        setIsLoading(false);
      }
    }
    loadData();
  }, [user?.uid]);

  if (isLoading) return <DashboardSkeleton />;
  if (error) return <ErrorState title="Dashboard unavailable" description={error} onRetry={() => window.location.reload()} />;

  const displayName = user?.displayName || "there";

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Welcome Header */}
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-navy-900 dark:text-white mb-2">
          Good to see you, {displayName}
        </h1>
        <p className="text-navy-500 dark:text-navy-400">
          Here&apos;s your growth snapshot for today.
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        {[
          { label: "Skills Learned", value: "12", icon: BookOpen, color: "text-emerald", trend: "+3 this week", trendUp: true },
          { label: "AI Sessions", value: "48", icon: MessageSquare, color: "text-royal", trend: "+8 this week", trendUp: true },
          { label: "Growth Score", value: "78%", icon: TrendingUp, color: "text-gold", trend: "+5% this month", trendUp: true },
        ].map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.label} variant="default" padding="md" className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-navy-50 dark:bg-navy-800 flex items-center justify-center">
                <Icon className={stat.color} size={24} aria-hidden="true" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-2xl font-extrabold text-navy-900 dark:text-white">{stat.value}</p>
                <p className="text-sm text-navy-500 dark:text-navy-400">{stat.label}</p>
                {stat.trend && (
                  <p className={`text-xs font-medium mt-0.5 ${stat.trendUp ? "text-emerald" : "text-red-500"}`}>
                    {stat.trend}
                  </p>
                )}
              </div>
            </Card>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8">
        {quickActions.map((action) => {
          const Icon = action.icon;
          return (
            <Link key={action.href} href={action.href} className="group">
              <div className="flex items-center gap-3 p-4 rounded-2xl bg-white dark:bg-navy-800 border border-navy-100 dark:border-navy-700 shadow-soft hover:shadow-card transition-all duration-200">
                <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center", action.color)}>
                  <Icon size={20} aria-hidden="true" />
                </div>
                <span className="font-semibold text-sm text-navy-900 dark:text-white flex-1">{action.label}</span>
                <ChevronRight size={18} className="text-navy-300 group-hover:text-navy-600 dark:text-navy-600 dark:group-hover:text-navy-300 transition-colors" />
              </div>
            </Link>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Continue Learning */}
          <Card variant="default" padding="lg">
            <CardHeader>
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-2">
                  <BookOpen size={20} className="text-emerald" aria-hidden="true" />
                  <CardTitle>Continue Learning</CardTitle>
                </div>
                <Link href="/learn" className="text-sm font-medium text-royal-600 hover:text-royal-700 dark:text-royal-400 dark:hover:text-royal-300 transition-colors">
                  View all
                </Link>
              </div>
              <CardDescription>Pick up where you left off</CardDescription>
            </CardHeader>
            <CardContent>
              {recommendations.length > 0 ? (
                <div className="space-y-3">
                  {recommendations.map((course) => (
                    <Link key={course.id} href={`/learn`} className="group block">
                      <div className="flex items-center gap-4 p-3 rounded-xl hover:bg-navy-50 dark:hover:bg-navy-800 transition-colors">
                        <div className="w-12 h-12 rounded-xl bg-emerald-50 dark:bg-emerald-900/20 flex items-center justify-center shrink-0">
                          <BookOpen size={20} className="text-emerald" aria-hidden="true" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-navy-900 dark:text-white truncate group-hover:text-emerald transition-colors">
                            {course.title}
                          </p>
                          <p className="text-xs text-navy-400 dark:text-navy-500">{course.duration} · {course.level}</p>
                        </div>
                        <ChevronRight size={18} className="text-navy-300 group-hover:text-navy-600 dark:text-navy-600 dark:group-hover:text-navy-300 transition-colors shrink-0" />
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <EmptyState
                  icon={BookOpen}
                  title="No courses yet"
                  description="Start your first course to see it here."
                  action={{ label: "Browse Courses", onClick: () => {} }}
                />
              )}
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card variant="default" padding="lg">
            <CardHeader>
              <div className="flex items-center gap-2 mb-1">
                <Zap size={20} className="text-gold" aria-hidden="true" />
                <CardTitle>Recent Activity</CardTitle>
              </div>
              <CardDescription>Your latest actions and achievements</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-1">
                {recentActivity.map((activity) => {
                  const Icon = activityIconMap[activity.icon] || Award;
                  return (
                    <div
                      key={activity.id}
                      className="flex items-center gap-4 p-3 rounded-xl hover:bg-navy-50 dark:hover:bg-navy-800 transition-colors"
                    >
                      <div className="w-10 h-10 rounded-lg bg-navy-50 dark:bg-navy-800 flex items-center justify-center shrink-0">
                        <Icon size={18} className="text-navy-500 dark:text-navy-400" aria-hidden="true" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-navy-900 dark:text-white truncate">
                          {activity.title}
                        </p>
                        <p className="text-xs text-navy-400 dark:text-navy-500">{activity.time}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Trending */}
          <Card variant="default" padding="lg">
            <CardHeader>
              <div className="flex items-center gap-2 mb-1">
                <Flame size={20} className="text-gold" aria-hidden="true" />
                <CardTitle>Trending Now</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              {trending.length > 0 ? (
                <div className="space-y-3">
                  {trending.map((topic, i) => (
                    <div key={topic.id} className="flex items-start gap-3">
                      <span className="text-xs font-bold text-navy-300 dark:text-navy-600 mt-0.5">{String(i + 1).padStart(2, "0")}</span>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-navy-900 dark:text-white">{topic.title}</p>
                        <p className="text-xs text-navy-400 dark:text-navy-500">{topic.category} · {topic.engagement}% engagement</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <EmptyState
                  icon={Compass}
                  title="No trending topics"
                  description="Check back later for what's popular."
                />
              )}
            </CardContent>
          </Card>

          {/* Daily Tip */}
          <Card variant="default" padding="lg" className="bg-navy dark:bg-navy-800 border-navy-600">
            <CardContent className="pt-2">
              <div className="flex items-center gap-2 mb-3">
                <Sparkles size={18} className="text-gold" aria-hidden="true" />
                <span className="text-xs font-semibold text-gold uppercase tracking-wider">Daily Insight</span>
              </div>
              <p className="text-sm text-white leading-relaxed mb-3">
                "The best investment you can make is in yourself. Learning a new skill compounds over time just like compound interest."
              </p>
              <Link href="/mentor" className="inline-flex items-center gap-1 text-sm font-medium text-emerald hover:text-emerald-400 transition-colors">
                Discuss with AI Mentor <ArrowRight size={14} aria-hidden="true" />
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default function DashboardPage() {
  const { isLoading: authLoading } = useAuthGuard({ requireAuth: true, redirectTo: "/welcome" });

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-surface dark:bg-navy-900">
        <div className="w-8 h-8 border-2 border-emerald/30 border-t-emerald rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-surface dark:bg-navy-900">
      <Suspense fallback={<DashboardSkeleton />}>
        <DashboardContent />
      </Suspense>
    </div>
  );
}
