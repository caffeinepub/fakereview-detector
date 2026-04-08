/**
 * Home.tsx — Public landing page for Sentinel AI.
 *
 * Sections:
 *   1. Hero     — Full-viewport with animated teal glow, headline, and CTAs
 *   2. Features — 3 feature cards: Instant Analysis, Bulk Upload, History & Analytics
 *   3. How It Works — 3-step process visualization
 *   4. Stats    — Live platform statistics
 *   5. CTA      — Final conversion section
 */

import { Link } from "@tanstack/react-router";
import {
  BarChart3,
  CheckCircle2,
  Clock,
  Database,
  FileText,
  History,
  Search,
  Shield,
  TrendingUp,
  Upload,
  Zap,
} from "lucide-react";
import { motion } from "motion/react";
import Layout from "../components/Layout";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";

// ─── Feature cards data ───────────────────────────────────────────────────────
const FEATURES = [
  {
    icon: Zap,
    label: "Instant Analysis",
    color: "text-primary",
    bg: "bg-primary/10 border-primary/20",
    title: "Instant Analysis",
    description:
      "Paste any product review and get a verdict within milliseconds. Our heuristic NLP engine tokenises, scores, and classifies in real time — no waiting.",
    stat: "< 200ms",
    statLabel: "avg response",
  },
  {
    icon: Upload,
    label: "Bulk Upload",
    color: "text-chart-4",
    bg: "bg-chart-4/10 border-chart-4/20",
    title: "CSV Bulk Upload",
    description:
      "Upload a CSV file with hundreds of reviews at once. Each row is classified independently with its own confidence score and suspicious-word highlights.",
    stat: "500+",
    statLabel: "reviews per batch",
  },
  {
    icon: BarChart3,
    label: "History & Analytics",
    color: "text-chart-1",
    bg: "bg-chart-1/10 border-chart-1/20",
    title: "History & Analytics",
    description:
      "Every analysis is stored with a timestamp. Track fake-review trends over time, view distribution charts, and export your review history.",
    stat: "30-day",
    statLabel: "trend charts",
  },
];

// ─── How-it-works steps ────────────────────────────────────────────────────────
const HOW_STEPS = [
  {
    number: "01",
    icon: FileText,
    title: "Submit a Review",
    description:
      "Enter a single review in the text area or upload a CSV file with multiple reviews for bulk analysis.",
  },
  {
    number: "02",
    icon: Search,
    title: "NLP Processing",
    description:
      "Text is tokenised, stop words removed, TF-IDF features extracted, and scored against patterns learned from labelled datasets.",
  },
  {
    number: "03",
    icon: CheckCircle2,
    title: "Get Your Verdict",
    description:
      "Receive a Real / Suspicious / Fake label with a confidence percentage and highlighted suspicious phrases.",
  },
];

// ─── Platform statistics ───────────────────────────────────────────────────────
const STATS = [
  { value: "7.4k+", label: "Reviews Analysed", icon: Database },
  { value: "94%", label: "Detection Accuracy", icon: TrendingUp },
  { value: "2.1k", label: "Fake Reviews Caught", icon: Shield },
  { value: "< 200ms", label: "Avg Response Time", icon: Clock },
];

// ─── Component ────────────────────────────────────────────────────────────────

