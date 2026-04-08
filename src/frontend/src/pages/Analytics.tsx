/**
 * Analytics.tsx — Dashboard analytics with KPI summary cards and Recharts charts.
 *
 * Sections:
 *  1. Four KPI cards: Total Reviews, Real Count, Fake Count, Fake Detection Rate
 *  2. Pie chart (Recharts PieChart) — Real / Fake / Suspicious distribution
 *     with count + % labels
 *  3. Bar chart (Recharts BarChart) — 7-day stacked trend
 *     (Real, Fake, Suspicious per day)
 *
 * Color scheme:
 *  - Teal (#2dd4bf)  → Real
 *  - Red  (#f87171)  → Fake
 *  - Amber (#fbbf24) → Suspicious
 */

import { CheckCircle, FileText, ShieldAlert, TrendingUp } from "lucide-react";
import { useMemo } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { DashboardLayout } from "../components/DashboardLayout";
import { LoadingSpinner } from "../components/LoadingSpinner";
import { useAnalytics } from "../hooks/useReviews";

// ─── Chart colors (hex, OKLCH-derived) ───────────────────────────────────────

const COLOR_REAL = "#2dd4bf"; // teal
const COLOR_FAKE = "#f87171"; // red
const COLOR_SUSPICIOUS = "#fbbf24"; // amber

// ─── KPI card ─────────────────────────────────────────────────────────────────

interface KpiCardProps {
  label: string;
  value: string;
  sub: string;
  icon: React.ReactNode;
  /** Tailwind bg + border accent classes for the icon container */
  accentClass: string;
  ocid: string;
}

function KpiCard({ label, value, sub, icon, accentClass, ocid }: KpiCardProps) {
  return (
    <div className="card-elevated p-5 flex items-start gap-4" data-ocid={ocid}>
      <div
        className={`w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 ${accentClass}`}
      >
        {icon}
      </div>
      <div className="min-w-0">
        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-1">
          {label}
        </p>
        <p className="font-display font-bold text-2xl text-foreground tabular-nums">
          {value}
        </p>
        <p className="text-xs text-muted-foreground mt-0.5">{sub}</p>
      </div>
    </div>
  );
}

// ─── Custom chart tooltip ─────────────────────────────────────────────────────

interface TooltipPayloadEntry {
  name: string;
  value: number;
  fill: string;
  color?: string;
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: TooltipPayloadEntry[];
  label?: string;
}

function ChartTooltip({ active, payload, label }: CustomTooltipProps) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-popover border border-border rounded-lg shadow-xl px-3 py-2 text-xs min-w-[120px]">
      {label && <p className="font-semibold text-foreground mb-1.5">{label}</p>}
      {payload.map((entry) => (
        <div key={entry.name} className="flex items-center gap-2 py-0.5">
          <span
            className="w-2.5 h-2.5 rounded-sm flex-shrink-0"
            style={{ background: entry.fill ?? entry.color }}
          />
          <span className="text-muted-foreground">{entry.name}</span>
          <span className="font-semibold text-foreground tabular-nums ml-auto pl-3">
            {entry.value.toLocaleString()}
          </span>
        </div>
      ))}
    </div>
  );
}

// ─── Pie custom label (rendered inside slices) ────────────────────────────────

interface PieLabelProps {
  cx: number;
  cy: number;
  midAngle: number;
  innerRadius: number;
  outerRadius: number;
  value: number;
  percent: number;
}

function PieLabel({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  value,
  percent,
}: PieLabelProps) {
  if (percent < 0.06) return null; // skip tiny slices
  const RADIAN = Math.PI / 180;
  const r = innerRadius + (outerRadius - innerRadius) * 0.55;
  const x = cx + r * Math.cos(-midAngle * RADIAN);
  const y = cy + r * Math.sin(-midAngle * RADIAN);
  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor="middle"
      dominantBaseline="central"
      fontSize={11}
      fontWeight={700}
    >
      {`${value.toLocaleString()} (${(percent * 100).toFixed(0)}%)`}
    </text>
  );
}

// ─── Main page ─────────────────────────────────────────────────────────────────

