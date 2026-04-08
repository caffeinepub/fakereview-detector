/**
 * Dashboard.tsx — Main dashboard index page.
 *
 * Displays a welcome card with the user's principal, quick-stat cards
 * (total reviews, real, fake, suspicious), Recharts trend area chart,
 * a verdict-breakdown pie chart, a recent-activity feed, and
 * quick-action cards linking to Analyze and History.
 *
 * All data comes from useAnalytics() + useReviewHistory() via React Query.
 * Charts rendered with Recharts (AreaChart + PieChart).
 */

import { useNavigate } from "@tanstack/react-router";
import {
  AlertTriangle,
  BarChart3,
  CheckCircle2,
  Clock,
  Search,
  Shield,
  TrendingUp,
  XCircle,
} from "lucide-react";
import { motion } from "motion/react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { VerdictBadge } from "../components/Badge";
import { DashboardLayout } from "../components/DashboardLayout";
import { useAuth } from "../hooks/useAuth";
import { useAnalytics, useReviewHistory } from "../hooks/useReviews";

// ─── Helpers ─────────────────────────────────────────────────────────────────

/** Format large numbers to compact form: 7400 → "7.4k" */
function compact(n: number): string {
  if (n >= 1000) return `${(n / 1000).toFixed(1)}k`;
  return String(n);
}

/** Format a BigInt timestamp to a human-readable time */
function formatTime(ts: bigint): string {
  return new Date(Number(ts)).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
}

// ─── Stat Card ────────────────────────────────────────────────────────────────

interface StatCardProps {
  label: string;
  value: string;
  icon: React.ReactNode;
  iconBg: string;
  iconColor: string;
  trend: string;
  trendUp: boolean;
}

function StatCard({
  label,
  value,
  icon,
  iconBg,
  iconColor,
  trend,
  trendUp,
}: StatCardProps) {
  return (
    <div className="card-elevated p-5 flex flex-col gap-3 hover:border-primary/30 transition-smooth">
      <div className="flex items-start justify-between">
        <p className="text-sm text-muted-foreground font-medium">{label}</p>
        <div
          className={`w-9 h-9 rounded-lg flex items-center justify-center ${iconBg}`}
        >
          <span className={iconColor}>{icon}</span>
        </div>
      </div>
      <p className="text-3xl font-display font-bold text-foreground tabular-nums">
        {value}
      </p>
      <p
        className={`text-xs flex items-center gap-1 font-medium ${trendUp ? "text-green-400" : "text-red-400"}`}
      >
        <TrendingUp
          className={`w-3 h-3 ${!trendUp ? "rotate-180" : ""}`}
          aria-hidden
        />
        {trend} this month
      </p>
    </div>
  );
}

// ─── Quick Action Card ────────────────────────────────────────────────────────

interface QuickActionProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  to: string;
  cta: string;
  ocid: string;
}

function QuickActionCard({
  title,
  description,
  icon,
  to,
  cta,
  ocid,
}: QuickActionProps) {
  const navigate = useNavigate();
  return (
    <button
      type="button"
      className="card-elevated p-5 flex flex-col gap-3 cursor-pointer hover:border-primary/40 hover:bg-muted/10 transition-smooth group text-left w-full"
      onClick={() => navigate({ to })}
      data-ocid={ocid}
      aria-label={title}
    >
      <div className="w-10 h-10 rounded-xl bg-primary/15 border border-primary/30 flex items-center justify-center text-primary group-hover:bg-primary/25 transition-smooth">
        {icon}
      </div>
      <div>
        <h3 className="font-display font-semibold text-foreground mb-0.5">
          {title}
        </h3>
        <p className="text-sm text-muted-foreground leading-relaxed">
          {description}
        </p>
      </div>
      <span className="text-xs text-primary font-semibold group-hover:underline mt-auto">
        {cta} →
      </span>
    </button>
  );
}

// ─── Dashboard Page ───────────────────────────────────────────────────────────

