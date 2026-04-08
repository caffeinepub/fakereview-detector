/**
 * Login.tsx — Internet Identity authentication page.
 *
 * Features:
 *   - Calls useAuth().login() to trigger the Internet Identity flow
 *   - Redirects authenticated users to /dashboard automatically
 *   - Left panel: branding + trust indicators
 *   - Right panel: login card
 *   - Test account panel showing pre-existing demo users
 */

import { Link, useNavigate } from "@tanstack/react-router";
import {
  ArrowRight,
  CheckCircle2,
  Globe,
  Lock,
  Shield,
  UserCheck,
  Users,
  Zap,
} from "lucide-react";
import { motion } from "motion/react";
import { useEffect } from "react";
import Layout from "../components/Layout";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { Separator } from "../components/ui/separator";
import { useAuth } from "../hooks/useAuth";

// ─── Trust signals ────────────────────────────────────────────────────────────

const TRUST_POINTS = [
  {
    icon: Lock,
    text: "No password — secured by Internet Identity cryptographic keys",
  },
  {
    icon: Globe,
    text: "Your data lives on the decentralised Internet Computer network",
  },
  {
    icon: Shield,
    text: "Anonymous principal — no personal data is ever collected",
  },
  {
    icon: Users,
    text: "Multiple sessions are supported across all your devices",
  },
];

// ─── Platform feature list ─────────────────────────────────────────────────────

const FEATURES = [
  { icon: Zap, label: "Instant NLP analysis" },
  { icon: CheckCircle2, label: "Bulk CSV upload" },
  { icon: UserCheck, label: "Full review history" },
  { icon: Shield, label: "Analytics dashboard" },
];

// ─── Demo test accounts ───────────────────────────────────────────────────────

const TEST_ACCOUNTS = [
  {
    name: "Alice Researcher",
    role: "Power user",
    reviews: 247,
    description: "Regularly bulk-uploads Amazon product reviews for analysis.",
  },
  {
    name: "Bob Consumer",
    role: "Casual user",
    reviews: 34,
    description: "Checks individual reviews before making purchase decisions.",
  },
  {
    name: "Carol Admin",
    role: "Admin tester",
    reviews: 1892,
    description: "Tests all platform features including analytics and export.",
  },
];

// ─── Component ────────────────────────────────────────────────────────────────

