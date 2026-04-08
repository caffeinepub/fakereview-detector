/**
 * DashboardLayout — authenticated sidebar layout for all /dashboard/* routes.
 *
 * - Redirects unauthenticated users to /login
 * - Fixed sidebar with logo, navigation links, and user menu
 * - Responsive: sidebar collapses to a slide-in drawer on mobile
 */

import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import {
  BarChart3,
  Clock,
  Home,
  LogOut,
  Menu,
  Search,
  Shield,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { Button } from "./ui/button";

const SIDEBAR_LINKS = [
  {
    to: "/dashboard",
    label: "Dashboard",
    icon: Home,
    ocid: "sidebar-dashboard",
    exact: true,
  },
  {
    to: "/dashboard/analyze",
    label: "Analyze",
    icon: Search,
    ocid: "sidebar-analyze",
  },
  {
    to: "/dashboard/history",
    label: "History",
    icon: Clock,
    ocid: "sidebar-history",
  },
  {
    to: "/dashboard/analytics",
    label: "Analytics",
    icon: BarChart3,
    ocid: "sidebar-analytics",
  },
];

interface DashboardLayoutProps {
  children: React.ReactNode;
  /** Page title shown in the top bar */
  title?: string;
}

export function DashboardLayout({ children, title }: DashboardLayoutProps) {
  const { isAuthenticated, isLoading, logout, principal } = useAuth();
  const navigate = useNavigate();
  const { location } = useRouterState();
  const [mobileOpen, setMobileOpen] = useState(false);

  // Redirect unauthenticated users to login
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate({ to: "/login" });
    }
  }, [isAuthenticated, isLoading, navigate]);

  const isActive = (to: string, exact?: boolean) =>
    exact ? location.pathname === to : location.pathname.startsWith(to);

  // Short principal display
  const shortPrincipal = principal
    ? `${principal.slice(0, 5)}…${principal.slice(-4)}`
    : "—";

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
          <p className="text-sm text-muted-foreground">Loading session…</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) return null;

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="px-4 py-5 border-b border-border">
        <Link
          to="/"
          className="flex items-center gap-2 font-display font-bold text-lg text-foreground hover:text-primary transition-colors"
        >
          <div className="w-8 h-8 rounded-lg bg-primary/20 border border-primary/40 flex items-center justify-center">
            <Shield className="w-4 h-4 text-primary" />
          </div>
          <span>Sentinel</span>
          <span className="text-primary text-sm font-medium">AI</span>
        </Link>
      </div>

      {/* Nav links */}
      <nav
        className="flex-1 px-3 py-4 space-y-1"
        aria-label="Dashboard navigation"
      >
        {SIDEBAR_LINKS.map(({ to, label, icon: Icon, ocid, exact }) => {
          const active = isActive(to, exact);
          return (
            <Link
              key={to}
              to={to}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-smooth ${
                active
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              }`}
              data-ocid={ocid}
              onClick={() => setMobileOpen(false)}
            >
              <Icon className="w-4 h-4 flex-shrink-0" />
              {label}
            </Link>
          );
        })}
      </nav>

      {/* User block */}
      <div className="px-3 py-4 border-t border-border">
        <div className="flex items-center gap-3 px-3 py-2 rounded-lg bg-muted/50 mb-2">
          <div className="w-7 h-7 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center flex-shrink-0">
            <span className="text-xs font-bold text-primary">
              {shortPrincipal.charAt(0).toUpperCase()}
            </span>
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-xs font-medium text-foreground truncate">User</p>
            <p className="text-xs text-muted-foreground font-mono truncate">
              {shortPrincipal}
            </p>
          </div>
        </div>
        <Button
          variant="ghost"
          size="sm"
          className="w-full justify-start gap-2 text-muted-foreground hover:text-foreground"
          onClick={logout}
          data-ocid="sidebar-logout"
        >
          <LogOut className="w-4 h-4" />
          Log out
        </Button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen flex bg-background text-foreground">
      {/* ── Desktop sidebar ── */}
      <aside className="hidden lg:flex flex-col w-56 flex-shrink-0 bg-card border-r border-border">
        <SidebarContent />
      </aside>

      {/* ── Mobile sidebar overlay ── */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-50 lg:hidden"
          onClick={() => setMobileOpen(false)}
          onKeyDown={(e) => e.key === "Escape" && setMobileOpen(false)}
          role="presentation"
        >
          <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" />
          <nav
            className="absolute left-0 top-0 bottom-0 w-56 bg-card border-r border-border shadow-xl"
            onClick={(e) => e.stopPropagation()}
            onKeyDown={(e) => e.stopPropagation()}
            aria-label="Dashboard navigation"
          >
            <div className="absolute top-3 right-3">
              <button
                type="button"
                className="p-1 rounded-md text-muted-foreground hover:text-foreground"
                onClick={() => setMobileOpen(false)}
                aria-label="Close sidebar"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <SidebarContent />
          </nav>
        </div>
      )}

      {/* ── Main ── */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <header className="sticky top-0 z-30 bg-card border-b border-border px-4 sm:px-6 h-14 flex items-center gap-4">
          <button
            type="button"
            className="lg:hidden p-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
            onClick={() => setMobileOpen(true)}
            aria-label="Open sidebar"
            data-ocid="dash-mobile-menu"
          >
            <Menu className="w-5 h-5" />
          </button>
          <h1 className="font-display font-semibold text-foreground truncate">
            {title ?? "Dashboard"}
          </h1>
          <div className="ml-auto" />
        </header>

        {/* Page content */}
        <main
          className="flex-1 overflow-auto px-4 sm:px-6 py-6"
          data-ocid="dashboard-content"
        >
          {children}
        </main>
      </div>
    </div>
  );
}

export default DashboardLayout;
