import { r as reactExports, b as useRouterState, j as jsxRuntimeExports, L as Link, c as cn } from "./index-CqAkKc1H.js";
import { u as useAuth, S as Shield, B as Button, X, M as Menu, b as Slot, d as cva } from "./button-Dnz9MkD-.js";
const NAV_LINKS = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" }
];
function Layout({ children }) {
  const { isAuthenticated, logout } = useAuth();
  const [mobileOpen, setMobileOpen] = reactExports.useState(false);
  const { location } = useRouterState();
  const isActive = (path) => path === "/" ? location.pathname === "/" : location.pathname.startsWith(path);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen flex flex-col bg-background text-foreground", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "sticky top-0 z-40 bg-card border-b border-border shadow-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between h-16", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Link,
          {
            to: "/",
            className: "flex items-center gap-2 font-display font-bold text-xl text-foreground hover:text-primary transition-colors",
            "data-ocid": "nav-logo",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 rounded-lg bg-primary/20 border border-primary/40 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { className: "w-4 h-4 text-primary" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Sentinel" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "hidden sm:inline text-primary", children: "AI" })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "nav",
          {
            className: "hidden md:flex items-center gap-1",
            "aria-label": "Main navigation",
            children: NAV_LINKS.map((link) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              Link,
              {
                to: link.to,
                className: `px-4 py-2 rounded-md text-sm font-medium transition-colors ${isActive(link.to) ? "bg-primary/15 text-primary" : "text-muted-foreground hover:text-foreground hover:bg-muted"}`,
                "data-ocid": `nav-link-${link.label.toLowerCase()}`,
                children: link.label
              },
              link.to
            ))
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "hidden md:flex items-center gap-3", children: isAuthenticated ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/dashboard", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              variant: "outline",
              size: "sm",
              "data-ocid": "nav-dashboard-btn",
              children: "Dashboard"
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              variant: "ghost",
              size: "sm",
              onClick: logout,
              "data-ocid": "nav-logout-btn",
              children: "Log out"
            }
          )
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/login", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "sm", "data-ocid": "nav-login-btn", children: "Log in" }) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            className: "md:hidden p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-colors",
            onClick: () => setMobileOpen((v) => !v),
            "aria-label": mobileOpen ? "Close menu" : "Open menu",
            "data-ocid": "nav-mobile-toggle",
            children: mobileOpen ? /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-5 h-5" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Menu, { className: "w-5 h-5" })
          }
        )
      ] }) }),
      mobileOpen && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "md:hidden border-t border-border bg-card px-4 py-3 space-y-1", children: [
        NAV_LINKS.map((link) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          Link,
          {
            to: link.to,
            className: `block px-3 py-2 rounded-md text-sm font-medium transition-colors ${isActive(link.to) ? "bg-primary/15 text-primary" : "text-muted-foreground hover:text-foreground hover:bg-muted"}`,
            onClick: () => setMobileOpen(false),
            children: link.label
          },
          link.to
        )),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pt-2 border-t border-border", children: isAuthenticated ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/dashboard", onClick: () => setMobileOpen(false), children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", size: "sm", className: "w-full mb-2", children: "Dashboard" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              variant: "ghost",
              size: "sm",
              className: "w-full",
              onClick: logout,
              children: "Log out"
            }
          )
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/login", onClick: () => setMobileOpen(false), children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            size: "sm",
            className: "w-full",
            "data-ocid": "nav-mobile-login",
            children: "Log in"
          }
        ) }) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("main", { className: "flex-1", children }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("footer", { className: "bg-card border-t border-border py-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-muted-foreground", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { className: "w-4 h-4 text-primary" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display font-semibold text-foreground", children: "Sentinel AI" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
        "© ",
        (/* @__PURE__ */ new Date()).getFullYear(),
        ".",
        " ",
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "a",
          {
            href: `https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`,
            target: "_blank",
            rel: "noopener noreferrer",
            className: "hover:text-primary transition-colors",
            children: "Built with love using caffeine.ai"
          }
        )
      ] })
    ] }) })
  ] });
}
const badgeVariants = cva(
  "inline-flex items-center justify-center rounded-md border px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow] overflow-hidden",
  {
    variants: {
      variant: {
        default: "border-transparent bg-primary text-primary-foreground [a&]:hover:bg-primary/90",
        secondary: "border-transparent bg-secondary text-secondary-foreground [a&]:hover:bg-secondary/90",
        destructive: "border-transparent bg-destructive text-destructive-foreground [a&]:hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline: "text-foreground [a&]:hover:bg-accent [a&]:hover:text-accent-foreground"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
);
function Badge({
  className,
  variant,
  asChild = false,
  ...props
}) {
  const Comp = asChild ? Slot : "span";
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Comp,
    {
      "data-slot": "badge",
      className: cn(badgeVariants({ variant }), className),
      ...props
    }
  );
}
function Card({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      "data-slot": "card",
      className: cn(
        "bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm",
        className
      ),
      ...props
    }
  );
}
function CardContent({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      "data-slot": "card-content",
      className: cn("px-6", className),
      ...props
    }
  );
}
export {
  Badge as B,
  Card as C,
  Layout as L,
  CardContent as a
};
