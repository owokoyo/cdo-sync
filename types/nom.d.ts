namespace Nom {

	type baseType = 
		"screen" |
		"dropdown" |
		"slider" |
		"radio" |
		"checkbox" |
		"textarea" |
		"photoselect" |
		"input" |
		"image" |
		"button" |
		"label" |
		"unknown" | string
	


	type type = string | Nom.elementTypes.element;
	type getProps<type> = type["props"];
	
	type mapNameToElement<name extends baseType> = 
		name extends "button" ? elementTypes.button :
//		name extends "group" ? elementTypes.groupElement :
		elementTypes.element;

	

	namespace elementTypes {
		abstract class element {
			id: string
			setProp(prop: string, val: unknown): this
			setProps(props: {[s: string]: string}): this
			applyBehavior(callback: (object: this)=>void): this
	
		}

		abstract class groupElement extends element {

		}

		abstract class recordElement extends element {

		}

		/**
		 * @deprecated really useless but i don't plan to remove it
		 */
		abstract class turtleElement extends element {

		}

		abstract class tableElement extends element {

		}

		abstract class rootElement extends element {
			setStyle(style: string): this
			children(children: (string | element)[]): this
			children(children: (string | element)): this
		}

		abstract class physicalElement extends rootElement {
			parent: element | undefined
		}

		abstract class screenElement extends physicalElement {
			
		}

		abstract class contentElement extends physicalElement {
			x: number
			y: number
			width: number
			height: number
			borderRadius: number
			borderColor: string
			borderWidth: number
			borderStyle: string
			position: "static" | "relative" | "fixed" | "absolute" | "sticky"
		}

		/** @deprecated You can't change the text which sucks */
		abstract class spanElement extends contentElement {

		}

		abstract class textElement extends contentElement {
			text: string

		}

		abstract class button extends textElement {
			
		}
	}

	/**
	 * @deprecated it doesn't really work that well because it errors a lot
	 */
	function getType(id: string): baseType
	function create<typeName extends baseType>(type: typeName): mapNameToElement<typeName>
	function get<typeName extends baseType>(id: string, type: typeName): mapNameToElement<typeName>
	function createType(type: {extends?: typeof elementTypes.element, element?: function, create: (id: string, ...args: unknown)=>void})
	function group(items): elementTypes.group

	const types: {[s: string]: typeof Nom.elementTypes.element};
}

function Nom<typeName extends Nom.baseType>(type: typeName): Nom.mapNameToElement<typeName>

import $ = Nom;