/**
 * LoadingSpinner — centred animated spinner used as Suspense fallback and
 * inline async-state indicator throughout the dashboard.
 */

import { cn } from "@/lib/utils";

interface LoadingSpinnerProps {
  /** Show a full-viewport centred spinner (default: true) */
  fullPage?: boolean;
  /** Size variant */
  size?: "sm" | "md" | "lg";
  className?: string;
  label?: string;
}

const SIZE_CLASSES = {
  sm: "w-4 h-4 border",
  md: "w-8 h-8 border-2",
  lg: "w-12 h-12 border-2",
};

export function LoadingSpinner({
  fullPage = true,
  size = "md",
  className,
  label = "Loading…",
}: LoadingSpinnerProps) {
  const spinner = (
    <output
      aria-label={label}
      className={cn("flex flex-col items-center gap-3", className)}
    >
      <div
        className={cn(
          "rounded-full border-primary/30 border-t-primary animate-spin",
          SIZE_CLASSES[size],
        )}
      />
      {fullPage && <p className="text-sm text-muted-foreground">{label}</p>}
    </output>
  );

  if (fullPage) {
    return (
      <div
        className="min-h-screen bg-background flex items-center justify-center"
        data-ocid="loading-spinner-fullpage"
      >
        {spinner}
      </div>
    );
  }

  return <div data-ocid="loading-spinner">{spinner}</div>;
}

export default LoadingSpinner;
