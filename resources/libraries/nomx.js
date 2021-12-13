
Nomx={};
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) {if (Object.prototype.hasOwnProperty.call(b, p)) {d[p] = b[p];}} };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            {throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");}
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 * # Nomx
 * The most advanced framework for Applab. Ever.
 * - Build components via class extension as well and native types.
 * - Features an object oriented system that supports JSX syntax and full typescript support.
 * - Built-in html parser and extensive use of getAttribute gives access to previously off limit properties, such as:
 *   * The channelId of the app.
 *   * The children of an element.
 *   * The screens and active screen of a project.
 *   * And more!
 *
 * NOTE: Nomx works best with cdo-sync, in order to provide proper autofills and jsx support.
 *
 *
 * @example //This requires typescript with react syntax
 * //Creates a new class that extends Container (div element). It has a method that adds a message to it.
 * class ChatContainerSingleton extends Nomx.Container {
 * 		addMessage(message: string){
 * 			this.addChildren(<div>{message}</div>)
 * 		}
 * }
 *
 * // Create an instance of ChatContainer with styles, and adds 2 messages to it.
 * const chatContainer = <ChatContainerSingleton style="position: absolute; width: 100%; height: 100%; overflow: auto"/> as ChatContainerSingleton
 * chatContainer.addMessage("hi, how are you");
 * chatContainer.addMessage("I'm fine");
*/
//import "./types/applab"
var Nomx;
(function (Nomx) {
    var prefix = "Nomx_Gen_";
    var counter = 0;
    Nomx.ElementsById = {};
    ;
    var parser = (function () {
        // Regular Expressions for parsing tags and attributes
        var startTag = /^<([-A-Za-z0-9_]+)((?:\s+[-A-Z-a-z0-9_]+(?:\s*=\s*(?:(?:"[^"]*")|(?:'[^']*')|[^>\s]+))?)*)\s*(\/?)>/, endTag = /^<\/([-A-Za-z0-9_]+)[^>]*>/, attr = /([-A-Za-z0-9_]+)(?:\s*=\s*(?:(?:"((?:\\.|[^"])*)")|(?:'((?:\\.|[^'])*)')|([^>\s]+)))?/g, attr2 = /([-A-Za-z0-9_]+)(?:\s*=\s*(?:(?:"((?:\\.|[^"])*)")|(?:'((?:\\.|[^'])*)')|([^>\s]+)))?/;
        var empty = makeMap("area,base,basefont,br,col,frame,hr,img,input,isindex,link,meta,param,embed");
        var closeSelf = makeMap("colgroup,dd,dt,li,options,p,td,tfoot,th,thead,tr");
        function makeMap(str) {
            var obj = {}, items = str.split(",");
            for (var i = 0; i < items.length; i++)
                {obj[items[i]] = true;}
            return obj;
        }
        function parseFragments(html) {
            var parsedTags = [];
            while (true) {
                var match = html.match(startTag);
                if (match) {
                    parsedTags.push([match[1], match[2]]);
                    html = html.substring(match[0].length);
                }
                else {
                    var matchEnd = html.match(endTag);
                    if (matchEnd) {
                        parsedTags.push([matchEnd[1]]);
                        html = html.substring(matchEnd[0].length);
                    }
                    else {
                        var index = html.indexOf("<");
                        if (index >= 0) {
                            //parsedTags.push(html.slice(0, index))
                            html = html.substring(index);
                        }
                        else {
                            break;
                        }
                    }
                }
            }
            return parsedTags;
        }
        function parse(parsedTags) {
            var stack = [{ tagName: "", attributes: {}, children: [] }];
            for (var _i = 0, parsedTags_1 = parsedTags; _i < parsedTags_1.length; _i++) {
                var fragment = parsedTags_1[_i];
                if (typeof fragment === "string") {
                    //never
                    //stack[stack.length - 1].children.push(fragment)
                }
                else if (fragment.length === 2) {
                    var node = { tagName: "", attributes: {}, children: [] };
                    node.tagName = fragment[0];
                    for (var _a = 0, _b = fragment[1].match(attr) || []; _a < _b.length; _a++) {
                        var attribute = _b[_a];
                        var attrmatch = attribute.match(attr2);
                        node.attributes[attrmatch[1]] = attrmatch[2];
                    }
                    stack[stack.length - 1].children.push(node);
                    if (!empty[node.tagName] && !closeSelf[node.tagName]) {
                        stack.push(node);
                    }
                }
                else {
                    stack.pop();
                }
            }
            return stack[0].children;
        }
        //why the fuck this not working
        function getIds(parsedTags) {
            var stack = [];
            for (var _i = 0, parsedTags_2 = parsedTags; _i < parsedTags_2.length; _i++) {
                var fragment = parsedTags_2[_i];
                if (typeof fragment === "string") {
                    //stack[stack.length - 1].children.push(fragment)
                }
                else if (fragment.length === 2) {
                    var node = { tagName: "", attributes: {}, children: [] };
                    node.tagName = fragment[0];
                    for (var _a = 0, _b = fragment[1].match(attr) || []; _a < _b.length; _a++) {
                        var attribute = _b[_a];
                        var attrmatch = attribute.match(attr2);
                        node.attributes[attrmatch[1]] = attrmatch[2];
                    }
                    stack.push(node);
                }
            }
            return stack;
        }
        return { nodes: function (html) { return getIds(parseFragments(html)); }, tree: function (html) { return parse(parseFragments(html)); } };
    })();
    var _sd = /** @class */ (function () {
        function _sd(element) {
            this._computedStyleObj = {};
            this.lastStyle = "";
            this.element = element;
        }
        _sd.prototype.__get = function (prop) {
            return this.computedStyleObj[prop];
        };
        _sd.prototype.__set = function (style) {
            this.element.setStyle(style);
        };
        Object.defineProperty(_sd.prototype, "computedStyleObj", {
            get: function () {
                var _this = this;
                if (this.element.style !== this.lastStyle) {
                    this._computedStyleObj = {};
                    this.element.style.split(/;\s*/g).forEach(function (s) {
                        var p = s.match(/([a-z]+(?:\-[a-z]+)*):\s*(.+)/);
                        _this._computedStyleObj[p[1]] = p[2];
                    });
                }
                return this._computedStyleObj;
            },
            enumerable: false,
            configurable: true
        });
        return _sd;
    }());
    var StyleDeclaration = _sd;
    var cssStyles = { "accentColor": "accent-color", "additiveSymbols": "additive-symbols", "alignContent": "align-content", "alignItems": "align-items", "alignSelf": "align-self", "alignmentBaseline": "alignment-baseline", "all": "all", "animation": "animation", "animationDelay": "animation-delay", "animationDirection": "animation-direction", "animationDuration": "animation-duration", "animationFillMode": "animation-fill-mode", "animationIterationCount": "animation-iteration-count", "animationName": "animation-name", "animationPlayState": "animation-play-state", "animationTimingFunction": "animation-timing-function", "appRegion": "app-region", "appearance": "appearance", "ascentOverride": "ascent-override", "aspectRatio": "aspect-ratio", "backdropFilter": "backdrop-filter", "backfaceVisibility": "backface-visibility", "background": "background", "backgroundAttachment": "background-attachment", "backgroundBlendMode": "background-blend-mode", "backgroundClip": "background-clip", "backgroundColor": "background-color", "backgroundImage": "background-image", "backgroundOrigin": "background-origin", "backgroundPosition": "background-position", "backgroundPositionX": "background-position-x", "backgroundPositionY": "background-position-y", "backgroundRepeat": "background-repeat", "backgroundRepeatX": "background-repeat-x", "backgroundRepeatY": "background-repeat-y", "backgroundSize": "background-size", "baselineShift": "baseline-shift", "blockSize": "block-size", "border": "border", "borderBlock": "border-block", "borderBlockColor": "border-block-color", "borderBlockEnd": "border-block-end", "borderBlockEndColor": "border-block-end-color", "borderBlockEndStyle": "border-block-end-style", "borderBlockEndWidth": "border-block-end-width", "borderBlockStart": "border-block-start", "borderBlockStartColor": "border-block-start-color", "borderBlockStartStyle": "border-block-start-style", "borderBlockStartWidth": "border-block-start-width", "borderBlockStyle": "border-block-style", "borderBlockWidth": "border-block-width", "borderBottom": "border-bottom", "borderBottomColor": "border-bottom-color", "borderBottomLeftRadius": "border-bottom-left-radius", "borderBottomRightRadius": "border-bottom-right-radius", "borderBottomStyle": "border-bottom-style", "borderBottomWidth": "border-bottom-width", "borderCollapse": "border-collapse", "borderColor": "border-color", "borderEndEndRadius": "border-end-end-radius", "borderEndStartRadius": "border-end-start-radius", "borderImage": "border-image", "borderImageOutset": "border-image-outset", "borderImageRepeat": "border-image-repeat", "borderImageSlice": "border-image-slice", "borderImageSource": "border-image-source", "borderImageWidth": "border-image-width", "borderInline": "border-inline", "borderInlineColor": "border-inline-color", "borderInlineEnd": "border-inline-end", "borderInlineEndColor": "border-inline-end-color", "borderInlineEndStyle": "border-inline-end-style", "borderInlineEndWidth": "border-inline-end-width", "borderInlineStart": "border-inline-start", "borderInlineStartColor": "border-inline-start-color", "borderInlineStartStyle": "border-inline-start-style", "borderInlineStartWidth": "border-inline-start-width", "borderInlineStyle": "border-inline-style", "borderInlineWidth": "border-inline-width", "borderLeft": "border-left", "borderLeftColor": "border-left-color", "borderLeftStyle": "border-left-style", "borderLeftWidth": "border-left-width", "borderRadius": "border-radius", "borderRight": "border-right", "borderRightColor": "border-right-color", "borderRightStyle": "border-right-style", "borderRightWidth": "border-right-width", "borderSpacing": "border-spacing", "borderStartEndRadius": "border-start-end-radius", "borderStartStartRadius": "border-start-start-radius", "borderStyle": "border-style", "borderTop": "border-top", "borderTopColor": "border-top-color", "borderTopLeftRadius": "border-top-left-radius", "borderTopRightRadius": "border-top-right-radius", "borderTopStyle": "border-top-style", "borderTopWidth": "border-top-width", "borderWidth": "border-width", "bottom": "bottom", "boxShadow": "box-shadow", "boxSizing": "box-sizing", "breakAfter": "break-after", "breakBefore": "break-before", "breakInside": "break-inside", "bufferedRendering": "buffered-rendering", "captionSide": "caption-side", "caretColor": "caret-color", "clear": "clear", "clip": "clip", "clipPath": "clip-path", "clipRule": "clip-rule", "color": "color", "colorInterpolation": "color-interpolation", "colorInterpolationFilters": "color-interpolation-filters", "colorRendering": "color-rendering", "colorScheme": "color-scheme", "columnCount": "column-count", "columnFill": "column-fill", "columnGap": "column-gap", "columnRule": "column-rule", "columnRuleColor": "column-rule-color", "columnRuleStyle": "column-rule-style", "columnRuleWidth": "column-rule-width", "columnSpan": "column-span", "columnWidth": "column-width", "columns": "columns", "contain": "contain", "containIntrinsicBlockSize": "contain-intrinsic-block-size", "containIntrinsicHeight": "contain-intrinsic-height", "containIntrinsicInlineSize": "contain-intrinsic-inline-size", "containIntrinsicSize": "contain-intrinsic-size", "containIntrinsicWidth": "contain-intrinsic-width", "content": "content", "contentVisibility": "content-visibility", "counterIncrement": "counter-increment", "counterReset": "counter-reset", "counterSet": "counter-set", "cursor": "cursor", "cx": "cx", "cy": "cy", "d": "d", "descentOverride": "descent-override", "direction": "direction", "display": "display", "dominantBaseline": "dominant-baseline", "emptyCells": "empty-cells", "fallback": "fallback", "fill": "fill", "fillOpacity": "fill-opacity", "fillRule": "fill-rule", "filter": "filter", "flex": "flex", "flexBasis": "flex-basis", "flexDirection": "flex-direction", "flexFlow": "flex-flow", "flexGrow": "flex-grow", "flexShrink": "flex-shrink", "flexWrap": "flex-wrap", "float": "float", "floodColor": "flood-color", "floodOpacity": "flood-opacity", "font": "font", "fontDisplay": "font-display", "fontFamily": "font-family", "fontFeatureSettings": "font-feature-settings", "fontKerning": "font-kerning", "fontOpticalSizing": "font-optical-sizing", "fontSize": "font-size", "fontStretch": "font-stretch", "fontStyle": "font-style", "fontVariant": "font-variant", "fontVariantCaps": "font-variant-caps", "fontVariantEastAsian": "font-variant-east-asian", "fontVariantLigatures": "font-variant-ligatures", "fontVariantNumeric": "font-variant-numeric", "fontVariationSettings": "font-variation-settings", "fontWeight": "font-weight", "forcedColorAdjust": "forced-color-adjust", "gap": "gap", "grid": "grid", "gridArea": "grid-area", "gridAutoColumns": "grid-auto-columns", "gridAutoFlow": "grid-auto-flow", "gridAutoRows": "grid-auto-rows", "gridColumn": "grid-column", "gridColumnEnd": "grid-column-end", "gridColumnGap": "grid-column-gap", "gridColumnStart": "grid-column-start", "gridGap": "grid-gap", "gridRow": "grid-row", "gridRowEnd": "grid-row-end", "gridRowGap": "grid-row-gap", "gridRowStart": "grid-row-start", "gridTemplate": "grid-template", "gridTemplateAreas": "grid-template-areas", "gridTemplateColumns": "grid-template-columns", "gridTemplateRows": "grid-template-rows", "height": "height", "hyphens": "hyphens", "imageOrientation": "image-orientation", "imageRendering": "image-rendering", "inherits": "inherits", "initialValue": "initial-value", "inlineSize": "inline-size", "inset": "inset", "insetBlock": "inset-block", "insetBlockEnd": "inset-block-end", "insetBlockStart": "inset-block-start", "insetInline": "inset-inline", "insetInlineEnd": "inset-inline-end", "insetInlineStart": "inset-inline-start", "isolation": "isolation", "justifyContent": "justify-content", "justifyItems": "justify-items", "justifySelf": "justify-self", "left": "left", "letterSpacing": "letter-spacing", "lightingColor": "lighting-color", "lineBreak": "line-break", "lineGapOverride": "line-gap-override", "lineHeight": "line-height", "listStyle": "list-style", "listStyleImage": "list-style-image", "listStylePosition": "list-style-position", "listStyleType": "list-style-type", "margin": "margin", "marginBlock": "margin-block", "marginBlockEnd": "margin-block-end", "marginBlockStart": "margin-block-start", "marginBottom": "margin-bottom", "marginInline": "margin-inline", "marginInlineEnd": "margin-inline-end", "marginInlineStart": "margin-inline-start", "marginLeft": "margin-left", "marginRight": "margin-right", "marginTop": "margin-top", "marker": "marker", "markerEnd": "marker-end", "markerMid": "marker-mid", "markerStart": "marker-start", "mask": "mask", "maskType": "mask-type", "maxBlockSize": "max-block-size", "maxHeight": "max-height", "maxInlineSize": "max-inline-size", "maxWidth": "max-width", "maxZoom": "max-zoom", "minBlockSize": "min-block-size", "minHeight": "min-height", "minInlineSize": "min-inline-size", "minWidth": "min-width", "minZoom": "min-zoom", "mixBlendMode": "mix-blend-mode", "negative": "negative", "objectFit": "object-fit", "objectPosition": "object-position", "offset": "offset", "offsetDistance": "offset-distance", "offsetPath": "offset-path", "offsetRotate": "offset-rotate", "opacity": "opacity", "order": "order", "orientation": "orientation", "orphans": "orphans", "outline": "outline", "outlineColor": "outline-color", "outlineOffset": "outline-offset", "outlineStyle": "outline-style", "outlineWidth": "outline-width", "overflow": "overflow", "overflowAnchor": "overflow-anchor", "overflowClipMargin": "overflow-clip-margin", "overflowWrap": "overflow-wrap", "overflowX": "overflow-x", "overflowY": "overflow-y", "overscrollBehavior": "overscroll-behavior", "overscrollBehaviorBlock": "overscroll-behavior-block", "overscrollBehaviorInline": "overscroll-behavior-inline", "overscrollBehaviorX": "overscroll-behavior-x", "overscrollBehaviorY": "overscroll-behavior-y", "pad": "pad", "padding": "padding", "paddingBlock": "padding-block", "paddingBlockEnd": "padding-block-end", "paddingBlockStart": "padding-block-start", "paddingBottom": "padding-bottom", "paddingInline": "padding-inline", "paddingInlineEnd": "padding-inline-end", "paddingInlineStart": "padding-inline-start", "paddingLeft": "padding-left", "paddingRight": "padding-right", "paddingTop": "padding-top", "page": "page", "pageBreakAfter": "page-break-after", "pageBreakBefore": "page-break-before", "pageBreakInside": "page-break-inside", "pageOrientation": "page-orientation", "paintOrder": "paint-order", "perspective": "perspective", "perspectiveOrigin": "perspective-origin", "placeContent": "place-content", "placeItems": "place-items", "placeSelf": "place-self", "pointerEvents": "pointer-events", "position": "position", "prefix": "prefix", "quotes": "quotes", "r": "r", "range": "range", "resize": "resize", "right": "right", "rowGap": "row-gap", "rubyPosition": "ruby-position", "rx": "rx", "ry": "ry", "scrollBehavior": "scroll-behavior", "scrollMargin": "scroll-margin", "scrollMarginBlock": "scroll-margin-block", "scrollMarginBlockEnd": "scroll-margin-block-end", "scrollMarginBlockStart": "scroll-margin-block-start", "scrollMarginBottom": "scroll-margin-bottom", "scrollMarginInline": "scroll-margin-inline", "scrollMarginInlineEnd": "scroll-margin-inline-end", "scrollMarginInlineStart": "scroll-margin-inline-start", "scrollMarginLeft": "scroll-margin-left", "scrollMarginRight": "scroll-margin-right", "scrollMarginTop": "scroll-margin-top", "scrollPadding": "scroll-padding", "scrollPaddingBlock": "scroll-padding-block", "scrollPaddingBlockEnd": "scroll-padding-block-end", "scrollPaddingBlockStart": "scroll-padding-block-start", "scrollPaddingBottom": "scroll-padding-bottom", "scrollPaddingInline": "scroll-padding-inline", "scrollPaddingInlineEnd": "scroll-padding-inline-end", "scrollPaddingInlineStart": "scroll-padding-inline-start", "scrollPaddingLeft": "scroll-padding-left", "scrollPaddingRight": "scroll-padding-right", "scrollPaddingTop": "scroll-padding-top", "scrollSnapAlign": "scroll-snap-align", "scrollSnapStop": "scroll-snap-stop", "scrollSnapType": "scroll-snap-type", "scrollbarGutter": "scrollbar-gutter", "shapeImageThreshold": "shape-image-threshold", "shapeMargin": "shape-margin", "shapeOutside": "shape-outside", "shapeRendering": "shape-rendering", "size": "size", "sizeAdjust": "size-adjust", "speak": "speak", "speakAs": "speak-as", "src": "src", "stopColor": "stop-color", "stopOpacity": "stop-opacity", "stroke": "stroke", "strokeDasharray": "stroke-dasharray", "strokeDashoffset": "stroke-dashoffset", "strokeLinecap": "stroke-linecap", "strokeLinejoin": "stroke-linejoin", "strokeMiterlimit": "stroke-miterlimit", "strokeOpacity": "stroke-opacity", "strokeWidth": "stroke-width", "suffix": "suffix", "symbols": "symbols", "syntax": "syntax", "system": "system", "tabSize": "tab-size", "tableLayout": "table-layout", "textAlign": "text-align", "textAlignLast": "text-align-last", "textAnchor": "text-anchor", "textCombineUpright": "text-combine-upright", "textDecoration": "text-decoration", "textDecorationColor": "text-decoration-color", "textDecorationLine": "text-decoration-line", "textDecorationSkipInk": "text-decoration-skip-ink", "textDecorationStyle": "text-decoration-style", "textDecorationThickness": "text-decoration-thickness", "textIndent": "text-indent", "textOrientation": "text-orientation", "textOverflow": "text-overflow", "textRendering": "text-rendering", "textShadow": "text-shadow", "textSizeAdjust": "text-size-adjust", "textTransform": "text-transform", "textUnderlineOffset": "text-underline-offset", "textUnderlinePosition": "text-underline-position", "top": "top", "touchAction": "touch-action", "transform": "transform", "transformBox": "transform-box", "transformOrigin": "transform-origin", "transformStyle": "transform-style", "transition": "transition", "transitionDelay": "transition-delay", "transitionDuration": "transition-duration", "transitionProperty": "transition-property", "transitionTimingFunction": "transition-timing-function", "unicodeBidi": "unicode-bidi", "unicodeRange": "unicode-range", "userSelect": "user-select", "userZoom": "user-zoom", "vectorEffect": "vector-effect", "verticalAlign": "vertical-align", "visibility": "visibility", "webkitAlignContent": "--webkit-align-content", "webkitAlignItems": "--webkit-align-items", "webkitAlignSelf": "--webkit-align-self", "webkitAnimation": "--webkit-animation", "webkitAnimationDelay": "--webkit-animation-delay", "webkitAnimationDirection": "--webkit-animation-direction", "webkitAnimationDuration": "--webkit-animation-duration", "webkitAnimationFillMode": "--webkit-animation-fill-mode", "webkitAnimationIterationCount": "--webkit-animation-iteration-count", "webkitAnimationName": "--webkit-animation-name", "webkitAnimationPlayState": "--webkit-animation-play-state", "webkitAnimationTimingFunction": "--webkit-animation-timing-function", "webkitAppRegion": "--webkit-app-region", "webkitAppearance": "--webkit-appearance", "webkitBackfaceVisibility": "--webkit-backface-visibility", "webkitBackgroundClip": "--webkit-background-clip", "webkitBackgroundOrigin": "--webkit-background-origin", "webkitBackgroundSize": "--webkit-background-size", "webkitBorderAfter": "--webkit-border-after", "webkitBorderAfterColor": "--webkit-border-after-color", "webkitBorderAfterStyle": "--webkit-border-after-style", "webkitBorderAfterWidth": "--webkit-border-after-width", "webkitBorderBefore": "--webkit-border-before", "webkitBorderBeforeColor": "--webkit-border-before-color", "webkitBorderBeforeStyle": "--webkit-border-before-style", "webkitBorderBeforeWidth": "--webkit-border-before-width", "webkitBorderBottomLeftRadius": "--webkit-border-bottom-left-radius", "webkitBorderBottomRightRadius": "--webkit-border-bottom-right-radius", "webkitBorderEnd": "--webkit-border-end", "webkitBorderEndColor": "--webkit-border-end-color", "webkitBorderEndStyle": "--webkit-border-end-style", "webkitBorderEndWidth": "--webkit-border-end-width", "webkitBorderHorizontalSpacing": "--webkit-border-horizontal-spacing", "webkitBorderImage": "--webkit-border-image", "webkitBorderRadius": "--webkit-border-radius", "webkitBorderStart": "--webkit-border-start", "webkitBorderStartColor": "--webkit-border-start-color", "webkitBorderStartStyle": "--webkit-border-start-style", "webkitBorderStartWidth": "--webkit-border-start-width", "webkitBorderTopLeftRadius": "--webkit-border-top-left-radius", "webkitBorderTopRightRadius": "--webkit-border-top-right-radius", "webkitBorderVerticalSpacing": "--webkit-border-vertical-spacing", "webkitBoxAlign": "--webkit-box-align", "webkitBoxDecorationBreak": "--webkit-box-decoration-break", "webkitBoxDirection": "--webkit-box-direction", "webkitBoxFlex": "--webkit-box-flex", "webkitBoxOrdinalGroup": "--webkit-box-ordinal-group", "webkitBoxOrient": "--webkit-box-orient", "webkitBoxPack": "--webkit-box-pack", "webkitBoxReflect": "--webkit-box-reflect", "webkitBoxShadow": "--webkit-box-shadow", "webkitBoxSizing": "--webkit-box-sizing", "webkitClipPath": "--webkit-clip-path", "webkitColumnBreakAfter": "--webkit-column-break-after", "webkitColumnBreakBefore": "--webkit-column-break-before", "webkitColumnBreakInside": "--webkit-column-break-inside", "webkitColumnCount": "--webkit-column-count", "webkitColumnGap": "--webkit-column-gap", "webkitColumnRule": "--webkit-column-rule", "webkitColumnRuleColor": "--webkit-column-rule-color", "webkitColumnRuleStyle": "--webkit-column-rule-style", "webkitColumnRuleWidth": "--webkit-column-rule-width", "webkitColumnSpan": "--webkit-column-span", "webkitColumnWidth": "--webkit-column-width", "webkitColumns": "--webkit-columns", "webkitFilter": "--webkit-filter", "webkitFlex": "--webkit-flex", "webkitFlexBasis": "--webkit-flex-basis", "webkitFlexDirection": "--webkit-flex-direction", "webkitFlexFlow": "--webkit-flex-flow", "webkitFlexGrow": "--webkit-flex-grow", "webkitFlexShrink": "--webkit-flex-shrink", "webkitFlexWrap": "--webkit-flex-wrap", "webkitFontFeatureSettings": "--webkit-font-feature-settings", "webkitFontSmoothing": "--webkit-font-smoothing", "webkitHighlight": "--webkit-highlight", "webkitHyphenateCharacter": "--webkit-hyphenate-character", "webkitJustifyContent": "--webkit-justify-content", "webkitLineBreak": "--webkit-line-break", "webkitLineClamp": "--webkit-line-clamp", "webkitLocale": "--webkit-locale", "webkitLogicalHeight": "--webkit-logical-height", "webkitLogicalWidth": "--webkit-logical-width", "webkitMarginAfter": "--webkit-margin-after", "webkitMarginBefore": "--webkit-margin-before", "webkitMarginEnd": "--webkit-margin-end", "webkitMarginStart": "--webkit-margin-start", "webkitMask": "--webkit-mask", "webkitMaskBoxImage": "--webkit-mask-box-image", "webkitMaskBoxImageOutset": "--webkit-mask-box-image-outset", "webkitMaskBoxImageRepeat": "--webkit-mask-box-image-repeat", "webkitMaskBoxImageSlice": "--webkit-mask-box-image-slice", "webkitMaskBoxImageSource": "--webkit-mask-box-image-source", "webkitMaskBoxImageWidth": "--webkit-mask-box-image-width", "webkitMaskClip": "--webkit-mask-clip", "webkitMaskComposite": "--webkit-mask-composite", "webkitMaskImage": "--webkit-mask-image", "webkitMaskOrigin": "--webkit-mask-origin", "webkitMaskPosition": "--webkit-mask-position", "webkitMaskPositionX": "--webkit-mask-position-x", "webkitMaskPositionY": "--webkit-mask-position-y", "webkitMaskRepeat": "--webkit-mask-repeat", "webkitMaskRepeatX": "--webkit-mask-repeat-x", "webkitMaskRepeatY": "--webkit-mask-repeat-y", "webkitMaskSize": "--webkit-mask-size", "webkitMaxLogicalHeight": "--webkit-max-logical-height", "webkitMaxLogicalWidth": "--webkit-max-logical-width", "webkitMinLogicalHeight": "--webkit-min-logical-height", "webkitMinLogicalWidth": "--webkit-min-logical-width", "webkitOpacity": "--webkit-opacity", "webkitOrder": "--webkit-order", "webkitPaddingAfter": "--webkit-padding-after", "webkitPaddingBefore": "--webkit-padding-before", "webkitPaddingEnd": "--webkit-padding-end", "webkitPaddingStart": "--webkit-padding-start", "webkitPerspective": "--webkit-perspective", "webkitPerspectiveOrigin": "--webkit-perspective-origin", "webkitPerspectiveOriginX": "--webkit-perspective-origin-x", "webkitPerspectiveOriginY": "--webkit-perspective-origin-y", "webkitPrintColorAdjust": "--webkit-print-color-adjust", "webkitRtlOrdering": "--webkit-rtl-ordering", "webkitRubyPosition": "--webkit-ruby-position", "webkitShapeImageThreshold": "--webkit-shape-image-threshold", "webkitShapeMargin": "--webkit-shape-margin", "webkitShapeOutside": "--webkit-shape-outside", "webkitTapHighlightColor": "--webkit-tap-highlight-color", "webkitTextCombine": "--webkit-text-combine", "webkitTextDecorationsInEffect": "--webkit-text-decorations-in-effect", "webkitTextEmphasis": "--webkit-text-emphasis", "webkitTextEmphasisColor": "--webkit-text-emphasis-color", "webkitTextEmphasisPosition": "--webkit-text-emphasis-position", "webkitTextEmphasisStyle": "--webkit-text-emphasis-style", "webkitTextFillColor": "--webkit-text-fill-color", "webkitTextOrientation": "--webkit-text-orientation", "webkitTextSecurity": "--webkit-text-security", "webkitTextSizeAdjust": "--webkit-text-size-adjust", "webkitTextStroke": "--webkit-text-stroke", "webkitTextStrokeColor": "--webkit-text-stroke-color", "webkitTextStrokeWidth": "--webkit-text-stroke-width", "webkitTransform": "--webkit-transform", "webkitTransformOrigin": "--webkit-transform-origin", "webkitTransformOriginX": "--webkit-transform-origin-x", "webkitTransformOriginY": "--webkit-transform-origin-y", "webkitTransformOriginZ": "--webkit-transform-origin-z", "webkitTransformStyle": "--webkit-transform-style", "webkitTransition": "--webkit-transition", "webkitTransitionDelay": "--webkit-transition-delay", "webkitTransitionDuration": "--webkit-transition-duration", "webkitTransitionProperty": "--webkit-transition-property", "webkitTransitionTimingFunction": "--webkit-transition-timing-function", "webkitUserDrag": "--webkit-user-drag", "webkitUserModify": "--webkit-user-modify", "webkitUserSelect": "--webkit-user-select", "webkitWritingMode": "--webkit-writing-mode", "whiteSpace": "white-space", "widows": "widows", "width": "width", "willChange": "will-change", "wordBreak": "word-break", "wordSpacing": "word-spacing", "wordWrap": "word-wrap", "writingMode": "writing-mode", "x": "x", "y": "y", "zIndex": "z-index", "zoom": "zoom" };
    var _loop_1 = function (styleName) {
        Object.defineProperty(StyleDeclaration.prototype, styleName, {
            get: function () {
                return this.__get(cssStyles[styleName]);
            },
            set: function (value) {
                this.__set(cssStyles[styleName] + ": " + value);
            }
        });
    };
    for (var styleName in cssStyles) {
        _loop_1(styleName);
    }
    // #Element
    var Element = /** @class */ (function () {
        /** Given a transformer function, sort an array of elements which will become it's new children. */
        // Too hard to implement		
        // reorder(callback: (elements: (DestructibleElement)[]) => {}) {
        // }
        function Element(isNew, id) {
            this.props = {};
            this._lastouterHTML = "";
            this.id = id;
            //wtf
            Object.defineProperty(this, "styleDeclaration", {
                value: new StyleDeclaration(this),
                enumerable: false
            });
        }
        Object.defineProperty(Element.prototype, "outerHTMLTree", {
            get: function () {
                if (this._lastouterHTML === this.outerHTML) {
                    return this._outerHTMLTree;
                }
                else {
                    this._lastouterHTML = this.outerHTML;
                    this._outerHTMLTree = parser.tree(this.outerHTML)[0];
                    return this._outerHTMLTree;
                }
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Element.prototype, "childElementCount", {
            /**
             * Returns children count
             * Use this over Element.children.length!! children.length re-parses the html which is heavy on the client!
             */
            get: function () {
                return parseInt(this.getAttribute("childElementCount"));
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Element.prototype, "className", {
            get: function () {
                return this.getAttribute("className");
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Element.prototype, "childrenRaw", {
            /** array of elements. can include a Node if the child's id is not provided. Use .children instead to filter out id-less nodes */
            get: function () {
                return this.outerHTMLTree.children.map(function (e) { return e.attributes.id ? get(e.attributes.id, "container") : e; });
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Element.prototype, "children", {
            /** array of elements, id-less nodes are ignored. */
            get: function () {
                return this.childrenRaw.filter(function (e) { return "id" in e; });
            },
            enumerable: false,
            configurable: true
        });
        /**
         * Adds event listener; Equivalent to onEvent(element.id, eventName, callback);
         */
        Element.prototype.on = function (t, callback) {
            onEvent(this.id, t, callback);
        };
        /** setStyle; equivalent to setStyle(element.id, style) */
        Element.prototype.setStyle = function (style) {
            setStyle(this.id, style);
        };
        Object.defineProperty(Element.prototype, "backgroundColor", {
            get: function () {
                return getProperty(this.id, "background-color");
            },
            /** background color */
            set: function (color) {
                setProperty(this.id, "background-color", color);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Element.prototype, "tagName", {
            /** element tag name; ex: DIV | BUTTON | IMG */
            get: function () {
                return this.getAttribute("tagName");
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Element.prototype, "style", {
            get: function () {
                return this.outerHTMLTree.attributes.style || "";
            },
            /**
             * Resetting the style will not overwrite all styles, you must know which are currently active and do "style: unset;" in order to reset
             */
            set: function (style) {
                this.setStyle(style);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Element.prototype, "outerHTML", {
            /** includes the element itself ex: <div id="ELEMENTID"><div id = "CHILD">HI</div></div> */
            get: function () {
                return this.getAttribute("outerHTML");
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Element.prototype, "innerHTML", {
            /** includes only the children of the element ex: <div id = "CHILD">HI</div> */
            get: function () {
                return this.getAttribute("innerHTML");
            },
            set: function (innerhtml) {
                innerHTML(this.id, innerhtml);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Element.prototype, "scrollHeight", {
            /** Height of element, includes parts that are hidden beyond the scroll bar */
            get: function () {
                return getAttribute(this.id, "scrollHeight");
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Element.prototype, "scrollTop", {
            /** Location of scroll bar */
            get: function () {
                return parseInt(getAttribute(this.id, "scrollTop"));
            },
            set: function (y) {
                setAttribute(this.id, "scrollTop", y);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Element.prototype, "borderWidth", {
            /** CSS border width */
            get: function () {
                return getProperty(this.id, "border-width");
            },
            set: function (value) {
                setProperty(this.id, "border-width", value);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Element.prototype, "borderRadius", {
            /** CSS border radius */
            get: function () {
                return getProperty(this.id, "border-radius");
            },
            set: function (value) {
                setProperty(this.id, "border-radius", value);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Element.prototype, "borderColor", {
            /** CSS border color */
            get: function () {
                return getProperty(this.id, "border-color");
            },
            set: function (value) {
                setProperty(this.id, "border-color", value);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Element.prototype, "display", {
            /** CSS display; to get the current value do element.styleDeclaration.display */
            set: function (display) {
                this.setStyle("display: " + display);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Element.prototype, "padding", {
            /** CSS padding; element.styleDeclaration.padding */
            set: function (value) {
                this.setStyle("padding: " + (typeof value === "number" ? value + "px" : value));
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Element.prototype, "margin", {
            /** CSS margin; element.styleDeclaration.margin */
            set: function (value) {
                this.setStyle("margin: " + (typeof value === "number" ? value + "px" : value));
            },
            enumerable: false,
            configurable: true
        });
        /**
         * Returns toString()'d representation of the attribute value.
         */
        Element.prototype.getAttribute = function (attribute) {
            return getAttribute(this.id, attribute);
        };
        Element.prototype.setAttribute = function (attribute, value) {
            return setAttribute(this.id, attribute, value);
        };
        Object.defineProperty(Element.prototype, "firstChild", {
            //first child, id-less ignored
            get: function () {
                if (this.children[0]) {
                    return this.children[0];
                }
            },
            enumerable: false,
            configurable: true
        });
        Element.prototype.addChildren = function () {
            var children = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                children[_i] = arguments[_i];
            }
            if (Array.isArray(children[0])) {
                children = children[0];
            }
            for (var _a = 0, _b = children; _a < _b.length; _a++) {
                var child = _b[_a];
                child.parent = this;
            }
        };
        Object.defineProperty(Element.prototype, "elementInit", {
            set: function (callback) {
                callback(this);
            },
            enumerable: false,
            configurable: true
        });
        /** To be called after all props are set  */
        Element.prototype.afterPropsSet = function () {
        };
        return Element;
    }());
    Nomx.Element = Element;
    // #Element
    var DestructibleElement = /** @class */ (function (_super) {
        __extends(DestructibleElement, _super);
        function DestructibleElement() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.props = {};
            return _this;
        }
        Object.defineProperty(DestructibleElement.prototype, "parent", {
            get: function () {
                return this._parent;
            },
            set: function (parent) {
                if (!parent) {
                    parent = limbo;
                }
                ;
                setParent(this.id, parent.id);
                this._parent = parent;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(DestructibleElement.prototype, "width", {
            get: function () {
                return getProperty(this.id, "width");
            },
            set: function (value) {
                setProperty(this.id, "width", value);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(DestructibleElement.prototype, "height", {
            get: function () {
                return getProperty(this.id, "height");
            },
            set: function (value) {
                setProperty(this.id, "height", value);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(DestructibleElement.prototype, "position", {
            set: function (position) {
                this.setStyle("position: " + position);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(DestructibleElement.prototype, "left", {
            /** distance from the left side of the parent element */
            set: function (value) {
                this.setStyle("left: " + (typeof value === "number" ? value + "px" : value));
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(DestructibleElement.prototype, "right", {
            /** distance from the right side of the parent element */
            set: function (value) {
                this.setStyle("right: " + (typeof value === "number" ? value + "px" : value));
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(DestructibleElement.prototype, "top", {
            /** distance from the top side of the parent element */
            set: function (value) {
                this.setStyle("top: " + (typeof value === "number" ? value + "px" : value));
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(DestructibleElement.prototype, "bottom", {
            /** distance from the bottom side of the parent element */
            set: function (value) {
                this.setStyle("bottom: " + (typeof value === "number" ? value + "px" : value));
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(DestructibleElement.prototype, "x", {
            /** (mostly) equivalent to .left, except called via setProperty */
            get: function () {
                return getProperty(this.id, "x");
            },
            set: function (value) {
                setProperty(this.id, "x", value);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(DestructibleElement.prototype, "y", {
            /** (mostly) equivalent to .top, except called via setProperty */
            get: function () {
                return getProperty(this.id, "y");
            },
            set: function (value) {
                setProperty(this.id, "y", value);
            },
            enumerable: false,
            configurable: true
        });
        DestructibleElement.prototype.delete = function () {
            deleteElement(this.id);
        };
        return DestructibleElement;
    }(Element));
    Nomx.DestructibleElement = DestructibleElement;
    var Image = /** @class */ (function (_super) {
        __extends(Image, _super);
        function Image(isNew, id) {
            var _this = _super.call(this, isNew, id) || this;
            _this.props = {};
            if (isNew) {
                image(id, "");
            }
            return _this;
        }
        Object.defineProperty(Image.prototype, "image", {
            /** @deprecated Use image.src */
            get: function () {
                return getImageURL(this.id);
            },
            /** @deprecated Use image.src */
            set: function (url) {
                setImageURL(this.id, url);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Image.prototype, "src", {
            get: function () {
                return getImageURL(this.id);
            },
            set: function (url) {
                setImageURL(this.id, url);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Image.prototype, "fit", {
            get: function () {
                return getProperty(this.id, "fit");
            },
            set: function (fit) {
                setProperty(this.id, "fit", fit);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Image.prototype, "iconColor", {
            get: function () {
                return getProperty(this.id, "icon-color");
            },
            set: function (color) {
                setProperty(this.id, "icon-color", color);
            },
            enumerable: false,
            configurable: true
        });
        return Image;
    }(DestructibleElement));
    Nomx.Image = Image;
    var TextElement = /** @class */ (function (_super) {
        __extends(TextElement, _super);
        function TextElement() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.props = {};
            return _this;
        }
        Object.defineProperty(TextElement.prototype, "textColor", {
            get: function () {
                return getProperty(this.id, "text-color");
            },
            set: function (color) {
                setProperty(this.id, "text-color", color);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(TextElement.prototype, "text", {
            get: function () {
                return getProperty(this.id, "text");
            },
            /**
             * Text of element (escapes html, use innerHTML instead)
             */
            set: function (text) {
                setProperty(this.id, "text", text);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(TextElement.prototype, "fontSize", {
            get: function () {
                return getProperty(this.id, "font-size");
            },
            /** font size in pixels */
            set: function (size) {
                setProperty(this.id, "font-size", size);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(TextElement.prototype, "overflow", {
            // ill add types i need as they come
            set: function (overflow) {
                this.setStyle("overflow: " + overflow);
            },
            enumerable: false,
            configurable: true
        });
        return TextElement;
    }(DestructibleElement));
    Nomx.TextElement = TextElement;
    var Label = /** @class */ (function (_super) {
        __extends(Label, _super);
        function Label(isNew, id) {
            var _this = _super.call(this, isNew, id) || this;
            if (isNew) {
                textLabel(id, "");
            }
            return _this;
        }
        return Label;
    }(TextElement));
    Nomx.Label = Label;
    var Button = /** @class */ (function (_super) {
        __extends(Button, _super);
        function Button(isNew, id) {
            var _this = _super.call(this, isNew, id) || this;
            _this.props = {};
            _this.onClick = function (event) { };
            if (isNew) {
                button(id, "");
            }
            _this.on("click", function (event) {
                _this.onClick(event);
            });
            return _this;
        }
        Object.defineProperty(Button.prototype, "pure", {
            set: function (v) {
                this.setStyle("border: 0px; background-image: none; margin: 0px; border-radius: 0px");
            },
            enumerable: false,
            configurable: true
        });
        return Button;
    }(TextElement));
    Nomx.Button = Button;
    var RippleButton = /** @class */ (function (_super) {
        __extends(RippleButton, _super);
        function RippleButton(isNew, id) {
            var _this = _super.call(this, isNew, id) || this;
            _this.props = {};
            _this.ripples = [];
            _this.color = "#FFF";
            _this.shadow = false;
            _this.textElement = Nomx.create("container", { parent: _this });
            _this.setStyle("transition: box-shadow .3s; overflow: hidden");
            _this.on("mouseout", function () {
                if (_this.shadow) {
                    _this.setStyle("box-shadow: none");
                }
                var ripples = _this.ripples;
                setTimeout(function () {
                    ripples.forEach(function (ripple) {
                        ripple.setStyle("opacity: 0");
                        setTimeout(function () {
                            ripple.delete();
                        }, 1000);
                    });
                }, 50);
                _this.ripples = [];
            });
            _this.on("mouseup", function () {
                if (_this.shadow) {
                    _this.setStyle("box-shadow: none");
                }
                var ripples = _this.ripples;
                setTimeout(function () {
                    ripples.forEach(function (ripple) {
                        ripple.setStyle("opacity: 0");
                        setTimeout(function () {
                            ripple.delete();
                        }, 1000);
                    });
                }, 50);
                _this.ripples = [];
            });
            _this.on("mousedown", function (event) {
                if (_this.shadow) {
                    _this.setStyle("box-shadow: rgb(0 0 0 / 20%) 0px 3px 3px -2px, rgb(0 0 0 / 14%) 0px 3px 4px 0px, rgb(0 0 0 / 12%) 0px 1px 8px 0px");
                }
                var ripple = Nomx.create("container", { parent: _this });
                ripple.setStyle("pointer-events: none;opacity: 80%;transition: opacity 1s, width 1.5s, height 1.5s;transform: translate(-50%, -50%);width: 1px; height:1px; border-radius: 1000px;position: absolute");
                _this.ripples.push(ripple);
                ripple.x = event.offsetX;
                ripple.y = event.offsetY;
                setTimeout(function () { ripple.setStyle("opacity: 40%;width: 800px; height:800px"); }, 50);
                ripple.backgroundColor = _this.color;
            });
            return _this;
        }
        Object.defineProperty(RippleButton.prototype, "text", {
            get: function () {
                return this.textElement.text;
            },
            /**
             * Proxied text; html is escaped; use rippleButton.textElement.innerHTML if you are trying to set html
             */
            set: function (value) {
                this.textElement.text = value;
            },
            enumerable: false,
            configurable: true
        });
        return RippleButton;
    }(Button));
    Nomx.RippleButton = RippleButton;
    /** Textbox */
    var Input = /** @class */ (function (_super) {
        __extends(Input, _super);
        function Input(isNew, id) {
            var _this = _super.call(this, isNew, id) || this;
            _this.props = {};
            _this.onSubmit = function (event) { };
            if (isNew) {
                textInput(id, "");
            }
            _this.on("keypress", function (event) {
                if (event.keyCode === 13) {
                    _this.onSubmit(event);
                }
            });
            return _this;
        }
        return Input;
    }(TextElement));
    Nomx.Input = Input;
    /** Container. aka <div>
     * Css may be different. For example there is line-height set to 18px
     */
    var Container = /** @class */ (function (_super) {
        __extends(Container, _super);
        function Container(isNew, id) {
            var _this = _super.call(this, isNew, id) || this;
            _this.props = {};
            if (isNew) {
                container(id, "");
            }
            return _this;
        }
        Object.defineProperty(Container.prototype, "type", {
            /** Determines subset type of container */
            set: function (value) {
                switch (value) {
                    case "fill":
                        this.setStyle("width: 100%; height: 100%; position: absolute");
                        break;
                }
            },
            enumerable: false,
            configurable: true
        });
        return Container;
    }(TextElement));
    Nomx.Container = Container;
    /** Represents a screen */
    var Screen = /** @class */ (function (_super) {
        __extends(Screen, _super);
        function Screen(isNew, id, children) {
            var _this = _super.call(this, isNew, id) || this;
            if (isNew) {
                forge.innerHTML += "<div class=\"screen\" tabindex=\"1\" data-theme=\"default\" id=\"" + id + "\" style=\"display: none; height: 450px; width: 320px; left: 0px; top: 0px; position: absolute; z-index: 0; background-color: rgb(255, 255, 255);\"></div>";
                setParent(id, "divApplab");
            }
            return _this;
        }
        Object.defineProperty(Screen.prototype, "isActiveScreen", {
            get: function () {
                return this.style.match("display: none") !== null;
            },
            enumerable: false,
            configurable: true
        });
        Screen.prototype.set = function () {
            setScreen(this.id);
        };
        return Screen;
    }(TextElement));
    Nomx.Screen = Screen;
    /** For when you want to pass a string as an Element */
    var Span = /** @class */ (function (_super) {
        __extends(Span, _super);
        function Span(isNew, id) {
            var _this = _super.call(this, isNew, id) || this;
            _this.style = "display: inline; padding: 0px";
            return _this;
        }
        return Span;
    }(Container));
    Nomx.Span = Span;
    /** Represents a line break */
    var Break = /** @class */ (function (_super) {
        __extends(Break, _super);
        function Break(isNew, id) {
            var _this = _super.call(this, isNew, id) || this;
            _this.style = "margin-bottom: 10px";
            return _this;
        }
        /** This will error */
        Break.prototype.addChildren = function () {
            throw "Line breaks can't have children, silly.";
        };
        return Break;
    }(Container));
    Nomx.Break = Break;
    /** singleton class that represents divApplab */
    var Root = /** @class */ (function (_super) {
        __extends(Root, _super);
        function Root() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.id = "divApplab";
            return _this;
        }
        Object.defineProperty(Root.prototype, "nodes", {
            /** Every element (that has an id) in the app (Computationally expensive, best you use caches) */
            get: function () {
                return parser.nodes(this.innerHTML);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Root.prototype, "screens", {
            /** Returns every screen. (Computationally expensive, best you use caches) */
            get: function () {
                return this.children.filter(function (c) {
                    return c.className === "screen";
                });
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Root.prototype, "activeScreen", {
            /** Returns current screen. (Computationally expensive, best you use caches) */
            get: function () {
                return this.children.filter(function (c) {
                    return c.className === "screen" && c.style.match("display: none");
                })[0];
            },
            enumerable: false,
            configurable: true
        });
        return Root;
    }(Element));
    Nomx.Root = Root;
    var allIndex = {
        div: Container,
        br: Break,
        label: Label,
        button: Button,
        input: Input,
        screen: Screen,
        container: Container,
        span: Span,
        element: Element,
        root: Root,
        ripplebutton: RippleButton,
        img: Image,
    };
    function _instanceof(a, b) {
        //a instanceof b results in {data: false, type: "boolean"} when it's false, and true when it's true; really stupid and annoying
        return a instanceof b === true;
    }
    /**
     * Should only be used when you aren't using cdo-sync's class extension
     */
    function extendClass(C, constructor, props, methods) {
        var Extension = /** @class */ (function (_super) {
            __extends(Extension, _super);
            function Extension(isNew, id, children) {
                var _this = _super.call(this, isNew, id) || this;
                constructor.call(_this, isNew, id, children);
                return _this;
            }
            return Extension;
        }(C));
        ;
        Object.defineProperties(Extension, props);
        var proto = Extension.prototype;
        for (var method in methods) {
            proto[method] = methods[method];
        }
    }
    Nomx.extendClass = extendClass;
    //	export function create<e extends keyof creatableTypes>(ElementType: e, props?: convertClassToProps<creatableTypes[e]>, children?: CreateChildren[]): InstanceType<creatableTypes[e]>
    //	export function create<e extends creatableTypes[keyof creatableTypes]>(ElementType: e, props?: convertClassToProps<e>, children?: CreateChildren[]): InstanceType<e>	
    function create(ElementType, props) {
        var children = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            children[_i - 2] = arguments[_i];
        }
        var elementId;
        if (props == undefined) {
            props = {};
        }
        else if (props.id) {
            elementId = props.id;
            delete props.id;
        }
        if (!elementId) {
            elementId = prefix + (++counter).toString();
        }
        var computedChildren = [];
        if (children.length === 1 && typeof children[0] === "string") {
            props.text = children[0];
        }
        else {
            function spread(arr) {
                for (var _i = 0, arr_1 = arr; _i < arr_1.length; _i++) {
                    var val = arr_1[_i];
                    if (Array.isArray(val)) {
                        spread(val);
                    }
                    else if (_instanceof(val, DestructibleElement)) {
                        computedChildren.push(val);
                    }
                    else {
                        computedChildren.push(Nomx.create("span", {
                            text: String(val)
                        }));
                    }
                }
            }
            spread(children);
        }
        var element;
        //children: [DestructibleElement | string]
        if (typeof ElementType === "string") {
            element = new allIndex[ElementType](true, elementId);
        }
        else {
            element = new ElementType(true, elementId);
        }
        Nomx.ElementsById[element.id] = element;
        if (computedChildren.length > 0)
            {element.addChildren(computedChildren);}
        Object.keys(props).map(function (key) {
            element[key] = props[key];
        });
        element.afterPropsSet();
        return element;
    }
    Nomx.create = create;
    function get(id, ElementType) {
        if (ElementType === void 0) { ElementType = Container; }
        if (Nomx.ElementsById[id]) {
            return Nomx.ElementsById[id];
        }
        else if (typeof ElementType === "string") {
            return new allIndex[ElementType](false, id, []);
        }
        else {
            return new ElementType(false, id, []);
        }
    }
    Nomx.get = get;
    /** Represents divApplab; of which all elements **must** be parented to. */
    Nomx.root = Nomx.get("divApplab", Root);
    var uninitiatedIds = [];
    Nomx.root.nodes.forEach(function (el) {
        if (el.attributes.id !== "designModeViz") {
            var elType = void 0;
            if (el.attributes.class === "screen") {
                elType = "screen";
            }
            else if (el.tagName === "button") {
                elType = "button";
            }
            else if (el.tagName === "input") {
                elType = "input";
            }
            else if (el.tagName === "div") {
                elType = "container";
            }
            else if (el.tagName === "span") {
                elType = "span";
            }
            else if (el.tagName === "label") {
                elType = "label";
            }
            else {
                elType = "container";
            }
            var dt = el.attributes.id.match(/^([a-zA-Z0-9\_\-]+)(?:\#([a-zA-Z0-9_\$]+))?$/);
            if (dt) {
                if (dt[2]) {
                    elType = dt[2];
                }
                if (elType in allIndex) {
                    window["$$" + dt[1]] = Nomx.get(dt[0], elType);
                }
                else {
                    uninitiatedIds.push(dt);
                }
            }
        }
    });
    if (uninitiatedIds.length > 0) {
        console.log("Custom classes detected!; Make sure to call Nomx.initiateWithClasses() after class declarations.");
    }
    /**
     * Call after you have declared your classes in global scope!
     */
    function initiateWithClasses() {
        uninitiatedIds.forEach(function (_a) {
            var id = _a[0], rid = _a[1], c = _a[2];
            window["$$" + rid] = Nomx.get(id, window[c]);
        });
    }
    Nomx.initiateWithClasses = initiateWithClasses;
    /** URL of the current app */
    Nomx.baseURI = Nomx.root.getAttribute("baseURI");
    /** Channel id of the current app */
    Nomx.channelId = Nomx.baseURI.match(/code.org\/projects\/applab\/([^\/]+)/)[1];
    /** A container that elements created using innerHTML are created, in order to prevent overwriting any existing elements */
    var forge = create("container");
    forge.display = "none";
    forge.parent = Nomx.root;
    /** A container elements go to when they are hidden but not necessarily destroyed */
    var limbo = create("container");
    limbo.display = "none";
    limbo.parent = Nomx.root;
})(Nomx || (Nomx = {}));