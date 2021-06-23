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
 * @example
 * class ChatContainerSingleton extends Nomx.Container {
 * 		addMessage(message: string){
 * 			this.addChildren(<div>{message}</div>)
 * 		}
 * }
 * const chatContainer = <ChatContainerSingleton style="position: absolute; width: 100%; height: 100%; overflow: auto"/> as ChatContainerSingleton
 * chatContainer.addMessage("hi, how are you");
 * chatContainer.addMessage("I'm fine");
*/

namespace Nomx {

	const prefix = "Nomx_Gen_"
	let counter = 0;

	export type HTMLTree = { attributes: { escaped: string, name: string, value: string }[], children: HTMLTree[], tag: string, id: string }

	export const ElementsById: { [s: string]: Element } = {}

	/*
 * HTML Parser By John Resig (ejohn.org)
 * Original code by Erik Arvidsson, Mozilla Public License
 * http://erik.eae.net/simplehtmlparser/simplehtmlparser.js
	(modified to work with code.org since code.org is :trashcan:)
 */

	const parser = (function () {
		// Regular Expressions for parsing tags and attributes
		var startTag = /^<([-A-Za-z0-9_]+)((?:\s+[-A-Z-a-z0-9_]+(?:\s*=\s*(?:(?:"[^"]*")|(?:'[^']*')|[^>\s]+))?)*)\s*(\/?)>/,
			endTag = /^<\/([-A-Za-z0-9_]+)[^>]*>/,
			attr = /([-A-Za-z0-9_]+)(?:\s*=\s*(?:(?:"((?:\\.|[^"])*)")|(?:'((?:\\.|[^'])*)')|([^>\s]+)))?/g,
			attr2 = /([-A-Za-z0-9_]+)(?:\s*=\s*(?:(?:"((?:\\.|[^"])*)")|(?:'((?:\\.|[^'])*)')|([^>\s]+)))?/;
		// Empty Elements - HTML 4.01
		var empty = makeMap("area,base,basefont,br,col,frame,hr,img,input,isindex,link,meta,param,embed");

		// Block Elements - HTML 4.01
		var block = makeMap("address,applet,blockquote,button,center,dd,del,dir,div,dl,dt,fieldset,form,frameset,hr,iframe,ins,isindex,li,map,menu,noframes,noscript,object,ol,p,pre,script,table,tbody,td,tfoot,th,thead,tr,ul");

		// Inline Elements - HTML 4.01
		var inline = makeMap("a,abbr,acronym,applet,b,basefont,bdo,big,br,button,cite,code,del,dfn,em,font,i,iframe,img,input,ins,kbd,label,map,object,q,s,samp,script,select,small,span,strike,strong,sub,sup,textarea,tt,u,var");

		// Elements that you can, intentionally, leave open
		// (and which close themselves)
		var closeSelf = makeMap("colgroup,dd,dt,li,options,p,td,tfoot,th,thead,tr");

		// Attributes that have their values filled in disabled="disabled"
		var fillAttrs = makeMap("checked,compact,declare,defer,disabled,ismap,multiple,nohref,noresize,noshade,nowrap,readonly,selected");

		// Special Elements (can contain anything)
		var special = makeMap("script,style");

		var HTMLParser = function (html: string, handler: { comment?: (arg0: any) => void; chars?: (arg0: any) => void; start?: (arg0: string, arg1: { name: string, escaped: string, value: string }[], arg2: any) => void; end?: (arg0: any) => void; }) {
			var index, chars, match, stack = [] as unknown as (any[] & { last: () => string }), last = html;
			stack.last = function () {
				return this[this.length - 1];
			};

			while (html) {
				chars = true;

				// Make sure we're not in a script or style element
				if (!stack.last() || !special[stack.last()]) {

					// Comment
					if (html.indexOf("<!--") == 0) {
						index = html.indexOf("-->");

						if (index >= 0) {
							if (handler.comment)
								handler.comment(html.substring(4, index));
							html = html.substring(index + 3);
							chars = false;
						}

						// end tag
					} else if (html.indexOf("</") == 0) {
						match = html.match(endTag);

						if (match) {
							html = html.substring(match[0].length);
							parseEndTag(match[0], match[1])
							chars = false;
						}

						// start tag
					} else if (html.indexOf("<") == 0) {
						match = html.match(startTag);

						if (match) {
							html = html.substring(match[0].length);

							parseStartTag(match[0], match[1], match[2], match[3])
							chars = false;
						}
					}

					if (chars) {
						index = html.indexOf("<");

						var text = index < 0 ? html : html.substring(0, index);
						html = index < 0 ? "" : html.substring(index);

						if (handler.chars)
							handler.chars(text);
					}

				} else {
					var regex = new RegExp("(.*)<\/" + stack.last() + "[^>]*>");
					var m = html.match(regex)
					if (m) {
						m[1] = m[1].replace(/<!--(.*?)-->/g, "$1")
							.replace(/<!\[CDATA\[(.*?)]]>/g, "$1");

						if (handler.chars)
							handler.chars(m[1]);
					}

					parseEndTag("", stack.last());
					html = html.replace(regex, "");
				}

				if (html == last)
					throw "Parse Error: " + html;
				last = html;
			}

			// Clean up any remaining tags
			parseEndTag();

			function parseStartTag(tag: any, tagName: string, rest: string, unary: any) {
				tagName = tagName.toLowerCase();

				if (block[tagName]) {
					while (stack.last() && inline[stack.last()]) {
						parseEndTag("", stack.last());
					}
				}

				if (closeSelf[tagName] && stack.last() == tagName) {
					parseEndTag("", tagName);
				}

				unary = empty[tagName] || !!unary;

				if (!unary)
					stack.push(tagName);

				if (handler.start) {
					var attrs: {
						name: string; value: string; escaped: string; //"
					}[] = [];


					var ml = rest.match(attr);
					if (ml) {
						for (const atr of ml) {
							var m = attr2.exec(atr)!;

							var value = m[2] ? m[2] :
								m[3] ? m[3] :
									m[4] ? m[4] :
										fillAttrs[m[1]] ? m[1] : "";

							attrs.push({
								name: m[1],
								value: value,
								escaped: value.replace(/(^|[^\\])"/g, '$1\\\"') //"
							});
						};
					}

					if (handler.start)
						handler.start(tagName, attrs, unary);
				}
				return ""
			}

			function parseEndTag(tag?: string, tagName?: any) {
				// If no tag name is provided, clean shop
				if (!tagName)
					var pos = 0;

				// Find the closest opened tag of the same type
				else
					for (var pos = stack.length - 1; pos >= 0; pos--)
						if (stack[pos] == tagName)
							break;

				if (pos >= 0) {
					// Close all the open elements, up the stack
					for (var i = stack.length - 1; i >= pos; i--)
						if (handler.end)
							handler.end(stack[i]);

					// Remove the open elements from the stack
					stack.length = pos;
				}
				return ""
			}
		};


		function makeMap(str: string) {
			var obj: { [s: string]: boolean } = {}, items = str.split(",");
			for (var i = 0; i < items.length; i++)
				obj[items[i]] = true;
			return obj;
		}

		return {
			nodes: function (str: string) {
				const list: { tag: string, id: string, attributes: { [s: string]: unknown } }[] = []
				HTMLParser(str, {
					start: (tag: string, attributes: { escaped: string, name: string, value: string }[]) => {
						let attrs: { [s: string]: unknown } = {};
						let id: string | undefined;

						for (const attribute of attributes) {
							attrs[attribute.name] = attribute.value;
							if (attribute.name === "id") {
								id = attribute.value;
							}
						}
						if (id)
							list.push({ tag: tag, id: id, attributes: attrs });
					}
				})
				return list;
			},
			tree: function (str: string) {
				const stack = [{ children: [] as HTMLTree[] }];
				HTMLParser(str, {
					start: (tag: string, attributes: { escaped: string, name: string, value: string }[]) => {
						let id: string;

						for (const attribute of attributes) {
							if (attribute.name === "id") {
								id = attribute.value;
								break;
							}
						}

						const node = {
							tag: tag,
							attributes: attributes,
							children: [],
							id: id!,
						};
						stack[stack.length - 1].children.push(node)
						stack.push(node)
					},
					end: () => {
						if (stack.length > 1) {
							stack.pop()
						} else {
							console.log("something is wrong")
						}
					}
				})
				return stack[0].children
			}
		}
	})();


	export abstract class Element {
		id: string;
		props: convertClassToProps<this>; //little magic thing that forces typescript to shut up

		private _lastouterHTML: string = "";
		private _outerHTMLTree?: HTMLTree;

		get outerHTMLTree() {
			if (this._lastouterHTML === this.outerHTML) {
				return this._outerHTMLTree!;
			} else {
				this._lastouterHTML = this.outerHTML;
				this._outerHTMLTree = parser.tree(this.outerHTML)[0]
				return this._outerHTMLTree
			}
		}

		get childElementCount(): number {
			return parseInt(this.getAttribute("childElementCount"))
		}

		get className(): string {
			return this.getAttribute("className")
		}

		get children(): ReadonlyArray<Nomx.Element> {
			return this.outerHTMLTree.children.map(e => get(e.id, "container")) as ReadonlyArray<Nomx.Element>
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


		on(t: string, callback: (event: any) => void) {
			onEvent(this.id, t as "change", callback)
		}

		setStyle(style: string) {
			setStyle(this.id, style);
		}

		set backgroundColor(color: string) {
			setProperty(this.id, "background-color", color)
		}

		get backgroundColor(): string {
			return getProperty(this.id, "background-color")
		}

		get tagName() {
			return this.getAttribute("tagName")
		}

		set style(style: string) {
			this.setStyle(style);
		}
		get style() {
			for (const attr of this.outerHTMLTree.attributes) {
				if (attr.name === "style") {
					return attr.value
				}
			}
			return ""
		}

		get outerHTML() {
			return this.getAttribute("outerHTML");
		}

		get innerHTML() {
			return this.getAttribute("innerHTML")
		}

		set innerHTML(innerhtml: string) {
			innerHTML(this.id, innerhtml);
		}

		get scrollHeight() {
			return getAttribute(this.id, "scrollHeight")
		}

		get scrollTop(): number {
			return parseInt(getAttribute(this.id, "scrollTop"));
		}

		set scrollTop(y: number) {
			setAttribute(this.id, "scrollTop", y);
		}

		get borderWidth() {
			return getProperty(this.id, "border-width")
		}
		set borderWidth(value: number) {
			setProperty(this.id, "border-width", value)
		}

		get borderColor() {
			return getProperty(this.id, "border-color")
		}

		set borderColor(value: number) {
			setProperty(this.id, "border-clor", value)
		}

		set display(display: "inline" | "block" | "contents" | "flex" | "grid" | "inline-block" | "inline-flex" | "inline-grid" | "inline-table" | "list-item" | "run-in" | "table" | "table-caption" | "table-column-group" | "table-header-group" | "table-footer-group" | "table-row-group" | "table-cell" | "table-column" | "table-row" | "none" | "initial" | "inherit") {
			this.setStyle(`display: ${display}`)
		}

		set padding(value: number | string) {
			this.setStyle(`padding: ${typeof value === "number" ? `${value}px` : value}`)
		}
		set margin(value: number | string) {
			this.setStyle(`margin: ${typeof value === "number" ? `${value}px` : value}`)
		}

		/**
		 * Returns toString()'d representation of the attribute value.
		 */
		getAttribute(attribute: string): string {
			return getAttribute(this.id, attribute)
		}

		setAttribute(attribute: Parameters<typeof setAttribute>[2], value: unknown) {
			return setAttribute(this.id, attribute, value)
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

		constructor(isNew: boolean, id: string) {
			this.props = {}
			this.id = id;
		}

	}

	export abstract class DestructibleElement extends Element {
		private _parent?: Element;

		get parent() {
			return this._parent;
		}

		get width() {
			return getProperty(this.id, "width")
		}
		set width(value: number) {
			setProperty(this.id, "width", value)
		}

		get height() {
			return getProperty(this.id, "height")
		}
		set height(value: number) {
			setProperty(this.id, "height", value)
		}

		set position(position: "static" | "relative" | "fixed" | "absolute" | "sticky") {
			this.setStyle(`position: ${position}`)
		}

		/** For absolute positioning */
		set left(value: number | string) {
			this.setStyle(`left: ${typeof value === "number" ? `${value}px` : value}`)
		}

		/** For absolute positioning */
		set right(value: number | string) {
			this.setStyle(`right: ${typeof value === "number" ? `${value}px` : value}`)
		}

		/** For absolute positioning */
		set top(value: number | string) {
			this.setStyle(`top: ${typeof value === "number" ? `${value}px` : value}`)
		}

		/** For absolute positioning */
		set bottom(value: number | string) {
			this.setStyle(`bottom: ${typeof value === "number" ? `${value}px` : value}`)
		}

		get x() {
			return getProperty(this.id, "x")
		}
		set x(value: number) {
			setProperty(this.id, "x", value)
		}

		get y() {
			return getProperty(this.id, "y")
		}
		set y(value: number) {
			setProperty(this.id, "y", value)
		}

		set parent(parent: Element | undefined) {
			if (!parent) { parent = limbo };
			setParent(this.id, parent.id)
			this._parent = parent
		}


		delete() {
			deleteElement(this.id)
		}
	}

	export class TextElement extends DestructibleElement {
		set textColor(color: string) {
			setProperty(this.id, "text-color", color)
		}

		get textColor(): string {
			return getProperty(this.id, "text-color");
		}

		set text(text: string) {
			setProperty(this.id, "text", text)
		}
		get text() {
			return getProperty(this.id, "text")
		}

		set fontSize(size: number) {
			setProperty(this.id, "font-size", size)
		}
		get fontSize(): number {
			return getProperty(this.id, "font-size")
		}
	}

	export class Label extends TextElement {
		constructor(isNew: boolean, id: string) {
			super(isNew, id);
			if (isNew) {
				textLabel(id, "")
			}
		}
	}

	export class Button extends TextElement {
		onClick = (event: BaseEventProps) => { };

		set pure(v: true) {
			this.setStyle("border: 0px; background-image: none")
		}

		constructor(isNew: boolean, id: string) {
			super(isNew, id);
			if (isNew) {
				button(id, "")
			}
			this.on("click", (event) => {
				this.onClick(event);
			})
		}
	}

	export class RippleButton extends Button {
		ripples: Container[] = []
		color = "#FFF"
		shadow = false;
		textElement = Nomx.create("container", { parent: this });

		set text(value: string) {
			this.textElement.text = value;
		}
		get text() {
			return this.textElement.text;
		}

		constructor(isNew: boolean, id: string) {
			super(isNew, id)
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
				var ripple = Nomx.create("container", { parent: this })
				ripple.setStyle("pointer-events: none;opacity: 80%;transition: opacity 1s, width 1.5s, height 1.5s;transform: translate(-50%, -50%);width: 1px; height:1px; border-radius: 1000px;position: absolute");
				this.ripples.push(ripple);
				ripple.x = event.offsetX;
				ripple.y = event.offsetY;
				setTimeout(function () { ripple.setStyle("opacity: 40%;width: 800px; height:800px") }, 50);
				ripple.backgroundColor = this.color;
			});

		}
	}

	/** Textbox */
	export class Input extends TextElement {
		onSubmit = (event: BaseEventProps) => { }
		constructor(isNew: boolean, id: string) {
			super(isNew, id)
			if (isNew) {
				textInput(id, "");
			}
			this.on("keypress", (event) => {
				if (event.keyCode === 13) {
					this.onSubmit(event)
				}
			})
		}
	}

	/** Container. aka <div>
	 * Css may be different. For example there is line-height set to 18px
	 */
	export class Container extends TextElement {
		/** Makes the container a full page */
		set fill(value: boolean) {
			this.setStyle("width: 100%; height: 100%; position: absolute")
		}

		constructor(isNew: boolean, id: string) {
			super(isNew, id)
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
			super(isNew, id)
			if (isNew) {
				root.innerHTML += `<div class="screen" tabindex="1" data-theme="default" id="${id}" style="display: none; height: 450px; width: 320px; left: 0px; top: 0px; position: absolute; z-index: 0; background-color: rgb(255, 255, 255);"></div>`
			}
		}
	}

	/** For when you want to pass a string as an Element */
	export class Span extends Container {
		constructor(isNew: boolean, id: string) {
			super(isNew, id)
			this.style = "display: inline; padding: 0px"
		}
	}

	/** Represents a line break */
	export class Break extends Container {
		/** This will error */
		addChildren() {
			throw "Line breaks can't have children, silly."
		}
		constructor(isNew: boolean, id: string) {
			super(isNew, id);
			this.style = "margin-bottom: 10px"
		}
	}

	/** singleton class that represents divApplab */
	export class Root extends Element {
		id: "divApplab" = "divApplab"

		/** Every element (that has an id) in the app (Computationally expensive, best you use caches) */
		get nodes(): ReturnType<typeof parser.nodes> {
			return parser.nodes(this.innerHTML);
		}

		/** Returns every screen. (Computationally expensive, best you use caches) */
		get screens(): Screen[] {
			return this.children.filter(c => {
				return c.className === "screen"
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
	}


	//export type convertClassToProps<c> = { [k in keyof c]?: c[k] extends (callback: (...args: any[]) => any) => void ? (...args: any[]) => any : c[k] }
	export type convertClassToProps<c> = { [k in keyof c]?: c[k] };

	type CreateChildren = string | DestructibleElement | CreateChildren[]
	/**
	 * Creates a new element given type
	 * @param ElementType Type of element. Can be a string or a class.
	 * @param props Object with properties such as `text`
	 * @param children List of children auto-parented using the .children() method
	 */
	export function create<e extends keyof creatableTypes>(ElementType: e, props?: convertClassToProps<InstanceType<creatableTypes[e]>>, ...children: CreateChildren[]): InstanceType<creatableTypes[e]>
	export function create<e extends creatableTypes[keyof creatableTypes]>(ElementType: e, props?: convertClassToProps<InstanceType<e>>, ...children: CreateChildren[]): InstanceType<e>
	//	export function create<e extends keyof creatableTypes>(ElementType: e, props?: convertClassToProps<creatableTypes[e]>, children?: CreateChildren[]): InstanceType<creatableTypes[e]>
	//	export function create<e extends creatableTypes[keyof creatableTypes]>(ElementType: e, props?: convertClassToProps<e>, children?: CreateChildren[]): InstanceType<e>	

	export function create(ElementType: keyof creatableTypes | creatableTypes[keyof creatableTypes], props?: { [s: string]: unknown }, ...children: CreateChildren[]) {
		if (props == undefined) {
			props = {}
		}

		const computedChildren: DestructibleElement[] = [];
		if (children.length === 1 && typeof children[0] === "string") {
			props.text = children[0]
		} else {
			function spread(arr: CreateChildren[]) {
				for (const val of arr) {
					if (Array.isArray(val)) {
						spread(val)
					} else if (typeof val === "string") {
						computedChildren.push(Nomx.create("span", {
							text: val
						}))
					} else { computedChildren.push(val); }

				}
			}
			spread(children);
		}

		let element: any;
		//children: [DestructibleElement | string]
		if (typeof ElementType === "string") {
			element = new allIndex[ElementType](true, prefix + (++counter).toString())
		} else {
			element = new ElementType(true, prefix + (++counter).toString())
		}
		ElementsById[element.id] = element;
		(element as Element).addChildren(computedChildren);
		Object.keys(props).map(key => {
			(element as any)[key] = props![key];
		})
		return element;
	}

	/**
	 * @deprecated The use of getElement is bad practice as all pre-existing elements are already defined ("$$elementId") and usage with default applab functions is not advised.
	*/
	export function get<e extends keyof allTypes>(id: string, ElementType: e): InstanceType<allTypes[e]>

	/**
	 * @deprecated The use of getElement is bad practice as all pre-existing elements are already defined ("$$elementId") and usage with default applab functions is not advised.
	*/
	export function get<e extends allTypes[keyof allTypes]>(id: string, ElementType: e): InstanceType<e>

	export function get(id: string, ElementType: keyof allTypes | allTypes[keyof allTypes]) {
		if (ElementsById[id]) {
			return ElementsById[id];
		} else if (typeof ElementType === "string") {
			return new allIndex[ElementType](false, id, [])
		} else {
			return new ElementType(false, id, [])
		}
	}

	/** Represents divApplab; of which all elements **must** be parented to. */
	export const root: Root = Nomx.get("divApplab", Root)

	let uninitiatedIds: RegExpMatchArray[] = [];
	root.nodes.forEach(el => {
		if (el.id !== "designModeViz") {
			let elType: string;

			if (el.attributes.class === "screen") {
				elType = "screen";
			} else if (el.tag === "button") {
				elType = "button";
			} else if (el.tag === "input") {
				elType = "input";
			} else if (el.tag === "div") {
				elType = "container";
			} else if (el.tag === "span") {
				elType = "span";
			} else if (el.tag === "label") {
				elType = "label";
			} else {
				elType = "container";
			}

			const dt = el.id.match(/^([a-zA-Z0-9\_\-]+)(?:\#([a-zA-Z0-9_\$]+))?$/);
			if (dt) {
				if (dt[2]) {
					elType = dt[2];
				}
				if (elType in allIndex) {
					window[`$$${dt[1]}`] = Nomx.get(dt[0], elType as keyof allTypes)
				} else {
					uninitiatedIds.push(dt)
				}
			}
		}
	})

	if (uninitiatedIds.length > 0) {
		console.log("Custom classes detected!; Make sure to call Nomx.initiateWithClasses() after class declarations.")
	}

	/**
	 * Call after you have declared your classes in global scope!
	 */
	export function initiateWithClasses() {
		uninitiatedIds.forEach(([id, rid, c]) => {
			window[`$$${rid}`] = Nomx.get(id, window[c]);
		})
	}

	export const channelId = root.getAttribute("baseURI").match(/code.org\/projects\/applab\/([^\/]+)/)![1];


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
	export type Element = Nomx.DestructibleElement

	export interface ElementClass {
		id: string
	};

	export interface ElementAttributesProperty {
		props: {};
	}


	export interface IntrinsicElements {
		button: Nomx.convertClassToProps<Nomx.Button>
		span: Nomx.convertClassToProps<Nomx.Span>
		input: Nomx.convertClassToProps<Nomx.Input>
		div: Nomx.convertClassToProps<Nomx.Container>
		label: Nomx.convertClassToProps<Nomx.Label>
		br: Nomx.convertClassToProps<Nomx.Break>
		ripplebutton: Nomx.convertClassToProps<Nomx.RippleButton>
	}
}