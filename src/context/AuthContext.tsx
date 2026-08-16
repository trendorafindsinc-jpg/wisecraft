"use client";

/**
 * Auth Context
 * Global authentication state with Firebase integration
 * Provides user data, auth status, and auth operations
 */

import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
import type { User as FirebaseUser } from "firebase/auth";
import {
  onAuthChange,
  signUpWithEmail,
  signInWithEmail,
  resetPassword,
  logOut,
  type AuthResult,
} from "@/lib/firebase/auth";

interface AuthContextType {
  user: FirebaseUser | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  signUp: (email: string, password: string, displayName: string) => Promise<AuthResult>;
  signIn: (email: string, password: string) => Promise<AuthResult>;
  forgotPassword: (email: string) => Promise<AuthResult>;
  logout: () => Promise<AuthResult>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthChange((firebaseUser) => {
      setUser(firebaseUser);
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const signUp = useCallback(
    async (email: string, password: string, displayName: string): Promise<AuthResult> => {
      setIsLoading(true);
      const result = await signUpWithEmail(email, password, displayName);
      setIsLoading(false);
      return result;
    },
    []
  );

  const signIn = useCallback(async (email: string, password: string): Promise<AuthResult> => {
    setIsLoading(true);
    const result = await signInWithEmail(email, password);
    setIsLoading(false);
    return result;
  }, []);

  const forgotPassword = useCallback(async (email: string): Promise<AuthResult> => {
    setIsLoading(true);
    const result = await resetPassword(email);
    setIsLoading(false);
    return result;
  }, []);

  const logout = useCallback(async (): Promise<AuthResult> => {
    setIsLoading(true);
    const result = await logOut();
    setIsLoading(false);
    return result;
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: !!user,
        signUp,
        signIn,
        forgotPassword,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
