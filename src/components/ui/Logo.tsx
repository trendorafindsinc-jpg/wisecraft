"use client";

/**
 * WISECRAFT Logo Component
 * Renders the official logo image with consistent sizing
 */

import React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

export interface LogoProps {
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
  showText?: boolean;
}

const sizeMap = {
  sm: { width: 32, height: 32 },
  md: { width: 48, height: 48 },
  lg: { width: 64, height: 64 },
  xl: { width: 96, height: 96 },
};

export function Logo({ size = "md", className, showText = false }: LogoProps) {
  const { width, height } = sizeMap[size];

  return (
    <div className={cn("flex items-center gap-3", className)}>
      <Image
        src="/logo.jpg"
        alt="WISECRAFT Logo"
        width={width}
        height={height}
        className="rounded-2xl object-contain"
        priority
      />
      {showText && (
        <span className="font-extrabold text-navy-900 dark:text-white text-lg tracking-wide">
          WISECRAFT
        </span>
      )}
    </div>
  );
}
