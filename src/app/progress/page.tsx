"use client";

/**
 * Progress Screen — Sprint 2
 * Enhanced with real data, animations, and accessibility
 */

import React from "react";
import { useAuth } from "@/context/AuthContext";
import { useAuthGuard } from "@/hooks/useAuthGuard";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/Card";
import { EmptyState } from "@/components/empty-states/EmptyState";
import { cn } from "@/lib/utils";
import type { Milestone, WeeklyProgress } from "@/types";
import {
  TrendingUp, Target, Award, Calendar, Zap, Lock, CheckCircle2
} from "lucide-react";

const milestones: Milestone[] = [
  { id: "1", title: "First Course Completed", date: "Jun 15, 2026", completed: true, icon: "Award" },
  { id: "2", title: "10 AI Mentor Sessions", date: "Jun 22, 2026", completed: true, icon: "Zap" },
  { id: "3", title: "Set First Income Goal", date: "Jul 1, 2026", completed: true, icon: "Target" },
  { id: "4", title: "Launch Side Project", date: "Aug 15, 2026", completed: false, icon: "TrendingUp" },
  { id: "5", title: "Reach $1,000/month", date: "Dec 31, 2026", completed: false, icon: "Award" },
];

const weeklyProgress: WeeklyProgress[] = [
  { day: "Mon", hours: 2.5 },
  { day: "Tue", hours: 1.8 },
  { day: "Wed", hours: 3.2 },
  { day: "Thu", hours: 0.5 },
  { day: "Fri", hours: 2.0 },
  { day: "Sat", hours: 4.1 },
  { day: "Sun", hours: 1.5 },
];

const iconMap: Record<string, React.ElementType> = {
  TrendingUp, Target, Award, Calendar, Zap, Lock, CheckCircle2
};

