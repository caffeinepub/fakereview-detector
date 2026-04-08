/**
 * ConfidenceBar — animated progress bar showing classification confidence.
 *
 * Colour tracks verdict:
 *  REAL       → green
 *  FAKE       → red
 *  SUSPICIOUS → amber
 */

import { cn } from "@/lib/utils";
import type { Verdict } from "../types";

interface ConfidenceBarProps {
  /** 0–100 */
  value: number;
  verdict: Verdict;
  /** Show numeric percentage label */
  showLabel?: boolean;
  className?: string;
}

const TRACK_COLORS: Record<Verdict, string> = {
  REAL: "bg-green-500",
  FAKE: "bg-red-500",
  SUSPICIOUS: "bg-yellow-500",
};

const GLOW_COLORS: Record<Verdict, string> = {
  REAL: "shadow-[0_0_8px_oklch(0.65_0.18_145/0.5)]",
  FAKE: "shadow-[0_0_8px_oklch(0.65_0.19_22/0.5)]",
  SUSPICIOUS: "shadow-[0_0_8px_oklch(0.7_0.15_85/0.5)]",
};

export function ConfidenceBar({
  value,
  verdict,
  showLabel = true,
  className,
}: ConfidenceBarProps) {
  const clamped = Math.max(0, Math.min(100, value));

  return (
    <div className={cn("w-full", className)} data-ocid="confidence-bar">
      <div className="flex items-center justify-between mb-1.5">
        <span className="text-xs text-muted-foreground font-medium">
          Confidence
        </span>
        {showLabel && (
          <span className="text-xs font-bold text-foreground tabular-nums">
            {clamped}%
          </span>
        )}
      </div>
      {/* Track */}
      <div className="w-full h-2 rounded-full bg-muted overflow-hidden">
        {/* Fill */}
        <div
          className={cn(
            "h-full rounded-full transition-all duration-700 ease-out",
            TRACK_COLORS[verdict],
            GLOW_COLORS[verdict],
          )}
          style={{ width: `${clamped}%` }}
          role="progressbar"
          tabIndex={-1}
          aria-valuenow={clamped}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label={`Confidence: ${clamped}%`}
        />
      </div>
    </div>
  );
}

export default ConfidenceBar;
