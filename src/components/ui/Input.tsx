"use client";

/**
 * Reusable Input Component
 * Styled form input with label, error message, and icon support
 */

import React, { forwardRef } from "react";
import { cn } from "@/lib/utils";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, icon, className, ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium text-navy-700 dark:text-navy-200 mb-1.5">
            {label}
          </label>
        )}
        <div className="relative">
          {icon && (
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-navy-400 dark:text-navy-400">
              {icon}
            </div>
          )}
          <input
            ref={ref}
            className={cn(
              "w-full rounded-2xl border border-navy-200 bg-white px-4 py-3.5 text-navy-900 placeholder:text-navy-400",
              "transition-all duration-200 ease-out",
              "focus:border-royal-500 focus:outline-none focus:ring-2 focus:ring-royal-200",
              "dark:border-navy-600 dark:bg-navy-800 dark:text-white dark:placeholder:text-navy-500",
              "dark:focus:border-royal-400 dark:focus:ring-royal-900",
              icon && "pl-11",
              error && "border-red-400 focus:border-red-500 focus:ring-red-200",
              className
            )}
            {...props}
          />
        </div>
        {error && (
          <p className="mt-1.5 text-sm text-red-500 font-medium">{error}</p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";
