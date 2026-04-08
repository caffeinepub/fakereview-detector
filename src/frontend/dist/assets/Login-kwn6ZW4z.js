import { u as useNavigate, r as reactExports, j as jsxRuntimeExports, L as Link } from "./index-CqAkKc1H.js";
import { L as Layout, C as Card, a as CardContent, B as Badge } from "./card-DwINYogH.js";
import { c as createLucideIcon, u as useAuth, S as Shield, B as Button } from "./button-Dnz9MkD-.js";
import { S as Separator } from "./separator-Bj8sNeMW.js";
import { m as motion } from "./proxy-DbYmcRz1.js";
import { Z as Zap } from "./zap-JZjZYGHf.js";
import { C as CircleCheck } from "./circle-check-CTmljlb6.js";
import { G as Globe, A as ArrowRight } from "./globe-DF7VZ7bT.js";
import "./index-DgUwfZrK.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  ["rect", { width: "18", height: "11", x: "3", y: "11", rx: "2", ry: "2", key: "1w4ew1" }],
  ["path", { d: "M7 11V7a5 5 0 0 1 10 0v4", key: "fwvmzm" }]
];
const Lock = createLucideIcon("lock", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "m16 11 2 2 4-4", key: "9rsbq5" }],
  ["path", { d: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2", key: "1yyitq" }],
  ["circle", { cx: "9", cy: "7", r: "4", key: "nufk8" }]
];
const UserCheck = createLucideIcon("user-check", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2", key: "1yyitq" }],
  ["path", { d: "M16 3.128a4 4 0 0 1 0 7.744", key: "16gr8j" }],
  ["path", { d: "M22 21v-2a4 4 0 0 0-3-3.87", key: "kshegd" }],
  ["circle", { cx: "9", cy: "7", r: "4", key: "nufk8" }]
];
const Users = createLucideIcon("users", __iconNode);
const TRUST_POINTS = [
  {
    icon: Lock,
    text: "No password — secured by Internet Identity cryptographic keys"
  },
  {
    icon: Globe,
    text: "Your data lives on the decentralised Internet Computer network"
  },
  {
    icon: Shield,
    text: "Anonymous principal — no personal data is ever collected"
  },
  {
    icon: Users,
    text: "Multiple sessions are supported across all your devices"
  }
];
const FEATURES = [
  { icon: Zap, label: "Instant NLP analysis" },
  { icon: CircleCheck, label: "Bulk CSV upload" },
  { icon: UserCheck, label: "Full review history" },
  { icon: Shield, label: "Analytics dashboard" }
];
const TEST_ACCOUNTS = [
  {
    name: "Alice Researcher",
    role: "Power user",
    reviews: 247,
    description: "Regularly bulk-uploads Amazon product reviews for analysis."
  },
  {
    name: "Bob Consumer",
    role: "Casual user",
    reviews: 34,
    description: "Checks individual reviews before making purchase decisions."
  },
  {
    name: "Carol Admin",
    role: "Admin tester",
    reviews: 1892,
    description: "Tests all platform features including analytics and export."
  }
];
function Login() {
  const { isAuthenticated, isLoading, login } = useAuth();
  const navigate = useNavigate();
  reactExports.useEffect(() => {
    if (isAuthenticated) {
      navigate({ to: "/dashboard" });
    }
  }, [isAuthenticated, navigate]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Layout, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-[calc(100vh-8rem)] px-4 py-12 bg-background", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-6xl mx-auto", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid lg:grid-cols-2 gap-12 items-start mb-16", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, x: -24 },
          animate: { opacity: 1, x: 0 },
          transition: { duration: 0.6 },
          className: "hidden lg:block",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-8", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-12 h-12 rounded-xl bg-primary/20 border border-primary/30 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { className: "w-6 h-6 text-primary" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display font-bold text-2xl text-foreground", children: "Sentinel AI" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Fake Review Detection Platform" })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-lg leading-relaxed mb-8 max-w-md", children: "Log in to access the full dashboard — analyse reviews, track history, and explore machine-learning-powered analytics." }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 gap-3 mb-8", children: FEATURES.map((f) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "flex items-center gap-2.5 text-sm text-muted-foreground",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-6 h-6 rounded-md bg-primary/10 flex items-center justify-center flex-shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(f.icon, { className: "w-3.5 h-3.5 text-primary" }) }),
                  f.label
                ]
              },
              f.label
            )) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, { className: "mb-8" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-3.5", children: TRUST_POINTS.map((point) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "li",
              {
                className: "flex items-start gap-3 text-sm text-muted-foreground",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-6 h-6 rounded-md bg-chart-1/10 flex items-center justify-center flex-shrink-0 mt-0.5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(point.icon, { className: "w-3.5 h-3.5 text-chart-1" }) }),
                  point.text
                ]
              },
              point.text
            )) })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, x: 24 },
          animate: { opacity: 1, x: 0 },
          transition: { duration: 0.6, delay: 0.1 },
          className: "max-w-sm mx-auto w-full lg:mx-0",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "border-border shadow-lg", "data-ocid": "login-card", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-8", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center mb-8", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 rounded-2xl bg-primary/15 border border-primary/25 flex items-center justify-center mx-auto mb-5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "w-7 h-7 text-primary" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-bold text-2xl text-foreground mb-2", children: "Sign in to Sentinel" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground", children: [
                  "Secure, passwordless login via",
                  " ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary font-medium", children: "Internet Identity" })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Button,
                {
                  type: "button",
                  className: "w-full gap-2 h-12 text-base font-semibold mb-4",
                  onClick: login,
                  disabled: isLoading,
                  "data-ocid": "login-btn",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { className: "w-5 h-5" }),
                    isLoading ? "Connecting…" : "Log in with Internet Identity"
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "a",
                {
                  href: "https://identity.ic0.app",
                  target: "_blank",
                  rel: "noopener noreferrer",
                  className: "flex items-center justify-center gap-1 text-xs text-muted-foreground hover:text-primary transition-colors mb-6",
                  "data-ocid": "login-ii-link",
                  children: [
                    "What is Internet Identity?",
                    /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "w-3 h-3" })
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, { className: "mb-6" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-lg bg-muted/40 border border-border p-3.5", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-4 h-4 text-chart-1 flex-shrink-0 mt-0.5" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground leading-relaxed", children: "Your first login automatically creates your account. No personal information is collected. Sessions are managed by your device." })
              ] }) })
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-center mt-5 text-sm text-muted-foreground", children: [
              "No account needed?",
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Link,
                {
                  to: "/dashboard/analyze",
                  className: "text-primary hover:underline",
                  "data-ocid": "login-guest-link",
                  children: "Analyse a review as guest"
                }
              )
            ] })
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: 24 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.6, delay: 0.3 },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "w-4 h-4 text-muted-foreground" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-semibold text-lg text-foreground", children: "Demo Test Accounts" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Badge,
              {
                variant: "outline",
                className: "text-xs border-chart-4/30 text-chart-4 bg-chart-4/10",
                children: "College project testing"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mb-6 max-w-2xl", children: "These simulated profiles represent the typical personas that would use Sentinel AI. In production, each would be backed by a unique Internet Identity principal. Use the Login button above to create your own real session." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid sm:grid-cols-3 gap-4", children: TEST_ACCOUNTS.map((account, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.div,
            {
              initial: { opacity: 0, y: 12 },
              animate: { opacity: 1, y: 0 },
              transition: { delay: 0.4 + i * 0.08 },
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                Card,
                {
                  className: "border-border hover:border-primary/30 transition-smooth",
                  "data-ocid": `test-account-${i + 1}`,
                  children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-5", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-3", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-9 h-9 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center font-display font-bold text-sm text-primary", children: account.name.split(" ").map((n) => n[0]).join("") }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground truncate", children: account.name }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          Badge,
                          {
                            variant: "secondary",
                            className: "text-xs h-4 px-1.5",
                            children: account.role
                          }
                        )
                      ] })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground leading-relaxed mb-3", children: account.description }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 text-xs text-muted-foreground", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { className: "w-3 h-3 text-primary" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground font-medium", children: account.reviews.toLocaleString() }),
                        " ",
                        "reviews analysed"
                      ] })
                    ] })
                  ] })
                }
              )
            },
            account.name
          )) })
        ]
      }
    )
  ] }) }) });
}
export {
  Login as default
};
