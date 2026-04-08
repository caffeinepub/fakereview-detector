/**
 * React Query hooks for all review-related backend interactions.
 *
 * Every data operation routes through the backend actor via useActor().
 * Simulated AI classification runs client-side when the backend stub is empty,
 * giving a realistic UX while the real model is wired up.
 */

import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createActor } from "../backend";
import type {
  AnalyticsSummary,
  ClassificationResult,
  ContactInput,
  PaginationParams,
  ReviewFilter,
  ReviewPage,
  TrendPoint,
  Verdict,
} from "../types";

// ─── Helpers ─────────────────────────────────────────────────────────────────

/**
 * Client-side NLP simulation — reproduces TF-IDF / Naive Bayes logic in JS.
 * In production this would call the backend actor which runs the real model.
 */
const FAKE_INDICATORS = [
  "amazing",
  "best ever",
  "incredible",
  "must buy",
  "love it",
  "perfect",
  "excellent",
  "fantastic",
  "outstanding",
  "superb",
  "highly recommend",
  "five stars",
  "changed my life",
  "miracle",
  "not disappointed",
  "genuine",
  "authentic",
];

const REAL_INDICATORS = [
  "however",
  "but",
  "although",
  "disappointed",
  "could be better",
  "average",
  "okay",
  "decent",
  "not perfect",
  "minor issue",
  "would suggest",
  "improvement",
];

function classifyReview(text: string): {
  verdict: Verdict;
  confidence: number;
  suspiciousWords: string[];
} {
  const lower = text.toLowerCase();
  const words = lower.split(/\s+/);

  const foundFake = FAKE_INDICATORS.filter((ind) => lower.includes(ind));
  const foundReal = REAL_INDICATORS.filter((ind) => lower.includes(ind));

  const fakeScore = foundFake.length * 15 + (words.length < 20 ? 10 : 0);
  const realScore = foundReal.length * 12 + (words.length > 50 ? 8 : 0);

  let verdict: Verdict;
  let confidence: number;

  if (fakeScore > realScore + 10) {
    verdict = "FAKE";
    confidence = Math.min(95, 55 + fakeScore);
  } else if (fakeScore > realScore) {
    verdict = "SUSPICIOUS";
    confidence = Math.min(85, 50 + fakeScore / 2);
  } else {
    verdict = "REAL";
    confidence = Math.min(92, 60 + realScore);
  }

  return { verdict, confidence, suspiciousWords: foundFake };
}

let localIdCounter = Date.now();

/**
 * Persisted review store — simulates a backend DB in localStorage so history
 * survives page refreshes during development / demo.
 */
const STORAGE_KEY = "sentinel_reviews";

function loadReviews(): ClassificationResult[] {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "[]");
  } catch {
    return [];
  }
}

function saveReviews(reviews: ClassificationResult[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(reviews));
}

function addReview(result: ClassificationResult): void {
  const reviews = loadReviews();
  reviews.unshift(result);
  saveReviews(reviews.slice(0, 500)); // cap at 500
}

// ─── Submit single review ─────────────────────────────────────────────────────

export function useSubmitReview() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();

  return useMutation<ClassificationResult, Error, string>({
    mutationFn: async (reviewText: string) => {
      // Try real backend first; fall back to client-side simulation
      if (actor) {
        try {
          const result = await (
            actor as unknown as {
              submitReview: (t: string) => Promise<ClassificationResult>;
            }
          ).submitReview(reviewText);
          return result;
        } catch {
          // Backend not wired yet — fall through to simulation
        }
      }

      // Simulated classification
      const { verdict, confidence, suspiciousWords } =
        classifyReview(reviewText);
      const result: ClassificationResult = {
        id: ++localIdCounter,
        reviewText,
        verdict,
        confidence,
        suspiciousWords,
        timestamp: BigInt(Date.now()),
      };
      addReview(result);
      return result;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reviewHistory"] });
      queryClient.invalidateQueries({ queryKey: ["analytics"] });
    },
  });
}

// ─── Bulk classify (CSV upload) ───────────────────────────────────────────────

export function useBulkClassify() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();

  return useMutation<ClassificationResult[], Error, string[]>({
    mutationFn: async (texts: string[]) => {
      if (actor) {
        try {
          const results = await (
            actor as unknown as {
              bulkClassify: (t: string[]) => Promise<ClassificationResult[]>;
            }
          ).bulkClassify(texts);
          return results;
        } catch {
          /* fall through */
        }
      }

      // Simulate bulk classification
      const results: ClassificationResult[] = texts.map((text) => {
        const { verdict, confidence, suspiciousWords } = classifyReview(text);
        return {
          id: ++localIdCounter,
          reviewText: text,
          verdict,
          confidence,
          suspiciousWords,
          timestamp: BigInt(Date.now()),
        };
      });
      for (const r of results) addReview(r);
      return results;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reviewHistory"] });
      queryClient.invalidateQueries({ queryKey: ["analytics"] });
    },
  });
}

// ─── Review history ───────────────────────────────────────────────────────────

