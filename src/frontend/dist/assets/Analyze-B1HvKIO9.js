import { r as reactExports, j as jsxRuntimeExports } from "./index-CqAkKc1H.js";
import { V as VerdictBadge } from "./Badge-DIacaVvF.js";
import { C as ConfidenceBar, S as SuspiciousWordHighlighter } from "./SuspiciousWordHighlighter-xyCe-ZKy.js";
import { D as DashboardLayout } from "./DashboardLayout-BBAV1adg.js";
import { c as createLucideIcon, B as Button, X } from "./button-Dnz9MkD-.js";
import { c as useSubmitReview, d as useBulkClassify } from "./useReviews-s91qBJIL.js";
import { S as Search } from "./search-B92wFg4k.js";
import { M as MotionConfigContext, i as isHTMLElement, u as useConstant, P as PresenceContext, a as usePresence, b as useIsomorphicLayoutEffect, L as LayoutGroupContext, m as motion } from "./proxy-DbYmcRz1.js";
import { U as Upload } from "./upload-Bb4FWT5W.js";
import { F as FileText } from "./file-text-BtKkQrvf.js";
import { C as CircleCheck } from "./circle-check-CTmljlb6.js";
import "./clock-CFsPIZxf.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["line", { x1: "12", x2: "12", y1: "8", y2: "12", key: "1pkeuh" }],
  ["line", { x1: "12", x2: "12.01", y1: "16", y2: "16", key: "4dfq90" }]
];
const CircleAlert = createLucideIcon("circle-alert", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [["path", { d: "M21 12a9 9 0 1 1-6.219-8.56", key: "13zald" }]];
const LoaderCircle = createLucideIcon("loader-circle", __iconNode);
function setRef(ref, value) {
  if (typeof ref === "function") {
    return ref(value);
  } else if (ref !== null && ref !== void 0) {
    ref.current = value;
  }
}
function composeRefs(...refs) {
  return (node) => {
    let hasCleanup = false;
    const cleanups = refs.map((ref) => {
      const cleanup = setRef(ref, node);
      if (!hasCleanup && typeof cleanup === "function") {
        hasCleanup = true;
      }
      return cleanup;
    });
    if (hasCleanup) {
      return () => {
        for (let i = 0; i < cleanups.length; i++) {
          const cleanup = cleanups[i];
          if (typeof cleanup === "function") {
            cleanup();
          } else {
            setRef(refs[i], null);
          }
        }
      };
    }
  };
}
function useComposedRefs(...refs) {
  return reactExports.useCallback(composeRefs(...refs), refs);
}
class PopChildMeasure extends reactExports.Component {
  getSnapshotBeforeUpdate(prevProps) {
    const element = this.props.childRef.current;
    if (isHTMLElement(element) && prevProps.isPresent && !this.props.isPresent && this.props.pop !== false) {
      const parent = element.offsetParent;
      const parentWidth = isHTMLElement(parent) ? parent.offsetWidth || 0 : 0;
      const parentHeight = isHTMLElement(parent) ? parent.offsetHeight || 0 : 0;
      const computedStyle = getComputedStyle(element);
      const size = this.props.sizeRef.current;
      size.height = parseFloat(computedStyle.height);
      size.width = parseFloat(computedStyle.width);
      size.top = element.offsetTop;
      size.left = element.offsetLeft;
      size.right = parentWidth - size.width - size.left;
      size.bottom = parentHeight - size.height - size.top;
    }
    return null;
  }
  /**
   * Required with getSnapshotBeforeUpdate to stop React complaining.
   */
  componentDidUpdate() {
  }
  render() {
    return this.props.children;
  }
}
function PopChild({ children, isPresent, anchorX, anchorY, root, pop }) {
  var _a;
  const id = reactExports.useId();
  const ref = reactExports.useRef(null);
  const size = reactExports.useRef({
    width: 0,
    height: 0,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  });
  const { nonce } = reactExports.useContext(MotionConfigContext);
  const childRef = ((_a = children.props) == null ? void 0 : _a.ref) ?? (children == null ? void 0 : children.ref);
  const composedRef = useComposedRefs(ref, childRef);
  reactExports.useInsertionEffect(() => {
    const { width, height, top, left, right, bottom } = size.current;
    if (isPresent || pop === false || !ref.current || !width || !height)
      return;
    const x = anchorX === "left" ? `left: ${left}` : `right: ${right}`;
    const y = anchorY === "bottom" ? `bottom: ${bottom}` : `top: ${top}`;
    ref.current.dataset.motionPopId = id;
    const style = document.createElement("style");
    if (nonce)
      style.nonce = nonce;
    const parent = root ?? document.head;
    parent.appendChild(style);
    if (style.sheet) {
      style.sheet.insertRule(`
          [data-motion-pop-id="${id}"] {
            position: absolute !important;
            width: ${width}px !important;
            height: ${height}px !important;
            ${x}px !important;
            ${y}px !important;
          }
        `);
    }
    return () => {
      var _a2;
      (_a2 = ref.current) == null ? void 0 : _a2.removeAttribute("data-motion-pop-id");
      if (parent.contains(style)) {
        parent.removeChild(style);
      }
    };
  }, [isPresent]);
  return jsxRuntimeExports.jsx(PopChildMeasure, { isPresent, childRef: ref, sizeRef: size, pop, children: pop === false ? children : reactExports.cloneElement(children, { ref: composedRef }) });
}
const PresenceChild = ({ children, initial, isPresent, onExitComplete, custom, presenceAffectsLayout, mode, anchorX, anchorY, root }) => {
  const presenceChildren = useConstant(newChildrenMap);
  const id = reactExports.useId();
  let isReusedContext = true;
  let context = reactExports.useMemo(() => {
    isReusedContext = false;
    return {
      id,
      initial,
      isPresent,
      custom,
      onExitComplete: (childId) => {
        presenceChildren.set(childId, true);
        for (const isComplete of presenceChildren.values()) {
          if (!isComplete)
            return;
        }
        onExitComplete && onExitComplete();
      },
      register: (childId) => {
        presenceChildren.set(childId, false);
        return () => presenceChildren.delete(childId);
      }
    };
  }, [isPresent, presenceChildren, onExitComplete]);
  if (presenceAffectsLayout && isReusedContext) {
    context = { ...context };
  }
  reactExports.useMemo(() => {
    presenceChildren.forEach((_, key) => presenceChildren.set(key, false));
  }, [isPresent]);
  reactExports.useEffect(() => {
    !isPresent && !presenceChildren.size && onExitComplete && onExitComplete();
  }, [isPresent]);
  children = jsxRuntimeExports.jsx(PopChild, { pop: mode === "popLayout", isPresent, anchorX, anchorY, root, children });
  return jsxRuntimeExports.jsx(PresenceContext.Provider, { value: context, children });
};
function newChildrenMap() {
  return /* @__PURE__ */ new Map();
}
const getChildKey = (child) => child.key || "";
function onlyElements(children) {
  const filtered = [];
  reactExports.Children.forEach(children, (child) => {
    if (reactExports.isValidElement(child))
      filtered.push(child);
  });
  return filtered;
}
const AnimatePresence = ({ children, custom, initial = true, onExitComplete, presenceAffectsLayout = true, mode = "sync", propagate = false, anchorX = "left", anchorY = "top", root }) => {
  const [isParentPresent, safeToRemove] = usePresence(propagate);
  const presentChildren = reactExports.useMemo(() => onlyElements(children), [children]);
  const presentKeys = propagate && !isParentPresent ? [] : presentChildren.map(getChildKey);
  const isInitialRender = reactExports.useRef(true);
  const pendingPresentChildren = reactExports.useRef(presentChildren);
  const exitComplete = useConstant(() => /* @__PURE__ */ new Map());
  const exitingComponents = reactExports.useRef(/* @__PURE__ */ new Set());
  const [diffedChildren, setDiffedChildren] = reactExports.useState(presentChildren);
  const [renderedChildren, setRenderedChildren] = reactExports.useState(presentChildren);
  useIsomorphicLayoutEffect(() => {
    isInitialRender.current = false;
    pendingPresentChildren.current = presentChildren;
    for (let i = 0; i < renderedChildren.length; i++) {
      const key = getChildKey(renderedChildren[i]);
      if (!presentKeys.includes(key)) {
        if (exitComplete.get(key) !== true) {
          exitComplete.set(key, false);
        }
      } else {
        exitComplete.delete(key);
        exitingComponents.current.delete(key);
      }
    }
  }, [renderedChildren, presentKeys.length, presentKeys.join("-")]);
  const exitingChildren = [];
  if (presentChildren !== diffedChildren) {
    let nextChildren = [...presentChildren];
    for (let i = 0; i < renderedChildren.length; i++) {
      const child = renderedChildren[i];
      const key = getChildKey(child);
      if (!presentKeys.includes(key)) {
        nextChildren.splice(i, 0, child);
        exitingChildren.push(child);
      }
    }
    if (mode === "wait" && exitingChildren.length) {
      nextChildren = exitingChildren;
    }
    setRenderedChildren(onlyElements(nextChildren));
    setDiffedChildren(presentChildren);
    return null;
  }
  const { forceRender } = reactExports.useContext(LayoutGroupContext);
  return jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: renderedChildren.map((child) => {
    const key = getChildKey(child);
    const isPresent = propagate && !isParentPresent ? false : presentChildren === renderedChildren || presentKeys.includes(key);
    const onExit = () => {
      if (exitingComponents.current.has(key)) {
        return;
      }
      if (exitComplete.has(key)) {
        exitingComponents.current.add(key);
        exitComplete.set(key, true);
      } else {
        return;
      }
      let isEveryExitComplete = true;
      exitComplete.forEach((isExitComplete) => {
        if (!isExitComplete)
          isEveryExitComplete = false;
      });
      if (isEveryExitComplete) {
        forceRender == null ? void 0 : forceRender();
        setRenderedChildren(pendingPresentChildren.current);
        propagate && (safeToRemove == null ? void 0 : safeToRemove());
        onExitComplete && onExitComplete();
      }
    };
    return jsxRuntimeExports.jsx(PresenceChild, { isPresent, initial: !isInitialRender.current || initial ? void 0 : false, custom, presenceAffectsLayout, mode, root, onExitComplete: isPresent ? void 0 : onExit, anchorX, anchorY, children: child }, key);
  }) });
};
const MAX_CHARS = 5e3;
function splitCSVLine(line) {
  const result = [];
  let current = "";
  let inQuotes = false;
  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (ch === '"') {
      if (inQuotes && line[i + 1] === '"') {
        current += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (ch === "," && !inQuotes) {
      result.push(current);
      current = "";
    } else {
      current += ch;
    }
  }
  result.push(current);
  return result;
}
function parseCSV(raw) {
  var _a;
  const lines = raw.split(/\r?\n/).filter((l) => l.trim().length > 0);
  if (lines.length < 2) return [];
  const headers = splitCSVLine(lines[0]).map(
    (h) => h.trim().toLowerCase().replace(/^"|"$/g, "")
  );
  const colIndex = headers.indexOf("review_text");
  const targetIdx = colIndex >= 0 ? colIndex : 0;
  const results = [];
  for (const line of lines.slice(1)) {
    const cols = splitCSVLine(line);
    const cell = (_a = cols[targetIdx]) == null ? void 0 : _a.trim().replace(/^"|"$/g, "");
    if (cell && cell.length > 2) results.push(cell);
  }
  return results;
}
function formatTimestamp(ts) {
  return new Date(Number(ts)).toLocaleString([], {
    dateStyle: "medium",
    timeStyle: "short"
  });
}
function ResultCard({ result }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      initial: { opacity: 0, scale: 0.97 },
      animate: { opacity: 1, scale: 1 },
      transition: { duration: 0.35, ease: "easeOut" },
      className: "card-elevated p-5 space-y-4 border-primary/20",
      "data-ocid": "analyze-result-card",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between flex-wrap gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-4 h-4 text-primary" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display font-semibold text-foreground", children: "Analysis Result" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(VerdictBadge, { verdict: result.verdict, size: "lg" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(ConfidenceBar, { value: result.confidence, verdict: result.verdict }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground font-medium mb-2", children: [
            "Review Text",
            result.suspiciousWords.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "ml-2 text-yellow-400", children: [
              "(",
              result.suspiciousWords.length,
              " suspicious phrase",
              result.suspiciousWords.length !== 1 && "s",
              " highlighted)"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-muted/30 rounded-lg p-3 border border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            SuspiciousWordHighlighter,
            {
              text: result.reviewText,
              suspiciousWords: result.suspiciousWords
            }
          ) })
        ] }),
        result.suspiciousWords.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground font-medium mb-2", children: "Flagged Indicators" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-1.5", children: result.suspiciousWords.map((word) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            "span",
            {
              className: "px-2 py-0.5 rounded bg-yellow-500/15 border border-yellow-500/30 text-yellow-400 text-xs font-medium",
              children: word
            },
            word
          )) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground/60", children: [
          "Analysed at ",
          formatTimestamp(result.timestamp)
        ] })
      ]
    }
  );
}
function BulkResultsTable({ results }) {
  const real = results.filter((r) => r.verdict === "REAL").length;
  const fake = results.filter((r) => r.verdict === "FAKE").length;
  const suspicious = results.filter((r) => r.verdict === "SUSPICIOUS").length;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      initial: { opacity: 0, y: 10 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.4 },
      className: "space-y-4",
      "data-ocid": "bulk-results",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-3", "data-ocid": "bulk-summary-bar", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card-elevated px-4 py-2.5 flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: "Total" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-lg font-display font-bold text-foreground tabular-nums", children: results.length })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card-elevated px-4 py-2.5 flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-2 h-2 rounded-full bg-green-400 flex-shrink-0" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: "Real" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-lg font-display font-bold text-green-400 tabular-nums", children: real })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card-elevated px-4 py-2.5 flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-2 h-2 rounded-full bg-red-400 flex-shrink-0" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: "Fake" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-lg font-display font-bold text-red-400 tabular-nums", children: fake })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card-elevated px-4 py-2.5 flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-2 h-2 rounded-full bg-yellow-400 flex-shrink-0" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: "Suspicious" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-lg font-display font-bold text-yellow-400 tabular-nums", children: suspicious })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "card-elevated overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-b border-border bg-muted/30", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-3 text-xs font-semibold text-muted-foreground w-12", children: "#" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-3 text-xs font-semibold text-muted-foreground", children: "Review Preview" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-3 text-xs font-semibold text-muted-foreground w-32", children: "Verdict" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right px-4 py-3 text-xs font-semibold text-muted-foreground w-28", children: "Confidence" })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { className: "divide-y divide-border", children: results.map((r, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "tr",
            {
              className: "hover:bg-muted/20 transition-colors",
              "data-ocid": `bulk-row-${idx + 1}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-muted-foreground/60 tabular-nums text-xs", children: idx + 1 }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 max-w-xs", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "truncate text-foreground text-xs", children: r.reviewText }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(VerdictBadge, { verdict: r.verdict, size: "sm" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-right", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs font-bold text-foreground tabular-nums", children: [
                  r.confidence,
                  "%"
                ] }) })
              ]
            },
            `bulk-${r.id}`
          )) })
        ] }) }) })
      ]
    }
  );
}
function Analyze() {
  const [reviewText, setReviewText] = reactExports.useState("");
  const [singleResult, setSingleResult] = reactExports.useState(
    null
  );
  const submitReview = useSubmitReview();
  const [csvFileName, setCsvFileName] = reactExports.useState(null);
  const [csvError, setCsvError] = reactExports.useState(null);
  const [csvProgress, setCsvProgress] = reactExports.useState(0);
  const [bulkResults, setBulkResults] = reactExports.useState(
    null
  );
  const fileInputRef = reactExports.useRef(null);
  const bulkClassify = useBulkClassify();
  async function handleSingleSubmit(e) {
    e.preventDefault();
    if (!reviewText.trim() || reviewText.length > MAX_CHARS) return;
    const result = await submitReview.mutateAsync(reviewText.trim());
    setSingleResult(result);
  }
  function handleClearSingle() {
    setReviewText("");
    setSingleResult(null);
  }
  function handleFileChange(e) {
    var _a;
    const file = (_a = e.target.files) == null ? void 0 : _a[0];
    if (!file) return;
    setCsvError(null);
    setBulkResults(null);
    setCsvProgress(0);
    if (!file.name.endsWith(".csv")) {
      setCsvError("Please upload a .csv file only.");
      return;
    }
    setCsvFileName(file.name);
    const reader = new FileReader();
    reader.onload = async (ev) => {
      var _a2;
      const raw = (_a2 = ev.target) == null ? void 0 : _a2.result;
      const texts = parseCSV(raw);
      if (texts.length === 0) {
        setCsvError(
          'No review_text column found. Ensure your CSV has a "review_text" header.'
        );
        return;
      }
      const interval = setInterval(() => {
        setCsvProgress((p) => Math.min(p + 10, 85));
      }, 120);
      try {
        const results = await bulkClassify.mutateAsync(texts);
        clearInterval(interval);
        setCsvProgress(100);
        setBulkResults(results);
      } catch {
        clearInterval(interval);
        setCsvError("Classification failed. Please try again.");
      }
    };
    reader.readAsText(file);
  }
  function handleClearCSV() {
    setCsvFileName(null);
    setCsvError(null);
    setCsvProgress(0);
    setBulkResults(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  }
  const charCount = reviewText.length;
  const isOverLimit = charCount > MAX_CHARS;
  const charPercent = Math.min(100, charCount / MAX_CHARS * 100);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(DashboardLayout, { title: "Analyze Reviews", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-4xl mx-auto space-y-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-7 h-7 rounded-lg bg-primary/15 border border-primary/30 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "w-3.5 h-3.5 text-primary" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-semibold text-foreground", children: "Single Review Analysis" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "form",
        {
          onSubmit: handleSingleSubmit,
          className: "card-elevated p-5 space-y-4",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "label",
                {
                  htmlFor: "review-input",
                  className: "block text-sm font-medium text-foreground mb-2",
                  children: "Paste Review Text"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "textarea",
                {
                  id: "review-input",
                  value: reviewText,
                  onChange: (e) => setReviewText(e.target.value),
                  placeholder: "Paste a product review here to check if it is genuine or fake…",
                  rows: 6,
                  maxLength: MAX_CHARS + 100,
                  className: `w-full rounded-lg bg-muted/30 border ${isOverLimit ? "border-red-500" : "border-border"} text-foreground placeholder:text-muted-foreground/50 text-sm px-4 py-3 resize-y focus:outline-none focus:ring-2 focus:ring-primary/50 transition-smooth font-body`,
                  "data-ocid": "review-textarea"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mt-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-1 w-32 rounded-full bg-muted overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: `h-full rounded-full transition-all duration-300 ${isOverLimit ? "bg-red-500" : charPercent > 80 ? "bg-yellow-500" : "bg-primary"}`,
                    style: { width: `${charPercent}%` }
                  }
                ) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "span",
                  {
                    className: `text-xs tabular-nums ${isOverLimit ? "text-red-400 font-semibold" : "text-muted-foreground"}`,
                    "data-ocid": "char-counter",
                    children: [
                      charCount.toLocaleString(),
                      " / ",
                      MAX_CHARS.toLocaleString()
                    ]
                  }
                )
              ] })
            ] }),
            isOverLimit && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-red-400 flex items-center gap-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "w-3.5 h-3.5 flex-shrink-0" }),
              "Review exceeds the maximum ",
              MAX_CHARS.toLocaleString(),
              " ",
              "character limit."
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 flex-wrap", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  type: "submit",
                  disabled: !reviewText.trim() || isOverLimit || submitReview.isPending,
                  className: "gap-2",
                  "data-ocid": "analyze-submit-btn",
                  children: submitReview.isPending ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-4 h-4 animate-spin" }),
                    "Analysing…"
                  ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "w-4 h-4" }),
                    "Analyse Review"
                  ] })
                }
              ),
              (reviewText.length > 0 || singleResult) && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Button,
                {
                  type: "button",
                  variant: "ghost",
                  onClick: handleClearSingle,
                  className: "gap-2 text-muted-foreground",
                  "data-ocid": "analyze-clear-btn",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-4 h-4" }),
                    "Clear"
                  ]
                }
              )
            ] })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: singleResult && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ResultCard, { result: singleResult }) }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex items-center gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 h-px bg-border" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground px-2 bg-background", children: "OR" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 h-px bg-border" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-7 h-7 rounded-lg bg-primary/15 border border-primary/30 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Upload, { className: "w-3.5 h-3.5 text-primary" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-semibold text-foreground", children: "Bulk CSV Upload" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card-elevated p-5 space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground", children: [
          "Upload a",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("code", { className: "text-primary font-mono bg-primary/10 px-1 rounded", children: ".csv" }),
          " ",
          "file with a",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("code", { className: "text-primary font-mono bg-primary/10 px-1 rounded", children: "review_text" }),
          " ",
          "column. All rows are classified simultaneously — results are shown inline and are not saved to history."
        ] }),
        !csvFileName ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              ref: fileInputRef,
              type: "file",
              accept: ".csv",
              id: "csv-upload",
              className: "sr-only",
              onChange: handleFileChange,
              "data-ocid": "csv-file-input"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "label",
            {
              htmlFor: "csv-upload",
              className: "flex flex-col items-center justify-center gap-3 w-full border-2 border-dashed border-border rounded-xl py-10 px-4 text-center cursor-pointer hover:border-primary/50 hover:bg-muted/20 transition-smooth group",
              "data-ocid": "csv-upload-zone",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-xl bg-muted/50 flex items-center justify-center group-hover:bg-primary/15 transition-smooth", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Upload, { className: "w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground", children: "Click to upload CSV" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground mt-0.5", children: [
                    ".csv files only — must include a",
                    " ",
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono", children: "review_text" }),
                    " column"
                  ] })
                ] })
              ]
            }
          )
        ] }) : (
          /* File selected */
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 bg-muted/30 border border-border rounded-lg px-4 py-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "w-4 h-4 text-primary flex-shrink-0" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-foreground font-medium flex-1 truncate", children: csvFileName }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                className: "p-1 rounded text-muted-foreground hover:text-foreground transition-colors",
                onClick: handleClearCSV,
                "aria-label": "Remove file",
                "data-ocid": "csv-clear-btn",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-4 h-4" })
              }
            )
          ] })
        ),
        csvFileName && csvProgress > 0 && csvProgress < 100 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { "data-ocid": "csv-progress", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between text-xs text-muted-foreground mb-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-3 h-3 animate-spin" }),
              "Classifying reviews…"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "tabular-nums font-medium", children: [
              csvProgress,
              "%"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full h-2 rounded-full bg-muted overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "h-full rounded-full bg-primary transition-all duration-300",
              style: { width: `${csvProgress}%` }
            }
          ) })
        ] }),
        csvError && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "p",
          {
            className: "text-xs text-red-400 flex items-center gap-1.5",
            "data-ocid": "csv-error",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "w-3.5 h-3.5 flex-shrink-0" }),
              csvError
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: bulkResults && bulkResults.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(BulkResultsTable, { results: bulkResults }) }) })
    ] })
  ] }) });
}
export {
  Analyze as default
};
