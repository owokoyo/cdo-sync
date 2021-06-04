type SpriteOrGroup = Sprite | Group;
type p5KeyType = "left" | "right" | "up" | "down" | "a" | "b" | "c" | "d" | "e" | "f" | "g" | "h" | "i" | "j" | "k" | "l" | "m" | "n" | "o" | "p" | "q" | "r" | "s" | "t" | "u" | "v" | "w" | "x" | "y" | "x"
type p5MouseType = "leftButton" | "rightButton"

type p5ColorMode = "rgb"
type p5Image = "abc";
type p5AlignmentX = "center" | "left" | "right"
type p5AlignmentY = "baseline" | "top" | "bottom"
type p5Font = "Arial" | "Courier New" | string //ee
type p5ColorChoice = p5Color | string | number

class Sprite {
	x: number
	y: number
	scale: number
	rotation: number
	shapeColor: p5ColorChoice
	tint: p5ColorChoice

	setAnimation(label: string): void
	setSpeedAndDirection(speed: number, direction: number): void
	setCollider(collider: "rectangle" | "circle" | "point"): void
	setCollider(collider: "rectangle", offsetX: number, offsetY: number, width: number, height: number, rotationOffset: number): void
	setCollider(collider: "circle", offsetX: number, offsetY: number, radius: number): void
	setCollider(collider: "point", offsetX: number, offsetY: number): void
	overlap(target: SpriteOrGroup): boolean
}

class Group extends Array<Sprite> {
	add(sprite: Sprite)
	remove(sprite: Sprite)
	clear()
	contains(sprite: Sprite): boolean
	get(i: number): Sprite

	isTouching(target: SpriteOrGroup): boolean
	bounce(target: SpriteOrGroup)
	bounceOff(target: SpriteOrGroup)
	collide(target: SpriteOrGroup)
	displace(target: SpriteOrGroup)
	overlap(target: SpriteOrGroup): boolean

	/** Returns the highest depth in a group. */
	maxDepth(): number

	/** Returns the lowest depth in a group. */
	minDepth(): number

	/** Removes all the sprites in a group from the animation. */
	destroyEach()

	/** Rotate every sprite ionthe group to face the (x,y) coordinate. */
	pointToEach(x: number, y: number)

	/** Sets the image or animation for every sprite in the group. */
	setAnimationEach(label: string)

}

class p5Color {
	toString(): string
	_getRed(): number
	_getGreen(): number
	_getBlue(): number
	_getAlpha(): number
	_getBrightness(): number
	_getHue(): number
	_getLightness(): number
	_getSaturation(): number
	levels: [number, number, number, number]
	maxes: {
		hsb: [number, number, number, number]
		hsl: [number, number, number, number]
		rgb: [number, number, number, number]
	}
	mode: p5ColorMode
	_array: [number, number, number, number]
}

namespace World {
	let pInst: pInst
	
	let allSprites: Group
	let frameRate: number
	const frameCount: number
	const mouseX: number
	const mouseY: number
}

function rgb(a: number, g: number, b: number): p5Color

function noSmooth(): void
function background(color: p5ColorChoice): void

function drawSprites(group: Group = World.allSprites): void
function drawSprite(sprite: Sprite): void
function createSprite<customProps extends object>(x?: number, y?: number, w?: number, h?:number): (Sprite & customProps)
function createGroup(): Group

//inputs
function keyDown(key: p5KeyType): boolean
function keyUp(key: p5KeyType): boolean
function mouseDown(key: p5MouseType): boolean
function mouseUp(key: p5MouseType): boolean
function mouseWentDown(key: p5MouseType): boolean
function mouseWentUp(key: p5MouseType): boolean
function mouseDidMove(): boolean
function mousePressedOver(sprite: Sprite): boolean
function mouseIsOver(sprite: Sprite): boolean

//colors
function fill(p5ColorChoice): void;
function noFill(): void
function stroke(p5ColorChoice): void
function noStroke(): void
function strokeWeight(weight: number): void

//basic drawing
function ellipse(x: number, y: number, width?: number, height?: number)
function rect(x: number, y: number, width?: number, height?: number)
function curveVertex(x: number, y: number): void
function beginShape(): void
function endShape(): void

//math
function atan2(y: number, x: number): number
function atan(m: number): number
function cos(m: number): number
function sin(m: number): number
function random(): number
function randomNumber(min: number, max: number): number
function dist(x: number, y: number, x2: number, y2: number): number

//text
function textAlign(x: p5AlignmentX, y?: p5AlignmentY): void
function text(text: string, x: number, y: number, w?: number, h?: number): void

const CENTER = "center";
const LEFT = "left";
const RIGHT = "right";
const BASELINE = "baseline";
const TOP = "top";
const BOTTOM = "bottom";