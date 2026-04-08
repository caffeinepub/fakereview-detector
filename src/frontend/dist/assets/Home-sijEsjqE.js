import { j as jsxRuntimeExports, L as Link } from "./index-CqAkKc1H.js";
import { L as Layout, B as Badge, C as Card, a as CardContent } from "./card-DwINYogH.js";
import { c as createLucideIcon, S as Shield, B as Button } from "./button-Dnz9MkD-.js";
import { m as motion } from "./proxy-DbYmcRz1.js";
import { Z as Zap } from "./zap-JZjZYGHf.js";
import { C as CircleCheck } from "./circle-check-CTmljlb6.js";
import { U as Upload } from "./upload-Bb4FWT5W.js";
import { C as ChartColumn, S as Search } from "./search-B92wFg4k.js";
import { F as FileText } from "./file-text-BtKkQrvf.js";
import { T as TrendingUp } from "./trending-up-wndHDJq4.js";
import { C as Clock } from "./clock-CFsPIZxf.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["ellipse", { cx: "12", cy: "5", rx: "9", ry: "3", key: "msslwz" }],
  ["path", { d: "M3 5V19A9 3 0 0 0 21 19V5", key: "1wlel7" }],
  ["path", { d: "M3 12A9 3 0 0 0 21 12", key: "mv7ke4" }]
];
const Database = createLucideIcon("database", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8", key: "1357e3" }],
  ["path", { d: "M3 3v5h5", key: "1xhq8a" }],
  ["path", { d: "M12 7v5l4 2", key: "1fdv2h" }]
];
const History = createLucideIcon("history", __iconNode);
const FEATURES = [
  {
    icon: Zap,
    label: "Instant Analysis",
    color: "text-primary",
    bg: "bg-primary/10 border-primary/20",
    title: "Instant Analysis",
    description: "Paste any product review and get a verdict within milliseconds. Our heuristic NLP engine tokenises, scores, and classifies in real time — no waiting.",
    stat: "< 200ms",
    statLabel: "avg response"
  },
  {
    icon: Upload,
    label: "Bulk Upload",
    color: "text-chart-4",
    bg: "bg-chart-4/10 border-chart-4/20",
    title: "CSV Bulk Upload",
    description: "Upload a CSV file with hundreds of reviews at once. Each row is classified independently with its own confidence score and suspicious-word highlights.",
    stat: "500+",
    statLabel: "reviews per batch"
  },
  {
    icon: ChartColumn,
    label: "History & Analytics",
    color: "text-chart-1",
    bg: "bg-chart-1/10 border-chart-1/20",
    title: "History & Analytics",
    description: "Every analysis is stored with a timestamp. Track fake-review trends over time, view distribution charts, and export your review history.",
    stat: "30-day",
    statLabel: "trend charts"
  }
];
const HOW_STEPS = [
  {
    number: "01",
    icon: FileText,
    title: "Submit a Review",
    description: "Enter a single review in the text area or upload a CSV file with multiple reviews for bulk analysis."
  },
  {
    number: "02",
    icon: Search,
    title: "NLP Processing",
    description: "Text is tokenised, stop words removed, TF-IDF features extracted, and scored against patterns learned from labelled datasets."
  },
  {
    number: "03",
    icon: CircleCheck,
    title: "Get Your Verdict",
    description: "Receive a Real / Suspicious / Fake label with a confidence percentage and highlighted suspicious phrases."
  }
];
const STATS = [
  { value: "7.4k+", label: "Reviews Analysed", icon: Database },
  { value: "94%", label: "Detection Accuracy", icon: TrendingUp },
  { value: "2.1k", label: "Fake Reviews Caught", icon: Shield },
  { value: "< 200ms", label: "Avg Response Time", icon: Clock }
];
function Home() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Layout, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "relative flex flex-col items-center justify-center min-h-[92vh] px-4 text-center bg-background overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute inset-0 pointer-events-none", "aria-hidden": true, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-primary/8 blur-[120px]" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute bottom-1/4 right-1/4 w-[350px] h-[350px] rounded-full bg-chart-1/6 blur-[80px]" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "absolute inset-0 opacity-[0.03]",
            style: {
              backgroundImage: "linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)",
              backgroundSize: "48px 48px"
            }
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-10 max-w-3xl mx-auto", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.div,
          {
            initial: { opacity: 0, y: -16 },
            animate: { opacity: 1, y: 0 },
            transition: { duration: 0.5 },
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Badge,
              {
                variant: "outline",
                className: "gap-1.5 px-3 py-1.5 text-xs font-semibold uppercase tracking-wider border-primary/30 text-primary bg-primary/10 mb-6",
                "data-ocid": "hero-badge",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { className: "w-3 h-3" }),
                  "AI-Powered Review Intelligence"
                ]
              }
            )
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.h1,
          {
            className: "font-display font-bold text-5xl sm:text-6xl lg:text-7xl text-foreground leading-[1.05] mb-6",
            initial: { opacity: 0, y: 24 },
            animate: { opacity: 1, y: 0 },
            transition: { duration: 0.6, delay: 0.1 },
            children: [
              "Detect Fake Reviews",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "block text-primary mt-2", children: "with AI" })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.p,
          {
            className: "text-muted-foreground text-lg sm:text-xl leading-relaxed max-w-2xl mx-auto mb-10",
            initial: { opacity: 0, y: 16 },
            animate: { opacity: 1, y: 0 },
            transition: { duration: 0.6, delay: 0.2 },
            children: [
              "Sentinel AI uses NLP and heuristic machine learning to classify product reviews as",
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-chart-1 font-semibold", children: "Real" }),
              ",",
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-chart-4 font-semibold", children: "Suspicious" }),
              ", or",
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive font-semibold", children: "Fake" }),
              " — protecting consumers and businesses from misleading content."
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            className: "flex flex-col sm:flex-row items-center gap-4 justify-center",
            initial: { opacity: 0, y: 16 },
            animate: { opacity: 1, y: 0 },
            transition: { duration: 0.6, delay: 0.3 },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/dashboard/analyze", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Button,
                {
                  size: "lg",
                  className: "gap-2 px-8 h-12 font-semibold",
                  "data-ocid": "hero-cta-analyze",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { className: "w-4 h-4" }),
                    "Analyse a Review Now"
                  ]
                }
              ) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/about", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  variant: "outline",
                  size: "lg",
                  className: "h-12 px-8",
                  "data-ocid": "hero-cta-about",
                  children: "How it works"
                }
              ) })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.div,
          {
            className: "mt-12 flex flex-wrap items-center justify-center gap-6 text-xs text-muted-foreground",
            initial: { opacity: 0 },
            animate: { opacity: 1 },
            transition: { duration: 0.6, delay: 0.5 },
            children: ["7,400+ reviews processed", "94% accuracy", "Free to use"].map(
              (label) => /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-3.5 h-3.5 text-chart-1" }),
                label
              ] }, label)
            )
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.div,
        {
          className: "absolute bottom-8 left-1/2 -translate-x-1/2",
          animate: { y: [0, 8, 0] },
          transition: {
            duration: 2,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut"
          },
          "aria-hidden": true,
          children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-5 h-8 rounded-full border border-border flex items-start justify-center pt-1.5", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-1 h-2 rounded-full bg-muted-foreground/60" }) })
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "py-24 px-4 bg-muted/20", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-6xl mx-auto", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          className: "text-center mb-16",
          initial: { opacity: 0, y: 20 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true },
          transition: { duration: 0.5 },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Badge,
              {
                variant: "outline",
                className: "mb-4 text-xs uppercase tracking-wider border-border text-muted-foreground",
                children: "Core capabilities"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-bold text-4xl text-foreground mb-4", children: "Everything you need to fight fake reviews" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-lg max-w-xl mx-auto", children: "A complete detection platform built for individuals, researchers, and businesses." })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid md:grid-cols-3 gap-6", children: FEATURES.map((feat, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.div,
        {
          initial: { opacity: 0, y: 24 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true },
          transition: { duration: 0.5, delay: i * 0.1 },
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "h-full border-border hover:border-primary/30 transition-smooth group", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-6 h-full flex flex-col", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: `w-11 h-11 rounded-xl border flex items-center justify-center mb-5 ${feat.bg}`,
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(feat.icon, { className: `w-5 h-5 ${feat.color}` })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-bold text-lg text-foreground mb-2", children: feat.title }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground leading-relaxed flex-1 mb-6", children: feat.description }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 pt-4 border-t border-border", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: `font-display font-bold text-2xl ${feat.color}`,
                  children: feat.stat
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: feat.statLabel })
            ] })
          ] }) })
        },
        feat.title
      )) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "py-24 px-4 bg-background", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-5xl mx-auto", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          className: "text-center mb-16",
          initial: { opacity: 0, y: 20 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Badge,
              {
                variant: "outline",
                className: "mb-4 text-xs uppercase tracking-wider border-border text-muted-foreground",
                children: "Process"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-bold text-4xl text-foreground mb-4", children: "Three steps to the truth" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-lg max-w-xl mx-auto", children: "Our pipeline processes your text through a reproducible NLP workflow in under a second." })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "hidden md:block absolute top-8 left-[calc(16.67%-1px)] right-[calc(16.67%-1px)] h-px bg-border",
            "aria-hidden": true
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid md:grid-cols-3 gap-8", children: HOW_STEPS.map((step, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            className: "flex flex-col items-center text-center",
            initial: { opacity: 0, y: 24 },
            whileInView: { opacity: 1, y: 0 },
            viewport: { once: true },
            transition: { duration: 0.5, delay: i * 0.15 },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative w-16 h-16 rounded-full bg-card border-2 border-primary/40 flex items-center justify-center mb-6 z-10", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(step.icon, { className: "w-6 h-6 text-primary" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute -top-2 -right-2 w-5 h-5 rounded-full bg-primary text-primary-foreground text-[10px] font-bold flex items-center justify-center font-mono", children: i + 1 })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-mono text-primary mb-2", children: step.number }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-bold text-lg text-foreground mb-3", children: step.title }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground leading-relaxed", children: step.description })
            ]
          },
          step.title
        )) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.div,
        {
          className: "text-center mt-12",
          initial: { opacity: 0 },
          whileInView: { opacity: 1 },
          viewport: { once: true },
          transition: { delay: 0.5 },
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/about", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", className: "gap-2", children: "Read the technical details" }) })
        }
      )
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "py-16 px-4 bg-card border-y border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-5xl mx-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-8", children: STATS.map((stat, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        className: "text-center",
        initial: { opacity: 0, scale: 0.9 },
        whileInView: { opacity: 1, scale: 1 },
        viewport: { once: true },
        transition: { duration: 0.4, delay: i * 0.08 },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center mb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(stat.icon, { className: "w-4 h-4 text-primary" }) }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-display font-bold text-3xl text-foreground mb-1", children: stat.value }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground", children: stat.label })
        ]
      },
      stat.label
    )) }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "py-28 px-4 bg-background relative overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 pointer-events-none", "aria-hidden": true, children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] rounded-full bg-primary/5 blur-[80px]" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          className: "relative max-w-2xl mx-auto text-center",
          initial: { opacity: 0, y: 24 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true },
          transition: { duration: 0.6 },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/15 border border-primary/30 mb-8", children: /* @__PURE__ */ jsxRuntimeExports.jsx(History, { className: "w-7 h-7 text-primary" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-bold text-4xl sm:text-5xl text-foreground mb-5", children: "Start detecting fake reviews today" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-lg mb-10", children: "Completely free. No registration form. Just login with Internet Identity and get instant access to the full platform." }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row items-center gap-4 justify-center", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/login", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Button,
                {
                  size: "lg",
                  className: "px-10 h-12 font-semibold gap-2",
                  "data-ocid": "home-final-cta",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { className: "w-4 h-4" }),
                    "Get started — it's free"
                  ]
                }
              ) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/dashboard/analyze", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  variant: "ghost",
                  size: "lg",
                  className: "h-12",
                  "data-ocid": "home-try-now-cta",
                  children: "Try without logging in →"
                }
              ) })
            ] })
          ]
        }
      )
    ] })
  ] });
}
export {
  Home as default
};
