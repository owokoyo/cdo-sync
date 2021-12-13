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

namespace Nomx {

	const prefix = "Nomx_Gen_";
	let counter = 0;

	export type HTMLTree = { attributes: { escaped: string, name: string, value: string }[], children: HTMLTree[], tag: string, id: string };

	export const ElementsById: { [s: string]: Element } = {};

	export type Node = { tagName: string, attributes: { [s: string]: string | undefined }, children: (Node /*| string*/)[] };;

	const parser = (function () {
		// Regular Expressions for parsing tags and attributes
		var startTag = /^<([-A-Za-z0-9_]+)((?:\s+[-A-Z-a-z0-9_]+(?:\s*=\s*(?:(?:"[^"]*")|(?:'[^']*')|[^>\s]+))?)*)\s*(\/?)>/,
			endTag = /^<\/([-A-Za-z0-9_]+)[^>]*>/,
			attr = /([-A-Za-z0-9_]+)(?:\s*=\s*(?:(?:"((?:\\.|[^"])*)")|(?:'((?:\\.|[^'])*)')|([^>\s]+)))?/g,
			attr2 = /([-A-Za-z0-9_]+)(?:\s*=\s*(?:(?:"((?:\\.|[^"])*)")|(?:'((?:\\.|[^'])*)')|([^>\s]+)))?/;
		var empty = makeMap("area,base,basefont,br,col,frame,hr,img,input,isindex,link,meta,param,embed");
		var closeSelf = makeMap("colgroup,dd,dt,li,options,p,td,tfoot,th,thead,tr");


		function makeMap(str: string) {
			var obj: { [s: string]: boolean } = {}, items = str.split(",");
			for (var i = 0; i < items.length; i++)
				{obj[items[i]] = true;}
			return obj;
		}

		function parseFragments(html: string) {
			const parsedTags: (string | [string, string] | [string])[] = [];

			while (true) {
				const match = html.match(startTag);
				if (match) {
					parsedTags.push([match[1], match[2]]);
					html = html.substring(match[0].length);
				} else {
					const matchEnd = html.match(endTag);
					if (matchEnd) {
						parsedTags.push([matchEnd[1]]);
						html = html.substring(matchEnd[0].length);
					} else {
						const index = html.indexOf("<");
						if (index >= 0) {
							//parsedTags.push(html.slice(0, index))
							html = html.substring(index);
						} else {
							break;
						}
					}
				}
			}
			return parsedTags;
		}
		function parse(parsedTags: (string | [string, string] | [string])[]) {
			const stack: Node[] = [{ tagName: "", attributes: {}, children: [] }];
			for (const fragment of parsedTags) {
				if (typeof fragment === "string") {
					//never
					//stack[stack.length - 1].children.push(fragment)
				} else if (fragment.length === 2) {
					const node: Node = { tagName: "", attributes: {}, children: [] };
					node.tagName = fragment[0];
					for (const attribute of fragment[1].match(attr) || []) {
						const attrmatch = attribute.match(attr2)!;
						node.attributes[attrmatch[1]] = attrmatch[2];
					}
					stack[stack.length - 1].children.push(node);
					if (!empty[node.tagName] && !closeSelf[node.tagName]) {
						stack.push(node);
					}
				} else {
					stack.pop();
				}
			}
			return stack[0].children;
		}
		//why the fuck this not working
		function getIds(parsedTags: (string | [string, string] | [string])[]) {
			const stack: Node[] = [];
			for (const fragment of parsedTags) {
				if (typeof fragment === "string") {
					//stack[stack.length - 1].children.push(fragment)
				} else if (fragment.length === 2) {
					const node: Node = { tagName: "", attributes: {}, children: [] };
					node.tagName = fragment[0];
					for (const attribute of fragment[1].match(attr) || []) {
						const attrmatch = attribute.match(attr2)!;
						node.attributes[attrmatch[1]] = attrmatch[2];
					}
					stack.push(node);
				}
			}
			return stack;
		}
		return { nodes: (html: string) => getIds(parseFragments(html)), tree: (html: string) => parse(parseFragments(html)) };
	})();

	class _sd {
		__get(prop: string) {
			return this.computedStyleObj[prop];
		}
		__set(style: string) {
			this.element.setStyle(style);
		}

		private _computedStyleObj: { [s: string]: string } = {};
		private lastStyle = "";
		private get computedStyleObj() {
			if (this.element.style !== this.lastStyle) {
				this._computedStyleObj = {};
				this.element.style.split(/;\s*/g).forEach(s => {
					const p = s.match(/([a-z]+(?:\-[a-z]+)*):\s*(.+)/)!;
					this._computedStyleObj[p[1]] = p[2];
				});
			}
			return this._computedStyleObj;
		}
		private element: Element;
		constructor(element: Element) {
			this.element = element;
		}
	}

	
	type StyleDeclaration = _sd & {[k in (keyof typeof cssStyles)[number]]: unknown};
	
	const StyleDeclaration = _sd;

	const cssStyles = {"accentColor":"accent-color","additiveSymbols":"additive-symbols","alignContent":"align-content","alignItems":"align-items","alignSelf":"align-self","alignmentBaseline":"alignment-baseline","all":"all","animation":"animation","animationDelay":"animation-delay","animationDirection":"animation-direction","animationDuration":"animation-duration","animationFillMode":"animation-fill-mode","animationIterationCount":"animation-iteration-count","animationName":"animation-name","animationPlayState":"animation-play-state","animationTimingFunction":"animation-timing-function","appRegion":"app-region","appearance":"appearance","ascentOverride":"ascent-override","aspectRatio":"aspect-ratio","backdropFilter":"backdrop-filter","backfaceVisibility":"backface-visibility","background":"background","backgroundAttachment":"background-attachment","backgroundBlendMode":"background-blend-mode","backgroundClip":"background-clip","backgroundColor":"background-color","backgroundImage":"background-image","backgroundOrigin":"background-origin","backgroundPosition":"background-position","backgroundPositionX":"background-position-x","backgroundPositionY":"background-position-y","backgroundRepeat":"background-repeat","backgroundRepeatX":"background-repeat-x","backgroundRepeatY":"background-repeat-y","backgroundSize":"background-size","baselineShift":"baseline-shift","blockSize":"block-size","border":"border","borderBlock":"border-block","borderBlockColor":"border-block-color","borderBlockEnd":"border-block-end","borderBlockEndColor":"border-block-end-color","borderBlockEndStyle":"border-block-end-style","borderBlockEndWidth":"border-block-end-width","borderBlockStart":"border-block-start","borderBlockStartColor":"border-block-start-color","borderBlockStartStyle":"border-block-start-style","borderBlockStartWidth":"border-block-start-width","borderBlockStyle":"border-block-style","borderBlockWidth":"border-block-width","borderBottom":"border-bottom","borderBottomColor":"border-bottom-color","borderBottomLeftRadius":"border-bottom-left-radius","borderBottomRightRadius":"border-bottom-right-radius","borderBottomStyle":"border-bottom-style","borderBottomWidth":"border-bottom-width","borderCollapse":"border-collapse","borderColor":"border-color","borderEndEndRadius":"border-end-end-radius","borderEndStartRadius":"border-end-start-radius","borderImage":"border-image","borderImageOutset":"border-image-outset","borderImageRepeat":"border-image-repeat","borderImageSlice":"border-image-slice","borderImageSource":"border-image-source","borderImageWidth":"border-image-width","borderInline":"border-inline","borderInlineColor":"border-inline-color","borderInlineEnd":"border-inline-end","borderInlineEndColor":"border-inline-end-color","borderInlineEndStyle":"border-inline-end-style","borderInlineEndWidth":"border-inline-end-width","borderInlineStart":"border-inline-start","borderInlineStartColor":"border-inline-start-color","borderInlineStartStyle":"border-inline-start-style","borderInlineStartWidth":"border-inline-start-width","borderInlineStyle":"border-inline-style","borderInlineWidth":"border-inline-width","borderLeft":"border-left","borderLeftColor":"border-left-color","borderLeftStyle":"border-left-style","borderLeftWidth":"border-left-width","borderRadius":"border-radius","borderRight":"border-right","borderRightColor":"border-right-color","borderRightStyle":"border-right-style","borderRightWidth":"border-right-width","borderSpacing":"border-spacing","borderStartEndRadius":"border-start-end-radius","borderStartStartRadius":"border-start-start-radius","borderStyle":"border-style","borderTop":"border-top","borderTopColor":"border-top-color","borderTopLeftRadius":"border-top-left-radius","borderTopRightRadius":"border-top-right-radius","borderTopStyle":"border-top-style","borderTopWidth":"border-top-width","borderWidth":"border-width","bottom":"bottom","boxShadow":"box-shadow","boxSizing":"box-sizing","breakAfter":"break-after","breakBefore":"break-before","breakInside":"break-inside","bufferedRendering":"buffered-rendering","captionSide":"caption-side","caretColor":"caret-color","clear":"clear","clip":"clip","clipPath":"clip-path","clipRule":"clip-rule","color":"color","colorInterpolation":"color-interpolation","colorInterpolationFilters":"color-interpolation-filters","colorRendering":"color-rendering","colorScheme":"color-scheme","columnCount":"column-count","columnFill":"column-fill","columnGap":"column-gap","columnRule":"column-rule","columnRuleColor":"column-rule-color","columnRuleStyle":"column-rule-style","columnRuleWidth":"column-rule-width","columnSpan":"column-span","columnWidth":"column-width","columns":"columns","contain":"contain","containIntrinsicBlockSize":"contain-intrinsic-block-size","containIntrinsicHeight":"contain-intrinsic-height","containIntrinsicInlineSize":"contain-intrinsic-inline-size","containIntrinsicSize":"contain-intrinsic-size","containIntrinsicWidth":"contain-intrinsic-width","content":"content","contentVisibility":"content-visibility","counterIncrement":"counter-increment","counterReset":"counter-reset","counterSet":"counter-set","cursor":"cursor","cx":"cx","cy":"cy","d":"d","descentOverride":"descent-override","direction":"direction","display":"display","dominantBaseline":"dominant-baseline","emptyCells":"empty-cells","fallback":"fallback","fill":"fill","fillOpacity":"fill-opacity","fillRule":"fill-rule","filter":"filter","flex":"flex","flexBasis":"flex-basis","flexDirection":"flex-direction","flexFlow":"flex-flow","flexGrow":"flex-grow","flexShrink":"flex-shrink","flexWrap":"flex-wrap","float":"float","floodColor":"flood-color","floodOpacity":"flood-opacity","font":"font","fontDisplay":"font-display","fontFamily":"font-family","fontFeatureSettings":"font-feature-settings","fontKerning":"font-kerning","fontOpticalSizing":"font-optical-sizing","fontSize":"font-size","fontStretch":"font-stretch","fontStyle":"font-style","fontVariant":"font-variant","fontVariantCaps":"font-variant-caps","fontVariantEastAsian":"font-variant-east-asian","fontVariantLigatures":"font-variant-ligatures","fontVariantNumeric":"font-variant-numeric","fontVariationSettings":"font-variation-settings","fontWeight":"font-weight","forcedColorAdjust":"forced-color-adjust","gap":"gap","grid":"grid","gridArea":"grid-area","gridAutoColumns":"grid-auto-columns","gridAutoFlow":"grid-auto-flow","gridAutoRows":"grid-auto-rows","gridColumn":"grid-column","gridColumnEnd":"grid-column-end","gridColumnGap":"grid-column-gap","gridColumnStart":"grid-column-start","gridGap":"grid-gap","gridRow":"grid-row","gridRowEnd":"grid-row-end","gridRowGap":"grid-row-gap","gridRowStart":"grid-row-start","gridTemplate":"grid-template","gridTemplateAreas":"grid-template-areas","gridTemplateColumns":"grid-template-columns","gridTemplateRows":"grid-template-rows","height":"height","hyphens":"hyphens","imageOrientation":"image-orientation","imageRendering":"image-rendering","inherits":"inherits","initialValue":"initial-value","inlineSize":"inline-size","inset":"inset","insetBlock":"inset-block","insetBlockEnd":"inset-block-end","insetBlockStart":"inset-block-start","insetInline":"inset-inline","insetInlineEnd":"inset-inline-end","insetInlineStart":"inset-inline-start","isolation":"isolation","justifyContent":"justify-content","justifyItems":"justify-items","justifySelf":"justify-self","left":"left","letterSpacing":"letter-spacing","lightingColor":"lighting-color","lineBreak":"line-break","lineGapOverride":"line-gap-override","lineHeight":"line-height","listStyle":"list-style","listStyleImage":"list-style-image","listStylePosition":"list-style-position","listStyleType":"list-style-type","margin":"margin","marginBlock":"margin-block","marginBlockEnd":"margin-block-end","marginBlockStart":"margin-block-start","marginBottom":"margin-bottom","marginInline":"margin-inline","marginInlineEnd":"margin-inline-end","marginInlineStart":"margin-inline-start","marginLeft":"margin-left","marginRight":"margin-right","marginTop":"margin-top","marker":"marker","markerEnd":"marker-end","markerMid":"marker-mid","markerStart":"marker-start","mask":"mask","maskType":"mask-type","maxBlockSize":"max-block-size","maxHeight":"max-height","maxInlineSize":"max-inline-size","maxWidth":"max-width","maxZoom":"max-zoom","minBlockSize":"min-block-size","minHeight":"min-height","minInlineSize":"min-inline-size","minWidth":"min-width","minZoom":"min-zoom","mixBlendMode":"mix-blend-mode","negative":"negative","objectFit":"object-fit","objectPosition":"object-position","offset":"offset","offsetDistance":"offset-distance","offsetPath":"offset-path","offsetRotate":"offset-rotate","opacity":"opacity","order":"order","orientation":"orientation","orphans":"orphans","outline":"outline","outlineColor":"outline-color","outlineOffset":"outline-offset","outlineStyle":"outline-style","outlineWidth":"outline-width","overflow":"overflow","overflowAnchor":"overflow-anchor","overflowClipMargin":"overflow-clip-margin","overflowWrap":"overflow-wrap","overflowX":"overflow-x","overflowY":"overflow-y","overscrollBehavior":"overscroll-behavior","overscrollBehaviorBlock":"overscroll-behavior-block","overscrollBehaviorInline":"overscroll-behavior-inline","overscrollBehaviorX":"overscroll-behavior-x","overscrollBehaviorY":"overscroll-behavior-y","pad":"pad","padding":"padding","paddingBlock":"padding-block","paddingBlockEnd":"padding-block-end","paddingBlockStart":"padding-block-start","paddingBottom":"padding-bottom","paddingInline":"padding-inline","paddingInlineEnd":"padding-inline-end","paddingInlineStart":"padding-inline-start","paddingLeft":"padding-left","paddingRight":"padding-right","paddingTop":"padding-top","page":"page","pageBreakAfter":"page-break-after","pageBreakBefore":"page-break-before","pageBreakInside":"page-break-inside","pageOrientation":"page-orientation","paintOrder":"paint-order","perspective":"perspective","perspectiveOrigin":"perspective-origin","placeContent":"place-content","placeItems":"place-items","placeSelf":"place-self","pointerEvents":"pointer-events","position":"position","prefix":"prefix","quotes":"quotes","r":"r","range":"range","resize":"resize","right":"right","rowGap":"row-gap","rubyPosition":"ruby-position","rx":"rx","ry":"ry","scrollBehavior":"scroll-behavior","scrollMargin":"scroll-margin","scrollMarginBlock":"scroll-margin-block","scrollMarginBlockEnd":"scroll-margin-block-end","scrollMarginBlockStart":"scroll-margin-block-start","scrollMarginBottom":"scroll-margin-bottom","scrollMarginInline":"scroll-margin-inline","scrollMarginInlineEnd":"scroll-margin-inline-end","scrollMarginInlineStart":"scroll-margin-inline-start","scrollMarginLeft":"scroll-margin-left","scrollMarginRight":"scroll-margin-right","scrollMarginTop":"scroll-margin-top","scrollPadding":"scroll-padding","scrollPaddingBlock":"scroll-padding-block","scrollPaddingBlockEnd":"scroll-padding-block-end","scrollPaddingBlockStart":"scroll-padding-block-start","scrollPaddingBottom":"scroll-padding-bottom","scrollPaddingInline":"scroll-padding-inline","scrollPaddingInlineEnd":"scroll-padding-inline-end","scrollPaddingInlineStart":"scroll-padding-inline-start","scrollPaddingLeft":"scroll-padding-left","scrollPaddingRight":"scroll-padding-right","scrollPaddingTop":"scroll-padding-top","scrollSnapAlign":"scroll-snap-align","scrollSnapStop":"scroll-snap-stop","scrollSnapType":"scroll-snap-type","scrollbarGutter":"scrollbar-gutter","shapeImageThreshold":"shape-image-threshold","shapeMargin":"shape-margin","shapeOutside":"shape-outside","shapeRendering":"shape-rendering","size":"size","sizeAdjust":"size-adjust","speak":"speak","speakAs":"speak-as","src":"src","stopColor":"stop-color","stopOpacity":"stop-opacity","stroke":"stroke","strokeDasharray":"stroke-dasharray","strokeDashoffset":"stroke-dashoffset","strokeLinecap":"stroke-linecap","strokeLinejoin":"stroke-linejoin","strokeMiterlimit":"stroke-miterlimit","strokeOpacity":"stroke-opacity","strokeWidth":"stroke-width","suffix":"suffix","symbols":"symbols","syntax":"syntax","system":"system","tabSize":"tab-size","tableLayout":"table-layout","textAlign":"text-align","textAlignLast":"text-align-last","textAnchor":"text-anchor","textCombineUpright":"text-combine-upright","textDecoration":"text-decoration","textDecorationColor":"text-decoration-color","textDecorationLine":"text-decoration-line","textDecorationSkipInk":"text-decoration-skip-ink","textDecorationStyle":"text-decoration-style","textDecorationThickness":"text-decoration-thickness","textIndent":"text-indent","textOrientation":"text-orientation","textOverflow":"text-overflow","textRendering":"text-rendering","textShadow":"text-shadow","textSizeAdjust":"text-size-adjust","textTransform":"text-transform","textUnderlineOffset":"text-underline-offset","textUnderlinePosition":"text-underline-position","top":"top","touchAction":"touch-action","transform":"transform","transformBox":"transform-box","transformOrigin":"transform-origin","transformStyle":"transform-style","transition":"transition","transitionDelay":"transition-delay","transitionDuration":"transition-duration","transitionProperty":"transition-property","transitionTimingFunction":"transition-timing-function","unicodeBidi":"unicode-bidi","unicodeRange":"unicode-range","userSelect":"user-select","userZoom":"user-zoom","vectorEffect":"vector-effect","verticalAlign":"vertical-align","visibility":"visibility","webkitAlignContent":"--webkit-align-content","webkitAlignItems":"--webkit-align-items","webkitAlignSelf":"--webkit-align-self","webkitAnimation":"--webkit-animation","webkitAnimationDelay":"--webkit-animation-delay","webkitAnimationDirection":"--webkit-animation-direction","webkitAnimationDuration":"--webkit-animation-duration","webkitAnimationFillMode":"--webkit-animation-fill-mode","webkitAnimationIterationCount":"--webkit-animation-iteration-count","webkitAnimationName":"--webkit-animation-name","webkitAnimationPlayState":"--webkit-animation-play-state","webkitAnimationTimingFunction":"--webkit-animation-timing-function","webkitAppRegion":"--webkit-app-region","webkitAppearance":"--webkit-appearance","webkitBackfaceVisibility":"--webkit-backface-visibility","webkitBackgroundClip":"--webkit-background-clip","webkitBackgroundOrigin":"--webkit-background-origin","webkitBackgroundSize":"--webkit-background-size","webkitBorderAfter":"--webkit-border-after","webkitBorderAfterColor":"--webkit-border-after-color","webkitBorderAfterStyle":"--webkit-border-after-style","webkitBorderAfterWidth":"--webkit-border-after-width","webkitBorderBefore":"--webkit-border-before","webkitBorderBeforeColor":"--webkit-border-before-color","webkitBorderBeforeStyle":"--webkit-border-before-style","webkitBorderBeforeWidth":"--webkit-border-before-width","webkitBorderBottomLeftRadius":"--webkit-border-bottom-left-radius","webkitBorderBottomRightRadius":"--webkit-border-bottom-right-radius","webkitBorderEnd":"--webkit-border-end","webkitBorderEndColor":"--webkit-border-end-color","webkitBorderEndStyle":"--webkit-border-end-style","webkitBorderEndWidth":"--webkit-border-end-width","webkitBorderHorizontalSpacing":"--webkit-border-horizontal-spacing","webkitBorderImage":"--webkit-border-image","webkitBorderRadius":"--webkit-border-radius","webkitBorderStart":"--webkit-border-start","webkitBorderStartColor":"--webkit-border-start-color","webkitBorderStartStyle":"--webkit-border-start-style","webkitBorderStartWidth":"--webkit-border-start-width","webkitBorderTopLeftRadius":"--webkit-border-top-left-radius","webkitBorderTopRightRadius":"--webkit-border-top-right-radius","webkitBorderVerticalSpacing":"--webkit-border-vertical-spacing","webkitBoxAlign":"--webkit-box-align","webkitBoxDecorationBreak":"--webkit-box-decoration-break","webkitBoxDirection":"--webkit-box-direction","webkitBoxFlex":"--webkit-box-flex","webkitBoxOrdinalGroup":"--webkit-box-ordinal-group","webkitBoxOrient":"--webkit-box-orient","webkitBoxPack":"--webkit-box-pack","webkitBoxReflect":"--webkit-box-reflect","webkitBoxShadow":"--webkit-box-shadow","webkitBoxSizing":"--webkit-box-sizing","webkitClipPath":"--webkit-clip-path","webkitColumnBreakAfter":"--webkit-column-break-after","webkitColumnBreakBefore":"--webkit-column-break-before","webkitColumnBreakInside":"--webkit-column-break-inside","webkitColumnCount":"--webkit-column-count","webkitColumnGap":"--webkit-column-gap","webkitColumnRule":"--webkit-column-rule","webkitColumnRuleColor":"--webkit-column-rule-color","webkitColumnRuleStyle":"--webkit-column-rule-style","webkitColumnRuleWidth":"--webkit-column-rule-width","webkitColumnSpan":"--webkit-column-span","webkitColumnWidth":"--webkit-column-width","webkitColumns":"--webkit-columns","webkitFilter":"--webkit-filter","webkitFlex":"--webkit-flex","webkitFlexBasis":"--webkit-flex-basis","webkitFlexDirection":"--webkit-flex-direction","webkitFlexFlow":"--webkit-flex-flow","webkitFlexGrow":"--webkit-flex-grow","webkitFlexShrink":"--webkit-flex-shrink","webkitFlexWrap":"--webkit-flex-wrap","webkitFontFeatureSettings":"--webkit-font-feature-settings","webkitFontSmoothing":"--webkit-font-smoothing","webkitHighlight":"--webkit-highlight","webkitHyphenateCharacter":"--webkit-hyphenate-character","webkitJustifyContent":"--webkit-justify-content","webkitLineBreak":"--webkit-line-break","webkitLineClamp":"--webkit-line-clamp","webkitLocale":"--webkit-locale","webkitLogicalHeight":"--webkit-logical-height","webkitLogicalWidth":"--webkit-logical-width","webkitMarginAfter":"--webkit-margin-after","webkitMarginBefore":"--webkit-margin-before","webkitMarginEnd":"--webkit-margin-end","webkitMarginStart":"--webkit-margin-start","webkitMask":"--webkit-mask","webkitMaskBoxImage":"--webkit-mask-box-image","webkitMaskBoxImageOutset":"--webkit-mask-box-image-outset","webkitMaskBoxImageRepeat":"--webkit-mask-box-image-repeat","webkitMaskBoxImageSlice":"--webkit-mask-box-image-slice","webkitMaskBoxImageSource":"--webkit-mask-box-image-source","webkitMaskBoxImageWidth":"--webkit-mask-box-image-width","webkitMaskClip":"--webkit-mask-clip","webkitMaskComposite":"--webkit-mask-composite","webkitMaskImage":"--webkit-mask-image","webkitMaskOrigin":"--webkit-mask-origin","webkitMaskPosition":"--webkit-mask-position","webkitMaskPositionX":"--webkit-mask-position-x","webkitMaskPositionY":"--webkit-mask-position-y","webkitMaskRepeat":"--webkit-mask-repeat","webkitMaskRepeatX":"--webkit-mask-repeat-x","webkitMaskRepeatY":"--webkit-mask-repeat-y","webkitMaskSize":"--webkit-mask-size","webkitMaxLogicalHeight":"--webkit-max-logical-height","webkitMaxLogicalWidth":"--webkit-max-logical-width","webkitMinLogicalHeight":"--webkit-min-logical-height","webkitMinLogicalWidth":"--webkit-min-logical-width","webkitOpacity":"--webkit-opacity","webkitOrder":"--webkit-order","webkitPaddingAfter":"--webkit-padding-after","webkitPaddingBefore":"--webkit-padding-before","webkitPaddingEnd":"--webkit-padding-end","webkitPaddingStart":"--webkit-padding-start","webkitPerspective":"--webkit-perspective","webkitPerspectiveOrigin":"--webkit-perspective-origin","webkitPerspectiveOriginX":"--webkit-perspective-origin-x","webkitPerspectiveOriginY":"--webkit-perspective-origin-y","webkitPrintColorAdjust":"--webkit-print-color-adjust","webkitRtlOrdering":"--webkit-rtl-ordering","webkitRubyPosition":"--webkit-ruby-position","webkitShapeImageThreshold":"--webkit-shape-image-threshold","webkitShapeMargin":"--webkit-shape-margin","webkitShapeOutside":"--webkit-shape-outside","webkitTapHighlightColor":"--webkit-tap-highlight-color","webkitTextCombine":"--webkit-text-combine","webkitTextDecorationsInEffect":"--webkit-text-decorations-in-effect","webkitTextEmphasis":"--webkit-text-emphasis","webkitTextEmphasisColor":"--webkit-text-emphasis-color","webkitTextEmphasisPosition":"--webkit-text-emphasis-position","webkitTextEmphasisStyle":"--webkit-text-emphasis-style","webkitTextFillColor":"--webkit-text-fill-color","webkitTextOrientation":"--webkit-text-orientation","webkitTextSecurity":"--webkit-text-security","webkitTextSizeAdjust":"--webkit-text-size-adjust","webkitTextStroke":"--webkit-text-stroke","webkitTextStrokeColor":"--webkit-text-stroke-color","webkitTextStrokeWidth":"--webkit-text-stroke-width","webkitTransform":"--webkit-transform","webkitTransformOrigin":"--webkit-transform-origin","webkitTransformOriginX":"--webkit-transform-origin-x","webkitTransformOriginY":"--webkit-transform-origin-y","webkitTransformOriginZ":"--webkit-transform-origin-z","webkitTransformStyle":"--webkit-transform-style","webkitTransition":"--webkit-transition","webkitTransitionDelay":"--webkit-transition-delay","webkitTransitionDuration":"--webkit-transition-duration","webkitTransitionProperty":"--webkit-transition-property","webkitTransitionTimingFunction":"--webkit-transition-timing-function","webkitUserDrag":"--webkit-user-drag","webkitUserModify":"--webkit-user-modify","webkitUserSelect":"--webkit-user-select","webkitWritingMode":"--webkit-writing-mode","whiteSpace":"white-space","widows":"widows","width":"width","willChange":"will-change","wordBreak":"word-break","wordSpacing":"word-spacing","wordWrap":"word-wrap","writingMode":"writing-mode","x":"x","y":"y","zIndex":"z-index","zoom":"zoom"};
	for (const styleName in cssStyles) {
		Object.defineProperty(StyleDeclaration.prototype,styleName, {
			get:function(this: StyleDeclaration){
				return this.__get(cssStyles[styleName as keyof typeof cssStyles]);
			},
			set: function(this:StyleDeclaration, value: unknown){
				this.__set(`${cssStyles[styleName as keyof typeof cssStyles]}: ${value}`);
			}
		});
	}

	export type getProps<el extends Element, u extends keyof el> = Partial<{ [Prop in u]: el[Prop] }>;


	// #Element
	export abstract class Element {

		/** ID of element, if not set, will be Nomx_Gen_NUMBER */
		id: string;


		props: getProps<Element, "elementInit" | "id" | "style" | "backgroundColor" | "innerHTML" | "scrollTop" | "borderWidth" | "borderColor" | "display" | "padding" | "margin"> = {};

		private _lastouterHTML: string = "";
		private _outerHTMLTree?: Node;

		get outerHTMLTree() {
			if (this._lastouterHTML === this.outerHTML) {
				return this._outerHTMLTree!;
			} else {
				this._lastouterHTML = this.outerHTML;
				this._outerHTMLTree = parser.tree(this.outerHTML)[0] as Node;
				return this._outerHTMLTree;
			}
		}

		/**
		 * Returns children count
		 * Use this over Element.children.length!! children.length re-parses the html which is heavy on the client!
		 */
		get childElementCount(): number {
			return parseInt(this.getAttribute("childElementCount"));
		}

		get className(): string {
			return this.getAttribute("className");
		}

		/** array of elements. can include a Node if the child's id is not provided. Use .children instead to filter out id-less nodes */
		get childrenRaw(): ReadonlyArray<Nomx.DestructibleElement | Node> {
			return this.outerHTMLTree.children.map(e => e.attributes.id ? get(e.attributes.id, "container") : e) as ReadonlyArray<Nomx.DestructibleElement | Node>;
		}

		/** array of elements, id-less nodes are ignored. */
		get children(): ReadonlyArray<Nomx.DestructibleElement> {
			return this.childrenRaw.filter(e => "id" in e) as ReadonlyArray<Nomx.DestructibleElement>;
		}

		on<t extends "click" | "mousemove" | "mousedown" | "mouseup" | "mouseover" | "mouseout">(type: t, callback: (event: {
			offsetX: number
			offsetY: number
			movementX: number
			pageX: number
			movementY: number
			pageY: number
			clientX: number
			clientY: number
			button: number
			x: number
			y: number
			type: t
			toElementId: string
		} & BaseEventProps & KeyEventProps) => void): void

		on<t extends "keyup" | "keydown" | "keypress", id extends string>(type: t, callback: (event: {
			type: t
		} & BaseEventProps & KeyActionEventProps) => void): void

		on<t extends "input">(type: t, callback: (event: {
			type: t
		} & BaseEventProps & SelectionProps) => void): void

		on<t extends "change", id extends string>(type: t, callback: (event: {
			type: t
		} & BaseEventProps & KeyActionEventProps & SelectionProps) => void): void

		/**
		 * Adds event listener; Equivalent to onEvent(element.id, eventName, callback);
		 */
		on(t: string, callback: (event: any) => void) {
			onEvent(this.id, t as "change", callback);
		}

		/** setStyle; equivalent to setStyle(element.id, style) */
		setStyle(style: string) {
			setStyle(this.id, style);
		}

		/** background color */
		set backgroundColor(color: string) {
			setProperty(this.id, "background-color", color);
		}

		get backgroundColor(): string {
			return getProperty(this.id, "background-color");
		}

		/** element tag name; ex: DIV | BUTTON | IMG */
		get tagName() {
			return this.getAttribute("tagName");
		}

		/**
		 * Resetting the style will not overwrite all styles, you must know which are currently active and do "style: unset;" in order to reset
		 */
		set style(style: string) {
			this.setStyle(style);
		}
		get style() {
			return this.outerHTMLTree.attributes.style || "";
		}


		/*
		private _styleDeclaration?: StyleDeclaration;

		get styleDeclaration() {
			if (!this._styleDeclaration) {
				this._styleDeclaration = new StyleDeclaration(this);
			}
			return this._styleDeclaration;
		}
		*/
		/** An object similar to a CSSStyleDeclaration, which allows you to set styles by doing styleDeclaration.prop = value
		 * NOTE: It is not exactly like a CSSStyleDeclaration, for example styleDeclaration.marginTop will fail.
		*/
		//@ts-ignore
		styleDeclaration: StyleDeclaration;

		/** includes the element itself ex: <div id="ELEMENTID"><div id = "CHILD">HI</div></div> */
		get outerHTML() {
			return this.getAttribute("outerHTML");
		}

		/** includes only the children of the element ex: <div id = "CHILD">HI</div> */
		get innerHTML() {
			return this.getAttribute("innerHTML");
		}

		set innerHTML(innerhtml: string) {
			innerHTML(this.id, innerhtml);
		}

		/** Height of element, includes parts that are hidden beyond the scroll bar */
		get scrollHeight() {
			return getAttribute(this.id, "scrollHeight");
		}

		/** Location of scroll bar */
		get scrollTop(): number {
			return parseInt(getAttribute(this.id, "scrollTop"));
		}

		set scrollTop(y: number) {
			setAttribute(this.id, "scrollTop", y);
		}

		/** CSS border width */
		get borderWidth() {
			return getProperty(this.id, "border-width");
		}
		set borderWidth(value: number) {
			setProperty(this.id, "border-width", value);
		}

		/** CSS border radius */
		get borderRadius() {
			return getProperty(this.id, "border-radius");
		}
		set borderRadius(value: number) {
			setProperty(this.id, "border-radius", value);
		}

		/** CSS border color */
		get borderColor() {
			return getProperty(this.id, "border-color");
		}

		set borderColor(value: number) {
			setProperty(this.id, "border-color", value);
		}

		/** CSS display; to get the current value do element.styleDeclaration.display */
		set display(display: "inline" | "block" | "contents" | "flex" | "grid" | "inline-block" | "inline-flex" | "inline-grid" | "inline-table" | "list-item" | "run-in" | "table" | "table-caption" | "table-column-group" | "table-header-group" | "table-footer-group" | "table-row-group" | "table-cell" | "table-column" | "table-row" | "none" | "initial" | "inherit") {
			this.setStyle(`display: ${display}`);
		}

		/** CSS padding; element.styleDeclaration.padding */
		set padding(value: number | string) {
			this.setStyle(`padding: ${typeof value === "number" ? `${value}px` : value}`);
		}

		/** CSS margin; element.styleDeclaration.margin */
		set margin(value: number | string) {
			this.setStyle(`margin: ${typeof value === "number" ? `${value}px` : value}`);
		}

		/**
		 * Returns toString()'d representation of the attribute value.
		 */
		getAttribute(attribute: string): string {
			return getAttribute(this.id, attribute);
		}

		setAttribute(attribute: Parameters<typeof setAttribute>[1], value: unknown) {
			return setAttribute(this.id, attribute, value);
		}

		//first child, id-less ignored
		get firstChild(): void | DestructibleElement {
			if (this.children[0]) {
				return this.children[0];
			}
		}

		/** Parents the children to the element */
		addChildren(...children: DestructibleElement[]): void;
		addChildren(children: DestructibleElement[]): void;
		addChildren(...children: DestructibleElement[] | DestructibleElement[][]) {
			if (Array.isArray(children[0])) {
				children = children[0];
			}
			for (const child of children as DestructibleElement[]) {
				child.parent = this;
			}
		}

		set elementInit(callback: (a: unknown) => void) {
			callback(this);
		}

		/** To be called after all props are set  */
		afterPropsSet(): void {

		}

		/** Given a transformer function, sort an array of elements which will become it's new children. */

		// Too hard to implement		
		// reorder(callback: (elements: (DestructibleElement)[]) => {}) {

		// }

		constructor(isNew: boolean, id: string) {
			this.id = id;
			//wtf
			Object.defineProperty(this, "styleDeclaration", {
				value: new StyleDeclaration(this),
				enumerable: false
			});
		}

	}

	// #Element
	export abstract class DestructibleElement extends Element {
		props: getProps<DestructibleElement, "width" | "height" | "position" | "left" | "right" | "top" | "bottom" | "x" | "y" | "parent"> & Element["props"] = {};

		private _parent?: Element;

		get parent() {
			return this._parent;
		}

		get width() {
			return getProperty(this.id, "width");
		}
		set width(value: number) {
			setProperty(this.id, "width", value);
		}

		get height() {
			return getProperty(this.id, "height");
		}
		set height(value: number) {
			setProperty(this.id, "height", value);
		}

		set position(position: "static" | "relative" | "fixed" | "absolute" | "sticky") {
			this.setStyle(`position: ${position}`);
		}

		/** distance from the left side of the parent element */
		set left(value: number | string) {
			this.setStyle(`left: ${typeof value === "number" ? `${value}px` : value}`);
		}

		/** distance from the right side of the parent element */
		set right(value: number | string) {
			this.setStyle(`right: ${typeof value === "number" ? `${value}px` : value}`);
		}

		/** distance from the top side of the parent element */
		set top(value: number | string) {
			this.setStyle(`top: ${typeof value === "number" ? `${value}px` : value}`);
		}

		/** distance from the bottom side of the parent element */
		set bottom(value: number | string) {
			this.setStyle(`bottom: ${typeof value === "number" ? `${value}px` : value}`);
		}

		/** (mostly) equivalent to .left, except called via setProperty */
		get x() {
			return getProperty(this.id, "x");
		}
		set x(value: number) {
			setProperty(this.id, "x", value);
		}

		/** (mostly) equivalent to .top, except called via setProperty */
		get y() {
			return getProperty(this.id, "y");
		}
		set y(value: number) {
			setProperty(this.id, "y", value);
		}

		set parent(parent: Element | undefined) {
			if (!parent) { parent = limbo; };
			setParent(this.id, parent.id);
			this._parent = parent;
		}


		delete() {
			deleteElement(this.id);
		}
	}

	export class Image extends DestructibleElement {
		props: getProps<Image, "src" | "image" | "fit" | "iconColor"> & DestructibleElement["props"] = {};

		/** @deprecated Use image.src */
		set image(url: string){
			setImageURL(this.id, url);
		}
		/** @deprecated Use image.src */
		get image(){
			return getImageURL(this.id);
		}
		
		set src(url: string){
			setImageURL(this.id, url);
		}
		get src(){
			return getImageURL(this.id);
		}

		set fit(fit: "fill" | "cover" | "contain" | "none") {
			setProperty(this.id, "fit", fit);
		}
		get fit(): "fill" | "cover" | "contain" | "none" {
			return getProperty(this.id, "fit");
		}

		get iconColor(){
			return getProperty(this.id, "icon-color");
		}
		set iconColor(color: string){
			 setProperty(this.id, "icon-color", color);
		}
		constructor(isNew: boolean, id: string) {
			super(isNew, id);
			if (isNew) {
				image(id, "");
			}
		}
	}

	export abstract class TextElement extends DestructibleElement {
		props: getProps<TextElement, "textColor" | "text" | "fontSize"> & DestructibleElement["props"] = {};
		set textColor(color: string) {
			setProperty(this.id, "text-color", color);
		}

		get textColor(): string {
			return getProperty(this.id, "text-color");
		}

		/**
		 * Text of element (escapes html, use innerHTML instead)
		 */
		set text(text: string) {
			setProperty(this.id, "text", text);
		}
		get text() {
			return getProperty(this.id, "text");
		}

		/** font size in pixels */
		set fontSize(size: number) {
			setProperty(this.id, "font-size", size);
		}
		get fontSize(): number {
			return getProperty(this.id, "font-size");
		}

		// ill add types i need as they come
		set overflow(overflow: "scroll" | "auto" | "unset" | "hidden") {
			this.setStyle(`overflow: ${overflow}`);
		}
	}

	export class Label extends TextElement {
		constructor(isNew: boolean, id: string) {
			super(isNew, id);
			if (isNew) {
				textLabel(id, "");
			}
		}
	}

	export class Button extends TextElement {
		props: getProps<Button, "onClick" | "pure"> & TextElement["props"] = {};
		onClick = (event: BaseEventProps) => { };

		set pure(v: true) {
			this.setStyle("border: 0px; background-image: none; margin: 0px; border-radius: 0px");
		}

		constructor(isNew: boolean, id: string) {
			super(isNew, id);
			if (isNew) {
				button(id, "");
			}
			this.on("click", (event) => {
				this.onClick(event);
			});
		}
	}

	export class RippleButton extends Button {
		props: getProps<RippleButton, "color" | "shadow"> & Button["props"] = {};
		ripples: Container[] = [];
		color = "#FFF";
		shadow = false;
		textElement = Nomx.create("container", { parent: this });

		/**
		 * Proxied text; html is escaped; use rippleButton.textElement.innerHTML if you are trying to set html
		 */
		set text(value: string) {
			this.textElement.text = value;
		}
		get text() {
			return this.textElement.text;
		}

		constructor(isNew: boolean, id: string) {
			super(isNew, id);
			this.setStyle("transition: box-shadow .3s; overflow: hidden");
			this.on("mouseout", () => {
				if (this.shadow) {
					this.setStyle("box-shadow: none");
				}
				var ripples = this.ripples;
				setTimeout(() => {
					ripples.forEach((ripple) => {
						ripple.setStyle("opacity: 0");
						setTimeout(function () {
							ripple.delete();
						}, 1000);
					});
				}, 50);
				this.ripples = [];
			});
			this.on("mouseup", () => {
				if (this.shadow) {
					this.setStyle("box-shadow: none");
				}
				var ripples = this.ripples;
				setTimeout(() => {
					ripples.forEach((ripple) => {
						ripple.setStyle("opacity: 0");
						setTimeout(function () {
							ripple.delete();
						}, 1000);
					});
				}, 50);
				this.ripples = [];
			});
			this.on("mousedown", (event) => {
				if (this.shadow) {
					this.setStyle("box-shadow: rgb(0 0 0 / 20%) 0px 3px 3px -2px, rgb(0 0 0 / 14%) 0px 3px 4px 0px, rgb(0 0 0 / 12%) 0px 1px 8px 0px");
				}
				var ripple = Nomx.create("container", { parent: this });
				ripple.setStyle("pointer-events: none;opacity: 80%;transition: opacity 1s, width 1.5s, height 1.5s;transform: translate(-50%, -50%);width: 1px; height:1px; border-radius: 1000px;position: absolute");
				this.ripples.push(ripple);
				ripple.x = event.offsetX;
				ripple.y = event.offsetY;
				setTimeout(function () { ripple.setStyle("opacity: 40%;width: 800px; height:800px"); }, 50);
				ripple.backgroundColor = this.color;
			});

		}
	}

	/** Textbox */
	export class Input extends TextElement {
		props: getProps<Input, "onSubmit"> & TextElement["props"] = {};
		onSubmit = (event: BaseEventProps) => { };
		constructor(isNew: boolean, id: string) {
			super(isNew, id);
			if (isNew) {
				textInput(id, "");
			}
			this.on("keypress", (event) => {
				if (event.keyCode === 13) {
					this.onSubmit(event);
				}
			});
		}
	}

	/** Container. aka <div>
	 * Css may be different. For example there is line-height set to 18px
	 */
	export class Container extends TextElement {
		props: getProps<Container, "type"> & TextElement["props"] = {};
		/** Determines subset type of container */
		set type(value: "fill") {
			switch (value) {
				case "fill":
					this.setStyle("width: 100%; height: 100%; position: absolute"); break;

			}
		}

		constructor(isNew: boolean, id: string) {
			super(isNew, id);
			if (isNew) {
				container(id, "");
			}
		}
	}

	/** Represents a screen */
	export class Screen extends TextElement {
		get isActiveScreen(): boolean {
			return this.style.match("display: none") !== null;
		}
		set() {
			setScreen(this.id);
		}
		constructor(isNew: boolean, id: string, children?: DestructibleElement[]) {
			super(isNew, id);
			if (isNew) {
				forge.innerHTML += `<div class="screen" tabindex="1" data-theme="default" id="${id}" style="display: none; height: 450px; width: 320px; left: 0px; top: 0px; position: absolute; z-index: 0; background-color: rgb(255, 255, 255);"></div>`;
				setParent(id, "divApplab");
			}
		}
	}

	/** For when you want to pass a string as an Element */
	export class Span extends Container {
		constructor(isNew: boolean, id: string) {
			super(isNew, id);
			this.style = "display: inline; padding: 0px";
		}
	}

	/** Represents a line break */
	export class Break extends Container {
		/** This will error */
		addChildren() {
			throw "Line breaks can't have children, silly.";
		}
		constructor(isNew: boolean, id: string) {
			super(isNew, id);
			this.style = "margin-bottom: 10px";
		}
	}

	/** singleton class that represents divApplab */
	export class Root extends Element {
		id: "divApplab" = "divApplab";

		/** Every element (that has an id) in the app (Computationally expensive, best you use caches) */
		get nodes(): ReturnType<typeof parser.nodes> {
			return parser.nodes(this.innerHTML);
		}

		/** Returns every screen. (Computationally expensive, best you use caches) */
		get screens(): Screen[] {
			return this.children.filter(c => {
				return c.className === "screen";
			}) as Screen[];
		}

		/** Returns current screen. (Computationally expensive, best you use caches) */
		get activeScreen(): Screen {
			return this.children.filter(c => {
				return c.className === "screen" && c.style.match("display: none");
			})[0] as Screen;
		}
	}


	export interface creatableTypes {
		button: typeof Button,
		input: typeof Input,
		screen: typeof Screen,
		container: typeof Container,
		div: typeof Container,
		span: typeof Span,
		label: typeof Label,
		br: typeof Break,
		ripplebutton: typeof RippleButton,
		img: typeof Image,
	}


	export interface allTypes extends creatableTypes {
		// element: typeof Element;
		root: typeof Root;
	}

	const allIndex = {
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

	function _instanceof(a: unknown, b: abstract new (...args: any[]) => any) {
		//a instanceof b results in {data: false, type: "boolean"} when it's false, and true when it's true; really stupid and annoying
		return a instanceof b === true;
	}


	/**
	 * Should only be used when you aren't using cdo-sync's class extension
	 */
	export function extendClass(C: typeof Element, constructor: (isNew: boolean, id: string, children?: DestructibleElement) => {}, props: { [s: string]: { get: () => unknown, set: (u: unknown) => void } }, methods: { [s: string]: (...args: unknown[]) => unknown }) {
		class Extension extends C {
			constructor(isNew: boolean, id: string, children?: DestructibleElement) {
				super(isNew, id);
				constructor.call(this, isNew, id, children);
			}
		};
		Object.defineProperties(Extension, props);
		const proto = Extension.prototype as typeof Extension.prototype & { [s: string]: unknown };
		for (const method in methods) {
			proto[method] = methods[method];
		}
	}

	type CreateChildren = string | DestructibleElement | CreateChildren[];
	/**
	 * Creates a new element given type
	 * @param ElementType Type of element. Can be a string or a class.
	 * @param props Object with properties such as `text`
	 * @param children List of children auto-parented using the .children() method
	 */
	export function create<e extends keyof creatableTypes>(ElementType: e, props?: InstanceType<creatableTypes[e]>["props"], ...children: CreateChildren[]): InstanceType<creatableTypes[e]>;
	export function create<e extends creatableTypes[keyof creatableTypes]>(ElementType: e, props?: InstanceType<e>["props"], ...children: CreateChildren[]): InstanceType<e>;
	//	export function create<e extends keyof creatableTypes>(ElementType: e, props?: convertClassToProps<creatableTypes[e]>, children?: CreateChildren[]): InstanceType<creatableTypes[e]>
	//	export function create<e extends creatableTypes[keyof creatableTypes]>(ElementType: e, props?: convertClassToProps<e>, children?: CreateChildren[]): InstanceType<e>	

	export function create(ElementType: keyof creatableTypes | creatableTypes[keyof creatableTypes], props?: { [s: string]: unknown } & { id?: string }, ...children: CreateChildren[]) {
		let elementId: string | undefined;
		if (props == undefined) {
			props = {};
		} else if (props.id) {
			elementId = props.id;
			delete props.id;
		}

		if (!elementId) {
			elementId = prefix + (++counter).toString();
		}

		const computedChildren: DestructibleElement[] = [];
		if (children.length === 1 && typeof children[0] === "string") {
			props.text = children[0];
		} else {
			function spread(arr: CreateChildren[]) {
				for (const val of arr) {
					if (Array.isArray(val)) {
						spread(val);
					} else if (_instanceof(val, DestructibleElement)) {
						computedChildren.push(val as DestructibleElement);
					} else {
						computedChildren.push(Nomx.create("span", {
							text: String(val)
						}));
					}

				}
			}
			spread(children);
		}

		let element: any;
		//children: [DestructibleElement | string]
		if (typeof ElementType === "string") {
			element = new allIndex[ElementType](true, elementId);
		} else {
			element = new ElementType(true, elementId);
		}
		ElementsById[element.id] = element;
		if (computedChildren.length>0)
		{(element as Element).addChildren(computedChildren);}
		Object.keys(props).map(key => {
			(element as any)[key] = props![key];
		});
		element.afterPropsSet();
		return element;
	}

	/**
	 * @deprecated The use of Nomx.get is bad practice as all pre-existing elements are already defined ("$$elementId") and usage with default applab functions is not advised.
	*/
	export function get<e extends keyof allTypes>(id: string, ElementType?: e): InstanceType<allTypes[e]>;

	/**
	 * @deprecated The use of Nomx.get is bad practice as all pre-existing elements are already defined ("$$elementId") and usage with default applab functions is not advised.
	*/
	export function get<e extends allTypes[keyof allTypes]>(id: string, ElementType?: e): InstanceType<e>;

	export function get(id: string, ElementType: keyof allTypes | allTypes[keyof allTypes] = Container) {
		if (ElementsById[id]) {
			return ElementsById[id];
		} else if (typeof ElementType === "string") {
			return new allIndex[ElementType](false, id, []);
		} else {
			return new ElementType(false, id, []);
		}
	}

	/** Represents divApplab; of which all elements **must** be parented to. */
	export const root = Nomx.get("divApplab", Root);

	let uninitiatedIds: RegExpMatchArray[] = [];
	root.nodes.forEach(el => {
		if (el.attributes.id !== "designModeViz") {
			let elType: string;

			if (el.attributes.class === "screen") {
				elType = "screen";
			} else if (el.tagName === "button") {
				elType = "button";
			} else if (el.tagName === "input") {
				elType = "input";
			} else if (el.tagName === "div") {
				elType = "container";
			} else if (el.tagName === "span") {
				elType = "span";
			} else if (el.tagName === "label") {
				elType = "label";
			} else {
				elType = "container";
			}

			const dt = el.attributes.id!.match(/^([a-zA-Z0-9\_\-]+)(?:\#([a-zA-Z0-9_\$]+))?$/);
			if (dt) {
				if (dt[2]) {
					elType = dt[2];
				}
				if (elType in allIndex) {
					window[`$$${dt[1]}`] = Nomx.get(dt[0], elType as keyof allTypes);
				} else {
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
	export function initiateWithClasses() {
		uninitiatedIds.forEach(([id, rid, c]) => {
			window[`$$${rid}`] = Nomx.get(id, window[c]);
		});
	}

	/** URL of the current app */
	export const baseURI = root.getAttribute("baseURI");

	/** Channel id of the current app */
	export const channelId = baseURI.match(/code.org\/projects\/applab\/([^\/]+)/)![1];


	/** A container that elements created using innerHTML are created, in order to prevent overwriting any existing elements */
	const forge = create("container");
	forge.display = "none";
	forge.parent = root;

	/** A container elements go to when they are hidden but not necessarily destroyed */
	const limbo = create("container");
	limbo.display = "none";
	limbo.parent = root;


}

namespace JSX {
	export type Element = Nomx.DestructibleElement;

	export interface ElementClass {
		id: string
	}

	export interface ElementAttributesProperty {
		props: {}
	}

	export interface IntrinsicElements {
		button: Nomx.Button["props"]
		span: Nomx.Span["props"]
		input: Nomx.Input["props"]
		div: Nomx.Container["props"]
		label: Nomx.Label["props"]
		br: Nomx.Break["props"]
		screen: Nomx.Screen["props"]
		ripplebutton: Nomx.RippleButton["props"]
		img: Nomx.Image["props"]
	}
}