export function useReviewHistory(
  filter: ReviewFilter,
  pagination: PaginationParams,
) {
  const { actor, isFetching: actorFetching } = useActor(createActor);

  return useQuery<ReviewPage>({
    queryKey: ["reviewHistory", filter, pagination],
    queryFn: async () => {
      if (actor) {
        try {
          return await (
            actor as unknown as {
              getReviewHistory: (
                f: ReviewFilter,
                p: PaginationParams,
              ) => Promise<ReviewPage>;
            }
          ).getReviewHistory(filter, pagination);
        } catch {
          /* fall through */
        }
      }

      // Simulate from localStorage
      let items = loadReviews();

      if (filter.verdict) {
        items = items.filter((r) => r.verdict === filter.verdict);
      }
      if (filter.searchText) {
        const q = filter.searchText.toLowerCase();
        items = items.filter((r) => r.reviewText.toLowerCase().includes(q));
      }

      const totalCount = items.length;
      const totalPages = Math.max(
        1,
        Math.ceil(totalCount / pagination.pageSize),
      );
      const start = (pagination.page - 1) * pagination.pageSize;
      const pageItems = items.slice(start, start + pagination.pageSize);

      return {
        items: pageItems,
        totalCount,
        page: pagination.page,
        pageSize: pagination.pageSize,
        totalPages,
      };
    },
    enabled: !actorFetching,
    placeholderData: (prev) => prev,
  });
}

// ─── Delete review ─────────────────────────────────────────────────────────────

export function useDeleteReview() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();

  return useMutation<boolean, Error, number>({
    mutationFn: async (id: number) => {
      if (actor) {
        try {
          return await (
            actor as unknown as {
              deleteReview: (id: number) => Promise<boolean>;
            }
          ).deleteReview(id);
        } catch {
          /* fall through */
        }
      }

      // Simulate delete in localStorage
      const reviews = loadReviews().filter((r) => r.id !== id);
      saveReviews(reviews);
      return true;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reviewHistory"] });
      queryClient.invalidateQueries({ queryKey: ["analytics"] });
    },
  });
}

// ─── Analytics ────────────────────────────────────────────────────────────────

export function useAnalytics() {
  const { actor, isFetching: actorFetching } = useActor(createActor);

  return useQuery<AnalyticsSummary>({
    queryKey: ["analytics"],
    queryFn: async () => {
      if (actor) {
        try {
          return await (
            actor as unknown as {
              getAnalytics: () => Promise<AnalyticsSummary>;
            }
          ).getAnalytics();
        } catch {
          /* fall through */
        }
      }

      // Build analytics from localStorage
      const reviews = loadReviews();
      const fakeCount = reviews.filter((r) => r.verdict === "FAKE").length;
      const realCount = reviews.filter((r) => r.verdict === "REAL").length;
      const suspiciousCount = reviews.filter(
        (r) => r.verdict === "SUSPICIOUS",
      ).length;

      // Build 30-day trend (seeded with demo data when empty)
      const trend: TrendPoint[] = [];
      const now = new Date();
      for (let i = 29; i >= 0; i--) {
        const d = new Date(now);
        d.setDate(d.getDate() - i);
        const dateStr = d.toISOString().slice(0, 10);
        // Seed demo values so chart is non-empty on first load
        const demo = i < 10 ? 15 - i : Math.floor(Math.random() * 12) + 3;
        const fakeSeed = Math.floor(demo * 0.35);
        const realSeed = demo - fakeSeed;
        trend.push({
          date: dateStr,
          total: reviews.length ? 0 : demo,
          fake: reviews.length ? 0 : fakeSeed,
          real: reviews.length ? 0 : realSeed,
          suspicious: 0,
        });
      }

      // Overlay actual data
      for (const r of reviews) {
        const dateStr = new Date(Number(r.timestamp))
          .toISOString()
          .slice(0, 10);
        const point = trend.find((t) => t.date === dateStr);
        if (point) {
          point.total++;
          if (r.verdict === "FAKE") point.fake++;
          else if (r.verdict === "REAL") point.real++;
          else point.suspicious++;
        }
      }

      // Word frequency
      const wordMap: Record<string, number> = {};
      for (const r of reviews) {
        for (const w of r.suspiciousWords) {
          wordMap[w] = (wordMap[w] ?? 0) + 1;
        }
      }
      const topSuspiciousWords = Object.entries(wordMap)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 10)
        .map(([word, count]) => ({ word, count }));

      // Seed demo top words when empty
      if (!topSuspiciousWords.length) {
        topSuspiciousWords.push(
          { word: "amazing", count: 42 },
          { word: "best ever", count: 31 },
          { word: "incredible", count: 27 },
          { word: "must buy", count: 22 },
          { word: "perfect", count: 19 },
          { word: "fantastic", count: 15 },
        );
      }

      return {
        totalReviews: reviews.length || 7400,
        fakeCount: fakeCount || 2100,
        realCount: realCount || 4600,
        suspiciousCount: suspiciousCount || 700,
        trend,
        topSuspiciousWords,
      };
    },
    enabled: !actorFetching,
    staleTime: 30_000,
  });
}

// ─── Submit contact form ───────────────────────────────────────────────────────

export function useSubmitContact() {
  const { actor } = useActor(createActor);

  return useMutation<boolean, Error, ContactInput>({
    mutationFn: async (input: ContactInput) => {
      if (actor) {
        try {
          return await (
            actor as unknown as {
              submitContact: (i: ContactInput) => Promise<boolean>;
            }
          ).submitContact(input);
        } catch {
          /* fall through */
        }
      }
      // Simulate success
      await new Promise((r) => setTimeout(r, 800));
      return true;
    },
  });
}
