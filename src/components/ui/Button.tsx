"use client";

/**
 * Reusable Button Component
 * Supports primary, secondary, outline, and ghost variants
 * Fully responsive with smooth hover transitions
 */

import React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
  fullWidth?: boolean;
}

export function Button({
  children,
  variant = "primary",
  size = "md",
  isLoading = false,
  fullWidth = false,
  className,
  disabled,
  ...props
}: ButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center font-semibold rounded-2xl transition-all duration-200 ease-out focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";

  const variants = {
    primary:
      "bg-navy text-white hover:bg-navy-700 focus:ring-navy-500 shadow-soft hover:shadow-card active:scale-[0.98]",
    secondary:
      "bg-emerald text-white hover:bg-emerald-600 focus:ring-emerald-500 shadow-soft hover:shadow-card active:scale-[0.98]",
    outline:
      "border-2 border-navy-200 text-navy hover:bg-navy-50 focus:ring-navy-300 dark:border-navy-600 dark:text-navy-100 dark:hover:bg-navy-800 active:scale-[0.98]",
    ghost:
      "text-navy-600 hover:bg-navy-50 focus:ring-navy-300 dark:text-navy-300 dark:hover:bg-navy-800 active:scale-[0.98]",
  };

  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
  };

  return (
    <button
      className={cn(
        baseStyles,
        variants[variant],
        sizes[size],
        fullWidth && "w-full",
        className
      )}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <>
          <svg
            className="animate-spin -ml-1 mr-2 h-4 w-4 text-current"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
            />
          </svg>
          Loading...
        </>
      ) : (
        children
      )}
    </button>
  );
}