export default function Login() {
  const { isAuthenticated, isLoading, login } = useAuth();
  const navigate = useNavigate();

  // Redirect authenticated users straight to the dashboard
  useEffect(() => {
    if (isAuthenticated) {
      navigate({ to: "/dashboard" });
    }
  }, [isAuthenticated, navigate]);

  return (
    <Layout>
      <div className="min-h-[calc(100vh-8rem)] px-4 py-12 bg-background">
        <div className="max-w-6xl mx-auto">
          {/* ── Two-column layout ── */}
          <div className="grid lg:grid-cols-2 gap-12 items-start mb-16">
            {/* Left: Branding + trust panel */}
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="hidden lg:block"
            >
              {/* Logo */}
              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 rounded-xl bg-primary/20 border border-primary/30 flex items-center justify-center">
                  <Shield className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h1 className="font-display font-bold text-2xl text-foreground">
                    Sentinel AI
                  </h1>
                  <p className="text-sm text-muted-foreground">
                    Fake Review Detection Platform
                  </p>
                </div>
              </div>

              <p className="text-muted-foreground text-lg leading-relaxed mb-8 max-w-md">
                Log in to access the full dashboard — analyse reviews, track
                history, and explore machine-learning-powered analytics.
              </p>

              {/* Feature list */}
              <div className="grid grid-cols-2 gap-3 mb-8">
                {FEATURES.map((f) => (
                  <div
                    key={f.label}
                    className="flex items-center gap-2.5 text-sm text-muted-foreground"
                  >
                    <div className="w-6 h-6 rounded-md bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <f.icon className="w-3.5 h-3.5 text-primary" />
                    </div>
                    {f.label}
                  </div>
                ))}
              </div>

              <Separator className="mb-8" />

              {/* Trust points */}
              <ul className="space-y-3.5">
                {TRUST_POINTS.map((point) => (
                  <li
                    key={point.text}
                    className="flex items-start gap-3 text-sm text-muted-foreground"
                  >
                    <div className="w-6 h-6 rounded-md bg-chart-1/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <point.icon className="w-3.5 h-3.5 text-chart-1" />
                    </div>
                    {point.text}
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Right: Login card */}
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="max-w-sm mx-auto w-full lg:mx-0"
            >
              <Card className="border-border shadow-lg" data-ocid="login-card">
                <CardContent className="p-8">
                  {/* Card header */}
                  <div className="text-center mb-8">
                    <div className="w-16 h-16 rounded-2xl bg-primary/15 border border-primary/25 flex items-center justify-center mx-auto mb-5">
                      <Lock className="w-7 h-7 text-primary" />
                    </div>
                    <h2 className="font-display font-bold text-2xl text-foreground mb-2">
                      Sign in to Sentinel
                    </h2>
                    <p className="text-sm text-muted-foreground">
                      Secure, passwordless login via{" "}
                      <span className="text-primary font-medium">
                        Internet Identity
                      </span>
                    </p>
                  </div>

                  {/* Login button */}
                  <Button
                    type="button"
                    className="w-full gap-2 h-12 text-base font-semibold mb-4"
                    onClick={login}
                    disabled={isLoading}
                    data-ocid="login-btn"
                  >
                    <Shield className="w-5 h-5" />
                    {isLoading
                      ? "Connecting…"
                      : "Log in with Internet Identity"}
                  </Button>

                  {/* What is Internet Identity? */}
                  <a
                    href="https://identity.ic0.app"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-1 text-xs text-muted-foreground hover:text-primary transition-colors mb-6"
                    data-ocid="login-ii-link"
                  >
                    What is Internet Identity?
                    <ArrowRight className="w-3 h-3" />
                  </a>

                  <Separator className="mb-6" />

                  {/* Security note */}
                  <div className="rounded-lg bg-muted/40 border border-border p-3.5">
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-chart-1 flex-shrink-0 mt-0.5" />
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        Your first login automatically creates your account. No
                        personal information is collected. Sessions are managed
                        by your device.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Back to home */}
              <p className="text-center mt-5 text-sm text-muted-foreground">
                No account needed?{" "}
                <Link
                  to="/dashboard/analyze"
                  className="text-primary hover:underline"
                  data-ocid="login-guest-link"
                >
                  Analyse a review as guest
                </Link>
              </p>
            </motion.div>
          </div>

          {/* ── Test Accounts ── */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="flex items-center gap-2 mb-6">
              <Users className="w-4 h-4 text-muted-foreground" />
              <h2 className="font-display font-semibold text-lg text-foreground">
                Demo Test Accounts
              </h2>
              <Badge
                variant="outline"
                className="text-xs border-chart-4/30 text-chart-4 bg-chart-4/10"
              >
                College project testing
              </Badge>
            </div>

            <p className="text-sm text-muted-foreground mb-6 max-w-2xl">
              These simulated profiles represent the typical personas that would
              use Sentinel AI. In production, each would be backed by a unique
              Internet Identity principal. Use the Login button above to create
              your own real session.
            </p>

            <div className="grid sm:grid-cols-3 gap-4">
              {TEST_ACCOUNTS.map((account, i) => (
                <motion.div
                  key={account.name}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + i * 0.08 }}
                >
                  <Card
                    className="border-border hover:border-primary/30 transition-smooth"
                    data-ocid={`test-account-${i + 1}`}
                  >
                    <CardContent className="p-5">
                      {/* Avatar */}
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-9 h-9 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center font-display font-bold text-sm text-primary">
                          {account.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </div>
                        <div className="min-w-0">
                          <p className="text-sm font-semibold text-foreground truncate">
                            {account.name}
                          </p>
                          <Badge
                            variant="secondary"
                            className="text-xs h-4 px-1.5"
                          >
                            {account.role}
                          </Badge>
                        </div>
                      </div>

                      <p className="text-xs text-muted-foreground leading-relaxed mb-3">
                        {account.description}
                      </p>

                      <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                        <Shield className="w-3 h-3 text-primary" />
                        <span>
                          <span className="text-foreground font-medium">
                            {account.reviews.toLocaleString()}
                          </span>{" "}
                          reviews analysed
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
}
