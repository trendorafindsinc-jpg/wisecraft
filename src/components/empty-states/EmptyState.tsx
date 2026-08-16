"use client";

/**
 * Reusable Empty State Component
 * Displays when no data is available with actionable CTA
 */

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import type { LucideIcon } from "lucide-react";

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  action?: {
    label: string;
    onClick: () => void;
  };
  className?: string;
}

export function EmptyState({ icon: Icon, title, description, action, className }: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center text-center py-12 px-4",
        className
      )}
    >
      <div className="w-16 h-16 bg-navy-50 dark:bg-navy-800 rounded-2xl flex items-center justify-center mb-4">
        <Icon size={28} className="text-navy-400 dark:text-navy-500" />
      </div>
      <h3 className="text-lg font-semibold text-navy-900 dark:text-white mb-2">{title}</h3>
      <p className="text-sm text-navy-500 dark:text-navy-400 max-w-xs mb-6 leading-relaxed">
        {description}
      </p>
      {action && (
        <Button variant="primary" size="sm" onClick={action.onClick}>
          {action.label}
        </Button>
      )}
    </div>
  );
}