export default function Analytics() {
  const { data, isLoading } = useAnalytics();

  // ── Format large numbers ──
  function fmt(n: number): string {
    if (n >= 1000) return `${(n / 1000).toFixed(1)}k`;
    return n.toLocaleString();
  }

  function pct(part: number, total: number): string {
    if (!total) return "0.0%";
    return `${((part / total) * 100).toFixed(1)}%`;
  }

  // ── Pie data ──
  const pieData = useMemo(() => {
    if (!data) return [];
    return [
      { name: "Real", value: data.realCount, fill: COLOR_REAL },
      { name: "Fake", value: data.fakeCount, fill: COLOR_FAKE },
      {
        name: "Suspicious",
        value: data.suspiciousCount,
        fill: COLOR_SUSPICIOUS,
      },
    ].filter((d) => d.value > 0);
  }, [data]);

  // ── Bar chart: last 7 days ──
  const barData = useMemo(() => {
    if (!data?.trend) return [];
    return data.trend.slice(-7).map((pt) => ({
      day: new Date(pt.date).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      }),
      Real: pt.real,
      Fake: pt.fake,
      Suspicious: pt.suspicious,
    }));
  }, [data]);

  // ── Derived stats ──
  const fakeRate = data?.totalReviews
    ? pct(data.fakeCount, data.totalReviews)
    : "—";

  const sevenDayTotal = barData.reduce(
    (s, d) => s + d.Real + d.Fake + d.Suspicious,
    0,
  );
  const sevenDayFakeAvg = barData.length
    ? (barData.reduce((s, d) => s + d.Fake, 0) / barData.length).toFixed(1)
    : "0";

  return (
    <DashboardLayout title="Analytics">
      <div className="space-y-6" data-ocid="analytics-page">
        {/* ── Page header ── */}
        <div>
          <h2 className="font-display font-semibold text-foreground text-xl">
            Analytics Overview
          </h2>
          <p className="text-sm text-muted-foreground mt-0.5">
            Insights across all analysed reviews
          </p>
        </div>

        {isLoading ? (
          <div
            className="py-24 flex justify-center"
            data-ocid="analytics-loading"
          >
            <LoadingSpinner
              fullPage={false}
              size="lg"
              label="Loading analytics…"
            />
          </div>
        ) : (
          <>
            {/* ── 4 KPI cards ── */}
            <div
              className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4"
              data-ocid="analytics-kpi-grid"
            >
              <KpiCard
                label="Total Reviews"
                value={fmt(data?.totalReviews ?? 0)}
                sub="All time"
                icon={<FileText className="w-5 h-5 text-primary" />}
                accentClass="bg-primary/15 border border-primary/25"
                ocid="kpi-total"
              />
              <KpiCard
                label="Real Reviews"
                value={fmt(data?.realCount ?? 0)}
                sub={`${pct(data?.realCount ?? 0, data?.totalReviews ?? 0)} of total`}
                icon={<CheckCircle className="w-5 h-5 text-green-400" />}
                accentClass="bg-green-500/15 border border-green-500/25"
                ocid="kpi-real"
              />
              <KpiCard
                label="Fake Reviews"
                value={fmt(data?.fakeCount ?? 0)}
                sub={`${pct(data?.fakeCount ?? 0, data?.totalReviews ?? 0)} of total`}
                icon={<ShieldAlert className="w-5 h-5 text-red-400" />}
                accentClass="bg-red-500/15 border border-red-500/25"
                ocid="kpi-fake"
              />
              <KpiCard
                label="Fake Detection Rate"
                value={fakeRate}
                sub="Fake ÷ total reviews"
                icon={<TrendingUp className="w-5 h-5 text-yellow-400" />}
                accentClass="bg-yellow-500/15 border border-yellow-500/25"
                ocid="kpi-fake-rate"
              />
            </div>

            {/* ── Charts row ── */}
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
              {/* ── Pie chart (2 cols) ── */}
              <div
                className="chart-container lg:col-span-2"
                data-ocid="chart-pie"
              >
                <h3 className="font-display font-semibold text-foreground text-sm mb-4">
                  Verdict Distribution
                </h3>
                <p className="text-xs text-muted-foreground mb-4">
                  Real vs Fake vs Suspicious — all time
                </p>

                <ResponsiveContainer width="100%" height={260}>
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      outerRadius={105}
                      dataKey="value"
                      labelLine={false}
                      label={(props: PieLabelProps) => <PieLabel {...props} />}
                      animationBegin={100}
                      animationDuration={800}
                    >
                      {pieData.map((entry) => (
                        <Cell key={entry.name} fill={entry.fill} />
                      ))}
                    </Pie>
                    <Tooltip content={<ChartTooltip />} />
                    <Legend
                      iconType="circle"
                      iconSize={8}
                      formatter={(value) => (
                        <span className="text-xs text-muted-foreground">
                          {value}
                        </span>
                      )}
                    />
                  </PieChart>
                </ResponsiveContainer>

                {/* Mini summary row */}
                <div className="grid grid-cols-3 gap-2 border-t border-border pt-3 mt-2">
                  {[
                    {
                      label: "Real",
                      value: data?.realCount ?? 0,
                      color: COLOR_REAL,
                    },
                    {
                      label: "Fake",
                      value: data?.fakeCount ?? 0,
                      color: COLOR_FAKE,
                    },
                    {
                      label: "Suspicious",
                      value: data?.suspiciousCount ?? 0,
                      color: COLOR_SUSPICIOUS,
                    },
                  ].map(({ label, value, color }) => (
                    <div key={label} className="text-center">
                      <span
                        className="inline-block w-2.5 h-2.5 rounded-full mb-1"
                        style={{ background: color }}
                      />
                      <p className="text-xs text-muted-foreground">{label}</p>
                      <p
                        className="text-sm font-bold tabular-nums"
                        style={{ color }}
                      >
                        {fmt(value)}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* ── Bar chart (3 cols) ── */}
              <div
                className="chart-container lg:col-span-3"
                data-ocid="chart-bar"
              >
                <h3 className="font-display font-semibold text-foreground text-sm mb-1">
                  7-Day Trend
                </h3>
                <p className="text-xs text-muted-foreground mb-4">
                  Stacked daily counts — Real, Fake, Suspicious
                </p>

                <ResponsiveContainer width="100%" height={260}>
                  <BarChart
                    data={barData}
                    margin={{ top: 4, right: 8, left: -8, bottom: 0 }}
                    barCategoryGap="28%"
                  >
                    <CartesianGrid
                      strokeDasharray="3 3"
                      stroke="oklch(0.26 0.018 260 / 0.6)"
                      vertical={false}
                    />
                    <XAxis
                      dataKey="day"
                      tick={{ fontSize: 11, fill: "oklch(0.52 0.012 260)" }}
                      axisLine={false}
                      tickLine={false}
                    />
                    <YAxis
                      tick={{ fontSize: 11, fill: "oklch(0.52 0.012 260)" }}
                      axisLine={false}
                      tickLine={false}
                      allowDecimals={false}
                    />
                    <Tooltip
                      content={<ChartTooltip />}
                      cursor={{ fill: "oklch(0.26 0.018 260 / 0.3)" }}
                    />
                    <Legend
                      iconType="square"
                      iconSize={8}
                      formatter={(value) => (
                        <span className="text-xs text-muted-foreground">
                          {value}
                        </span>
                      )}
                    />
                    {/* Stack: Real (bottom), Suspicious (middle), Fake (top) */}
                    <Bar
                      dataKey="Real"
                      fill={COLOR_REAL}
                      stackId="stack"
                      radius={[0, 0, 0, 0]}
                      maxBarSize={52}
                    />
                    <Bar
                      dataKey="Suspicious"
                      fill={COLOR_SUSPICIOUS}
                      stackId="stack"
                      radius={[0, 0, 0, 0]}
                      maxBarSize={52}
                    />
                    <Bar
                      dataKey="Fake"
                      fill={COLOR_FAKE}
                      stackId="stack"
                      radius={[4, 4, 0, 0]}
                      maxBarSize={52}
                    />
                  </BarChart>
                </ResponsiveContainer>

                {/* 7-day summary footer */}
                <div className="flex items-center justify-between flex-wrap gap-3 border-t border-border pt-3 mt-2">
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs text-muted-foreground">
                      7-day total:
                    </span>
                    <span className="text-xs font-semibold text-foreground tabular-nums">
                      {sevenDayTotal.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs text-muted-foreground">
                      Avg fake / day:
                    </span>
                    <span
                      className="text-xs font-semibold tabular-nums"
                      style={{ color: COLOR_FAKE }}
                    >
                      {sevenDayFakeAvg}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </DashboardLayout>
  );
}
