/**
 * Analyze.tsx — Review analysis page.
 *
 * Section 1 — Single Review:
 *   Textarea (max 5000 chars) with live character counter + mini progress bar.
 *   On submit calls useSubmitReview() and renders a result card showing:
 *   VerdictBadge, ConfidenceBar, SuspiciousWordHighlighter with yellow
 *   highlights, flagged indicator tags, and analysis timestamp.
 *
 * Section 2 — CSV Bulk Upload:
 *   File input (accept=".csv"). Uses a built-in JS CSV parser that respects
 *   quoted fields and extracts the `review_text` column (falls back to col 0).
 *   Shows upload progress bar. Calls useBulkClassify() with the parsed texts.
 *   Renders a summary bar (total / real / fake / suspicious) and a full
 *   results table (Row #, Review Preview, Verdict badge, Confidence %).
 *
 *   CSV results are shown inline only — NOT saved to history automatically.
 *
 * Production-ready, suitable for college final-year submission.
 */

import {
  AlertCircle,
  CheckCircle2,
  FileText,
  Loader2,
  Search,
  Upload,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useRef, useState } from "react";
import { VerdictBadge } from "../components/Badge";
import { ConfidenceBar } from "../components/ConfidenceBar";
import { DashboardLayout } from "../components/DashboardLayout";
import { SuspiciousWordHighlighter } from "../components/SuspiciousWordHighlighter";
import { Button } from "../components/ui/button";
import { useBulkClassify, useSubmitReview } from "../hooks/useReviews";
import type { ClassificationResult } from "../types";

// ─── Constants ────────────────────────────────────────────────────────────────

const MAX_CHARS = 5000;

// ─── CSV parser helpers ───────────────────────────────────────────────────────

/**
 * Split a single CSV line respecting double-quoted fields that may contain
 * commas and escaped quotes ("").
 */
