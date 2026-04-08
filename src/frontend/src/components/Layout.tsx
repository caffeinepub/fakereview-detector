/**
 * Layout — public-facing layout with header navigation and branded footer.
 * Used by: Home, About, Contact, Login pages.
 */

import { Link, useRouterState } from "@tanstack/react-router";
import { Menu, Shield, X } from "lucide-react";
import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { Button } from "./ui/button";

const NAV_LINKS = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
];

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const { isAuthenticated, logout } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);
  const { location } = useRouterState();

  const isActive = (path: string) =>
    path === "/"
      ? location.pathname === "/"
      : location.pathname.startsWith(path);

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      {/* ── Header ── */}
      <header className="sticky top-0 z-40 bg-card border-b border-border shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link
              to="/"
              className="flex items-center gap-2 font-display font-bold text-xl text-foreground hover:text-primary transition-colors"
              data-ocid="nav-logo"
            >
              <div className="w-8 h-8 rounded-lg bg-primary/20 border border-primary/40 flex items-center justify-center">
                <Shield className="w-4 h-4 text-primary" />
              </div>
              <span>Sentinel</span>
              <span className="hidden sm:inline text-primary">AI</span>
            </Link>

            {/* Desktop Nav */}
            <nav
              className="hidden md:flex items-center gap-1"
              aria-label="Main navigation"
            >
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive(link.to)
                      ? "bg-primary/15 text-primary"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  }`}
                  data-ocid={`nav-link-${link.label.toLowerCase()}`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* CTA */}
            <div className="hidden md:flex items-center gap-3">
              {isAuthenticated ? (
                <>
                  <Link to="/dashboard">
                    <Button
                      variant="outline"
                      size="sm"
                      data-ocid="nav-dashboard-btn"
                    >
                      Dashboard
                    </Button>
                  </Link>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={logout}
                    data-ocid="nav-logout-btn"
                  >
                    Log out
                  </Button>
                </>
              ) : (
                <Link to="/login">
                  <Button size="sm" data-ocid="nav-login-btn">
                    Log in
                  </Button>
                </Link>
              )}
            </div>

            {/* Mobile menu toggle */}
            <button
              type="button"
              className="md:hidden p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
              onClick={() => setMobileOpen((v) => !v)}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              data-ocid="nav-mobile-toggle"
            >
              {mobileOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="md:hidden border-t border-border bg-card px-4 py-3 space-y-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`block px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive(link.to)
                    ? "bg-primary/15 text-primary"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                }`}
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-2 border-t border-border">
              {isAuthenticated ? (
                <>
                  <Link to="/dashboard" onClick={() => setMobileOpen(false)}>
                    <Button variant="outline" size="sm" className="w-full mb-2">
                      Dashboard
                    </Button>
                  </Link>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-full"
                    onClick={logout}
                  >
                    Log out
                  </Button>
                </>
              ) : (
                <Link to="/login" onClick={() => setMobileOpen(false)}>
                  <Button
                    size="sm"
                    className="w-full"
                    data-ocid="nav-mobile-login"
                  >
                    Log in
                  </Button>
                </Link>
              )}
            </div>
          </div>
        )}
      </header>

      {/* ── Main Content ── */}
      <main className="flex-1">{children}</main>

      {/* ── Footer ── */}
      <footer className="bg-card border-t border-border py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-primary" />
            <span className="font-display font-semibold text-foreground">
              Sentinel AI
            </span>
          </div>
          <p>
            © {new Date().getFullYear()}.{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary transition-colors"
            >
              Built with love using caffeine.ai
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}

export default Layout;
