/**
 * WISECRAFT TypeScript Types
 * Central type definitions for the application
 */

// ===== AUTH TYPES =====

export interface User {
  id: string;
  fullName: string;
  email: string;
  country: string;
  createdAt: string;
  photoURL?: string | null;
}

export interface SignUpFormData {
  fullName: string;
  email: string;
  password: string;
  country: string;
}

export interface SignInFormData {
  email: string;
  password: string;
}

export interface AuthResult {
  success: boolean;
  user?: User;
  error?: string;
}

// ===== FORM TYPES =====

export interface FormErrors {
  [key: string]: string;
}

// ===== THEME TYPES =====

export type Theme = "light" | "dark" | "system";

// ===== NAVIGATION TYPES =====

export interface NavItem {
  label: string;
  href: string;
  icon: string;
}

// ===== DASHBOARD TYPES =====

export interface DashboardCard {
  title: string;
  description: string;
  icon: string;
  href: string;
  color: string;
}

export interface QuickStat {
  label: string;
  value: string;
  icon: string;
  color: string;
  trend?: string;
  trendUp?: boolean;
}

export interface ActivityItem {
  id: string;
  title: string;
  description?: string;
  time: string;
  icon: string;
  type: "course" | "mentor" | "goal" | "achievement";
}

// ===== COURSE TYPES =====

export interface Course {
  id: string;
  title: string;
  description: string;
  category: string;
  level: "beginner" | "intermediate" | "advanced";
  duration: string;
  instructor: string;
  rating: number;
  enrolledCount: number;
  tags: string[];
  progress?: number;
  thumbnailUrl?: string;
  isLocked?: boolean;
}

export interface Module {
  id: string;
  title: string;
  description: string;
  order: number;
  lessons: Lesson[];
  duration: string;
}

export interface Lesson {
  id: string;
  title: string;
  type: "video" | "article" | "quiz" | "exercise";
  duration: string;
  isCompleted: boolean;
  content?: string;
  videoUrl?: string;
}

// ===== AI TYPES =====

export interface AIMessage {
  id: string;
  role: "user" | "assistant" | "system";
  content: string;
  timestamp: string;
}

export interface AIConversation {
  id: string;
  messages: AIMessage[];
  createdAt: string;
  updatedAt: string;
}

export interface AIRequest {
  prompt: string;
  context?: string;
  userId?: string;
  sessionId?: string;
}

export interface AIResponse {
  content: string;
  suggestions?: string[];
  confidence?: number;
  metadata?: {
    model?: string;
    tokensUsed?: number;
    processingTime?: number;
  };
}

// ===== MENTOR TYPES =====

export interface MentorSession {
  id: string;
  userId: string;
  topic: string;
  messages: AIMessage[];
  createdAt: string;
  updatedAt: string;
  status: "active" | "paused" | "completed";
}

export interface MentorInsight {
  category: "strength" | "opportunity" | "recommendation" | "warning";
  title: string;
  description: string;
  priority: "high" | "medium" | "low";
}

// ===== KNOWLEDGE TYPES =====

export interface SearchQuery {
  query?: string;
  category?: string;
  level?: "beginner" | "intermediate" | "advanced";
  tags?: string[];
  limit?: number;
  offset?: number;
}

export interface SearchResult<T> {
  items: T[];
  total: number;
  hasMore: boolean;
  nextOffset?: number;
}

export interface ContentCategory {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
}

export interface TrendingTopic {
  id: string;
  title: string;
  category: string;
  engagement: number;
  thumbnailUrl?: string;
}

// ===== PROGRESS TYPES =====

export interface Milestone {
  id: string;
  title: string;
  description?: string;
  date: string;
  completed: boolean;
  icon?: string;
}

export interface WeeklyProgress {
  day: string;
  hours: number;
}

// ===== USER PROFILE TYPES =====

export interface UserProfile {
  uid: string;
  displayName: string | null;
  email: string | null;
  photoURL: string | null;
  country: string;
  onboardingComplete: boolean;
  preferences: {
    emailNotifications: boolean;
    aiMentorSuggestions: boolean;
    weeklyDigest: boolean;
  };
  stats: {
    skillsLearned: number;
    aiSessions: number;
    growthScore: number;
    hoursLearned: number;
  };
}
