/**
 * History.tsx — Paginated review history table with filtering, sorting,
 * row expand, suspicious-word highlight, and delete confirmation.
 *
 * Features:
 *  - Filter bar: All / Real / Fake / Suspicious buttons
 *  - Sort: Newest first / Oldest first
 *  - 10 rows per page with Pagination component
 *  - Clickable row expands to full review + SuspiciousWordHighlighter + delete
 *  - Delete triggers Modal confirm dialog via useDeleteReview
 *  - EmptyState when no reviews match
 *  - LoadingSpinner while fetching
 */

import { Button } from "@/components/ui/button";
import { useNavigate } from "@tanstack/react-router";
import { Clock, Trash2 } from "lucide-react";
import React, { useState } from "react";
import { VerdictBadge } from "../components/Badge";
import { ConfidenceBar } from "../components/ConfidenceBar";
import { DashboardLayout } from "../components/DashboardLayout";
import { EmptyState } from "../components/EmptyState";
import { LoadingSpinner } from "../components/LoadingSpinner";
import { Modal } from "../components/Modal";
import { Pagination } from "../components/Pagination";
import { SuspiciousWordHighlighter } from "../components/SuspiciousWordHighlighter";
import { useDeleteReview, useReviewHistory } from "../hooks/useReviews";
import type { ReviewFilter, Verdict } from "../types";

// ─── Constants ────────────────────────────────────────────────────────────────

const PAGE_SIZE = 10;

type SortOrder = "newest" | "oldest";

const FILTER_OPTIONS: { label: string; verdict: Verdict | undefined }[] = [
  { label: "All", verdict: undefined },
  { label: "Real", verdict: "REAL" },
  { label: "Fake", verdict: "FAKE" },
  { label: "Suspicious", verdict: "SUSPICIOUS" },
];

// ─── Expanded detail panel ────────────────────────────────────────────────────

interface ExpandedPanelProps {
  reviewText: string;
  suspiciousWords: string[];
  reviewId: number;
  onDeleteRequest: (id: number) => void;
}

function ExpandedPanel({
  reviewText,
  suspiciousWords,
  reviewId,
  onDeleteRequest,
}: ExpandedPanelProps) {
  return (
    <tr className="bg-muted/20">
      <td colSpan={4} className="px-4 pt-0 pb-4">
        <div className="bg-card border border-border rounded-lg p-4 space-y-3">
          {/* Full review with highlights */}
          <div>
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">
              Full Review Text
            </p>
            <SuspiciousWordHighlighter
              text={reviewText}
              suspiciousWords={suspiciousWords}
            />
          </div>

          {/* Flagged word chips */}
          {suspiciousWords.length > 0 && (
            <div className="flex flex-wrap gap-1.5 pt-1">
              <span className="text-xs text-muted-foreground self-center">
                Flagged indicators:
              </span>
              {suspiciousWords.map((w) => (
                <span
                  key={w}
                  className="inline-flex items-center px-2 py-0.5 rounded-md bg-yellow-500/10 text-yellow-400 text-xs font-medium border border-yellow-500/20"
                >
                  {w}
                </span>
              ))}
            </div>
          )}

          {/* Delete action */}
          <div className="flex justify-end pt-1 border-t border-border">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="gap-1.5 text-destructive hover:text-destructive hover:bg-destructive/10"
              onClick={() => onDeleteRequest(reviewId)}
              data-ocid="history-delete-btn"
            >
              <Trash2 className="w-3.5 h-3.5" />
              Delete this review
            </Button>
          </div>
        </div>
      </td>
    </tr>
  );
}

// ─── Main page ─────────────────────────────────────────────────────────────────

