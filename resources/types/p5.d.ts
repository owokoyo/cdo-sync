export namespace p5 {
	type SpriteOrGroup = Sprite | Group;
	type KeyType =
		| "left"
		| "right"
		| "up"
		| "down"
		| "a"
		| "b"
		| "c"
		| "d"
		| "e"
		| "f"
		| "g"
		| "h"
		| "i"
		| "j"
		| "k"
		| "l"
		| "m"
		| "n"
		| "o"
		| "p"
		| "q"
		| "r"
		| "s"
		| "t"
		| "u"
		| "v"
		| "w"
		| "x"
		| "y"
		| "z"
		| "1"
		| "2"
		| "3"
		| "4"
		| "5"
		| "6"
		| "7"
		| "8"
		| "9"
		| "10"
		| "ctrl"
		| "space"
		| "shift"
		| "backspace"
		| "UP_ARROW" //apparently constants like these also work
		| "DOWN_ARROW"
		| "LEFT_ARROW"
		| "RIGHT_ARROW"
		| number;
	type MouseType = "leftButton" | "rightButton";

	type ColorMode = "rgb";
	type AlignmentX = "center" | "left" | "right";
	type AlignmentY = "baseline" | "top" | "bottom" | "center";
	type FontString = "Arial" | "Courier New" | string; //ee
	type ColorChoice = Color | string | number;
	type ArcMode = "chord" | "pie" | "open";

	type Vector4 = [number, number, number, number];
	
	interface Image {}

	type Graphics = any; // i can't be both

	interface Lang {
		en: string;
	}

	interface Font {
		parent: never;
		cache: Record<
			string,
			{ x: number; y: number; h: number; w: number; advance: number }
		>;
		font: {
			names: {
				25: Lang;
				256: Lang;
				262: Lang;
				copyright: Lang;
				fontFamily: Lang;
				fontSubfamily: Lang;
				uniqueID: Lang;
				fullName: Lang;
				version: Lang;
				postScriptName: Lang;
				manufacturer: Lang;
				designer: Lang;
				manufacturerURL: Lang;
				designerURL: Lang;
				licence: Lang;
				licenceURL: Lang;
				preferredFamily: Lang;
				preferredSubfamily: Lang;
			};
			unitsPerEm: number;
			ascender: number;
			descender: number;
			supported: boolean;
			gylphs: object; //too lazy
			encoding: object;
			tables: object;
			outlinesFormat: string;
			numberOfHMetrics: number;
			numGylphs: number;
			glyphNames: object;
			kerningPairs: object;
			getGposKerningValue: () => any;
		};
	}

	interface Color {
		toString(): string;
		_getRed(): number;
		_getGreen(): number;
		_getBlue(): number;
		_getAlpha(): number;
		_getBrightness(): number;
		_getHue(): number;
		_getLightness(): number;
		_getSaturation(): number;
		levels: Vector4;
		maxes: {
			hsb: Vector4;
			hsl: Vector4;
			rgb: Vector4;
		};
		mode: ColorMode;
		_array: Vector4;
	}

	type pInst = {
		readonly _setupDone: boolean;
		readonly _pixelDensity: number;
		//readonly _userNode: HTMLDivElement
		//readonly _curElement: e
		//readonly _elements: e[]
		readonly _requestAnimId: number;
		readonly _preloadCount: number;
		readonly _isGlobal: boolean;
		readonly _loop: boolean;
		readonly _styles: [];
		readonly _defaultCanvasSize: {
			readonly width: number;
			readonly height: number;
		};
		readonly _events: {
			mousemove: () => void;
			mousedown: () => void;
			mouseup: () => void;
			dragend: () => void;
			//...
		};
		readonly _loadingScreenId: "p5_loading";
		//...
		//canvas: HTMLCanvasElement
		readonly width: number;
		readonly height: number;
		readonly drawContext: CanvasRenderingContext2D;
		//_renderer:
		readonly _isdefaultGraphics: boolean;
		/**
		 * @deprecated
		 */
		loadJSON: () => void;
	};

	interface Sprite {
		x: number;
		y: number;
		width: number;
		height: number;

		scale: number;
		rotation: number;
		shapeColor: ColorChoice;
		tint: ColorChoice;
		depth: number;
		visible: boolean;
		velocityY: number;
		velocityX: number;
		bounciness: number;
		rotationSpeed: number;
		alpha: number;
		debug: boolean;
		lifetime: number;

		draw: ()=>void;

		pointTo(x: number, y: number): void;
		isTouching(target: SpriteOrGroup): boolean;
		bounce(target: SpriteOrGroup): void;
		bounceOff(target: SpriteOrGroup): void;
		collide(target: SpriteOrGroup): void;
		displace(target: SpriteOrGroup): void;
		overlap(target: SpriteOrGroup): boolean;
		setSpeed(speed: number): void;
		setFrame(frame: number): void;

		destroy(): void;
		pause(): void;

		/**
		 * Gets horizontal direction
		 */
		mirrorX(): number;
		
		/** Sets horizontal mirror */
		mirrorX(dir: number): void;

		/** Gets vertical direction */
		mirrorY(): number;

		/** Sets vertical mirror */
		mirrorY(dir: number);

		setAnimation(label: string): void;
		setSpeedAndDirection(speed: number, direction: number): void;
		setCollider(collider: "rectangle" | "circle" | "point"): void;
		setCollider(
			collider: "rectangle",
			offsetX: number,
			offsetY: number,
			width?: number,
			height?: number,
			rotationOffset?: number
		): void;
		setCollider(
			collider: "circle",
			offsetX: number,
			offsetY: number,
			radius?: number
		): void;
		setCollider(collider: "point", offsetX: number, offsetY: number): void;
		overlap(target: SpriteOrGroup): boolean;

		setVelocity(vx: number, vy: number): void;
		addToGroup(group: Group): void;

	}

	interface Group<T = {}> extends Array<Sprite & T> {
		add(sprite: Sprite & T): void;
		remove(sprite: Sprite): void;
		clear(): void;
		contains(sprite: Sprite): boolean;
		get(i: number): Sprite;

		isTouching(target: SpriteOrGroup): boolean;
		bounce(target: SpriteOrGroup): void;
		bounceOff(target: SpriteOrGroup): void;
		collide(target: SpriteOrGroup): void;
		displace(target: SpriteOrGroup): void;
		overlap(target: SpriteOrGroup): boolean;

		/** Returns the highest depth in a group. */
		maxDepth(): number;

		/** Returns the lowest depth in a group. */
		minDepth(): number;

		/** Removes all the sprites in a group from the animation. */
		destroyEach(): void;

		/** Rotate every sprite in the group to face the (x,y) coordinate. */
		pointToEach(x: number, y: number): void;

		/** Sets the image or animation for every sprite in the group. */
		setAnimationEach(label: string): void;

		setRotationEach(rotation: number): void;

		setScaleEach(scale: number): void;

		setVisibleEach(visible: boolean): void;

		setColorEach(color: p5.ColorChoice): void;

		setColliderEach(collider: "rectangle" | "circle" | "point"): void;
		setColliderEach(
			collider: "rectangle",
			offsetX: number,
			offsetY: number,
			width: number,
			height: number,
			rotationOffset: number
		): void;
		setColliderEach(
			collider: "circle",
			offsetX: number,
			offsetY: number,
			radius: number
		): void;
		setColliderEach(
			collider: "point",
			offsetX: number,
			offsetY: number
		): void;

		setVelocityXEach(vx: number): void;
		setVelocityYEach(vy: number): void;
		setVelocityEach(vx: number, vy: number): void;

		/**
		 * Set the speed and direction of every sprite in the group.
		 */
		setSpeedAndDirectionEach(speed: number, direction: number): void;
	}
}

