/**
 * Pagination — page navigation controls for the review history table.
 *
 * Shows: ← Prev | page info | Next →
 * Disables buttons at boundaries.
 */

import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "./ui/button";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  totalCount: number;
  pageSize: number;
  onPageChange: (page: number) => void;
  className?: string;
}

export function Pagination({
  currentPage,
  totalPages,
  totalCount,
  pageSize,
  onPageChange,
  className,
}: PaginationProps) {
  const start = (currentPage - 1) * pageSize + 1;
  const end = Math.min(currentPage * pageSize, totalCount);

  // Build page number list — show at most 5 pages around current
  const pages: (number | "…")[] = [];
  if (totalPages <= 7) {
    for (let i = 1; i <= totalPages; i++) pages.push(i);
  } else {
    pages.push(1);
    if (currentPage > 3) pages.push("…");
    const lo = Math.max(2, currentPage - 1);
    const hi = Math.min(totalPages - 1, currentPage + 1);
    for (let i = lo; i <= hi; i++) pages.push(i);
    if (currentPage < totalPages - 2) pages.push("…");
    pages.push(totalPages);
  }

  return (
    <div
      className={cn(
        "flex items-center justify-between gap-4 flex-wrap",
        className,
      )}
      data-ocid="pagination"
    >
      {/* Count info */}
      <p className="text-sm text-muted-foreground tabular-nums">
        Showing{" "}
        <span className="text-foreground font-medium">
          {start}–{end}
        </span>{" "}
        of <span className="text-foreground font-medium">{totalCount}</span>
      </p>

      {/* Controls */}
      <div className="flex items-center gap-1">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage <= 1}
          aria-label="Previous page"
          data-ocid="pagination-prev"
        >
          <ChevronLeft className="w-4 h-4" />
        </Button>

        {pages.map((p, i) =>
          p === "…" ? (
            <span
              key={`ellipsis-${i}-${currentPage}`}
              className="w-8 text-center text-muted-foreground text-sm"
            >
              …
            </span>
          ) : (
            <Button
              key={p}
              variant={p === currentPage ? "default" : "outline"}
              size="sm"
              className="w-8 px-0"
              onClick={() => onPageChange(p as number)}
              aria-label={`Page ${p}`}
              aria-current={p === currentPage ? "page" : undefined}
              data-ocid={`pagination-page-${p}`}
            >
              {p}
            </Button>
          ),
        )}

        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage >= totalPages}
          aria-label="Next page"
          data-ocid="pagination-next"
        >
          <ChevronRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}

export default Pagination;
