/**
 * SuspiciousWordHighlighter — renders review text with suspicious words
 * highlighted in amber so users can visually scan fake indicators.
 *
 * Performs case-insensitive matching and wraps each occurrence with a
 * styled <mark> element.
 */

import { cn } from "@/lib/utils";
import { useMemo } from "react";

interface SuspiciousWordHighlighterProps {
  /** Full review text to display */
  text: string;
  /** Words/phrases that should be highlighted */
  suspiciousWords: string[];
  className?: string;
}

export function SuspiciousWordHighlighter({
  text,
  suspiciousWords,
  className,
}: SuspiciousWordHighlighterProps) {
  /**
   * Build a regex that matches any of the suspicious words/phrases.
   * We sort by length desc so longer phrases match before their sub-words.
   */
  const segments = useMemo(() => {
    if (!suspiciousWords.length) return [{ text, highlight: false }];

    const escaped = [...suspiciousWords]
      .sort((a, b) => b.length - a.length)
      .map((w) => w.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));

    const pattern = new RegExp(`(${escaped.join("|")})`, "gi");
    const parts = text.split(pattern);

    return parts.map((part) => ({
      text: part,
      highlight: suspiciousWords.some(
        (w) => w.toLowerCase() === part.toLowerCase(),
      ),
    }));
  }, [text, suspiciousWords]);

  return (
    <p
      className={cn(
        "text-sm text-foreground leading-relaxed break-words",
        className,
      )}
      data-ocid="suspicious-highlighter"
    >
      {segments.map((seg, i) =>
        seg.highlight ? (
          <mark
            key={`h-${seg.text}-${i}`}
            className="bg-yellow-500/20 text-yellow-400 font-medium rounded px-0.5 not-italic"
          >
            {seg.text}
          </mark>
        ) : (
          <span key={`t-${seg.text.slice(0, 8)}-${i}`}>{seg.text}</span>
        ),
      )}
    </p>
  );
}

export default SuspiciousWordHighlighter;
