import { j as jsxRuntimeExports, c as cn } from "./index-CqAkKc1H.js";
const VERDICT_CONFIG = {
  REAL: {
    label: "Real",
    colorClass: "text-green-400",
    bgClass: "bg-green-500/15 border border-green-500/30",
    dotClass: "bg-green-400"
  },
  FAKE: {
    label: "Fake",
    colorClass: "text-red-400",
    bgClass: "bg-red-500/15 border border-red-500/30",
    dotClass: "bg-red-400"
  },
  SUSPICIOUS: {
    label: "Suspicious",
    colorClass: "text-yellow-400",
    bgClass: "bg-yellow-500/15 border border-yellow-500/30",
    dotClass: "bg-yellow-400"
  }
};
function VerdictBadge({ verdict, size = "md", className }) {
  const cfg = VERDICT_CONFIG[verdict];
  const sizeClasses = {
    sm: "px-2 py-0.5 text-xs gap-1",
    md: "px-2.5 py-1 text-xs gap-1.5",
    lg: "px-3 py-1.5 text-sm gap-2"
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "span",
    {
      className: cn(
        "inline-flex items-center font-semibold rounded-md select-none",
        cfg.bgClass,
        cfg.colorClass,
        sizeClasses[size],
        className
      ),
      "data-ocid": `badge-${verdict.toLowerCase()}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "span",
          {
            className: cn("w-1.5 h-1.5 rounded-full flex-shrink-0", cfg.dotClass),
            "aria-hidden": true
          }
        ),
        cfg.label
      ]
    }
  );
}
export {
  VerdictBadge as V
};
