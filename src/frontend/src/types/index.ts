/**
 * Shared type definitions for the Fake Review Detection System.
 * These types mirror the backend Motoko types via the generated backend.d.ts.
 * Used across hooks, components, and pages throughout the application.
 */

// ─── Classification / Review ────────────────────────────────────────────────

/** The verdict returned for each analysed review */
export type Verdict = "REAL" | "FAKE" | "SUSPICIOUS";

/** Result from a single review classification */
export interface ClassificationResult {
  id: number;
  reviewText: string;
  verdict: Verdict;
  /** 0–100 confidence percentage */
  confidence: number;
  /** Words flagged as suspicious by the NLP model */
  suspiciousWords: string[];
  timestamp: bigint;
}

/** Alias — returned when submitting a single review via submitReview */
export type ReviewResult = ClassificationResult;

// ─── Pagination / Filtering ──────────────────────────────────────────────────

/** Filter options for getReviewHistory */
export interface ReviewFilter {
  verdict?: Verdict;
  searchText?: string;
  startDate?: bigint;
  endDate?: bigint;
}

/** Server-side pagination parameters */
export interface PaginationParams {
  page: number;
  pageSize: number;
}

/** A paginated page of review results */
export interface ReviewPage {
  items: ClassificationResult[];
  totalCount: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

// ─── Analytics ───────────────────────────────────────────────────────────────

/** Aggregate statistics returned by getAnalytics */
export interface AnalyticsSummary {
  totalReviews: number;
  fakeCount: number;
  realCount: number;
  suspiciousCount: number;
  /** Trend data for the last 30 days — array of { date, total, fake, real } */
  trend: TrendPoint[];
  /** Top suspicious words and their frequency */
  topSuspiciousWords: WordFrequency[];
}

export interface TrendPoint {
  date: string; // ISO date string "YYYY-MM-DD"
  total: number;
  fake: number;
  real: number;
  suspicious: number;
}

export interface WordFrequency {
  word: string;
  count: number;
}

// ─── Contact ─────────────────────────────────────────────────────────────────

export interface ContactInput {
  name: string;
  email: string;
  subject: string;
  message: string;
}

// ─── User Profile (authorization extension) ──────────────────────────────────

export interface UserProfile {
  name: string;
}

// ─── UI Helpers ──────────────────────────────────────────────────────────────

/** Colour and label map for verdicts — used by Badge and ConfidenceBar */
export const VERDICT_CONFIG: Record<
  Verdict,
  { label: string; colorClass: string; bgClass: string; dotClass: string }
> = {
  REAL: {
    label: "Real",
    colorClass: "text-green-400",
    bgClass: "bg-green-500/15 border border-green-500/30",
    dotClass: "bg-green-400",
  },
  FAKE: {
    label: "Fake",
    colorClass: "text-red-400",
    bgClass: "bg-red-500/15 border border-red-500/30",
    dotClass: "bg-red-400",
  },
  SUSPICIOUS: {
    label: "Suspicious",
    colorClass: "text-yellow-400",
    bgClass: "bg-yellow-500/15 border border-yellow-500/30",
    dotClass: "bg-yellow-400",
  },
};
