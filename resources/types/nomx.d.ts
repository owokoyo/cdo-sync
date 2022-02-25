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
declare namespace Nomx {
    export type HTMLTree = {
        attributes: {
            escaped: string;
            name: string;
            value: string;
        }[];
        children: HTMLTree[];
        tag: string;
        id: string;
    };
    export const ElementsById: {
        [s: string]: Element;
    };
    export type Node = {
        tagName: string;
        attributes: {
            [s: string]: string | undefined;
        };
        children: (Node)[];
    };
    export const parser: {
        nodes: (html: string) => Node[];
        tree: (html: string) => Node[];
    };
    class _sd {
        __get(prop: string): string;
        __set(style: string): void;
        private _computedStyleObj;
        private lastStyle;
        private get computedStyleObj();
        private element;
        constructor(element: Element);
    }
    type StyleDeclaration = _sd & {
        [k in (keyof typeof cssStyles)]: unknown;
    };
    const StyleDeclaration: typeof _sd;
    const cssStyles: {
        accentColor: string;
        additiveSymbols: string;
        alignContent: string;
        alignItems: string;
        alignSelf: string;
        alignmentBaseline: string;
        all: string;
        animation: string;
        animationDelay: string;
        animationDirection: string;
        animationDuration: string;
        animationFillMode: string;
        animationIterationCount: string;
        animationName: string;
        animationPlayState: string;
        animationTimingFunction: string;
        appRegion: string;
        appearance: string;
        ascentOverride: string;
        aspectRatio: string;
        backdropFilter: string;
        backfaceVisibility: string;
        background: string;
        backgroundAttachment: string;
        backgroundBlendMode: string;
        backgroundClip: string;
        backgroundColor: string;
        backgroundImage: string;
        backgroundOrigin: string;
        backgroundPosition: string;
        backgroundPositionX: string;
        backgroundPositionY: string;
        backgroundRepeat: string;
        backgroundRepeatX: string;
        backgroundRepeatY: string;
        backgroundSize: string;
        baselineShift: string;
        blockSize: string;
        border: string;
        borderBlock: string;
        borderBlockColor: string;
        borderBlockEnd: string;
        borderBlockEndColor: string;
        borderBlockEndStyle: string;
        borderBlockEndWidth: string;
        borderBlockStart: string;
        borderBlockStartColor: string;
        borderBlockStartStyle: string;
        borderBlockStartWidth: string;
        borderBlockStyle: string;
        borderBlockWidth: string;
        borderBottom: string;
        borderBottomColor: string;
        borderBottomLeftRadius: string;
        borderBottomRightRadius: string;
        borderBottomStyle: string;
        borderBottomWidth: string;
        borderCollapse: string;
        borderColor: string;
        borderEndEndRadius: string;
        borderEndStartRadius: string;
        borderImage: string;
        borderImageOutset: string;
        borderImageRepeat: string;
        borderImageSlice: string;
        borderImageSource: string;
        borderImageWidth: string;
        borderInline: string;
        borderInlineColor: string;
        borderInlineEnd: string;
        borderInlineEndColor: string;
        borderInlineEndStyle: string;
        borderInlineEndWidth: string;
        borderInlineStart: string;
        borderInlineStartColor: string;
        borderInlineStartStyle: string;
        borderInlineStartWidth: string;
        borderInlineStyle: string;
        borderInlineWidth: string;
        borderLeft: string;
        borderLeftColor: string;
        borderLeftStyle: string;
        borderLeftWidth: string;
        borderRadius: string;
        borderRight: string;
        borderRightColor: string;
        borderRightStyle: string;
        borderRightWidth: string;
        borderSpacing: string;
        borderStartEndRadius: string;
        borderStartStartRadius: string;
        borderStyle: string;
        borderTop: string;
        borderTopColor: string;
        borderTopLeftRadius: string;
        borderTopRightRadius: string;
        borderTopStyle: string;
        borderTopWidth: string;
        borderWidth: string;
        bottom: string;
        boxShadow: string;
        boxSizing: string;
        breakAfter: string;
        breakBefore: string;
        breakInside: string;
        bufferedRendering: string;
        captionSide: string;
        caretColor: string;
        clear: string;
        clip: string;
        clipPath: string;
        clipRule: string;
        color: string;
        colorInterpolation: string;
        colorInterpolationFilters: string;
        colorRendering: string;
        colorScheme: string;
        columnCount: string;
        columnFill: string;
        columnGap: string;
        columnRule: string;
        columnRuleColor: string;
        columnRuleStyle: string;
        columnRuleWidth: string;
        columnSpan: string;
        columnWidth: string;
        columns: string;
        contain: string;
        containIntrinsicBlockSize: string;
        containIntrinsicHeight: string;
        containIntrinsicInlineSize: string;
        containIntrinsicSize: string;
        containIntrinsicWidth: string;
        content: string;
        contentVisibility: string;
        counterIncrement: string;
        counterReset: string;
        counterSet: string;
        cursor: string;
        cx: string;
        cy: string;
        d: string;
        descentOverride: string;
        direction: string;
        display: string;
        dominantBaseline: string;
        emptyCells: string;
        fallback: string;
        fill: string;
        fillOpacity: string;
        fillRule: string;
        filter: string;
        flex: string;
        flexBasis: string;
        flexDirection: string;
        flexFlow: string;
        flexGrow: string;
        flexShrink: string;
        flexWrap: string;
        float: string;
        floodColor: string;
        floodOpacity: string;
        font: string;
        fontDisplay: string;
        fontFamily: string;
        fontFeatureSettings: string;
        fontKerning: string;
        fontOpticalSizing: string;
        fontSize: string;
        fontStretch: string;
        fontStyle: string;
        fontVariant: string;
        fontVariantCaps: string;
        fontVariantEastAsian: string;
        fontVariantLigatures: string;
        fontVariantNumeric: string;
        fontVariationSettings: string;
        fontWeight: string;
        forcedColorAdjust: string;
        gap: string;
        grid: string;
        gridArea: string;
        gridAutoColumns: string;
        gridAutoFlow: string;
        gridAutoRows: string;
        gridColumn: string;
        gridColumnEnd: string;
        gridColumnGap: string;
        gridColumnStart: string;
        gridGap: string;
        gridRow: string;
        gridRowEnd: string;
        gridRowGap: string;
        gridRowStart: string;
        gridTemplate: string;
        gridTemplateAreas: string;
        gridTemplateColumns: string;
        gridTemplateRows: string;
        height: string;
        hyphens: string;
        imageOrientation: string;
        imageRendering: string;
        inherits: string;
        initialValue: string;
        inlineSize: string;
        inset: string;
        insetBlock: string;
        insetBlockEnd: string;
        insetBlockStart: string;
        insetInline: string;
        insetInlineEnd: string;
        insetInlineStart: string;
        isolation: string;
        justifyContent: string;
        justifyItems: string;
        justifySelf: string;
        left: string;
        letterSpacing: string;
        lightingColor: string;
        lineBreak: string;
        lineGapOverride: string;
        lineHeight: string;
        listStyle: string;
        listStyleImage: string;
        listStylePosition: string;
        listStyleType: string;
        margin: string;
        marginBlock: string;
        marginBlockEnd: string;
        marginBlockStart: string;
        marginBottom: string;
        marginInline: string;
        marginInlineEnd: string;
        marginInlineStart: string;
        marginLeft: string;
        marginRight: string;
        marginTop: string;
        marker: string;
        markerEnd: string;
        markerMid: string;
        markerStart: string;
        mask: string;
        maskType: string;
        maxBlockSize: string;
        maxHeight: string;
        maxInlineSize: string;
        maxWidth: string;
        maxZoom: string;
        minBlockSize: string;
        minHeight: string;
        minInlineSize: string;
        minWidth: string;
        minZoom: string;
        mixBlendMode: string;
        negative: string;
        objectFit: string;
        objectPosition: string;
        offset: string;
        offsetDistance: string;
        offsetPath: string;
        offsetRotate: string;
        opacity: string;
        order: string;
        orientation: string;
        orphans: string;
        outline: string;
        outlineColor: string;
        outlineOffset: string;
        outlineStyle: string;
        outlineWidth: string;
        overflow: string;
        overflowAnchor: string;
        overflowClipMargin: string;
        overflowWrap: string;
        overflowX: string;
        overflowY: string;
        overscrollBehavior: string;
        overscrollBehaviorBlock: string;
        overscrollBehaviorInline: string;
        overscrollBehaviorX: string;
        overscrollBehaviorY: string;
        pad: string;
        padding: string;
        paddingBlock: string;
        paddingBlockEnd: string;
        paddingBlockStart: string;
        paddingBottom: string;
        paddingInline: string;
        paddingInlineEnd: string;
        paddingInlineStart: string;
        paddingLeft: string;
        paddingRight: string;
        paddingTop: string;
        page: string;
        pageBreakAfter: string;
        pageBreakBefore: string;
        pageBreakInside: string;
        pageOrientation: string;
        paintOrder: string;
        perspective: string;
        perspectiveOrigin: string;
        placeContent: string;
        placeItems: string;
        placeSelf: string;
        pointerEvents: string;
        position: string;
        prefix: string;
        quotes: string;
        r: string;
        range: string;
        resize: string;
        right: string;
        rowGap: string;
        rubyPosition: string;
        rx: string;
        ry: string;
        scrollBehavior: string;
        scrollMargin: string;
        scrollMarginBlock: string;
        scrollMarginBlockEnd: string;
        scrollMarginBlockStart: string;
        scrollMarginBottom: string;
        scrollMarginInline: string;
        scrollMarginInlineEnd: string;
        scrollMarginInlineStart: string;
        scrollMarginLeft: string;
        scrollMarginRight: string;
        scrollMarginTop: string;
        scrollPadding: string;
        scrollPaddingBlock: string;
        scrollPaddingBlockEnd: string;
        scrollPaddingBlockStart: string;
        scrollPaddingBottom: string;
        scrollPaddingInline: string;
        scrollPaddingInlineEnd: string;
        scrollPaddingInlineStart: string;
        scrollPaddingLeft: string;
        scrollPaddingRight: string;
        scrollPaddingTop: string;
        scrollSnapAlign: string;
        scrollSnapStop: string;
        scrollSnapType: string;
        scrollbarGutter: string;
        shapeImageThreshold: string;
        shapeMargin: string;
        shapeOutside: string;
        shapeRendering: string;
        size: string;
        sizeAdjust: string;
        speak: string;
        speakAs: string;
        src: string;
        stopColor: string;
        stopOpacity: string;
        stroke: string;
        strokeDasharray: string;
        strokeDashoffset: string;
        strokeLinecap: string;
        strokeLinejoin: string;
        strokeMiterlimit: string;
        strokeOpacity: string;
        strokeWidth: string;
        suffix: string;
        symbols: string;
        syntax: string;
        system: string;
        tabSize: string;
        tableLayout: string;
        textAlign: string;
        textAlignLast: string;
        textAnchor: string;
        textCombineUpright: string;
        textDecoration: string;
        textDecorationColor: string;
        textDecorationLine: string;
        textDecorationSkipInk: string;
        textDecorationStyle: string;
        textDecorationThickness: string;
        textIndent: string;
        textOrientation: string;
        textOverflow: string;
        textRendering: string;
        textShadow: string;
        textSizeAdjust: string;
        textTransform: string;
        textUnderlineOffset: string;
        textUnderlinePosition: string;
        top: string;
        touchAction: string;
        transform: string;
        transformBox: string;
        transformOrigin: string;
        transformStyle: string;
        transition: string;
        transitionDelay: string;
        transitionDuration: string;
        transitionProperty: string;
        transitionTimingFunction: string;
        unicodeBidi: string;
        unicodeRange: string;
        userSelect: string;
        userZoom: string;
        vectorEffect: string;
        verticalAlign: string;
        visibility: string;
        webkitAlignContent: string;
        webkitAlignItems: string;
        webkitAlignSelf: string;
        webkitAnimation: string;
        webkitAnimationDelay: string;
        webkitAnimationDirection: string;
        webkitAnimationDuration: string;
        webkitAnimationFillMode: string;
        webkitAnimationIterationCount: string;
        webkitAnimationName: string;
        webkitAnimationPlayState: string;
        webkitAnimationTimingFunction: string;
        webkitAppRegion: string;
        webkitAppearance: string;
        webkitBackfaceVisibility: string;
        webkitBackgroundClip: string;
        webkitBackgroundOrigin: string;
        webkitBackgroundSize: string;
        webkitBorderAfter: string;
        webkitBorderAfterColor: string;
        webkitBorderAfterStyle: string;
        webkitBorderAfterWidth: string;
        webkitBorderBefore: string;
        webkitBorderBeforeColor: string;
        webkitBorderBeforeStyle: string;
        webkitBorderBeforeWidth: string;
        webkitBorderBottomLeftRadius: string;
        webkitBorderBottomRightRadius: string;
        webkitBorderEnd: string;
        webkitBorderEndColor: string;
        webkitBorderEndStyle: string;
        webkitBorderEndWidth: string;
        webkitBorderHorizontalSpacing: string;
        webkitBorderImage: string;
        webkitBorderRadius: string;
        webkitBorderStart: string;
        webkitBorderStartColor: string;
        webkitBorderStartStyle: string;
        webkitBorderStartWidth: string;
        webkitBorderTopLeftRadius: string;
        webkitBorderTopRightRadius: string;
        webkitBorderVerticalSpacing: string;
        webkitBoxAlign: string;
        webkitBoxDecorationBreak: string;
        webkitBoxDirection: string;
        webkitBoxFlex: string;
        webkitBoxOrdinalGroup: string;
        webkitBoxOrient: string;
        webkitBoxPack: string;
        webkitBoxReflect: string;
        webkitBoxShadow: string;
        webkitBoxSizing: string;
        webkitClipPath: string;
        webkitColumnBreakAfter: string;
        webkitColumnBreakBefore: string;
        webkitColumnBreakInside: string;
        webkitColumnCount: string;
        webkitColumnGap: string;
        webkitColumnRule: string;
        webkitColumnRuleColor: string;
        webkitColumnRuleStyle: string;
        webkitColumnRuleWidth: string;
        webkitColumnSpan: string;
        webkitColumnWidth: string;
        webkitColumns: string;
        webkitFilter: string;
        webkitFlex: string;
        webkitFlexBasis: string;
        webkitFlexDirection: string;
        webkitFlexFlow: string;
        webkitFlexGrow: string;
        webkitFlexShrink: string;
        webkitFlexWrap: string;
        webkitFontFeatureSettings: string;
        webkitFontSmoothing: string;
        webkitHighlight: string;
        webkitHyphenateCharacter: string;
        webkitJustifyContent: string;
        webkitLineBreak: string;
        webkitLineClamp: string;
        webkitLocale: string;
        webkitLogicalHeight: string;
        webkitLogicalWidth: string;
        webkitMarginAfter: string;
        webkitMarginBefore: string;
        webkitMarginEnd: string;
        webkitMarginStart: string;
        webkitMask: string;
        webkitMaskBoxImage: string;
        webkitMaskBoxImageOutset: string;
        webkitMaskBoxImageRepeat: string;
        webkitMaskBoxImageSlice: string;
        webkitMaskBoxImageSource: string;
        webkitMaskBoxImageWidth: string;
        webkitMaskClip: string;
        webkitMaskComposite: string;
        webkitMaskImage: string;
        webkitMaskOrigin: string;
        webkitMaskPosition: string;
        webkitMaskPositionX: string;
        webkitMaskPositionY: string;
        webkitMaskRepeat: string;
        webkitMaskRepeatX: string;
        webkitMaskRepeatY: string;
        webkitMaskSize: string;
        webkitMaxLogicalHeight: string;
        webkitMaxLogicalWidth: string;
        webkitMinLogicalHeight: string;
        webkitMinLogicalWidth: string;
        webkitOpacity: string;
        webkitOrder: string;
        webkitPaddingAfter: string;
        webkitPaddingBefore: string;
        webkitPaddingEnd: string;
        webkitPaddingStart: string;
        webkitPerspective: string;
        webkitPerspectiveOrigin: string;
        webkitPerspectiveOriginX: string;
        webkitPerspectiveOriginY: string;
        webkitPrintColorAdjust: string;
        webkitRtlOrdering: string;
        webkitRubyPosition: string;
        webkitShapeImageThreshold: string;
        webkitShapeMargin: string;
        webkitShapeOutside: string;
        webkitTapHighlightColor: string;
        webkitTextCombine: string;
        webkitTextDecorationsInEffect: string;
        webkitTextEmphasis: string;
        webkitTextEmphasisColor: string;
        webkitTextEmphasisPosition: string;
        webkitTextEmphasisStyle: string;
        webkitTextFillColor: string;
        webkitTextOrientation: string;
        webkitTextSecurity: string;
        webkitTextSizeAdjust: string;
        webkitTextStroke: string;
        webkitTextStrokeColor: string;
        webkitTextStrokeWidth: string;
        webkitTransform: string;
        webkitTransformOrigin: string;
        webkitTransformOriginX: string;
        webkitTransformOriginY: string;
        webkitTransformOriginZ: string;
        webkitTransformStyle: string;
        webkitTransition: string;
        webkitTransitionDelay: string;
        webkitTransitionDuration: string;
        webkitTransitionProperty: string;
        webkitTransitionTimingFunction: string;
        webkitUserDrag: string;
        webkitUserModify: string;
        webkitUserSelect: string;
        webkitWritingMode: string;
        whiteSpace: string;
        widows: string;
        width: string;
        willChange: string;
        wordBreak: string;
        wordSpacing: string;
        wordWrap: string;
        writingMode: string;
        x: string;
        y: string;
        zIndex: string;
        zoom: string;
    };
    export type getProps<el extends Element, u extends keyof el> = Partial<{
        [Prop in u]: el[Prop];
    }>;
    export abstract class Element {
        /** ID of element, if not set, will be Nomx_Gen_NUMBER */
        id: string;
        props: getProps<Element, "elementInit" | "id" | "style" | "backgroundColor" | "innerHTML" | "scrollTop" | "borderWidth" | "borderColor" | "display" | "padding" | "margin">;
        private _lastouterHTML;
        private _outerHTMLTree?;
        get outerHTMLTree(): Node;
        /**
         * Returns children count
         * Use this over Element.children.length!! children.length re-parses the html which is heavy on the client!
         */
        get childElementCount(): number;
        get className(): string;
        /** array of elements. can include a Node if the child's id is not provided. Use .children instead to filter out id-less nodes */
        get childrenRaw(): ReadonlyArray<Nomx.DestructibleElement | Node>;
        /** array of elements, id-less nodes are ignored. */
        get children(): ReadonlyArray<Nomx.DestructibleElement>;
        on<t extends "click" | "mousemove" | "mousedown" | "mouseup" | "mouseover" | "mouseout">(type: t, callback: (event: {
            offsetX: number;
            offsetY: number;
            movementX: number;
            pageX: number;
            movementY: number;
            pageY: number;
            clientX: number;
            clientY: number;
            button: number;
            x: number;
            y: number;
            type: t;
            toElementId: string;
        } & BaseEventProps & KeyEventProps) => void): void;
        on<t extends "keyup" | "keydown" | "keypress", id extends string>(type: t, callback: (event: {
            type: t;
        } & BaseEventProps & KeyActionEventProps) => void): void;
        on<t extends "input">(type: t, callback: (event: {
            type: t;
        } & BaseEventProps & SelectionProps) => void): void;
        on<t extends "change", id extends string>(type: t, callback: (event: {
            type: t;
        } & BaseEventProps & KeyActionEventProps & SelectionProps) => void): void;
        /** setStyle; equivalent to setStyle(element.id, style) */
        setStyle(style: string): void;
        /** background color */
        set backgroundColor(color: string);
        get backgroundColor(): string;
        /** element tag name; ex: DIV | BUTTON | IMG */
        get tagName(): string;
        /**
         * Resetting the style will not overwrite all styles, you must know which are currently active and do "style: unset;" in order to reset
         */
        set style(style: string);
        get style(): string;
        /** An object similar to a CSSStyleDeclaration, which allows you to set styles by doing styleDeclaration.prop = value
         * NOTE: It is not exactly like a CSSStyleDeclaration, for example styleDeclaration.marginTop will fail.
        */
        styleDeclaration: StyleDeclaration;
        /** includes the element itself ex: <div id="ELEMENTID"><div id = "CHILD">HI</div></div> */
        get outerHTML(): string;
        /** includes only the children of the element ex: <div id = "CHILD">HI</div> */
        get innerHTML(): string;
        set innerHTML(innerhtml: string);
        /** Height of element, includes parts that are hidden beyond the scroll bar */
        get scrollHeight(): string;
        /** Location of scroll bar */
        get scrollTop(): number;
        set scrollTop(y: number);
        /** CSS border width */
        get borderWidth(): number;
        set borderWidth(value: number);
        /** CSS border radius */
        get borderRadius(): number;
        set borderRadius(value: number);
        /** CSS border color */
        get borderColor(): number;
        set borderColor(value: number);
        /** CSS display; to get the current value do element.styleDeclaration.display */
        set display(display: "inline" | "block" | "contents" | "flex" | "grid" | "inline-block" | "inline-flex" | "inline-grid" | "inline-table" | "list-item" | "run-in" | "table" | "table-caption" | "table-column-group" | "table-header-group" | "table-footer-group" | "table-row-group" | "table-cell" | "table-column" | "table-row" | "none" | "initial" | "inherit");
        /** CSS padding; element.styleDeclaration.padding */
        set padding(value: number | string);
        /** CSS margin; element.styleDeclaration.margin */
        set margin(value: number | string);
        /**
         * Returns toString()'d representation of the attribute value.
         */
        getAttribute(attribute: string): string;
        setAttribute(attribute: Parameters<typeof setAttribute>[1], value: unknown): void;
        get firstChild(): void | DestructibleElement;
        /** Parents the children to the element */
        addChildren(...children: DestructibleElement[]): void;
        addChildren(children: DestructibleElement[]): void;
        set elementInit(callback: (a: unknown) => void);
        /** To be called after all props are set  */
        afterPropsSet(): void;
        /** Given a transformer function, sort an array of elements which will become it's new children. */
        constructor(isNew: boolean, id: string);
    }
    export abstract class DestructibleElement extends Element {
        props: getProps<DestructibleElement, "width" | "height" | "position" | "left" | "right" | "top" | "bottom" | "x" | "y" | "parent"> & Element["props"];
        private _parent?;
        get parent(): Element | undefined;
        get width(): number;
        set width(value: number);
        get height(): number;
        set height(value: number);
        set position(position: "static" | "relative" | "fixed" | "absolute" | "sticky");
        /** distance from the left side of the parent element */
        set left(value: number | string);
        /** distance from the right side of the parent element */
        set right(value: number | string);
        /** distance from the top side of the parent element */
        set top(value: number | string);
        /** distance from the bottom side of the parent element */
        set bottom(value: number | string);
        /** (mostly) equivalent to .left, except called via setProperty */
        get x(): number;
        set x(value: number);
        /** (mostly) equivalent to .top, except called via setProperty */
        get y(): number;
        set y(value: number);
        set parent(parent: Element | undefined);
        delete(): void;
    }
    export class Image extends DestructibleElement {
        props: getProps<Image, "src" | "image" | "fit" | "iconColor"> & DestructibleElement["props"];
        /** @deprecated Use image.src */
        set image(url: string);
        /** @deprecated Use image.src */
        get image(): string;
        set src(url: string);
        get src(): string;
        set fit(fit: "fill" | "cover" | "contain" | "none");
        get fit(): "fill" | "cover" | "contain" | "none";
        get iconColor(): string;
        set iconColor(color: string);
        constructor(isNew: boolean, id: string);
    }
    export abstract class TextElement extends DestructibleElement {
        props: getProps<TextElement, "textColor" | "text" | "fontSize"> & DestructibleElement["props"];
        set textColor(color: string);
        get textColor(): string;
        /**
         * Text of element (escapes html, use innerHTML instead)
         */
        set text(text: string);
        get text(): string;
        /** font size in pixels */
        set fontSize(size: number);
        get fontSize(): number;
        set overflow(overflow: "scroll" | "auto" | "unset" | "hidden");
    }
    export class Label extends TextElement {
        constructor(isNew: boolean, id: string);
    }
    export class Button extends TextElement {
        props: getProps<Button, "onClick" | "pure" | "disabled"> & TextElement["props"];
        onClick: (btn: this, event: BaseEventProps) => void;
        private _disabled;
        get disabled(): boolean;
        set disabled(value: boolean);
        set pure(v: true);
        constructor(isNew: boolean, id: string);
    }
    export class RippleButton extends Button {
        props: getProps<RippleButton, "color" | "shadow"> & Button["props"];
        ripples: Container[];
        color: string;
        shadow: boolean;
        textElement: Container;
        /**
         * Proxied text; html is escaped; use rippleButton.textElement.innerHTML if you are trying to set html
         */
        set text(value: string);
        get text(): string;
        constructor(isNew: boolean, id: string);
    }
    /** Textbox */
    export class Input extends TextElement {
        props: getProps<Input, "onSubmit" | "placeholder"> & TextElement["props"];
        get placeholder(): string;
        set placeholder(val: string);
        onSubmit: (event: BaseEventProps) => void;
        constructor(isNew: boolean, id: string);
    }
    /** Container. aka <div>
     * Css may be different. For example there is line-height set to 18px
     */
    export class Container extends TextElement {
        props: getProps<Container, "type"> & TextElement["props"];
        /** Determines subset type of container */
        set type(value: "fill");
        constructor(isNew: boolean, id: string);
    }
    /** Represents a screen */
    export class Screen extends TextElement {
        get isActiveScreen(): boolean;
        set(): void;
        constructor(isNew: boolean, id: string, children?: DestructibleElement[]);
    }
    /** For when you want to pass a string as an Element */
    export class Span extends Container {
        constructor(isNew: boolean, id: string);
    }
    /** Represents a line break */
    export class Break extends Container {
        /** This will error */
        addChildren(): void;
        constructor(isNew: boolean, id: string);
    }
    /** singleton class that represents divApplab */
    export class Root extends Element {
        id: "divApplab";
        /** Every element (that has an id) in the app (Computationally expensive, best you use caches) */
        get nodes(): ReturnType<typeof parser.nodes>;
        /** Returns every screen. (Computationally expensive, best you use caches) */
        get screens(): Screen[];
        /** Returns current screen. (Computationally expensive, best you use caches) */
        get activeScreen(): Screen;
    }
    export interface creatableTypes {
        button: typeof Button;
        input: typeof Input;
        screen: typeof Screen;
        container: typeof Container;
        div: typeof Container;
        span: typeof Span;
        label: typeof Label;
        br: typeof Break;
        ripplebutton: typeof RippleButton;
        img: typeof Image;
    }
    export interface allTypes extends creatableTypes {
        root: typeof Root;
    }
    /**
     * Should only be used when you aren't using cdo-sync's class extension
     */
    export function extendClass(C: typeof Element, constructor: (isNew: boolean, id: string, children?: DestructibleElement) => {}, props: {
        [s: string]: {
            get: () => unknown;
            set: (u: unknown) => void;
        };
    }, methods: {
        [s: string]: (...args: unknown[]) => unknown;
    }): void;
    type CreateChildren = string | DestructibleElement | CreateChildren[];
    /**
     * Creates a new element given type
     * @param ElementType Type of element. Can be a string or a class.
     * @param props Object with properties such as `text`
     * @param children List of children auto-parented using the .children() method
     */
    export function create<e extends keyof creatableTypes>(ElementType: e, props?: InstanceType<creatableTypes[e]>["props"], ...children: CreateChildren[]): InstanceType<creatableTypes[e]>;
    export function create<e extends creatableTypes[keyof creatableTypes]>(ElementType: e, props?: InstanceType<e>["props"], ...children: CreateChildren[]): InstanceType<e>;
    /**
     * @deprecated The use of Nomx.get is bad practice as all pre-existing elements are already defined ("$$elementId") and usage with default applab functions is not advised.
    */
    export function get<e extends keyof allTypes>(id: string, ElementType?: e): InstanceType<allTypes[e]>;
    /**
     * @deprecated The use of Nomx.get is bad practice as all pre-existing elements are already defined ("$$elementId") and usage with default applab functions is not advised.
    */
    export function get<e extends allTypes[keyof allTypes]>(id: string, ElementType?: e): InstanceType<e>;
    /** Represents divApplab; of which all elements **must** be parented to. */
    export const root: Root;
    /**
     * Call after you have declared your classes in global scope!
     */
    export function initiateWithClasses(): void;
    /** URL of the current app */
    export const baseURI: string;
    /** Channel id of the current app */
    export const channelId: string;
    export {};
}
declare namespace JSX {
    type Element = Nomx.DestructibleElement;
    interface ElementClass {
        id: string;
    }
    interface ElementAttributesProperty {
        props: {};
    }
    interface IntrinsicElements {
        button: Nomx.Button["props"];
        span: Nomx.Span["props"];
        input: Nomx.Input["props"];
        div: Nomx.Container["props"];
        label: Nomx.Label["props"];
        br: Nomx.Break["props"];
        screen: Nomx.Screen["props"];
        ripplebutton: Nomx.RippleButton["props"];
        img: Nomx.Image["props"];
    }
}
declare let num: number;
declare const label: Nomx.Label;
declare const d: Nomx.Container;
declare const newScreen: Nomx.Screen;
