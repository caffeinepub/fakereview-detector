/**
 * Badge — displays a coloured verdict pill (Real / Fake / Suspicious).
 *
 * Uses the VERDICT_CONFIG from types to keep colours consistent across all
 * components that render a verdict label.
 */

import { cn } from "@/lib/utils";
import type { Verdict } from "../types";
import { VERDICT_CONFIG } from "../types";

interface BadgeProps {
  verdict: Verdict;
  /** Render as a larger pill (default: compact) */
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function VerdictBadge({ verdict, size = "md", className }: BadgeProps) {
  const cfg = VERDICT_CONFIG[verdict];

  const sizeClasses = {
    sm: "px-2 py-0.5 text-xs gap-1",
    md: "px-2.5 py-1 text-xs gap-1.5",
    lg: "px-3 py-1.5 text-sm gap-2",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center font-semibold rounded-md select-none",
        cfg.bgClass,
        cfg.colorClass,
        sizeClasses[size],
        className,
      )}
      data-ocid={`badge-${verdict.toLowerCase()}`}
    >
      {/* Dot indicator */}
      <span
        className={cn("w-1.5 h-1.5 rounded-full flex-shrink-0", cfg.dotClass)}
        aria-hidden
      />
      {cfg.label}
    </span>
  );
}

export default VerdictBadge;