export default function Dashboard() {
  const { principal } = useAuth();
  const { data: analytics, isLoading: analyticsLoading } = useAnalytics();
  const { data: historyPage } = useReviewHistory({}, { page: 1, pageSize: 5 });

  // Short principal display
  const shortId = principal
    ? `${principal.slice(0, 6)}…${principal.slice(-4)}`
    : "—";

  // Pie chart data
  const pieData = analytics
    ? [
        { name: "Real", value: analytics.realCount, fill: "#4ade80" },
        { name: "Fake", value: analytics.fakeCount, fill: "#f87171" },
        {
          name: "Suspicious",
          value: analytics.suspiciousCount,
          fill: "#facc15",
        },
      ]
    : [];

  // Trend chart: last 14 days
  const trendData = (analytics?.trend ?? []).slice(-14).map((p) => ({
    date: p.date.slice(5), // "MM-DD"
    total: p.total,
    fake: p.fake,
    real: p.real,
  }));

  const recentItems = historyPage?.items ?? [];

  return (
    <DashboardLayout title="Dashboard">
      <div className="space-y-6 max-w-7xl mx-auto">
        {/* ── Welcome banner ── */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="card-elevated p-5 flex items-center gap-4"
          data-ocid="dash-welcome"
        >
          <div className="w-12 h-12 rounded-xl bg-primary/20 border border-primary/40 flex items-center justify-center flex-shrink-0">
            <Shield className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h2 className="font-display font-bold text-foreground text-lg leading-snug">
              Welcome back,{" "}
              <span className="text-primary font-mono text-base">
                {shortId}
              </span>
            </h2>
            <p className="text-sm text-muted-foreground">
              Your AI-powered fake review detection dashboard is ready.
            </p>
          </div>
        </motion.div>

        {/* ── Stat cards ── */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {analyticsLoading ? (
            <>
              {[1, 2, 3, 4].map((k) => (
                <div
                  key={`sk-${k}`}
                  className="card-elevated p-5 h-32 animate-pulse bg-muted/40"
                />
              ))}
            </>
          ) : (
            <>
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 }}
              >
                <StatCard
                  label="Total Reviews Analysed"
                  value={compact(analytics?.totalReviews ?? 0)}
                  icon={<BarChart3 className="w-4 h-4" />}
                  iconBg="bg-primary/15"
                  iconColor="text-primary"
                  trend="+7.5%"
                  trendUp
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <StatCard
                  label="Genuine Reviews"
                  value={compact(analytics?.realCount ?? 0)}
                  icon={<CheckCircle2 className="w-4 h-4" />}
                  iconBg="bg-green-500/15"
                  iconColor="text-green-400"
                  trend="+7.3%"
                  trendUp
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
              >
                <StatCard
                  label="Confirmed Fake"
                  value={compact(analytics?.fakeCount ?? 0)}
                  icon={<XCircle className="w-4 h-4" />}
                  iconBg="bg-red-500/15"
                  iconColor="text-red-400"
                  trend="-2.3%"
                  trendUp={false}
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <StatCard
                  label="Suspected Fake"
                  value={compact(analytics?.suspiciousCount ?? 0)}
                  icon={<AlertTriangle className="w-4 h-4" />}
                  iconBg="bg-yellow-500/15"
                  iconColor="text-yellow-400"
                  trend="-65%"
                  trendUp={false}
                />
              </motion.div>
            </>
          )}
        </div>

        {/* ── Charts row ── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Area trend chart — 2/3 width */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="lg:col-span-2 chart-container"
            data-ocid="dash-trend-chart"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-display font-semibold text-foreground">
                Fake Review Trend
              </h3>
              <div className="flex items-center gap-3 text-xs text-muted-foreground">
                <span className="flex items-center gap-1.5">
                  <span className="w-3 h-0.5 rounded bg-primary inline-block" />
                  Total
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-3 h-0.5 rounded bg-red-400 inline-block" />
                  Fake
                </span>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={200}>
              <AreaChart
                data={trendData}
                margin={{ top: 4, right: 4, left: -20, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                    <stop
                      offset="5%"
                      stopColor="oklch(0.75 0.18 180)"
                      stopOpacity={0.28}
                    />
                    <stop
                      offset="95%"
                      stopColor="oklch(0.75 0.18 180)"
                      stopOpacity={0}
                    />
                  </linearGradient>
                  <linearGradient id="colorFake" x1="0" y1="0" x2="0" y2="1">
                    <stop
                      offset="5%"
                      stopColor="oklch(0.65 0.19 22)"
                      stopOpacity={0.28}
                    />
                    <stop
                      offset="95%"
                      stopColor="oklch(0.65 0.19 22)"
                      stopOpacity={0}
                    />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="oklch(0.26 0.018 260 / 0.5)"
                />
                <XAxis
                  dataKey="date"
                  tick={{ fontSize: 10, fill: "oklch(0.52 0.012 260)" }}
                  tickLine={false}
                  axisLine={false}
                  interval={3}
                />
                <YAxis
                  tick={{ fontSize: 10, fill: "oklch(0.52 0.012 260)" }}
                  tickLine={false}
                  axisLine={false}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "oklch(0.16 0.015 260)",
                    border: "1px solid oklch(0.26 0.018 260)",
                    borderRadius: 8,
                    fontSize: 12,
                  }}
                  labelStyle={{ color: "oklch(0.92 0.01 260)" }}
                />
                <Area
                  type="monotone"
                  dataKey="total"
                  stroke="oklch(0.75 0.18 180)"
                  strokeWidth={2}
                  fill="url(#colorTotal)"
                />
                <Area
                  type="monotone"
                  dataKey="fake"
                  stroke="oklch(0.65 0.19 22)"
                  strokeWidth={2}
                  fill="url(#colorFake)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Pie chart — 1/3 width */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="chart-container flex flex-col"
            data-ocid="dash-pie-chart"
          >
            <h3 className="font-display font-semibold text-foreground mb-4">
              Verdict Breakdown
            </h3>
            <div className="flex-1 flex items-center justify-center">
              <ResponsiveContainer width="100%" height={150}>
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={45}
                    outerRadius={68}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {pieData.map((entry) => (
                      <Cell key={entry.name} fill={entry.fill} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "oklch(0.16 0.015 260)",
                      border: "1px solid oklch(0.26 0.018 260)",
                      borderRadius: 8,
                      fontSize: 12,
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-2 mt-2">
              {pieData.map((d) => (
                <div
                  key={d.name}
                  className="flex items-center justify-between text-xs"
                >
                  <span className="flex items-center gap-2 text-muted-foreground">
                    <span
                      className="w-2 h-2 rounded-full inline-block"
                      style={{ background: d.fill }}
                    />
                    {d.name}
                  </span>
                  <span className="font-semibold text-foreground tabular-nums">
                    {compact(d.value)}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* ── Recent activity feed ── */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="chart-container"
          data-ocid="dash-recent-feed"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-display font-semibold text-foreground">
              Recent Analysis
            </h3>
            <span className="text-xs text-muted-foreground flex items-center gap-1">
              <Clock className="w-3 h-3" />
              Live feed
            </span>
          </div>

          {recentItems.length === 0 ? (
            /* Empty state */
            <div
              className="flex flex-col items-center justify-center py-10 gap-3 text-center"
              data-ocid="dash-empty-state"
            >
              <Shield className="w-10 h-10 text-muted-foreground/40" />
              <p className="text-sm text-muted-foreground">
                No reviews analysed yet.
              </p>
              <p className="text-xs text-muted-foreground/60">
                Head to Analyze to start detecting fake reviews.
              </p>
            </div>
          ) : (
            <div className="divide-y divide-border">
              {recentItems.map((item) => (
                <div
                  key={`review-${item.id}`}
                  className="py-3 flex items-center gap-3 hover:bg-muted/20 rounded px-1 transition-colors"
                  data-ocid={`feed-item-${item.id}`}
                >
                  <VerdictBadge verdict={item.verdict} size="sm" />
                  <p className="flex-1 text-sm text-muted-foreground truncate min-w-0">
                    {item.reviewText}
                  </p>
                  <span className="text-xs text-muted-foreground/60 flex-shrink-0 tabular-nums">
                    {formatTime(item.timestamp)}
                  </span>
                </div>
              ))}
            </div>
          )}
        </motion.div>

        {/* ── Quick action cards ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <QuickActionCard
            title="Analyze a Review"
            description="Paste a product review or upload a CSV file to detect fake reviews instantly using our NLP model."
            icon={<Search className="w-5 h-5" />}
            to="/dashboard/analyze"
            cta="Go to Analyze"
            ocid="quick-action-analyze"
          />
          <QuickActionCard
            title="View History"
            description="Browse all previously analysed reviews, filter by verdict, and export your results."
            icon={<Clock className="w-5 h-5" />}
            to="/dashboard/history"
            cta="View History"
            ocid="quick-action-history"
          />
        </div>
      </div>
    </DashboardLayout>
  );
}
