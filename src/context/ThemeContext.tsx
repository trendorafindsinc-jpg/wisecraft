"use client";

/**
 * Theme Context
 * Manages dark/light mode with system preference detection
 * Persists choice to localStorage
 */

import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
import type { Theme } from "@/types";

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
  resolvedTheme: Theme; // actual applied theme (respects system preference)
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const STORAGE_KEY = "wisecraft-theme";

function getSystemTheme(): Theme {
  if (typeof window === "undefined") return "light";
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>("light");
  const [resolvedTheme, setResolvedTheme] = useState<Theme>("light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem(STORAGE_KEY) as Theme | "system" | null;
    if (saved && saved !== "system") {
      setThemeState(saved);
      setResolvedTheme(saved);
      document.documentElement.classList.toggle("dark", saved === "dark");
    } else {
      const system = getSystemTheme();
      setThemeState(saved || "system");
      setResolvedTheme(system);
      document.documentElement.classList.toggle("dark", system === "dark");
    }

    // Listen for system preference changes
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handler = (e: MediaQueryListEvent) => {
      const saved = localStorage.getItem(STORAGE_KEY) as Theme | "system" | null;
      if (!saved || saved === "system") {
        const newTheme = e.matches ? "dark" : "light";
        setResolvedTheme(newTheme);
        document.documentElement.classList.toggle("dark", newTheme === "dark");
      }
    };
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  const setTheme = useCallback((newTheme: Theme) => {
    setThemeState(newTheme);
    localStorage.setItem(STORAGE_KEY, newTheme);
    const resolved = newTheme === "system" ? getSystemTheme() : newTheme;
    setResolvedTheme(resolved);
    document.documentElement.classList.toggle("dark", resolved === "dark");
  }, []);

  const toggleTheme = useCallback(() => {
    const newTheme = resolvedTheme === "light" ? "dark" : "light";
    setTheme(newTheme);
  }, [resolvedTheme, setTheme]);

  if (!mounted) {
    return (
      <div style={{ visibility: "hidden" }} aria-hidden="true">
        {children}
      </div>
    );
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme, resolvedTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
