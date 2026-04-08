import { j as jsxRuntimeExports, c as cn, r as reactExports } from "./index-CqAkKc1H.js";
const TRACK_COLORS = {
  REAL: "bg-green-500",
  FAKE: "bg-red-500",
  SUSPICIOUS: "bg-yellow-500"
};
const GLOW_COLORS = {
  REAL: "shadow-[0_0_8px_oklch(0.65_0.18_145/0.5)]",
  FAKE: "shadow-[0_0_8px_oklch(0.65_0.19_22/0.5)]",
  SUSPICIOUS: "shadow-[0_0_8px_oklch(0.7_0.15_85/0.5)]"
};
function ConfidenceBar({
  value,
  verdict,
  showLabel = true,
  className
}) {
  const clamped = Math.max(0, Math.min(100, value));
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: cn("w-full", className), "data-ocid": "confidence-bar", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-1.5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground font-medium", children: "Confidence" }),
      showLabel && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs font-bold text-foreground tabular-nums", children: [
        clamped,
        "%"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full h-2 rounded-full bg-muted overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: cn(
          "h-full rounded-full transition-all duration-700 ease-out",
          TRACK_COLORS[verdict],
          GLOW_COLORS[verdict]
        ),
        style: { width: `${clamped}%` },
        role: "progressbar",
        tabIndex: -1,
        "aria-valuenow": clamped,
        "aria-valuemin": 0,
        "aria-valuemax": 100,
        "aria-label": `Confidence: ${clamped}%`
      }
    ) })
  ] });
}
function SuspiciousWordHighlighter({
  text,
  suspiciousWords,
  className
}) {
  const segments = reactExports.useMemo(() => {
    if (!suspiciousWords.length) return [{ text, highlight: false }];
    const escaped = [...suspiciousWords].sort((a, b) => b.length - a.length).map((w) => w.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));
    const pattern = new RegExp(`(${escaped.join("|")})`, "gi");
    const parts = text.split(pattern);
    return parts.map((part) => ({
      text: part,
      highlight: suspiciousWords.some(
        (w) => w.toLowerCase() === part.toLowerCase()
      )
    }));
  }, [text, suspiciousWords]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "p",
    {
      className: cn(
        "text-sm text-foreground leading-relaxed break-words",
        className
      ),
      "data-ocid": "suspicious-highlighter",
      children: segments.map(
        (seg, i) => seg.highlight ? /* @__PURE__ */ jsxRuntimeExports.jsx(
          "mark",
          {
            className: "bg-yellow-500/20 text-yellow-400 font-medium rounded px-0.5 not-italic",
            children: seg.text
          },
          `h-${seg.text}-${i}`
        ) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: seg.text }, `t-${seg.text.slice(0, 8)}-${i}`)
      )
    }
  );
}
export {
  ConfidenceBar as C,
  SuspiciousWordHighlighter as S
};
