"use client";

/**
 * User Context
 * Extended user profile data beyond Firebase auth
 * Stores preferences, progress, and app-specific user state
 */

import React, { createContext, useContext, useState, useCallback } from "react";

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

interface UserContextType {
  profile: UserProfile | null;
  updateProfile: (updates: Partial<UserProfile>) => void;
  updatePreferences: (prefs: Partial<UserProfile["preferences"]>) => void;
  updateStats: (stats: Partial<UserProfile["stats"]>) => void;
  setProfile: (profile: UserProfile | null) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [profile, setProfileState] = useState<UserProfile | null>(null);

  const updateProfile = useCallback((updates: Partial<UserProfile>) => {
    setProfileState((prev) => (prev ? { ...prev, ...updates } : null));
  }, []);

  const updatePreferences = useCallback((prefs: Partial<UserProfile["preferences"]>) => {
    setProfileState((prev) =>
      prev ? { ...prev, preferences: { ...prev.preferences, ...prefs } } : null
    );
  }, []);

  const updateStats = useCallback((stats: Partial<UserProfile["stats"]>) => {
    setProfileState((prev) =>
      prev ? { ...prev, stats: { ...prev.stats, ...stats } } : null
    );
  }, []);

  const setProfile = useCallback((newProfile: UserProfile | null) => {
    setProfileState(newProfile);
  }, []);

  return (
    <UserContext.Provider
      value={{ profile, updateProfile, updatePreferences, updateStats, setProfile }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
}
