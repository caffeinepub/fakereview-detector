import { r as reactExports, j as jsxRuntimeExports, g as LoadingSpinner } from "./index-CqAkKc1H.js";
import { D as DashboardLayout } from "./DashboardLayout-BBAV1adg.js";
import { a as useAnalytics } from "./useReviews-s91qBJIL.js";
import { F as FileText } from "./file-text-BtKkQrvf.js";
import { c as createLucideIcon } from "./button-Dnz9MkD-.js";
import { T as TrendingUp } from "./trending-up-wndHDJq4.js";
import { l as generateCategoricalChart, B as Bar, X as XAxis, Y as YAxis, n as formatAxisMap, R as ResponsiveContainer, P as PieChart, p as Pie, q as Cell, T as Tooltip, r as Legend, o as CartesianGrid } from "./PieChart-BtRjOAlw.js";
import "./search-B92wFg4k.js";
import "./clock-CFsPIZxf.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "M21.801 10A10 10 0 1 1 17 3.335", key: "yps3ct" }],
  ["path", { d: "m9 11 3 3L22 4", key: "1pflzl" }]
];
const CircleCheckBig = createLucideIcon("circle-check-big", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  [
    "path",
    {
      d: "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",
      key: "oel41y"
    }
  ],
  ["path", { d: "M12 8v4", key: "1got3b" }],
  ["path", { d: "M12 16h.01", key: "1drbdi" }]
];
const ShieldAlert = createLucideIcon("shield-alert", __iconNode);
var BarChart = generateCategoricalChart({
  chartName: "BarChart",
  GraphicalChild: Bar,
  defaultTooltipEventType: "axis",
  validateTooltipEventTypes: ["axis", "item"],
  axisComponents: [{
    axisType: "xAxis",
    AxisComp: XAxis
  }, {
    axisType: "yAxis",
    AxisComp: YAxis
  }],
  formatAxisMap
});
const COLOR_REAL = "#2dd4bf";
const COLOR_FAKE = "#f87171";
const COLOR_SUSPICIOUS = "#fbbf24";
function KpiCard({ label, value, sub, icon, accentClass, ocid }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card-elevated p-5 flex items-start gap-4", "data-ocid": ocid, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: `w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 ${accentClass}`,
        children: icon
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-medium text-muted-foreground uppercase tracking-wide mb-1", children: label }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-bold text-2xl text-foreground tabular-nums", children: value }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: sub })
    ] })
  ] });
}
function ChartTooltip({ active, payload, label }) {
  if (!active || !(payload == null ? void 0 : payload.length)) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-popover border border-border rounded-lg shadow-xl px-3 py-2 text-xs min-w-[120px]", children: [
    label && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-foreground mb-1.5", children: label }),
    payload.map((entry) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 py-0.5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "span",
        {
          className: "w-2.5 h-2.5 rounded-sm flex-shrink-0",
          style: { background: entry.fill ?? entry.color }
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: entry.name }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-foreground tabular-nums ml-auto pl-3", children: entry.value.toLocaleString() })
    ] }, entry.name))
  ] });
}
function PieLabel({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  value,
  percent
}) {
  if (percent < 0.06) return null;
  const RADIAN = Math.PI / 180;
  const r = innerRadius + (outerRadius - innerRadius) * 0.55;
  const x = cx + r * Math.cos(-midAngle * RADIAN);
  const y = cy + r * Math.sin(-midAngle * RADIAN);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "text",
    {
      x,
      y,
      fill: "white",
      textAnchor: "middle",
      dominantBaseline: "central",
      fontSize: 11,
      fontWeight: 700,
      children: `${value.toLocaleString()} (${(percent * 100).toFixed(0)}%)`
    }
  );
}
function Analytics() {
  const { data, isLoading } = useAnalytics();
  function fmt(n) {
    if (n >= 1e3) return `${(n / 1e3).toFixed(1)}k`;
    return n.toLocaleString();
  }
  function pct(part, total) {
    if (!total) return "0.0%";
    return `${(part / total * 100).toFixed(1)}%`;
  }
  const pieData = reactExports.useMemo(() => {
    if (!data) return [];
    return [
      { name: "Real", value: data.realCount, fill: COLOR_REAL },
      { name: "Fake", value: data.fakeCount, fill: COLOR_FAKE },
      {
        name: "Suspicious",
        value: data.suspiciousCount,
        fill: COLOR_SUSPICIOUS
      }
    ].filter((d) => d.value > 0);
  }, [data]);
  const barData = reactExports.useMemo(() => {
    if (!(data == null ? void 0 : data.trend)) return [];
    return data.trend.slice(-7).map((pt) => ({
      day: new Date(pt.date).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric"
      }),
      Real: pt.real,
      Fake: pt.fake,
      Suspicious: pt.suspicious
    }));
  }, [data]);
  const fakeRate = (data == null ? void 0 : data.totalReviews) ? pct(data.fakeCount, data.totalReviews) : "—";
  const sevenDayTotal = barData.reduce(
    (s, d) => s + d.Real + d.Fake + d.Suspicious,
    0
  );
  const sevenDayFakeAvg = barData.length ? (barData.reduce((s, d) => s + d.Fake, 0) / barData.length).toFixed(1) : "0";
  return /* @__PURE__ */ jsxRuntimeExports.jsx(DashboardLayout, { title: "Analytics", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", "data-ocid": "analytics-page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-semibold text-foreground text-xl", children: "Analytics Overview" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-0.5", children: "Insights across all analysed reviews" })
    ] }),
    isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "py-24 flex justify-center",
        "data-ocid": "analytics-loading",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          LoadingSpinner,
          {
            fullPage: false,
            size: "lg",
            label: "Loading analytics…"
          }
        )
      }
    ) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4",
          "data-ocid": "analytics-kpi-grid",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              KpiCard,
              {
                label: "Total Reviews",
                value: fmt((data == null ? void 0 : data.totalReviews) ?? 0),
                sub: "All time",
                icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "w-5 h-5 text-primary" }),
                accentClass: "bg-primary/15 border border-primary/25",
                ocid: "kpi-total"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              KpiCard,
              {
                label: "Real Reviews",
                value: fmt((data == null ? void 0 : data.realCount) ?? 0),
                sub: `${pct((data == null ? void 0 : data.realCount) ?? 0, (data == null ? void 0 : data.totalReviews) ?? 0)} of total`,
                icon: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "w-5 h-5 text-green-400" }),
                accentClass: "bg-green-500/15 border border-green-500/25",
                ocid: "kpi-real"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              KpiCard,
              {
                label: "Fake Reviews",
                value: fmt((data == null ? void 0 : data.fakeCount) ?? 0),
                sub: `${pct((data == null ? void 0 : data.fakeCount) ?? 0, (data == null ? void 0 : data.totalReviews) ?? 0)} of total`,
                icon: /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldAlert, { className: "w-5 h-5 text-red-400" }),
                accentClass: "bg-red-500/15 border border-red-500/25",
                ocid: "kpi-fake"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              KpiCard,
              {
                label: "Fake Detection Rate",
                value: fakeRate,
                sub: "Fake ÷ total reviews",
                icon: /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "w-5 h-5 text-yellow-400" }),
                accentClass: "bg-yellow-500/15 border border-yellow-500/25",
                ocid: "kpi-fake-rate"
              }
            )
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-5 gap-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "chart-container lg:col-span-2",
            "data-ocid": "chart-pie",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-semibold text-foreground text-sm mb-4", children: "Verdict Distribution" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mb-4", children: "Real vs Fake vs Suspicious — all time" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: "100%", height: 260, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(PieChart, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Pie,
                  {
                    data: pieData,
                    cx: "50%",
                    cy: "50%",
                    outerRadius: 105,
                    dataKey: "value",
                    labelLine: false,
                    label: (props) => /* @__PURE__ */ jsxRuntimeExports.jsx(PieLabel, { ...props }),
                    animationBegin: 100,
                    animationDuration: 800,
                    children: pieData.map((entry) => /* @__PURE__ */ jsxRuntimeExports.jsx(Cell, { fill: entry.fill }, entry.name))
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Tooltip, { content: /* @__PURE__ */ jsxRuntimeExports.jsx(ChartTooltip, {}) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Legend,
                  {
                    iconType: "circle",
                    iconSize: 8,
                    formatter: (value) => /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: value })
                  }
                )
              ] }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-3 gap-2 border-t border-border pt-3 mt-2", children: [
                {
                  label: "Real",
                  value: (data == null ? void 0 : data.realCount) ?? 0,
                  color: COLOR_REAL
                },
                {
                  label: "Fake",
                  value: (data == null ? void 0 : data.fakeCount) ?? 0,
                  color: COLOR_FAKE
                },
                {
                  label: "Suspicious",
                  value: (data == null ? void 0 : data.suspiciousCount) ?? 0,
                  color: COLOR_SUSPICIOUS
                }
              ].map(({ label, value, color }) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    className: "inline-block w-2.5 h-2.5 rounded-full mb-1",
                    style: { background: color }
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: label }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "p",
                  {
                    className: "text-sm font-bold tabular-nums",
                    style: { color },
                    children: fmt(value)
                  }
                )
              ] }, label)) })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "chart-container lg:col-span-3",
            "data-ocid": "chart-bar",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-semibold text-foreground text-sm mb-1", children: "7-Day Trend" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mb-4", children: "Stacked daily counts — Real, Fake, Suspicious" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: "100%", height: 260, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                BarChart,
                {
                  data: barData,
                  margin: { top: 4, right: 8, left: -8, bottom: 0 },
                  barCategoryGap: "28%",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      CartesianGrid,
                      {
                        strokeDasharray: "3 3",
                        stroke: "oklch(0.26 0.018 260 / 0.6)",
                        vertical: false
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      XAxis,
                      {
                        dataKey: "day",
                        tick: { fontSize: 11, fill: "oklch(0.52 0.012 260)" },
                        axisLine: false,
                        tickLine: false
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      YAxis,
                      {
                        tick: { fontSize: 11, fill: "oklch(0.52 0.012 260)" },
                        axisLine: false,
                        tickLine: false,
                        allowDecimals: false
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Tooltip,
                      {
                        content: /* @__PURE__ */ jsxRuntimeExports.jsx(ChartTooltip, {}),
                        cursor: { fill: "oklch(0.26 0.018 260 / 0.3)" }
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Legend,
                      {
                        iconType: "square",
                        iconSize: 8,
                        formatter: (value) => /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: value })
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Bar,
                      {
                        dataKey: "Real",
                        fill: COLOR_REAL,
                        stackId: "stack",
                        radius: [0, 0, 0, 0],
                        maxBarSize: 52
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Bar,
                      {
                        dataKey: "Suspicious",
                        fill: COLOR_SUSPICIOUS,
                        stackId: "stack",
                        radius: [0, 0, 0, 0],
                        maxBarSize: 52
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Bar,
                      {
                        dataKey: "Fake",
                        fill: COLOR_FAKE,
                        stackId: "stack",
                        radius: [4, 4, 0, 0],
                        maxBarSize: 52
                      }
                    )
                  ]
                }
              ) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between flex-wrap gap-3 border-t border-border pt-3 mt-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: "7-day total:" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-semibold text-foreground tabular-nums", children: sevenDayTotal.toLocaleString() })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: "Avg fake / day:" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "span",
                    {
                      className: "text-xs font-semibold tabular-nums",
                      style: { color: COLOR_FAKE },
                      children: sevenDayFakeAvg
                    }
                  )
                ] })
              ] })
            ]
          }
        )
      ] })
    ] })
  ] }) });
}
export {
  Analytics as default
};
