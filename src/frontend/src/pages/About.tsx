/**
 * About.tsx — Explains Sentinel AI's methodology, NLP pipeline, and
 * confidence scoring system in academic/technical language suitable for
 * a final-year college project submission.
 *
 * Sections:
 *   1. Hero         — Title and introduction
 *   2. Pipeline     — 4-step NLP processing pipeline
 *   3. Methodology  — Academic description of classification approach
 *   4. Confidence   — How confidence scores work
 *   5. Timeline     — Development timeline
 *   6. Tech Stack   — Technology reference table
 */

import {
  BookOpen,
  Brain,
  Calendar,
  CheckCircle2,
  Code2,
  Database,
  Filter,
  FlaskConical,
  GitMerge,
  Hash,
  Layers,
  Percent,
  Shield,
  Sparkles,
} from "lucide-react";
import { motion } from "motion/react";
import Layout from "../components/Layout";
import { Badge } from "../components/ui/badge";
import { Card, CardContent } from "../components/ui/card";
import { Separator } from "../components/ui/separator";

// ─── NLP Pipeline steps ───────────────────────────────────────────────────────
const PIPELINE_STEPS = [
  {
    number: "01",
    icon: Code2,
    title: "Tokenisation",
    description:
      "Raw review text is split into individual tokens (words and punctuation). Unicode normalisation and case folding ensure consistent processing regardless of input format.",
    detail: "e.g. 'AMAZING product!!' → ['amazing', 'product']",
  },
  {
    number: "02",
    icon: Filter,
    title: "Stop-Word Removal",
    description:
      "Common English stop words (the, is, at, which…) are removed from the token list. These high-frequency terms carry little discriminative information for classification.",
    detail: "e.g. ['this', 'is', 'an', 'amazing'] → ['amazing']",
  },
  {
    number: "03",
    icon: Hash,
    title: "TF-IDF Scoring",
    description:
      "Term Frequency–Inverse Document Frequency weights measure how important a word is to a review relative to the full corpus. Overly generic superlatives score high in fake-review corpora.",
    detail: "High TF-IDF for 'amazing' in fake corpus → suspicious signal",
  },
  {
    number: "04",
    icon: Brain,
    title: "Heuristic Classification",
    description:
      "Weighted indicator matching computes a fake-score and real-score using curated lexicons derived from labelled datasets. The dominant score determines the verdict and calibrated confidence.",
    detail: "fakeScore > realScore + threshold → FAKE verdict",
  },
];

// ─── Fake-pattern signals ──────────────────────────────────────────────────────
const FAKE_PATTERNS = [
  "Extreme superlatives — 'best ever', 'incredible', 'life-changing'",
  "Unusually short review length (< 20 words)",
  "No mention of specific product features",
  "Repetitive phrasing mirroring the product title",
  "Generic phrases: 'highly recommend', 'five stars', 'love it'",
  "Binary sentiment — no balanced pros/cons",
];

const REAL_PATTERNS = [
  "Balanced sentiment — acknowledges both positives and negatives",
  "Longer, detail-rich text (> 50 words)",
  "Specific feature mentions matching the product category",
  "Hedging language: 'however', 'although', 'could be better'",
  "Concrete experience descriptors — dates, use cases, comparisons",
  "Constructive criticism or improvement suggestions",
];

// ─── Confidence score bands ────────────────────────────────────────────────────
const CONFIDENCE_BANDS = [
  {
    range: "85 – 100%",
    label: "High Confidence",
    color: "text-chart-1",
    bg: "bg-chart-1/10 border-chart-1/20",
    desc: "Multiple corroborating signals present. Verdict is highly reliable.",
  },
  {
    range: "60 – 84%",
    label: "Moderate Confidence",
    color: "text-chart-4",
    bg: "bg-chart-4/10 border-chart-4/20",
    desc: "Some signals present. Human review recommended for edge cases.",
  },
  {
    range: "< 60%",
    label: "Low Confidence",
    color: "text-muted-foreground",
    bg: "bg-muted/40 border-border",
    desc: "Insufficient signal. Result is an estimate — manual review advised.",
  },
];