function splitCSVLine(line: string): string[] {
  const result: string[] = [];
  let current = "";
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (ch === '"') {
      if (inQuotes && line[i + 1] === '"') {
        // Escaped quote inside a quoted field
        current += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (ch === "," && !inQuotes) {
      result.push(current);
      current = "";
    } else {
      current += ch;
    }
  }
  result.push(current);
  return result;
}

/**
 * Parse CSV text and extract the `review_text` column.
 * Falls back to the first column when the header is missing.
 * Returns an array of non-empty review strings.
 */
function parseCSV(raw: string): string[] {
  const lines = raw.split(/\r?\n/).filter((l) => l.trim().length > 0);
  if (lines.length < 2) return [];

  // Determine which column contains the review text
  const headers = splitCSVLine(lines[0]).map((h) =>
    h.trim().toLowerCase().replace(/^"|"$/g, ""),
  );
  const colIndex = headers.indexOf("review_text");
  const targetIdx = colIndex >= 0 ? colIndex : 0;

  const results: string[] = [];
  for (const line of lines.slice(1)) {
    const cols = splitCSVLine(line);
    const cell = cols[targetIdx]?.trim().replace(/^"|"$/g, "");
    if (cell && cell.length > 2) results.push(cell);
  }
  return results;
}

// ─── Timestamp formatter ──────────────────────────────────────────────────────

function formatTimestamp(ts: bigint): string {
  return new Date(Number(ts)).toLocaleString([], {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

// ─── Single Result Card ───────────────────────────────────────────────────────

function ResultCard({ result }: { result: ClassificationResult }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="card-elevated p-5 space-y-4 border-primary/20"
      data-ocid="analyze-result-card"
    >
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div className="flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-primary" />
          <span className="font-display font-semibold text-foreground">
            Analysis Result
          </span>
        </div>
        <VerdictBadge verdict={result.verdict} size="lg" />
      </div>

      {/* Confidence bar */}
      <ConfidenceBar value={result.confidence} verdict={result.verdict} />

      {/* Highlighted review text */}
      <div>
        <p className="text-xs text-muted-foreground font-medium mb-2">
          Review Text
          {result.suspiciousWords.length > 0 && (
            <span className="ml-2 text-yellow-400">
              ({result.suspiciousWords.length} suspicious phrase
              {result.suspiciousWords.length !== 1 && "s"} highlighted)
            </span>
          )}
        </p>
        <div className="bg-muted/30 rounded-lg p-3 border border-border">
          <SuspiciousWordHighlighter
            text={result.reviewText}
            suspiciousWords={result.suspiciousWords}
          />
        </div>
      </div>

      {/* Flagged indicator tags */}
      {result.suspiciousWords.length > 0 && (
        <div>
          <p className="text-xs text-muted-foreground font-medium mb-2">
            Flagged Indicators
          </p>
          <div className="flex flex-wrap gap-1.5">
            {result.suspiciousWords.map((word) => (
              <span
                key={word}
                className="px-2 py-0.5 rounded bg-yellow-500/15 border border-yellow-500/30 text-yellow-400 text-xs font-medium"
              >
                {word}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Timestamp */}
      <p className="text-xs text-muted-foreground/60">
        Analysed at {formatTimestamp(result.timestamp)}
      </p>
    </motion.div>
  );
}

// ─── Bulk Results Table ───────────────────────────────────────────────────────

function BulkResultsTable({ results }: { results: ClassificationResult[] }) {
  const real = results.filter((r) => r.verdict === "REAL").length;
  const fake = results.filter((r) => r.verdict === "FAKE").length;
  const suspicious = results.filter((r) => r.verdict === "SUSPICIOUS").length;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-4"
      data-ocid="bulk-results"
    >
      {/* Summary bar */}
      <div className="flex flex-wrap gap-3" data-ocid="bulk-summary-bar">
        <div className="card-elevated px-4 py-2.5 flex items-center gap-2">
          <span className="text-xs text-muted-foreground">Total</span>
          <span className="text-lg font-display font-bold text-foreground tabular-nums">
            {results.length}
          </span>
        </div>
        <div className="card-elevated px-4 py-2.5 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-green-400 flex-shrink-0" />
          <span className="text-xs text-muted-foreground">Real</span>
          <span className="text-lg font-display font-bold text-green-400 tabular-nums">
            {real}
          </span>
        </div>
        <div className="card-elevated px-4 py-2.5 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-red-400 flex-shrink-0" />
          <span className="text-xs text-muted-foreground">Fake</span>
          <span className="text-lg font-display font-bold text-red-400 tabular-nums">
            {fake}
          </span>
        </div>
        <div className="card-elevated px-4 py-2.5 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-yellow-400 flex-shrink-0" />
          <span className="text-xs text-muted-foreground">Suspicious</span>
          <span className="text-lg font-display font-bold text-yellow-400 tabular-nums">
            {suspicious}
          </span>
        </div>
      </div>

      {/* Results table */}
      <div className="card-elevated overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/30">
                <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground w-12">
                  #
                </th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground">
                  Review Preview
                </th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground w-32">
                  Verdict
                </th>
                <th className="text-right px-4 py-3 text-xs font-semibold text-muted-foreground w-28">
                  Confidence
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {results.map((r, idx) => (
                <tr
                  key={`bulk-${r.id}`}
                  className="hover:bg-muted/20 transition-colors"
                  data-ocid={`bulk-row-${idx + 1}`}
                >
                  <td className="px-4 py-3 text-muted-foreground/60 tabular-nums text-xs">
                    {idx + 1}
                  </td>
                  <td className="px-4 py-3 max-w-xs">
                    <p className="truncate text-foreground text-xs">
                      {r.reviewText}
                    </p>
                  </td>
                  <td className="px-4 py-3">
                    <VerdictBadge verdict={r.verdict} size="sm" />
                  </td>
                  <td className="px-4 py-3 text-right">
                    <span className="text-xs font-bold text-foreground tabular-nums">
                      {r.confidence}%
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Analyze Page ─────────────────────────────────────────────────────────────

export default function Analyze() {
  // ── Single review state ──────────────────────────────────────────────────
  const [reviewText, setReviewText] = useState("");
  const [singleResult, setSingleResult] = useState<ClassificationResult | null>(
    null,
  );
  const submitReview = useSubmitReview();

  // ── CSV upload state ─────────────────────────────────────────────────────
  const [csvFileName, setCsvFileName] = useState<string | null>(null);
  const [csvError, setCsvError] = useState<string | null>(null);
  const [csvProgress, setCsvProgress] = useState<number>(0);
  const [bulkResults, setBulkResults] = useState<ClassificationResult[] | null>(
    null,
  );
  const fileInputRef = useRef<HTMLInputElement>(null);
  const bulkClassify = useBulkClassify();

  // ─── Single review submit ────────────────────────────────────────────────

  async function handleSingleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!reviewText.trim() || reviewText.length > MAX_CHARS) return;
    const result = await submitReview.mutateAsync(reviewText.trim());
    setSingleResult(result);
  }

  function handleClearSingle() {
    setReviewText("");
    setSingleResult(null);
  }

  // ─── CSV upload ──────────────────────────────────────────────────────────

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    // Reset previous state
    setCsvError(null);
    setBulkResults(null);
    setCsvProgress(0);

    if (!file.name.endsWith(".csv")) {
      setCsvError("Please upload a .csv file only.");
      return;
    }

    setCsvFileName(file.name);

    const reader = new FileReader();
    reader.onload = async (ev) => {
      const raw = ev.target?.result as string;
      const texts = parseCSV(raw);

      if (texts.length === 0) {
        setCsvError(
          'No review_text column found. Ensure your CSV has a "review_text" header.',
        );
        return;
      }

      // Animate progress bar while the async classification runs
      const interval = setInterval(() => {
        setCsvProgress((p) => Math.min(p + 10, 85));
      }, 120);

      try {
        const results = await bulkClassify.mutateAsync(texts);
        clearInterval(interval);
        setCsvProgress(100);
        setBulkResults(results);
      } catch {
        clearInterval(interval);
        setCsvError("Classification failed. Please try again.");
      }
    };
    reader.readAsText(file);
  }

  function handleClearCSV() {
    setCsvFileName(null);
    setCsvError(null);
    setCsvProgress(0);
    setBulkResults(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  // ─── Derived values ──────────────────────────────────────────────────────

  const charCount = reviewText.length;
  const isOverLimit = charCount > MAX_CHARS;
  const charPercent = Math.min(100, (charCount / MAX_CHARS) * 100);

  // ─── Render ──────────────────────────────────────────────────────────────

  return (
    <DashboardLayout title="Analyze Reviews">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* ── Section 1: Single Review ── */}
        <section>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-7 h-7 rounded-lg bg-primary/15 border border-primary/30 flex items-center justify-center">
              <Search className="w-3.5 h-3.5 text-primary" />
            </div>
            <h2 className="font-display font-semibold text-foreground">
              Single Review Analysis
            </h2>
          </div>

          <form
            onSubmit={handleSingleSubmit}
            className="card-elevated p-5 space-y-4"
          >
            {/* Textarea */}
            <div>
              <label
                htmlFor="review-input"
                className="block text-sm font-medium text-foreground mb-2"
              >
                Paste Review Text
              </label>
              <textarea
                id="review-input"
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                placeholder="Paste a product review here to check if it is genuine or fake…"
                rows={6}
                maxLength={MAX_CHARS + 100}
                className={`w-full rounded-lg bg-muted/30 border ${
                  isOverLimit ? "border-red-500" : "border-border"
                } text-foreground placeholder:text-muted-foreground/50 text-sm px-4 py-3 resize-y focus:outline-none focus:ring-2 focus:ring-primary/50 transition-smooth font-body`}
                data-ocid="review-textarea"
              />
              {/* Character counter + mini progress bar */}
              <div className="flex items-center justify-between mt-2">
                <div className="h-1 w-32 rounded-full bg-muted overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-300 ${
                      isOverLimit
                        ? "bg-red-500"
                        : charPercent > 80
                          ? "bg-yellow-500"
                          : "bg-primary"
                    }`}
                    style={{ width: `${charPercent}%` }}
                  />
                </div>
                <span
                  className={`text-xs tabular-nums ${
                    isOverLimit
                      ? "text-red-400 font-semibold"
                      : "text-muted-foreground"
                  }`}
                  data-ocid="char-counter"
                >
                  {charCount.toLocaleString()} / {MAX_CHARS.toLocaleString()}
                </span>
              </div>
            </div>

            {/* Over-limit warning */}
            {isOverLimit && (
              <p className="text-xs text-red-400 flex items-center gap-1.5">
                <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
                Review exceeds the maximum {MAX_CHARS.toLocaleString()}{" "}
                character limit.
              </p>
            )}

            {/* Actions */}
            <div className="flex items-center gap-3 flex-wrap">
              <Button
                type="submit"
                disabled={
                  !reviewText.trim() || isOverLimit || submitReview.isPending
                }
                className="gap-2"
                data-ocid="analyze-submit-btn"
              >
                {submitReview.isPending ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Analysing…
                  </>
                ) : (
                  <>
                    <Search className="w-4 h-4" />
                    Analyse Review
                  </>
                )}
              </Button>
              {(reviewText.length > 0 || singleResult) && (
                <Button
                  type="button"
                  variant="ghost"
                  onClick={handleClearSingle}
                  className="gap-2 text-muted-foreground"
                  data-ocid="analyze-clear-btn"
                >
                  <X className="w-4 h-4" />
                  Clear
                </Button>
              )}
            </div>
          </form>

          {/* Result card — animated in when available */}
          <AnimatePresence>
            {singleResult && (
              <div className="mt-4">
                <ResultCard result={singleResult} />
              </div>
            )}
          </AnimatePresence>
        </section>

        {/* ── Divider ── */}
        <div className="relative flex items-center gap-4">
          <div className="flex-1 h-px bg-border" />
          <span className="text-xs text-muted-foreground px-2 bg-background">
            OR
          </span>
          <div className="flex-1 h-px bg-border" />
        </div>

        {/* ── Section 2: CSV Bulk Upload ── */}
        <section>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-7 h-7 rounded-lg bg-primary/15 border border-primary/30 flex items-center justify-center">
              <Upload className="w-3.5 h-3.5 text-primary" />
            </div>
            <h2 className="font-display font-semibold text-foreground">
              Bulk CSV Upload
            </h2>
          </div>

          <div className="card-elevated p-5 space-y-4">
            <p className="text-sm text-muted-foreground">
              Upload a{" "}
              <code className="text-primary font-mono bg-primary/10 px-1 rounded">
                .csv
              </code>{" "}
              file with a{" "}
              <code className="text-primary font-mono bg-primary/10 px-1 rounded">
                review_text
              </code>{" "}
              column. All rows are classified simultaneously — results are shown
              inline and are not saved to history.
            </p>

            {/* Drop zone / file selector */}
            {!csvFileName ? (
              <div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".csv"
                  id="csv-upload"
                  className="sr-only"
                  onChange={handleFileChange}
                  data-ocid="csv-file-input"
                />
                <label
                  htmlFor="csv-upload"
                  className="flex flex-col items-center justify-center gap-3 w-full border-2 border-dashed border-border rounded-xl py-10 px-4 text-center cursor-pointer hover:border-primary/50 hover:bg-muted/20 transition-smooth group"
                  data-ocid="csv-upload-zone"
                >
                  <div className="w-10 h-10 rounded-xl bg-muted/50 flex items-center justify-center group-hover:bg-primary/15 transition-smooth">
                    <Upload className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      Click to upload CSV
                    </p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      .csv files only — must include a{" "}
                      <span className="font-mono">review_text</span> column
                    </p>
                  </div>
                </label>
              </div>
            ) : (
              /* File selected */
              <div className="flex items-center gap-3 bg-muted/30 border border-border rounded-lg px-4 py-3">
                <FileText className="w-4 h-4 text-primary flex-shrink-0" />
                <span className="text-sm text-foreground font-medium flex-1 truncate">
                  {csvFileName}
                </span>
                <button
                  type="button"
                  className="p-1 rounded text-muted-foreground hover:text-foreground transition-colors"
                  onClick={handleClearCSV}
                  aria-label="Remove file"
                  data-ocid="csv-clear-btn"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            )}

            {/* Upload / classification progress bar */}
            {csvFileName && csvProgress > 0 && csvProgress < 100 && (
              <div data-ocid="csv-progress">
                <div className="flex items-center justify-between text-xs text-muted-foreground mb-1.5">
                  <span className="flex items-center gap-1.5">
                    <Loader2 className="w-3 h-3 animate-spin" />
                    Classifying reviews…
                  </span>
                  <span className="tabular-nums font-medium">
                    {csvProgress}%
                  </span>
                </div>
                <div className="w-full h-2 rounded-full bg-muted overflow-hidden">
                  <div
                    className="h-full rounded-full bg-primary transition-all duration-300"
                    style={{ width: `${csvProgress}%` }}
                  />
                </div>
              </div>
            )}

            {/* Error message */}
            {csvError && (
              <p
                className="text-xs text-red-400 flex items-center gap-1.5"
                data-ocid="csv-error"
              >
                <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
                {csvError}
              </p>
            )}
          </div>

          {/* Bulk results table — animated in when ready */}
          <AnimatePresence>
            {bulkResults && bulkResults.length > 0 && (
              <div className="mt-4">
                <BulkResultsTable results={bulkResults} />
              </div>
            )}
          </AnimatePresence>
        </section>
      </div>
    </DashboardLayout>
  );
}
