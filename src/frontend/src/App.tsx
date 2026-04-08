/**
 * App.tsx — TanStack Router configuration and provider wrappers.
 *
 * Routes:
 *   /               → Home (public)
 *   /about          → About (public)
 *   /contact        → Contact (public)
 *   /login          → Login page
 *   /dashboard      → Dashboard index (protected)
 *   /dashboard/analyze   → Review Analyze (protected)
 *   /dashboard/history   → Review History (protected)
 *   /dashboard/analytics → Analytics Charts (protected)
 */

import {
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
  redirect,
} from "@tanstack/react-router";
import { Suspense, lazy } from "react";
import LoadingSpinner from "./components/LoadingSpinner";

// Lazy-loaded pages for code-splitting
const HomePage = lazy(() => import("./pages/Home"));
const AboutPage = lazy(() => import("./pages/About"));
const ContactPage = lazy(() => import("./pages/Contact"));
const LoginPage = lazy(() => import("./pages/Login"));
const DashboardPage = lazy(() => import("./pages/Dashboard"));
const AnalyzePage = lazy(() => import("./pages/Analyze"));
const HistoryPage = lazy(() => import("./pages/History"));
const AnalyticsPage = lazy(() => import("./pages/Analytics"));

// ─── Route Tree ──────────────────────────────────────────────────────────────

const rootRoute = createRootRoute();

const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: () => (
    <Suspense fallback={<LoadingSpinner />}>
      <HomePage />
    </Suspense>
  ),
});

const aboutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/about",
  component: () => (
    <Suspense fallback={<LoadingSpinner />}>
      <AboutPage />
    </Suspense>
  ),
});

const contactRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/contact",
  component: () => (
    <Suspense fallback={<LoadingSpinner />}>
      <ContactPage />
    </Suspense>
  ),
});

const loginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/login",
  component: () => (
    <Suspense fallback={<LoadingSpinner />}>
      <LoginPage />
    </Suspense>
  ),
});

const dashboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/dashboard",
  beforeLoad: () => {
    // Auth guard handled inside DashboardLayout via useAuth hook
  },
  component: () => (
    <Suspense fallback={<LoadingSpinner />}>
      <DashboardPage />
    </Suspense>
  ),
});

const analyzeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/dashboard/analyze",
  component: () => (
    <Suspense fallback={<LoadingSpinner />}>
      <AnalyzePage />
    </Suspense>
  ),
});

const historyRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/dashboard/history",
  component: () => (
    <Suspense fallback={<LoadingSpinner />}>
      <HistoryPage />
    </Suspense>
  ),
});

const analyticsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/dashboard/analytics",
  component: () => (
    <Suspense fallback={<LoadingSpinner />}>
      <AnalyticsPage />
    </Suspense>
  ),
});

// Catch-all: redirect to home
const notFoundRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "*",
  beforeLoad: () => {
    throw redirect({ to: "/" });
  },
  component: () => null,
});

const routeTree = rootRoute.addChildren([
  homeRoute,
  aboutRoute,
  contactRoute,
  loginRoute,
  dashboardRoute,
  analyzeRoute,
  historyRoute,
  analyticsRoute,
  notFoundRoute,
]);

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

// ─── App Root ─────────────────────────────────────────────────────────────────

export default function App() {
  return <RouterProvider router={router} />;
}