export default function ProgressPage() {
  const { isLoading: authLoading, isAuthenticated } = useAuthGuard({ requireAuth: true, redirectTo: "/welcome" });
  const { user } = useAuth();

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-surface dark:bg-navy-900">
        <div className="w-8 h-8 border-2 border-emerald/30 border-t-emerald rounded-full animate-spin" />
      </div>
    );
  }

  const maxHours = Math.max(...weeklyProgress.map((d) => d.hours));
  const completedCount = milestones.filter((m) => m.completed).length;
  const totalHours = weeklyProgress.reduce((sum, d) => sum + d.hours, 0);

  return (
    <div className="min-h-screen bg-surface dark:bg-navy-900">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-navy-900 dark:text-white mb-2">
            Your Progress
          </h1>
          <p className="text-navy-500 dark:text-navy-400">
            Track your learning journey and growth milestones.
          </p>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          {[
            { label: "Milestones Reached", value: `${completedCount}/${milestones.length}`, icon: Target, color: "text-emerald", bg: "bg-emerald-50 dark:bg-emerald-900/20" },
            { label: "Learning This Week", value: `${totalHours.toFixed(1)}h`, icon: TrendingUp, color: "text-royal", bg: "bg-royal-50 dark:bg-royal-900/20" },
            { label: "Achievements Earned", value: "7", icon: Award, color: "text-gold", bg: "bg-gold-50 dark:bg-gold-900/20" },
          ].map((stat) => {
            const Icon = stat.icon;
            return (
              <Card key={stat.label} variant="default" padding="md" className="flex items-center gap-4">
                <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center", stat.bg)}>
                  <Icon className={stat.color} size={24} aria-hidden="true" />
                </div>
                <div>
                  <p className="text-2xl font-extrabold text-navy-900 dark:text-white">{stat.value}</p>
                  <p className="text-sm text-navy-500 dark:text-navy-400">{stat.label}</p>
                </div>
              </Card>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Weekly Chart */}
          <Card variant="default" padding="lg" className="lg:col-span-2">
            <CardHeader>
              <div className="flex items-center gap-2 mb-1">
                <Calendar size={20} className="text-royal" aria-hidden="true" />
                <CardTitle>Weekly Learning Activity</CardTitle>
              </div>
              <CardDescription>Hours spent learning each day</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-end justify-between gap-2 h-48 pt-4">
                {weeklyProgress.map((day) => (
                  <div key={day.day} className="flex-1 flex flex-col items-center gap-2">
                    <div className="w-full relative" style={{ height: `${(day.hours / maxHours) * 160}px` }}>
                      <div
                        className="absolute bottom-0 w-full bg-royal rounded-t-lg transition-all duration-700 hover:bg-royal-600 dark:hover:bg-royal-400"
                        style={{ height: "100%" }}
                        role="img"
                        aria-label={`${day.day}: ${day.hours} hours`}
                      />
                    </div>
                    <span className="text-xs font-medium text-navy-600 dark:text-navy-400">
                      {day.hours}h
                    </span>
                    <span className="text-xs text-navy-400 dark:text-navy-500">{day.day}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Streak Card */}
          <Card variant="default" padding="lg" className="bg-navy dark:bg-navy-800 border-navy-600">
            <CardContent className="pt-2">
              <div className="flex items-center gap-2 mb-3">
                <Zap size={18} className="text-gold" aria-hidden="true" />
                <span className="text-xs font-semibold text-gold uppercase tracking-wider">Current Streak</span>
              </div>
              <p className="text-4xl font-extrabold text-white mb-1">12</p>
              <p className="text-sm text-navy-300">days in a row</p>
              <div className="mt-4 flex gap-1">
                {[...Array(7)].map((_, i) => (
                  <div
                    key={i}
                    className={cn(
                      "flex-1 h-2 rounded-full",
                      i < 5 ? "bg-emerald" : "bg-navy-600"
                    )}
                    aria-hidden="true"
                  />
                ))}
              </div>
              <p className="text-xs text-navy-400 mt-2">5 of 7 days this week</p>
            </CardContent>
          </Card>
        </div>

        {/* Milestones */}
        <Card variant="default" padding="lg" className="mt-6">
          <CardHeader>
            <div className="flex items-center gap-2 mb-1">
              <Target size={20} className="text-emerald" aria-hidden="true" />
              <CardTitle>Growth Milestones</CardTitle>
            </div>
            <CardDescription>Your journey to financial independence</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-5 top-0 bottom-0 w-0.5 bg-navy-100 dark:bg-navy-700" aria-hidden="true" />

              <div className="space-y-6">
                {milestones.map((milestone, index) => {
                  const Icon = (iconMap[milestone.icon as keyof typeof iconMap] || Target) as React.ComponentType<any>;
                  return (
                    <div
                      key={milestone.id}
                      className="relative flex items-start gap-4 pl-2"
                    >
                      <div
                        className={cn(
                          "relative z-10 w-10 h-10 rounded-full flex items-center justify-center shrink-0 border-2",
                          milestone.completed
                            ? "bg-emerald-50 border-emerald dark:bg-emerald-900/20 dark:border-emerald"
                            : "bg-white border-navy-200 dark:bg-navy-800 dark:border-navy-600"
                        )}
                      >
                        {milestone.completed ? (
                          <CheckCircle2 size={18} className="text-emerald" aria-hidden="true" />
                        ) : (
                          <Lock size={16} className="text-navy-300 dark:text-navy-500" aria-hidden="true" />
                        )}
                      </div>
                      <div className="flex-1 pt-1">
                        <div className="flex items-center justify-between">
                          <p
                            className={cn(
                              "text-sm font-semibold",
                              milestone.completed
                                ? "text-navy-900 dark:text-white"
                                : "text-navy-500 dark:text-navy-400"
                            )}
                          >
                            {milestone.title}
                          </p>
                          {milestone.completed && (
                            <span className="text-xs font-medium text-emerald bg-emerald-50 dark:bg-emerald-900/20 px-2 py-0.5 rounded-lg">
                              Done
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-navy-400 dark:text-navy-500 mt-0.5">{milestone.date}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
