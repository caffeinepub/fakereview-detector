import { R as React, d as clsx, r as reactExports, j as jsxRuntimeExports, u as useNavigate } from "./index-CqAkKc1H.js";
import { V as VerdictBadge } from "./Badge-DIacaVvF.js";
import { D as DashboardLayout } from "./DashboardLayout-BBAV1adg.js";
import { c as createLucideIcon, u as useAuth, S as Shield } from "./button-Dnz9MkD-.js";
import { a as useAnalytics, b as useReviewHistory } from "./useReviews-s91qBJIL.js";
import { m as motion } from "./proxy-DbYmcRz1.js";
import { C as ChartColumn, S as Search } from "./search-B92wFg4k.js";
import { C as CircleCheck } from "./circle-check-CTmljlb6.js";
import { f as filterProps, L as Layer, m as max, i as isNumber, C as Curve, A as Animate, a as interpolateNumber, b as isNil, c as isNan, d as isEqual, h as hasClipDot, e as LabelList, u as uniqueId, g as isFunction, G as Global, j as getValueByDataKey, k as getCateCoordinateOfLine, D as Dot, l as generateCategoricalChart, X as XAxis, Y as YAxis, n as formatAxisMap, R as ResponsiveContainer, o as CartesianGrid, T as Tooltip, P as PieChart, p as Pie, q as Cell } from "./PieChart-BtRjOAlw.js";
import { C as Clock } from "./clock-CFsPIZxf.js";
import { T as TrendingUp } from "./trending-up-wndHDJq4.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "m15 9-6 6", key: "1uzhvr" }],
  ["path", { d: "m9 9 6 6", key: "z0biqf" }]
];
const CircleX = createLucideIcon("circle-x", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  [
    "path",
    {
      d: "m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3",
      key: "wmoenq"
    }
  ],
  ["path", { d: "M12 9v4", key: "juzpu7" }],
  ["path", { d: "M12 17h.01", key: "p32p05" }]
];
const TriangleAlert = createLucideIcon("triangle-alert", __iconNode);
var _excluded = ["layout", "type", "stroke", "connectNulls", "isRange", "ref"], _excluded2 = ["key"];
var _Area;
function _typeof(o) {
  "@babel/helpers - typeof";
  return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o2) {
    return typeof o2;
  } : function(o2) {
    return o2 && "function" == typeof Symbol && o2.constructor === Symbol && o2 !== Symbol.prototype ? "symbol" : typeof o2;
  }, _typeof(o);
}
function _objectWithoutProperties(source, excluded) {
  if (source == null) return {};
  var target = _objectWithoutPropertiesLoose(source, excluded);
  var key, i;
  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
    for (i = 0; i < sourceSymbolKeys.length; i++) {
      key = sourceSymbolKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
      target[key] = source[key];
    }
  }
  return target;
}
function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  for (var key in source) {
    if (Object.prototype.hasOwnProperty.call(source, key)) {
      if (excluded.indexOf(key) >= 0) continue;
      target[key] = source[key];
    }
  }
  return target;
}
function _extends() {
  _extends = Object.assign ? Object.assign.bind() : function(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends.apply(this, arguments);
}
function ownKeys(e, r) {
  var t = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    r && (o = o.filter(function(r2) {
      return Object.getOwnPropertyDescriptor(e, r2).enumerable;
    })), t.push.apply(t, o);
  }
  return t;
}
function _objectSpread(e) {
  for (var r = 1; r < arguments.length; r++) {
    var t = null != arguments[r] ? arguments[r] : {};
    r % 2 ? ownKeys(Object(t), true).forEach(function(r2) {
      _defineProperty(e, r2, t[r2]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function(r2) {
      Object.defineProperty(e, r2, Object.getOwnPropertyDescriptor(t, r2));
    });
  }
  return e;
}
function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor);
  }
}
function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  Object.defineProperty(Constructor, "prototype", { writable: false });
  return Constructor;
}
function _callSuper(t, o, e) {
  return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e));
}
function _possibleConstructorReturn(self, call) {
  if (call && (_typeof(call) === "object" || typeof call === "function")) {
    return call;
  } else if (call !== void 0) {
    throw new TypeError("Derived constructors may only return object or undefined");
  }
  return _assertThisInitialized(self);
}
function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }
  return self;
}
function _isNativeReflectConstruct() {
  try {
    var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    }));
  } catch (t2) {
  }
  return (_isNativeReflectConstruct = function _isNativeReflectConstruct2() {
    return !!t;
  })();
}
function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf2(o2) {
    return o2.__proto__ || Object.getPrototypeOf(o2);
  };
  return _getPrototypeOf(o);
}
function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } });
  Object.defineProperty(subClass, "prototype", { writable: false });
  if (superClass) _setPrototypeOf(subClass, superClass);
}
function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf2(o2, p2) {
    o2.__proto__ = p2;
    return o2;
  };
  return _setPrototypeOf(o, p);
}
function _defineProperty(obj, key, value) {
  key = _toPropertyKey(key);
  if (key in obj) {
    Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key] = value;
  }
  return obj;
}
function _toPropertyKey(t) {
  var i = _toPrimitive(t, "string");
  return "symbol" == _typeof(i) ? i : i + "";
}
function _toPrimitive(t, r) {
  if ("object" != _typeof(t) || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r);
    if ("object" != _typeof(i)) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return String(t);
}
var Area = /* @__PURE__ */ function(_PureComponent) {
  function Area2() {
    var _this;
    _classCallCheck(this, Area2);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _callSuper(this, Area2, [].concat(args));
    _defineProperty(_this, "state", {
      isAnimationFinished: true
    });
    _defineProperty(_this, "id", uniqueId("recharts-area-"));
    _defineProperty(_this, "handleAnimationEnd", function() {
      var onAnimationEnd = _this.props.onAnimationEnd;
      _this.setState({
        isAnimationFinished: true
      });
      if (isFunction(onAnimationEnd)) {
        onAnimationEnd();
      }
    });
    _defineProperty(_this, "handleAnimationStart", function() {
      var onAnimationStart = _this.props.onAnimationStart;
      _this.setState({
        isAnimationFinished: false
      });
      if (isFunction(onAnimationStart)) {
        onAnimationStart();
      }
    });
    return _this;
  }
  _inherits(Area2, _PureComponent);
  return _createClass(Area2, [{
    key: "renderDots",
    value: function renderDots(needClip, clipDot, clipPathId) {
      var isAnimationActive = this.props.isAnimationActive;
      var isAnimationFinished = this.state.isAnimationFinished;
      if (isAnimationActive && !isAnimationFinished) {
        return null;
      }
      var _this$props = this.props, dot = _this$props.dot, points = _this$props.points, dataKey = _this$props.dataKey;
      var areaProps = filterProps(this.props, false);
      var customDotProps = filterProps(dot, true);
      var dots = points.map(function(entry, i) {
        var dotProps = _objectSpread(_objectSpread(_objectSpread({
          key: "dot-".concat(i),
          r: 3
        }, areaProps), customDotProps), {}, {
          index: i,
          cx: entry.x,
          cy: entry.y,
          dataKey,
          value: entry.value,
          payload: entry.payload,
          points
        });
        return Area2.renderDotItem(dot, dotProps);
      });
      var dotsProps = {
        clipPath: needClip ? "url(#clipPath-".concat(clipDot ? "" : "dots-").concat(clipPathId, ")") : null
      };
      return /* @__PURE__ */ React.createElement(Layer, _extends({
        className: "recharts-area-dots"
      }, dotsProps), dots);
    }
  }, {
    key: "renderHorizontalRect",
    value: function renderHorizontalRect(alpha) {
      var _this$props2 = this.props, baseLine = _this$props2.baseLine, points = _this$props2.points, strokeWidth = _this$props2.strokeWidth;
      var startX = points[0].x;
      var endX = points[points.length - 1].x;
      var width = alpha * Math.abs(startX - endX);
      var maxY = max(points.map(function(entry) {
        return entry.y || 0;
      }));
      if (isNumber(baseLine) && typeof baseLine === "number") {
        maxY = Math.max(baseLine, maxY);
      } else if (baseLine && Array.isArray(baseLine) && baseLine.length) {
        maxY = Math.max(max(baseLine.map(function(entry) {
          return entry.y || 0;
        })), maxY);
      }
      if (isNumber(maxY)) {
        return /* @__PURE__ */ React.createElement("rect", {
          x: startX < endX ? startX : startX - width,
          y: 0,
          width,
          height: Math.floor(maxY + (strokeWidth ? parseInt("".concat(strokeWidth), 10) : 1))
        });
      }
      return null;
    }
  }, {
    key: "renderVerticalRect",
    value: function renderVerticalRect(alpha) {
      var _this$props3 = this.props, baseLine = _this$props3.baseLine, points = _this$props3.points, strokeWidth = _this$props3.strokeWidth;
      var startY = points[0].y;
      var endY = points[points.length - 1].y;
      var height = alpha * Math.abs(startY - endY);
      var maxX = max(points.map(function(entry) {
        return entry.x || 0;
      }));
      if (isNumber(baseLine) && typeof baseLine === "number") {
        maxX = Math.max(baseLine, maxX);
      } else if (baseLine && Array.isArray(baseLine) && baseLine.length) {
        maxX = Math.max(max(baseLine.map(function(entry) {
          return entry.x || 0;
        })), maxX);
      }
      if (isNumber(maxX)) {
        return /* @__PURE__ */ React.createElement("rect", {
          x: 0,
          y: startY < endY ? startY : startY - height,
          width: maxX + (strokeWidth ? parseInt("".concat(strokeWidth), 10) : 1),
          height: Math.floor(height)
        });
      }
      return null;
    }
  }, {
    key: "renderClipRect",
    value: function renderClipRect(alpha) {
      var layout = this.props.layout;
      if (layout === "vertical") {
        return this.renderVerticalRect(alpha);
      }
      return this.renderHorizontalRect(alpha);
    }
  }, {
    key: "renderAreaStatically",
    value: function renderAreaStatically(points, baseLine, needClip, clipPathId) {
      var _this$props4 = this.props, layout = _this$props4.layout, type = _this$props4.type, stroke = _this$props4.stroke, connectNulls = _this$props4.connectNulls, isRange = _this$props4.isRange;
      _this$props4.ref;
      var others = _objectWithoutProperties(_this$props4, _excluded);
      return /* @__PURE__ */ React.createElement(Layer, {
        clipPath: needClip ? "url(#clipPath-".concat(clipPathId, ")") : null
      }, /* @__PURE__ */ React.createElement(Curve, _extends({}, filterProps(others, true), {
        points,
        connectNulls,
        type,
        baseLine,
        layout,
        stroke: "none",
        className: "recharts-area-area"
      })), stroke !== "none" && /* @__PURE__ */ React.createElement(Curve, _extends({}, filterProps(this.props, false), {
        className: "recharts-area-curve",
        layout,
        type,
        connectNulls,
        fill: "none",
        points
      })), stroke !== "none" && isRange && /* @__PURE__ */ React.createElement(Curve, _extends({}, filterProps(this.props, false), {
        className: "recharts-area-curve",
        layout,
        type,
        connectNulls,
        fill: "none",
        points: baseLine
      })));
    }
  }, {
    key: "renderAreaWithAnimation",
    value: function renderAreaWithAnimation(needClip, clipPathId) {
      var _this2 = this;
      var _this$props5 = this.props, points = _this$props5.points, baseLine = _this$props5.baseLine, isAnimationActive = _this$props5.isAnimationActive, animationBegin = _this$props5.animationBegin, animationDuration = _this$props5.animationDuration, animationEasing = _this$props5.animationEasing, animationId = _this$props5.animationId;
      var _this$state = this.state, prevPoints = _this$state.prevPoints, prevBaseLine = _this$state.prevBaseLine;
      return /* @__PURE__ */ React.createElement(Animate, {
        begin: animationBegin,
        duration: animationDuration,
        isActive: isAnimationActive,
        easing: animationEasing,
        from: {
          t: 0
        },
        to: {
          t: 1
        },
        key: "area-".concat(animationId),
        onAnimationEnd: this.handleAnimationEnd,
        onAnimationStart: this.handleAnimationStart
      }, function(_ref) {
        var t = _ref.t;
        if (prevPoints) {
          var prevPointsDiffFactor = prevPoints.length / points.length;
          var stepPoints = points.map(function(entry, index) {
            var prevPointIndex = Math.floor(index * prevPointsDiffFactor);
            if (prevPoints[prevPointIndex]) {
              var prev = prevPoints[prevPointIndex];
              var interpolatorX = interpolateNumber(prev.x, entry.x);
              var interpolatorY = interpolateNumber(prev.y, entry.y);
              return _objectSpread(_objectSpread({}, entry), {}, {
                x: interpolatorX(t),
                y: interpolatorY(t)
              });
            }
            return entry;
          });
          var stepBaseLine;
          if (isNumber(baseLine) && typeof baseLine === "number") {
            var interpolator = interpolateNumber(prevBaseLine, baseLine);
            stepBaseLine = interpolator(t);
          } else if (isNil(baseLine) || isNan(baseLine)) {
            var _interpolator = interpolateNumber(prevBaseLine, 0);
            stepBaseLine = _interpolator(t);
          } else {
            stepBaseLine = baseLine.map(function(entry, index) {
              var prevPointIndex = Math.floor(index * prevPointsDiffFactor);
              if (prevBaseLine[prevPointIndex]) {
                var prev = prevBaseLine[prevPointIndex];
                var interpolatorX = interpolateNumber(prev.x, entry.x);
                var interpolatorY = interpolateNumber(prev.y, entry.y);
                return _objectSpread(_objectSpread({}, entry), {}, {
                  x: interpolatorX(t),
                  y: interpolatorY(t)
                });
              }
              return entry;
            });
          }
          return _this2.renderAreaStatically(stepPoints, stepBaseLine, needClip, clipPathId);
        }
        return /* @__PURE__ */ React.createElement(Layer, null, /* @__PURE__ */ React.createElement("defs", null, /* @__PURE__ */ React.createElement("clipPath", {
          id: "animationClipPath-".concat(clipPathId)
        }, _this2.renderClipRect(t))), /* @__PURE__ */ React.createElement(Layer, {
          clipPath: "url(#animationClipPath-".concat(clipPathId, ")")
        }, _this2.renderAreaStatically(points, baseLine, needClip, clipPathId)));
      });
    }
  }, {
    key: "renderArea",
    value: function renderArea(needClip, clipPathId) {
      var _this$props6 = this.props, points = _this$props6.points, baseLine = _this$props6.baseLine, isAnimationActive = _this$props6.isAnimationActive;
      var _this$state2 = this.state, prevPoints = _this$state2.prevPoints, prevBaseLine = _this$state2.prevBaseLine, totalLength = _this$state2.totalLength;
      if (isAnimationActive && points && points.length && (!prevPoints && totalLength > 0 || !isEqual(prevPoints, points) || !isEqual(prevBaseLine, baseLine))) {
        return this.renderAreaWithAnimation(needClip, clipPathId);
      }
      return this.renderAreaStatically(points, baseLine, needClip, clipPathId);
    }
  }, {
    key: "render",
    value: function render() {
      var _filterProps;
      var _this$props7 = this.props, hide = _this$props7.hide, dot = _this$props7.dot, points = _this$props7.points, className = _this$props7.className, top = _this$props7.top, left = _this$props7.left, xAxis = _this$props7.xAxis, yAxis = _this$props7.yAxis, width = _this$props7.width, height = _this$props7.height, isAnimationActive = _this$props7.isAnimationActive, id = _this$props7.id;
      if (hide || !points || !points.length) {
        return null;
      }
      var isAnimationFinished = this.state.isAnimationFinished;
      var hasSinglePoint = points.length === 1;
      var layerClass = clsx("recharts-area", className);
      var needClipX = xAxis && xAxis.allowDataOverflow;
      var needClipY = yAxis && yAxis.allowDataOverflow;
      var needClip = needClipX || needClipY;
      var clipPathId = isNil(id) ? this.id : id;
      var _ref2 = (_filterProps = filterProps(dot, false)) !== null && _filterProps !== void 0 ? _filterProps : {
        r: 3,
        strokeWidth: 2
      }, _ref2$r = _ref2.r, r = _ref2$r === void 0 ? 3 : _ref2$r, _ref2$strokeWidth = _ref2.strokeWidth, strokeWidth = _ref2$strokeWidth === void 0 ? 2 : _ref2$strokeWidth;
      var _ref3 = hasClipDot(dot) ? dot : {}, _ref3$clipDot = _ref3.clipDot, clipDot = _ref3$clipDot === void 0 ? true : _ref3$clipDot;
      var dotSize = r * 2 + strokeWidth;
      return /* @__PURE__ */ React.createElement(Layer, {
        className: layerClass
      }, needClipX || needClipY ? /* @__PURE__ */ React.createElement("defs", null, /* @__PURE__ */ React.createElement("clipPath", {
        id: "clipPath-".concat(clipPathId)
      }, /* @__PURE__ */ React.createElement("rect", {
        x: needClipX ? left : left - width / 2,
        y: needClipY ? top : top - height / 2,
        width: needClipX ? width : width * 2,
        height: needClipY ? height : height * 2
      })), !clipDot && /* @__PURE__ */ React.createElement("clipPath", {
        id: "clipPath-dots-".concat(clipPathId)
      }, /* @__PURE__ */ React.createElement("rect", {
        x: left - dotSize / 2,
        y: top - dotSize / 2,
        width: width + dotSize,
        height: height + dotSize
      }))) : null, !hasSinglePoint ? this.renderArea(needClip, clipPathId) : null, (dot || hasSinglePoint) && this.renderDots(needClip, clipDot, clipPathId), (!isAnimationActive || isAnimationFinished) && LabelList.renderCallByParent(this.props, points));
    }
  }], [{
    key: "getDerivedStateFromProps",
    value: function getDerivedStateFromProps(nextProps, prevState) {
      if (nextProps.animationId !== prevState.prevAnimationId) {
        return {
          prevAnimationId: nextProps.animationId,
          curPoints: nextProps.points,
          curBaseLine: nextProps.baseLine,
          prevPoints: prevState.curPoints,
          prevBaseLine: prevState.curBaseLine
        };
      }
      if (nextProps.points !== prevState.curPoints || nextProps.baseLine !== prevState.curBaseLine) {
        return {
          curPoints: nextProps.points,
          curBaseLine: nextProps.baseLine
        };
      }
      return null;
    }
  }]);
}(reactExports.PureComponent);
_Area = Area;
_defineProperty(Area, "displayName", "Area");
_defineProperty(Area, "defaultProps", {
  stroke: "#3182bd",
  fill: "#3182bd",
  fillOpacity: 0.6,
  xAxisId: 0,
  yAxisId: 0,
  legendType: "line",
  connectNulls: false,
  // points of area
  points: [],
  dot: false,
  activeDot: true,
  hide: false,
  isAnimationActive: !Global.isSsr,
  animationBegin: 0,
  animationDuration: 1500,
  animationEasing: "ease"
});
_defineProperty(Area, "getBaseValue", function(props, item, xAxis, yAxis) {
  var layout = props.layout, chartBaseValue = props.baseValue;
  var itemBaseValue = item.props.baseValue;
  var baseValue = itemBaseValue !== null && itemBaseValue !== void 0 ? itemBaseValue : chartBaseValue;
  if (isNumber(baseValue) && typeof baseValue === "number") {
    return baseValue;
  }
  var numericAxis = layout === "horizontal" ? yAxis : xAxis;
  var domain = numericAxis.scale.domain();
  if (numericAxis.type === "number") {
    var domainMax = Math.max(domain[0], domain[1]);
    var domainMin = Math.min(domain[0], domain[1]);
    if (baseValue === "dataMin") {
      return domainMin;
    }
    if (baseValue === "dataMax") {
      return domainMax;
    }
    return domainMax < 0 ? domainMax : Math.max(Math.min(domain[0], domain[1]), 0);
  }
  if (baseValue === "dataMin") {
    return domain[0];
  }
  if (baseValue === "dataMax") {
    return domain[1];
  }
  return domain[0];
});
_defineProperty(Area, "getComposedData", function(_ref4) {
  var props = _ref4.props, item = _ref4.item, xAxis = _ref4.xAxis, yAxis = _ref4.yAxis, xAxisTicks = _ref4.xAxisTicks, yAxisTicks = _ref4.yAxisTicks, bandSize = _ref4.bandSize, dataKey = _ref4.dataKey, stackedData = _ref4.stackedData, dataStartIndex = _ref4.dataStartIndex, displayedData = _ref4.displayedData, offset = _ref4.offset;
  var layout = props.layout;
  var hasStack = stackedData && stackedData.length;
  var baseValue = _Area.getBaseValue(props, item, xAxis, yAxis);
  var isHorizontalLayout = layout === "horizontal";
  var isRange = false;
  var points = displayedData.map(function(entry, index) {
    var value;
    if (hasStack) {
      value = stackedData[dataStartIndex + index];
    } else {
      value = getValueByDataKey(entry, dataKey);
      if (!Array.isArray(value)) {
        value = [baseValue, value];
      } else {
        isRange = true;
      }
    }
    var isBreakPoint = value[1] == null || hasStack && getValueByDataKey(entry, dataKey) == null;
    if (isHorizontalLayout) {
      return {
        x: getCateCoordinateOfLine({
          axis: xAxis,
          ticks: xAxisTicks,
          bandSize,
          entry,
          index
        }),
        y: isBreakPoint ? null : yAxis.scale(value[1]),
        value,
        payload: entry
      };
    }
    return {
      x: isBreakPoint ? null : xAxis.scale(value[1]),
      y: getCateCoordinateOfLine({
        axis: yAxis,
        ticks: yAxisTicks,
        bandSize,
        entry,
        index
      }),
      value,
      payload: entry
    };
  });
  var baseLine;
  if (hasStack || isRange) {
    baseLine = points.map(function(entry) {
      var x = Array.isArray(entry.value) ? entry.value[0] : null;
      if (isHorizontalLayout) {
        return {
          x: entry.x,
          y: x != null && entry.y != null ? yAxis.scale(x) : null
        };
      }
      return {
        x: x != null ? xAxis.scale(x) : null,
        y: entry.y
      };
    });
  } else {
    baseLine = isHorizontalLayout ? yAxis.scale(baseValue) : xAxis.scale(baseValue);
  }
  return _objectSpread({
    points,
    baseLine,
    layout,
    isRange
  }, offset);
});
_defineProperty(Area, "renderDotItem", function(option, props) {
  var dotItem;
  if (/* @__PURE__ */ React.isValidElement(option)) {
    dotItem = /* @__PURE__ */ React.cloneElement(option, props);
  } else if (isFunction(option)) {
    dotItem = option(props);
  } else {
    var className = clsx("recharts-area-dot", typeof option !== "boolean" ? option.className : "");
    var key = props.key, rest = _objectWithoutProperties(props, _excluded2);
    dotItem = /* @__PURE__ */ React.createElement(Dot, _extends({}, rest, {
      key,
      className
    }));
  }
  return dotItem;
});
var AreaChart = generateCategoricalChart({
  chartName: "AreaChart",
  GraphicalChild: Area,
  axisComponents: [{
    axisType: "xAxis",
    AxisComp: XAxis
  }, {
    axisType: "yAxis",
    AxisComp: YAxis
  }],
  formatAxisMap
});
function compact(n) {
  if (n >= 1e3) return `${(n / 1e3).toFixed(1)}k`;
  return String(n);
}
function formatTime(ts) {
  return new Date(Number(ts)).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit"
  });
}
function StatCard({
  label,
  value,
  icon,
  iconBg,
  iconColor,
  trend,
  trendUp
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card-elevated p-5 flex flex-col gap-3 hover:border-primary/30 transition-smooth", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground font-medium", children: label }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: `w-9 h-9 rounded-lg flex items-center justify-center ${iconBg}`,
          children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: iconColor, children: icon })
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-3xl font-display font-bold text-foreground tabular-nums", children: value }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "p",
      {
        className: `text-xs flex items-center gap-1 font-medium ${trendUp ? "text-green-400" : "text-red-400"}`,
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            TrendingUp,
            {
              className: `w-3 h-3 ${!trendUp ? "rotate-180" : ""}`,
              "aria-hidden": true
            }
          ),
          trend,
          " this month"
        ]
      }
    )
  ] });
}
function QuickActionCard({
  title,
  description,
  icon,
  to,
  cta,
  ocid
}) {
  const navigate = useNavigate();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "button",
    {
      type: "button",
      className: "card-elevated p-5 flex flex-col gap-3 cursor-pointer hover:border-primary/40 hover:bg-muted/10 transition-smooth group text-left w-full",
      onClick: () => navigate({ to }),
      "data-ocid": ocid,
      "aria-label": title,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-xl bg-primary/15 border border-primary/30 flex items-center justify-center text-primary group-hover:bg-primary/25 transition-smooth", children: icon }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-semibold text-foreground mb-0.5", children: title }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground leading-relaxed", children: description })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-primary font-semibold group-hover:underline mt-auto", children: [
          cta,
          " →"
        ] })
      ]
    }
  );
}
function Dashboard() {
  const { principal } = useAuth();
  const { data: analytics, isLoading: analyticsLoading } = useAnalytics();
  const { data: historyPage } = useReviewHistory({}, { page: 1, pageSize: 5 });
  const shortId = principal ? `${principal.slice(0, 6)}…${principal.slice(-4)}` : "—";
  const pieData = analytics ? [
    { name: "Real", value: analytics.realCount, fill: "#4ade80" },
    { name: "Fake", value: analytics.fakeCount, fill: "#f87171" },
    {
      name: "Suspicious",
      value: analytics.suspiciousCount,
      fill: "#facc15"
    }
  ] : [];
  const trendData = ((analytics == null ? void 0 : analytics.trend) ?? []).slice(-14).map((p) => ({
    date: p.date.slice(5),
    // "MM-DD"
    total: p.total,
    fake: p.fake,
    real: p.real
  }));
  const recentItems = (historyPage == null ? void 0 : historyPage.items) ?? [];
  return /* @__PURE__ */ jsxRuntimeExports.jsx(DashboardLayout, { title: "Dashboard", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6 max-w-7xl mx-auto", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: -10 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.4 },
        className: "card-elevated p-5 flex items-center gap-4",
        "data-ocid": "dash-welcome",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-12 h-12 rounded-xl bg-primary/20 border border-primary/40 flex items-center justify-center flex-shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { className: "w-6 h-6 text-primary" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-display font-bold text-foreground text-lg leading-snug", children: [
              "Welcome back,",
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary font-mono text-base", children: shortId })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Your AI-powered fake review detection dashboard is ready." })
          ] })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 lg:grid-cols-4 gap-4", children: analyticsLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: [1, 2, 3, 4].map((k) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "card-elevated p-5 h-32 animate-pulse bg-muted/40"
      },
      `sk-${k}`
    )) }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.div,
        {
          initial: { opacity: 0, y: 12 },
          animate: { opacity: 1, y: 0 },
          transition: { delay: 0.05 },
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            StatCard,
            {
              label: "Total Reviews Analysed",
              value: compact((analytics == null ? void 0 : analytics.totalReviews) ?? 0),
              icon: /* @__PURE__ */ jsxRuntimeExports.jsx(ChartColumn, { className: "w-4 h-4" }),
              iconBg: "bg-primary/15",
              iconColor: "text-primary",
              trend: "+7.5%",
              trendUp: true
            }
          )
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.div,
        {
          initial: { opacity: 0, y: 12 },
          animate: { opacity: 1, y: 0 },
          transition: { delay: 0.1 },
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            StatCard,
            {
              label: "Genuine Reviews",
              value: compact((analytics == null ? void 0 : analytics.realCount) ?? 0),
              icon: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-4 h-4" }),
              iconBg: "bg-green-500/15",
              iconColor: "text-green-400",
              trend: "+7.3%",
              trendUp: true
            }
          )
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.div,
        {
          initial: { opacity: 0, y: 12 },
          animate: { opacity: 1, y: 0 },
          transition: { delay: 0.15 },
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            StatCard,
            {
              label: "Confirmed Fake",
              value: compact((analytics == null ? void 0 : analytics.fakeCount) ?? 0),
              icon: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleX, { className: "w-4 h-4" }),
              iconBg: "bg-red-500/15",
              iconColor: "text-red-400",
              trend: "-2.3%",
              trendUp: false
            }
          )
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.div,
        {
          initial: { opacity: 0, y: 12 },
          animate: { opacity: 1, y: 0 },
          transition: { delay: 0.2 },
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            StatCard,
            {
              label: "Suspected Fake",
              value: compact((analytics == null ? void 0 : analytics.suspiciousCount) ?? 0),
              icon: /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "w-4 h-4" }),
              iconBg: "bg-yellow-500/15",
              iconColor: "text-yellow-400",
              trend: "-65%",
              trendUp: false
            }
          )
        }
      )
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 14 },
          animate: { opacity: 1, y: 0 },
          transition: { delay: 0.25 },
          className: "lg:col-span-2 chart-container",
          "data-ocid": "dash-trend-chart",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-semibold text-foreground", children: "Fake Review Trend" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 text-xs text-muted-foreground", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-3 h-0.5 rounded bg-primary inline-block" }),
                  "Total"
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-3 h-0.5 rounded bg-red-400 inline-block" }),
                  "Fake"
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: "100%", height: 200, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
              AreaChart,
              {
                data: trendData,
                margin: { top: 4, right: 4, left: -20, bottom: 0 },
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("defs", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("linearGradient", { id: "colorTotal", x1: "0", y1: "0", x2: "0", y2: "1", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "stop",
                        {
                          offset: "5%",
                          stopColor: "oklch(0.75 0.18 180)",
                          stopOpacity: 0.28
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "stop",
                        {
                          offset: "95%",
                          stopColor: "oklch(0.75 0.18 180)",
                          stopOpacity: 0
                        }
                      )
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("linearGradient", { id: "colorFake", x1: "0", y1: "0", x2: "0", y2: "1", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "stop",
                        {
                          offset: "5%",
                          stopColor: "oklch(0.65 0.19 22)",
                          stopOpacity: 0.28
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "stop",
                        {
                          offset: "95%",
                          stopColor: "oklch(0.65 0.19 22)",
                          stopOpacity: 0
                        }
                      )
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    CartesianGrid,
                    {
                      strokeDasharray: "3 3",
                      stroke: "oklch(0.26 0.018 260 / 0.5)"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    XAxis,
                    {
                      dataKey: "date",
                      tick: { fontSize: 10, fill: "oklch(0.52 0.012 260)" },
                      tickLine: false,
                      axisLine: false,
                      interval: 3
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    YAxis,
                    {
                      tick: { fontSize: 10, fill: "oklch(0.52 0.012 260)" },
                      tickLine: false,
                      axisLine: false
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Tooltip,
                    {
                      contentStyle: {
                        backgroundColor: "oklch(0.16 0.015 260)",
                        border: "1px solid oklch(0.26 0.018 260)",
                        borderRadius: 8,
                        fontSize: 12
                      },
                      labelStyle: { color: "oklch(0.92 0.01 260)" }
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Area,
                    {
                      type: "monotone",
                      dataKey: "total",
                      stroke: "oklch(0.75 0.18 180)",
                      strokeWidth: 2,
                      fill: "url(#colorTotal)"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Area,
                    {
                      type: "monotone",
                      dataKey: "fake",
                      stroke: "oklch(0.65 0.19 22)",
                      strokeWidth: 2,
                      fill: "url(#colorFake)"
                    }
                  )
                ]
              }
            ) })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 14 },
          animate: { opacity: 1, y: 0 },
          transition: { delay: 0.3 },
          className: "chart-container flex flex-col",
          "data-ocid": "dash-pie-chart",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-semibold text-foreground mb-4", children: "Verdict Breakdown" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: "100%", height: 150, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(PieChart, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Pie,
                {
                  data: pieData,
                  cx: "50%",
                  cy: "50%",
                  innerRadius: 45,
                  outerRadius: 68,
                  paddingAngle: 3,
                  dataKey: "value",
                  children: pieData.map((entry) => /* @__PURE__ */ jsxRuntimeExports.jsx(Cell, { fill: entry.fill }, entry.name))
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Tooltip,
                {
                  contentStyle: {
                    backgroundColor: "oklch(0.16 0.015 260)",
                    border: "1px solid oklch(0.26 0.018 260)",
                    borderRadius: 8,
                    fontSize: 12
                  }
                }
              )
            ] }) }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2 mt-2", children: pieData.map((d) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "flex items-center justify-between text-xs",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-2 text-muted-foreground", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "span",
                      {
                        className: "w-2 h-2 rounded-full inline-block",
                        style: { background: d.fill }
                      }
                    ),
                    d.name
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-foreground tabular-nums", children: compact(d.value) })
                ]
              },
              d.name
            )) })
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: 14 },
        animate: { opacity: 1, y: 0 },
        transition: { delay: 0.35 },
        className: "chart-container",
        "data-ocid": "dash-recent-feed",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-semibold text-foreground", children: "Recent Analysis" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground flex items-center gap-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-3 h-3" }),
              "Live feed"
            ] })
          ] }),
          recentItems.length === 0 ? (
            /* Empty state */
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "flex flex-col items-center justify-center py-10 gap-3 text-center",
                "data-ocid": "dash-empty-state",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { className: "w-10 h-10 text-muted-foreground/40" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "No reviews analysed yet." }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground/60", children: "Head to Analyze to start detecting fake reviews." })
                ]
              }
            )
          ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "divide-y divide-border", children: recentItems.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "py-3 flex items-center gap-3 hover:bg-muted/20 rounded px-1 transition-colors",
              "data-ocid": `feed-item-${item.id}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(VerdictBadge, { verdict: item.verdict, size: "sm" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "flex-1 text-sm text-muted-foreground truncate min-w-0", children: item.reviewText }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground/60 flex-shrink-0 tabular-nums", children: formatTime(item.timestamp) })
              ]
            },
            `review-${item.id}`
          )) })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        QuickActionCard,
        {
          title: "Analyze a Review",
          description: "Paste a product review or upload a CSV file to detect fake reviews instantly using our NLP model.",
          icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "w-5 h-5" }),
          to: "/dashboard/analyze",
          cta: "Go to Analyze",
          ocid: "quick-action-analyze"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        QuickActionCard,
        {
          title: "View History",
          description: "Browse all previously analysed reviews, filter by verdict, and export your results.",
          icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-5 h-5" }),
          to: "/dashboard/history",
          cta: "View History",
          ocid: "quick-action-history"
        }
      )
    ] })
  ] }) });
}
export {
  Dashboard as default
};