export default function Home() {
  return (
    <Layout>
      {/* ── 1. HERO ── */}
      <section className="relative flex flex-col items-center justify-center min-h-[92vh] px-4 text-center bg-background overflow-hidden">
        {/* Decorative glows */}
        <div className="absolute inset-0 pointer-events-none" aria-hidden>
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-primary/8 blur-[120px]" />
          <div className="absolute bottom-1/4 right-1/4 w-[350px] h-[350px] rounded-full bg-chart-1/6 blur-[80px]" />
          {/* Subtle grid overlay */}
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage:
                "linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)",
              backgroundSize: "48px 48px",
            }}
          />
        </div>

        <div className="relative z-10 max-w-3xl mx-auto">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Badge
              variant="outline"
              className="gap-1.5 px-3 py-1.5 text-xs font-semibold uppercase tracking-wider border-primary/30 text-primary bg-primary/10 mb-6"
              data-ocid="hero-badge"
            >
              <Shield className="w-3 h-3" />
              AI-Powered Review Intelligence
            </Badge>
          </motion.div>

          {/* Headline */}
          <motion.h1
            className="font-display font-bold text-5xl sm:text-6xl lg:text-7xl text-foreground leading-[1.05] mb-6"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Detect Fake Reviews
            <span className="block text-primary mt-2">with AI</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            className="text-muted-foreground text-lg sm:text-xl leading-relaxed max-w-2xl mx-auto mb-10"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Sentinel AI uses NLP and heuristic machine learning to classify
            product reviews as{" "}
            <span className="text-chart-1 font-semibold">Real</span>,{" "}
            <span className="text-chart-4 font-semibold">Suspicious</span>, or{" "}
            <span className="text-destructive font-semibold">Fake</span> —
            protecting consumers and businesses from misleading content.
          </motion.p>

          {/* CTAs */}
          <motion.div
            className="flex flex-col sm:flex-row items-center gap-4 justify-center"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Link to="/dashboard/analyze">
              <Button
                size="lg"
                className="gap-2 px-8 h-12 font-semibold"
                data-ocid="hero-cta-analyze"
              >
                <Zap className="w-4 h-4" />
                Analyse a Review Now
              </Button>
            </Link>
            <Link to="/about">
              <Button
                variant="outline"
                size="lg"
                className="h-12 px-8"
                data-ocid="hero-cta-about"
              >
                How it works
              </Button>
            </Link>
          </motion.div>

          {/* Social proof */}
          <motion.div
            className="mt-12 flex flex-wrap items-center justify-center gap-6 text-xs text-muted-foreground"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            {["7,400+ reviews processed", "94% accuracy", "Free to use"].map(
              (label) => (
                <span key={label} className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-chart-1" />
                  {label}
                </span>
              ),
            )}
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 8, 0] }}
          transition={{
            duration: 2,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
          aria-hidden
        >
          <div className="w-5 h-8 rounded-full border border-border flex items-start justify-center pt-1.5">
            <div className="w-1 h-2 rounded-full bg-muted-foreground/60" />
          </div>
        </motion.div>
      </section>

      {/* ── 2. FEATURES ── */}
      <section className="py-24 px-4 bg-muted/20">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Badge
              variant="outline"
              className="mb-4 text-xs uppercase tracking-wider border-border text-muted-foreground"
            >
              Core capabilities
            </Badge>
            <h2 className="font-display font-bold text-4xl text-foreground mb-4">
              Everything you need to fight fake reviews
            </h2>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto">
              A complete detection platform built for individuals, researchers,
              and businesses.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {FEATURES.map((feat, i) => (
              <motion.div
                key={feat.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <Card className="h-full border-border hover:border-primary/30 transition-smooth group">
                  <CardContent className="p-6 h-full flex flex-col">
                    {/* Icon */}
                    <div
                      className={`w-11 h-11 rounded-xl border flex items-center justify-center mb-5 ${feat.bg}`}
                    >
                      <feat.icon className={`w-5 h-5 ${feat.color}`} />
                    </div>

                    <h3 className="font-display font-bold text-lg text-foreground mb-2">
                      {feat.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed flex-1 mb-6">
                      {feat.description}
                    </p>

                    {/* Stat chip */}
                    <div className="flex items-center gap-2 pt-4 border-t border-border">
                      <span
                        className={`font-display font-bold text-2xl ${feat.color}`}
                      >
                        {feat.stat}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {feat.statLabel}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3. HOW IT WORKS ── */}
      <section className="py-24 px-4 bg-background">
        <div className="max-w-5xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Badge
              variant="outline"
              className="mb-4 text-xs uppercase tracking-wider border-border text-muted-foreground"
            >
              Process
            </Badge>
            <h2 className="font-display font-bold text-4xl text-foreground mb-4">
              Three steps to the truth
            </h2>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto">
              Our pipeline processes your text through a reproducible NLP
              workflow in under a second.
            </p>
          </motion.div>

          {/* Steps — connected timeline */}
          <div className="relative">
            {/* Connector line (desktop) */}
            <div
              className="hidden md:block absolute top-8 left-[calc(16.67%-1px)] right-[calc(16.67%-1px)] h-px bg-border"
              aria-hidden
            />

            <div className="grid md:grid-cols-3 gap-8">
              {HOW_STEPS.map((step, i) => (
                <motion.div
                  key={step.title}
                  className="flex flex-col items-center text-center"
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.15 }}
                >
                  {/* Circle with step number */}
                  <div className="relative w-16 h-16 rounded-full bg-card border-2 border-primary/40 flex items-center justify-center mb-6 z-10">
                    <step.icon className="w-6 h-6 text-primary" />
                    <span className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-primary text-primary-foreground text-[10px] font-bold flex items-center justify-center font-mono">
                      {i + 1}
                    </span>
                  </div>
                  <span className="text-xs font-mono text-primary mb-2">
                    {step.number}
                  </span>
                  <h3 className="font-display font-bold text-lg text-foreground mb-3">
                    {step.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

          <motion.div
            className="text-center mt-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
          >
            <Link to="/about">
              <Button variant="outline" className="gap-2">
                Read the technical details
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── 4. STATS BANNER ── */}
      <section className="py-16 px-4 bg-card border-y border-border">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {STATS.map((stat, i) => (
              <motion.div
                key={stat.label}
                className="text-center"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
              >
                <div className="flex items-center justify-center mb-3">
                  <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
                    <stat.icon className="w-4 h-4 text-primary" />
                  </div>
                </div>
                <div className="font-display font-bold text-3xl text-foreground mb-1">
                  {stat.value}
                </div>
                <div className="text-xs text-muted-foreground">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. FINAL CTA ── */}
      <section className="py-28 px-4 bg-background relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" aria-hidden>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] rounded-full bg-primary/5 blur-[80px]" />
        </div>

        <motion.div
          className="relative max-w-2xl mx-auto text-center"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/15 border border-primary/30 mb-8">
            <History className="w-7 h-7 text-primary" />
          </div>
          <h2 className="font-display font-bold text-4xl sm:text-5xl text-foreground mb-5">
            Start detecting fake reviews today
          </h2>
          <p className="text-muted-foreground text-lg mb-10">
            Completely free. No registration form. Just login with Internet
            Identity and get instant access to the full platform.
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-4 justify-center">
            <Link to="/login">
              <Button
                size="lg"
                className="px-10 h-12 font-semibold gap-2"
                data-ocid="home-final-cta"
              >
                <Shield className="w-4 h-4" />
                Get started — it's free
              </Button>
            </Link>
            <Link to="/dashboard/analyze">
              <Button
                variant="ghost"
                size="lg"
                className="h-12"
                data-ocid="home-try-now-cta"
              >
                Try without logging in →
              </Button>
            </Link>
          </div>
        </motion.div>
      </section>
    </Layout>
  );
}
