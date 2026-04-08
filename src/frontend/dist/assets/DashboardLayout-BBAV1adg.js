import { u as useNavigate, b as useRouterState, r as reactExports, j as jsxRuntimeExports, L as Link } from "./index-CqAkKc1H.js";
import { c as createLucideIcon, u as useAuth, X, M as Menu, S as Shield, B as Button } from "./button-Dnz9MkD-.js";
import { S as Search, C as ChartColumn } from "./search-B92wFg4k.js";
import { C as Clock } from "./clock-CFsPIZxf.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8", key: "5wwlr5" }],
  [
    "path",
    {
      d: "M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z",
      key: "1d0kgt"
    }
  ]
];
const House = createLucideIcon("house", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "m16 17 5-5-5-5", key: "1bji2h" }],
  ["path", { d: "M21 12H9", key: "dn1m92" }],
  ["path", { d: "M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4", key: "1uf3rs" }]
];
const LogOut = createLucideIcon("log-out", __iconNode);
const SIDEBAR_LINKS = [
  {
    to: "/dashboard",
    label: "Dashboard",
    icon: House,
    ocid: "sidebar-dashboard",
    exact: true
  },
  {
    to: "/dashboard/analyze",
    label: "Analyze",
    icon: Search,
    ocid: "sidebar-analyze"
  },
  {
    to: "/dashboard/history",
    label: "History",
    icon: Clock,
    ocid: "sidebar-history"
  },
  {
    to: "/dashboard/analytics",
    label: "Analytics",
    icon: ChartColumn,
    ocid: "sidebar-analytics"
  }
];
function DashboardLayout({ children, title }) {
  const { isAuthenticated, isLoading, logout, principal } = useAuth();
  const navigate = useNavigate();
  const { location } = useRouterState();
  const [mobileOpen, setMobileOpen] = reactExports.useState(false);
  reactExports.useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate({ to: "/login" });
    }
  }, [isAuthenticated, isLoading, navigate]);
  const isActive = (to, exact) => exact ? location.pathname === to : location.pathname.startsWith(to);
  const shortPrincipal = principal ? `${principal.slice(0, 5)}…${principal.slice(-4)}` : "—";
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-screen bg-background flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Loading session…" })
    ] }) });
  }
  if (!isAuthenticated) return null;
  const SidebarContent = () => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col h-full", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-4 py-5 border-b border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      Link,
      {
        to: "/",
        className: "flex items-center gap-2 font-display font-bold text-lg text-foreground hover:text-primary transition-colors",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 rounded-lg bg-primary/20 border border-primary/40 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { className: "w-4 h-4 text-primary" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Sentinel" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary text-sm font-medium", children: "AI" })
        ]
      }
    ) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "nav",
      {
        className: "flex-1 px-3 py-4 space-y-1",
        "aria-label": "Dashboard navigation",
        children: SIDEBAR_LINKS.map(({ to, label, icon: Icon, ocid, exact }) => {
          const active = isActive(to, exact);
          return /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Link,
            {
              to,
              className: `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-smooth ${active ? "bg-primary text-primary-foreground shadow-sm" : "text-muted-foreground hover:text-foreground hover:bg-muted"}`,
              "data-ocid": ocid,
              onClick: () => setMobileOpen(false),
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "w-4 h-4 flex-shrink-0" }),
                label
              ]
            },
            to
          );
        })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-3 py-4 border-t border-border", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 px-3 py-2 rounded-lg bg-muted/50 mb-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-7 h-7 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center flex-shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-bold text-primary", children: shortPrincipal.charAt(0).toUpperCase() }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-medium text-foreground truncate", children: "User" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground font-mono truncate", children: shortPrincipal })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          variant: "ghost",
          size: "sm",
          className: "w-full justify-start gap-2 text-muted-foreground hover:text-foreground",
          onClick: logout,
          "data-ocid": "sidebar-logout",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(LogOut, { className: "w-4 h-4" }),
            "Log out"
          ]
        }
      )
    ] })
  ] });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen flex bg-background text-foreground", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("aside", { className: "hidden lg:flex flex-col w-56 flex-shrink-0 bg-card border-r border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SidebarContent, {}) }),
    mobileOpen && /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "fixed inset-0 z-50 lg:hidden",
        onClick: () => setMobileOpen(false),
        onKeyDown: (e) => e.key === "Escape" && setMobileOpen(false),
        role: "presentation",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-background/80 backdrop-blur-sm" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "nav",
            {
              className: "absolute left-0 top-0 bottom-0 w-56 bg-card border-r border-border shadow-xl",
              onClick: (e) => e.stopPropagation(),
              onKeyDown: (e) => e.stopPropagation(),
              "aria-label": "Dashboard navigation",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-3 right-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    className: "p-1 rounded-md text-muted-foreground hover:text-foreground",
                    onClick: () => setMobileOpen(false),
                    "aria-label": "Close sidebar",
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-5 h-5" })
                  }
                ) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(SidebarContent, {})
              ]
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 flex flex-col min-w-0", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "sticky top-0 z-30 bg-card border-b border-border px-4 sm:px-6 h-14 flex items-center gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            className: "lg:hidden p-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-colors",
            onClick: () => setMobileOpen(true),
            "aria-label": "Open sidebar",
            "data-ocid": "dash-mobile-menu",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(Menu, { className: "w-5 h-5" })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display font-semibold text-foreground truncate", children: title ?? "Dashboard" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "ml-auto" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "main",
        {
          className: "flex-1 overflow-auto px-4 sm:px-6 py-6",
          "data-ocid": "dashboard-content",
          children
        }
      )
    ] })
  ] });
}
export {
  DashboardLayout as D
};
