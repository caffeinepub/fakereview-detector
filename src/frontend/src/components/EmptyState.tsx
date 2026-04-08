/**
 * EmptyState — rendered when a data list is empty.
 *
 * Provides a clear call-to-action so users know what to do next,
 * avoiding dead-end experiences.
 */

import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";
import { Button } from "./ui/button";

interface EmptyStateProps {
  /** Lucide icon to display */
  icon?: LucideIcon;
  title: string;
  description?: string;
  /** Primary action label */
  actionLabel?: string;
  /** Primary action handler */
  onAction?: () => void;
  className?: string;
}

export function EmptyState({
  icon: Icon,
  title,
  description,
  actionLabel,
  onAction,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center py-16 px-6 text-center",
        className,
      )}
      data-ocid="empty-state"
    >
      {Icon && (
        <div className="w-16 h-16 rounded-2xl bg-muted border border-border flex items-center justify-center mb-5">
          <Icon className="w-7 h-7 text-muted-foreground" aria-hidden />
        </div>
      )}
      <h3 className="font-display font-semibold text-foreground text-lg mb-2">
        {title}
      </h3>
      {description && (
        <p className="text-sm text-muted-foreground max-w-xs mb-6">
          {description}
        </p>
      )}
      {actionLabel && onAction && (
        <Button onClick={onAction} data-ocid="empty-state-cta">
          {actionLabel}
        </Button>
      )}
    </div>
  );
}

export default EmptyState;