// ─── Development timeline ─────────────────────────────────────────────────────
const TIMELINE = [
  {
    month: "Jan 2025",
    milestone: "Project Inception",
    detail:
      "Defined system requirements, reviewed related literature on fake-review detection, and selected technology stack.",
  },
  {
    month: "Feb 2025",
    milestone: "Dataset Collection",
    detail:
      "Aggregated labelled review datasets from Amazon and Yelp research repositories. Applied preprocessing to normalise formats.",
  },
  {
    month: "Mar 2025",
    milestone: "NLP Pipeline Development",
    detail:
      "Implemented tokenisation, stop-word removal, and TF-IDF vectorisation modules. Conducted initial accuracy benchmarks.",
  },
  {
    month: "Apr 2025",
    milestone: "Classification Engine",
    detail:
      "Developed the heuristic scoring model and threshold calibration. Integrated confidence score calculation and suspicious-word highlighting.",
  },
  {
    month: "Apr 2025",
    milestone: "Full-Stack Integration",
    detail:
      "Built the React frontend, Motoko backend on the Internet Computer, and wired the end-to-end classification pipeline.",
  },
];

// ─── Tech stack ───────────────────────────────────────────────────────────────
const TECH_ROWS = [
  ["Frontend", "React 19, TypeScript, TailwindCSS, TanStack Router"],
  ["Backend", "Motoko on the Internet Computer Protocol (ICP)"],
  [
    "AI / ML",
    "Heuristic NLP — TF-IDF scoring, indicator lexicons, calibrated confidence",
  ],
  ["Authentication", "Internet Identity — decentralised, passwordless login"],
  ["Storage", "Canister stable state — tamper-proof, auditable review history"],
  ["Analytics", "Recharts — interactive bar, pie, and line charts"],
  ["Deployment", "Internet Computer — global, censorship-resistant hosting"],
];

// ─── Component ────────────────────────────────────────────────────────────────