export default function History() {
  const navigate = useNavigate();

  // ── State ──
  const [activeVerdict, setActiveVerdict] = useState<Verdict | undefined>(
    undefined,
  );
  const [sortOrder, setSortOrder] = useState<SortOrder>("newest");
  const [page, setPage] = useState(1);
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  // ── Data hooks ──
  const filter: ReviewFilter = { verdict: activeVerdict };
  const { data, isLoading } = useReviewHistory(filter, {
    page,
    pageSize: PAGE_SIZE,
  });

  const deleteMutation = useDeleteReview();

  // ── Sorted items (client-side after server pagination) ──
  const items = data?.items
    ? [...data.items].sort((a, b) => {
        const ta = Number(a.timestamp);
        const tb = Number(b.timestamp);
        return sortOrder === "newest" ? tb - ta : ta - tb;
      })
    : [];

  // ── Handlers ──
  function handleFilterChange(verdict: Verdict | undefined) {
    setActiveVerdict(verdict);
    setPage(1);
    setExpandedId(null);
  }

  function handleRowClick(id: number) {
    setExpandedId((prev) => (prev === id ? null : id));
  }

  function handleDeleteConfirm() {
    if (deleteId === null) return;
    deleteMutation.mutate(deleteId, {
      onSuccess: () => {
        setDeleteId(null);
        setExpandedId(null);
      },
    });
  }

  function formatDate(ts: bigint): string {
    return new Date(Number(ts)).toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  return (
    <DashboardLayout title="Review History">
      <div className="space-y-4" data-ocid="history-page">
        {/* ── Page header ── */}
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div>
            <h2 className="font-display font-semibold text-foreground text-xl">
              Review History
            </h2>
            <p className="text-sm text-muted-foreground mt-0.5">
              Browse and manage all analysed reviews
            </p>
          </div>

          {/* Sort controls */}
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs text-muted-foreground">Sort:</span>
            {(["newest", "oldest"] as SortOrder[]).map((order) => (
              <Button
                key={order}
                type="button"
                variant={sortOrder === order ? "default" : "outline"}
                size="sm"
                onClick={() => setSortOrder(order)}
                data-ocid={`sort-${order}`}
              >
                {order === "newest" ? "Newest first" : "Oldest first"}
              </Button>
            ))}
          </div>
        </div>

        {/* ── Filter bar ── */}
        <div
          className="flex items-center gap-1.5 flex-wrap"
          data-ocid="history-filter-bar"
          aria-label="Filter by verdict"
        >
          {FILTER_OPTIONS.map(({ label, verdict }) => {
            const active = activeVerdict === verdict;
            return (
              <Button
                key={label}
                type="button"
                variant={active ? "default" : "outline"}
                size="sm"
                onClick={() => handleFilterChange(verdict)}
                data-ocid={`filter-${label.toLowerCase()}`}
                className={active ? "" : "text-muted-foreground"}
              >
                {label}
              </Button>
            );
          })}
        </div>

        {/* ── Table card ── */}
        <div className="card-elevated overflow-hidden">
          {isLoading ? (
            <div
              className="p-8 flex justify-center"
              data-ocid="history-loading"
            >
              <LoadingSpinner
                fullPage={false}
                size="md"
                label="Loading reviews…"
              />
            </div>
          ) : items.length === 0 ? (
            <EmptyState
              icon={Clock}
              title="No reviews found"
              description={
                activeVerdict
                  ? `No ${activeVerdict.toLowerCase()} reviews yet. Try a different filter.`
                  : "You haven't analysed any reviews yet. Head to Analyze to get started."
              }
              actionLabel="Analyse a Review"
              onAction={() => navigate({ to: "/dashboard/analyze" })}
              data-ocid="history-empty"
            />
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm" aria-label="Review history">
                <thead>
                  <tr className="bg-muted/30 border-b border-border">
                    <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                      Review Preview
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wide w-28">
                      Verdict
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wide w-36">
                      Confidence
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wide w-44">
                      Date / Time
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((review) => {
                    const isExpanded = expandedId === review.id;
                    const preview =
                      review.reviewText.length > 40
                        ? `${review.reviewText.slice(0, 40)}…`
                        : review.reviewText;

                    return (
                      <React.Fragment key={review.id}>
                        {/* ── Main data row ── */}
                        <tr
                          className={`border-b border-border cursor-pointer transition-colors hover:bg-muted/20 ${
                            isExpanded ? "bg-muted/10 border-b-0" : ""
                          }`}
                          onClick={() => handleRowClick(review.id)}
                          onKeyDown={(e) => {
                            if (e.key === "Enter" || e.key === " ") {
                              e.preventDefault();
                              handleRowClick(review.id);
                            }
                          }}
                          tabIndex={0}
                          aria-expanded={isExpanded}
                          data-ocid={`history-row-${review.id}`}
                        >
                          <td className="px-4 py-3.5">
                            <span className="font-mono text-xs text-foreground">
                              {preview}
                            </span>
                          </td>
                          <td className="px-4 py-3.5">
                            <VerdictBadge verdict={review.verdict} size="sm" />
                          </td>
                          <td className="px-4 py-3.5">
                            <div className="w-32">
                              <ConfidenceBar
                                value={review.confidence}
                                verdict={review.verdict}
                                showLabel
                              />
                            </div>
                          </td>
                          <td className="px-4 py-3.5">
                            <span className="text-xs text-muted-foreground tabular-nums whitespace-nowrap">
                              {formatDate(review.timestamp)}
                            </span>
                          </td>
                        </tr>

                        {/* ── Expanded detail panel ── */}
                        {isExpanded && (
                          <ExpandedPanel
                            key={`expand-${review.id}`}
                            reviewText={review.reviewText}
                            suspiciousWords={review.suspiciousWords}
                            reviewId={review.id}
                            onDeleteRequest={setDeleteId}
                          />
                        )}
                      </React.Fragment>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* ── Pagination ── */}
        {data && data.totalPages > 1 && (
          <Pagination
            currentPage={data.page}
            totalPages={data.totalPages}
            totalCount={data.totalCount}
            pageSize={data.pageSize}
            onPageChange={(p) => {
              setPage(p);
              setExpandedId(null);
            }}
          />
        )}
      </div>

      {/* ── Delete confirm modal ── */}
      <Modal
        open={deleteId !== null}
        onOpenChange={(open) => !open && setDeleteId(null)}
        title="Delete Review"
        description="This will permanently remove this review from your history. This action cannot be undone."
        confirmLabel="Delete"
        destructive
        loading={deleteMutation.isPending}
        onConfirm={handleDeleteConfirm}
      />
    </DashboardLayout>
  );
}