export namespace Bruh {
	function e(): void;
}

declare global {
	function createGraphics(
		x: number,
		y: number,
		w?: number,
		h?: number
	): p5.Graphics;

	function rgb(r: number, g: number, b: number, a?: number): p5.Color;
	function noSmooth(): void;
	function background(color: p5.ColorChoice): void;

	function drawSprites(group?: p5.Group /*= World.allSprites*/): void;
	function drawSprite(sprite: p5.Sprite): void;
	function createSprite(
		x?: number,
		y?: number,
		w?: number,
		h?: number
	): p5.Sprite;
	function createSprite<customProps extends object = {}>(
		x?: number,
		y?: number,
		w?: number,
		h?: number
	): p5.Sprite & customProps;
	function createGroup<customProps extends object = {}>(): p5.Group<customProps>;
	function createEdgeSprites(): void;

	function get(x: number, y: number): [number, number, number, number];
	function set(x: number, y: number, color: p5.ColorChoice): void;

	function image(
		img: p5.Image | p5.Graphics,
		x: number,
		y: number,
		w?: number,
		h?: number,
		dx?: number,
		dy?: number,
		dw?: number,
		dh?: number,
		sx?: number,
		sy?: number,
		sw?: number,
		sh?: number
	): void;

	//inputs
	function keyDown(key: p5.KeyType): boolean;
	function keyUp(key: p5.KeyType): boolean;
	function mouseDown(key: p5.MouseType): boolean;
	function mouseUp(key: p5.MouseType): boolean;
	function mouseWentDown(key: p5.MouseType): boolean;
	function mouseWentUp(key: p5.MouseType): boolean;
	function mouseDidMove(): boolean;
	function mousePressedOver(sprite: p5.Sprite): boolean;
	function mouseIsOver(sprite: p5.Sprite): boolean;
	function keyWentUp(key: p5.KeyType): boolean;
	function keyWentDown(key: p5.KeyType): boolean;

	//colors
	function fill(color: p5.ColorChoice): void;
	function noFill(): void;
	function stroke(color: p5.ColorChoice): void;
	function noStroke(): void;
	function strokeWeight(weight: number): void;

	//basic drawing
	/** Draws an ellipse with the center (x, y). Default width/height is 50 */
	function ellipse(
		x: number,
		y: number,
		width?: number,
		height?: number
	): void;

	/** Draws a rectangle with the top-left corner (x, y) Default width/height is 50 */
	function rect(
		x: number,
		y: number,
		width?: number,
		height?: number,
		tl?: number,
		tr?: number,
		br?: number,
		bl?: number,
		detailX?: number,
		detailY?: number
	): void;

	/** Draws a triangle to the canvas. A triangle is a plane created by connecting three points. The first two arguments specify the first point, the middle two arguments specify the second point, and the last two arguments specify the third point. */
	function triangle(
		x1: number,
		y1: number,
		x2: number,
		y2: number,
		x3: number,
		y3: number
	);

	/** Defines a vertex in a shape that is curved */
	function curveVertex(x: number, y: number): void;

	/** Defines a vertex in a shape */
	function vertex(x: number, y: number): void;

	/** Start creating a shape.
	 * @example
	 * beginShape()
	 * curveVertex()
	 */
	function beginShape(
		kind?: 0 | 1 | 4 | 5 | 6 | "quads" | "quad_strip"
	): void;
	function endShape(close?: "close"): void;

	/** Draws a straight line between two points. */
	function line(x1: number, y1: number, x2: number, y2: number): void;

	/**
	 *
	 * @param x x-coordinate of the arc's ellipse
	 * @param y y-coordinate of the arc's ellipse
	 * @param w width of the arc's ellipse by default
	 * @param h height of the arc's ellipse by default
	 * @param start angle to start the arc, specified in ~~radians~~ degrees
	 * @param stop angle to stop the arc, specified in ~~radians~~ degrees
	 * @param mode optional parameter to determine the way of drawing the arc. either CHORD, PIE or OPEN
	 * @param detail optional parameter for WebGL mode only. This is to specify the number of vertices that makes up the perimeter of the arc. Default value is 25. Won't draw a stroke for a detail of more than 50.
	 */
	function arc(
		x: number,
		y: number,
		w: number,
		h: number,
		start: number,
		stop: number,
		mode?: p5.ArcMode,
		detail?: number
	);

	//math
	function atan2(y: number, x: number): number;
	function atan(m: number): number;
	function tan(m: number): number;
	function cos(m: number): number;
	function sin(m: number): number;
	function asin(m: number): number;
	function acos(m: number): number;
	function degrees(m: number): number;
	function radians(m: number): number;
	function random(): number;
	function randomNumber(min: number, max: number): number;
	function dist(x: number, y: number, x2: number, y2: number): number;
	function max(...vals: number[]): number;
	function min(...vals: number[]): number;
	function round(m: number): number;
	function pow(b: number, e: number): number;
	function sq(m: number): number;
	function sqrt(m: number): number;
	function abs(n: number): number;

	//text
	function textAlign(x: p5.AlignmentX, y?: p5.AlignmentY): void;
	function text(
		text: any, // string number and array are supported. Object will just be [object Object]
		x: number,
		y: number,
		w?: number,
		h?: number
	): void;
	function textFont(font: p5.FontString | p5.Font): void;

	function textSize(size: number): void;
	function textSize(): number;
	function textWidth(width: number): void;

	//translations or whatever
	function translate(x: number, y: number): void;
	function rotate(r: number): void;

	//special stuff
	function loadFont(font: string): p5.Font;

	function rectMode(mode: "center" | "corners" | "corner" | "radius"): void;
	function imageMode(mode: "center" | "corners" | "corner"): void;

	function prompt(msg: string): string | null;
	function promptNum(msg: string): number | null;

	const RADIUS = "radius";
	const CORNERS = "corners";
	const CORNER = "corner";

	const CENTER = "center";
	const LEFT = "left";
	const RIGHT = "right";
	const BASELINE = "baseline";
	const TOP = "top";
	const BOTTOM = "bottom";

	const CHORD = "chord";
	const PIE = "pie";
	const OPEN = "open";

	const POINTS = 0;
	const LINES = 1;
	const TRIANGLES = 4;
	const TRIANGLE_STRIP = 5;
	const TRIANGLE_FAN = 6;

	const QUADS = "quads";
	const QUAD_STRIP = "quad_strip";

	const CLOSE = "close";

	/** @readonly */
	let keyCode: number;

	/** @readonly key is completely broken for all intents and purposes. use keyCode */
	let key: string;

	const World: {
		readonly pInst: p5.pInst;

		readonly allSprites: p5.Group;
		frameRate: number;
		readonly seconds: number;
		readonly frameCount: number;
		readonly mouseX: number;
		readonly mouseY: number;
	};


	const mouseX: number;
	const mouseY: number;
	const allSprites: p5.Group;
	const edges: p5.Group;

	const camera: {
		x: number;
		y: number;
		zoom: number;
		scale: number;
		readonly mouseX: number;
		readonly mouseY: number;
		on(): void;
		off(): void;
		isActive(): boolean;
		readonly init: true;
	};
}