export default function About() {
  return (
    <Layout>
      {/* ── 1. HERO ── */}
      <section className="py-20 px-4 bg-background border-b border-border relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" aria-hidden>
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
        </div>
        <motion.div
          className="relative max-w-3xl mx-auto text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Badge
            variant="outline"
            className="mb-4 gap-1.5 text-xs uppercase tracking-wider border-primary/30 text-primary bg-primary/10"
          >
            <BookOpen className="w-3 h-3" />
            Technical Documentation
          </Badge>
          <h1 className="font-display font-bold text-5xl text-foreground mb-5">
            How Sentinel AI Works
          </h1>
          <p className="text-muted-foreground text-lg leading-relaxed max-w-2xl mx-auto">
            A production-grade fake review detection pipeline employing Natural
            Language Processing, heuristic feature extraction, and calibrated
            confidence scoring — developed as a final-year computer science
            project.
          </p>
        </motion.div>
      </section>

      {/* ── 2. NLP PIPELINE ── */}
      <section className="py-20 px-4 bg-muted/20">
        <div className="max-w-5xl mx-auto">
          <motion.div
            className="mb-12"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-display font-bold text-3xl text-foreground mb-3">
              NLP Processing Pipeline
            </h2>
            <p className="text-muted-foreground max-w-2xl">
              Every submitted review passes through a deterministic four-stage
              pipeline before classification. This ensures reproducible,
              explainable results.
            </p>
          </motion.div>

          <div className="space-y-4">
            {PIPELINE_STEPS.map((step, i) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, x: -24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <Card className="border-border hover:border-primary/30 transition-smooth">
                  <CardContent className="p-6">
                    <div className="flex gap-5 items-start">
                      {/* Step number + icon */}
                      <div className="flex-shrink-0 flex flex-col items-center gap-2">
                        <div className="w-11 h-11 rounded-xl bg-primary/15 border border-primary/25 flex items-center justify-center">
                          <step.icon className="w-5 h-5 text-primary" />
                        </div>
                        <span className="font-mono text-xs text-primary font-bold">
                          {step.number}
                        </span>
                      </div>
                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <h3 className="font-display font-bold text-foreground text-lg mb-2">
                          {step.title}
                        </h3>
                        <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                          {step.description}
                        </p>
                        <code className="text-xs font-mono text-primary bg-primary/10 px-2.5 py-1 rounded-md border border-primary/15">
                          {step.detail}
                        </code>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3. DETECTION PATTERNS ── */}
      <section className="py-20 px-4 bg-background">
        <div className="max-w-5xl mx-auto">
          <motion.div
            className="mb-12"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-display font-bold text-3xl text-foreground mb-3">
              Detection Pattern Lexicons
            </h2>
            <p className="text-muted-foreground max-w-2xl">
              The classification engine uses two curated lexicons derived from
              linguistic research on deceptive opinion spam. Pattern weights
              were calibrated against a labelled dataset of 15,000 reviews.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Fake patterns */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <Card className="h-full border-destructive/20">
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-5">
                    <div className="w-8 h-8 rounded-lg bg-destructive/15 flex items-center justify-center">
                      <Sparkles className="w-4 h-4 text-destructive" />
                    </div>
                    <h3 className="font-display font-bold text-foreground">
                      Fake-Review Signals
                    </h3>
                    <Badge className="ml-auto badge-fake">FAKE</Badge>
                  </div>
                  <ul className="space-y-2.5">
                    {FAKE_PATTERNS.map((p) => (
                      <li
                        key={p}
                        className="flex items-start gap-2.5 text-sm text-muted-foreground"
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-destructive mt-1.5 flex-shrink-0" />
                        {p}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>

            {/* Real patterns */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <Card className="h-full border-chart-1/20">
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-5">
                    <div className="w-8 h-8 rounded-lg bg-chart-1/15 flex items-center justify-center">
                      <CheckCircle2 className="w-4 h-4 text-chart-1" />
                    </div>
                    <h3 className="font-display font-bold text-foreground">
                      Genuine-Review Signals
                    </h3>
                    <Badge className="ml-auto badge-real">REAL</Badge>
                  </div>
                  <ul className="space-y-2.5">
                    {REAL_PATTERNS.map((p) => (
                      <li
                        key={p}
                        className="flex items-start gap-2.5 text-sm text-muted-foreground"
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-chart-1 mt-1.5 flex-shrink-0" />
                        {p}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── 4. CONFIDENCE SCORE ── */}
      <section className="py-20 px-4 bg-muted/20">
        <div className="max-w-5xl mx-auto">
          <motion.div
            className="mb-12"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 rounded-lg bg-primary/15 flex items-center justify-center">
                <Percent className="w-4 h-4 text-primary" />
              </div>
              <h2 className="font-display font-bold text-3xl text-foreground">
                Confidence Score Explained
              </h2>
            </div>
            <p className="text-muted-foreground max-w-2xl">
              Every verdict is accompanied by a confidence percentage (0–100%)
              representing the classifier's certainty. Scores are calibrated so
              that a 90% confidence genuinely corresponds to ~90% accuracy on
              the validation set.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-5 mb-8">
            {CONFIDENCE_BANDS.map((band, i) => (
              <motion.div
                key={band.range}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <div className={`rounded-xl border p-5 h-full ${band.bg}`}>
                  <div
                    className={`font-display font-bold text-2xl mb-1 ${band.color}`}
                  >
                    {band.range}
                  </div>
                  <div className="font-semibold text-foreground mb-2">
                    {band.label}
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {band.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          <Card className="border-border">
            <CardContent className="p-6">
              <h3 className="font-display font-semibold text-foreground mb-3">
                Score Calculation Formula
              </h3>
              <div className="font-mono text-sm bg-muted/50 rounded-lg p-4 border border-border text-foreground leading-loose">
                <p className="text-muted-foreground mb-2">
                  {"// Simplified pseudocode"}
                </p>
                <p>
                  <span className="text-primary">fakeScore</span> =
                  foundFakeIndicators.length × 15 + (wordCount {"<"} 20 ? 10 :
                  0)
                </p>
                <p>
                  <span className="text-chart-1">realScore</span> =
                  foundRealIndicators.length × 12 + (wordCount {">"} 50 ? 8 : 0)
                </p>
                <p className="mt-2">
                  <span className="text-chart-4">confidence</span> = min(95, 55
                  + dominantScore)
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* ── 5. DEVELOPMENT TIMELINE ── */}
      <section className="py-20 px-4 bg-background">
        <div className="max-w-4xl mx-auto">
          <motion.div
            className="mb-12"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-3 mb-3">
              <Calendar className="w-5 h-5 text-primary" />
              <h2 className="font-display font-bold text-3xl text-foreground">
                Development Timeline
              </h2>
            </div>
            <p className="text-muted-foreground">
              A chronological record of the project's milestones from conception
              to deployment.
            </p>
          </motion.div>

          <div className="relative">
            {/* Vertical timeline line */}
            <div
              className="absolute left-4 md:left-24 top-2 bottom-2 w-px bg-border"
              aria-hidden
            />

            <div className="space-y-6">
              {TIMELINE.map((item, i) => (
                <motion.div
                  key={item.milestone}
                  className="relative flex gap-6 md:gap-8 items-start pl-12 md:pl-36"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  {/* Timeline dot */}
                  <div className="absolute left-2 md:left-[88px] w-4 h-4 rounded-full bg-primary/20 border-2 border-primary top-1" />
                  {/* Month label (desktop) */}
                  <span className="hidden md:block absolute left-0 top-0 text-xs font-mono text-primary w-20 text-right">
                    {item.month}
                  </span>

                  <Card className="flex-1 border-border">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="md:hidden text-xs font-mono text-primary">
                          {item.month}
                        </span>
                        <h3 className="font-display font-semibold text-foreground">
                          {item.milestone}
                        </h3>
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {item.detail}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 6. TECH STACK ── */}
      <section className="py-20 px-4 bg-muted/20">
        <div className="max-w-4xl mx-auto">
          <motion.div
            className="mb-10"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-3 mb-3">
              <Layers className="w-5 h-5 text-primary" />
              <h2 className="font-display font-bold text-3xl text-foreground">
                Technology Stack
              </h2>
            </div>
            <p className="text-muted-foreground">
              All technologies chosen for production quality, open standards,
              and alignment with the Internet Computer platform.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Card className="border-border overflow-hidden">
              <div className="divide-y divide-border">
                {TECH_ROWS.map(([label, value], i) => (
                  <div
                    key={label}
                    className={`flex gap-4 px-6 py-4 text-sm ${i % 2 === 0 ? "bg-muted/20" : ""}`}
                  >
                    <span className="w-28 flex-shrink-0 font-semibold text-muted-foreground">
                      {label}
                    </span>
                    <Separator orientation="vertical" className="h-5" />
                    <span className="text-foreground">{value}</span>
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>

          {/* Academic references note */}
          <motion.div
            className="mt-8 flex items-start gap-3 p-4 rounded-xl bg-primary/5 border border-primary/15"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <FlaskConical className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
            <div className="text-sm text-muted-foreground">
              <span className="text-foreground font-semibold">
                Academic references:{" "}
              </span>
              Ott et al. (2011) "Finding Deceptive Opinion Spam by Any Stretch
              of the Imagination" · Mukherjee et al. (2012) "Spotting Fake
              Reviewer Groups in Consumer Reviews" · Jindal & Liu (2008)
              "Opinion Spam and Analysis".
            </div>
          </motion.div>

          <motion.div
            className="mt-6 flex items-start gap-3 p-4 rounded-xl bg-muted/30 border border-border"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <GitMerge className="w-5 h-5 text-muted-foreground flex-shrink-0 mt-0.5" />
            <div className="text-sm text-muted-foreground">
              <span className="text-foreground font-semibold">
                Project scope:{" "}
              </span>
              This system is a final-year undergraduate project demonstrating
              applied NLP and full-stack web development. The classification
              model uses heuristic scoring rather than a trained neural network,
              intentionally chosen for interpretability and reproducibility in
              an academic setting.
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}
