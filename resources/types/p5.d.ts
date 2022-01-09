export namespace p5 {
    type SpriteOrGroup = Sprite | Group;
    type KeyType = "left" | "right" | "up" | "down" | "a" | "b" | "c" | "d" | "e" | "f" | "g" | "h" | "i" | "j" | "k" | "l" | "m" | "n" | "o" | "p" | "q" | "r" | "s" | "t" | "u" | "v" | "w" | "x" | "y" | "z" | "ctrl" | "space" | "shift"
    type MouseType = "leftButton" | "rightButton"
    
    type ColorMode = "rgb"
    type Image = "abc";
    type AlignmentX = "center" | "left" | "right"
    type AlignmentY = "baseline" | "top" | "bottom"
    type FontString = "Arial" | "Courier New" | string //ee
    type ColorChoice = Color | string | number

    interface Lang {
        en: string;
    }

    interface Font {
        parent: never,
        cache: Record<string, {x: number, y: number, h: number, w: number, advance: number}>,
        font: {
            names: {
                25: Lang
                256: Lang
                262: Lang
                copyright: Lang
                fontFamily: Lang
                fontSubfamily: Lang
                uniqueID: Lang
                fullName: Lang
                version: Lang
                postScriptName: Lang
                manufacturer: Lang
                designer: Lang
                manufacturerURL: Lang
                designerURL: Lang
                licence: Lang
                licenceURL: Lang
                preferredFamily: Lang
                preferredSubfamily: Lang
            },
            unitsPerEm: number,
            ascender: number,
            descender: number,
            supported: boolean,
            gylphs: object, //too lazy
            encoding: object,
            tables: object,
            outlinesFormat: string,
            numberOfHMetrics: number,
            numGylphs: number,
            glyphNames: object,
            kerningPairs: object,
            getGposKerningValue: ()=>any
        }
    }

    interface Color {
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
        mode: ColorMode
        _array: [number, number, number, number]
    }

    type pInst = {
        readonly _setupDone: boolean
        readonly _pixelDensity: number
        //readonly _userNode: HTMLDivElement
        //readonly _curElement: e
        //readonly _elements: e[]
        readonly _requestAnimId: number
        readonly _preloadCount: number
        readonly _isGlobal: boolean;
        readonly _loop: boolean;
        readonly _styles: [];
        readonly _defaultCanvasSize: {
            readonly width: number,
            readonly height: number
        }
        readonly _events: {
            mousemove: () => void,
            mousedown: () => void,
            mouseup: () => void,
            dragend: () => void
            //...
        }
        readonly _loadingScreenId: "p5_loading"
        //...
        //canvas: HTMLCanvasElement
        readonly width: number
        readonly height: number
        readonly drawContext: CanvasRenderingContext2D
        //_renderer:
        readonly _isdefaultGraphics: boolean
        /**
         * @deprecated
         */
        loadJSON: () => void;
    }
    
    interface Sprite {
        x: number
        y: number
        scale: number
        rotation: number
        shapeColor: ColorChoice
        tint: ColorChoice
        depth: number
        visible: boolean
        velocityY: number
        velocityX: number
    
        isTouching(target: SpriteOrGroup): boolean;
        bounce(target: SpriteOrGroup): void
        bounceOff(target: SpriteOrGroup): void
        collide(target: SpriteOrGroup): void
        displace(target: SpriteOrGroup): void
        overlap(target: SpriteOrGroup): boolean
    
        setAnimation(label: string): void
        setSpeedAndDirection(speed: number, direction: number): void
        setCollider(collider: "rectangle" | "circle" | "point"): void
        setCollider(collider: "rectangle", offsetX: number, offsetY: number, width: number, height: number, rotationOffset: number): void
        setCollider(collider: "circle", offsetX: number, offsetY: number, radius: number): void
        setCollider(collider: "point", offsetX: number, offsetY: number): void
        overlap(target: SpriteOrGroup): boolean
    }
    
    interface Group extends Array<Sprite> {
        add(sprite: Sprite): void
        remove(sprite: Sprite): void
        clear(): void
        contains(sprite: Sprite): boolean
        get(i: number): Sprite
    
        isTouching(target: SpriteOrGroup): boolean
        bounce(target: SpriteOrGroup): void
        bounceOff(target: SpriteOrGroup): void
        collide(target: SpriteOrGroup): void
        displace(target: SpriteOrGroup): void
        overlap(target: SpriteOrGroup): boolean
    
        /** Returns the highest depth in a group. */
        maxDepth(): number
    
        /** Returns the lowest depth in a group. */
        minDepth(): number
    
        /** Removes all the sprites in a group from the animation. */
        destroyEach(): void
    
        /** Rotate every sprite ionthe group to face the (x,y) coordinate. */
        pointToEach(x: number, y: number): void
    
        /** Sets the image or animation for every sprite in the group. */
        setAnimationEach(label: string): void
    
        setRotationEach(rotation: number): void
    }
}

declare global {
    function rgb(r: number, g: number, b: number, a?: number): p5.Color
    function noSmooth(): void
    function background(color: p5.ColorChoice): void

    function drawSprites(group?: p5.Group /*= World.allSprites*/): void
    function drawSprite(sprite: p5.Sprite): void
    function createSprite(x?: number, y?: number, w?: number, h?: number): p5.Sprite
    function createSprite<customProps extends object>(x?: number, y?: number, w?: number, h?: number): (p5.Sprite & customProps)
    function createGroup(): p5.Group
    function createEdgeSprites(): void

    //inputs
    function keyDown(key: p5.KeyType): boolean
    function keyUp(key: p5.KeyType): boolean
    function mouseDown(key: p5.MouseType): boolean
    function mouseUp(key: p5.MouseType): boolean
    function mouseWentDown(key: p5.MouseType): boolean
    function mouseWentUp(key: p5.MouseType): boolean
    function mouseDidMove(): boolean
    function mousePressedOver(sprite: p5.Sprite): boolean
    function mouseIsOver(sprite: p5.Sprite): boolean
    function keyWentUp(key: p5.KeyType): boolean;
    function keyWentDown(key: p5.KeyType): boolean;

    //colors
    function fill(color: p5.ColorChoice): void;
    function noFill(): void
    function stroke(color: p5.ColorChoice): void
    function noStroke(): void
    function strokeWeight(weight: number): void

    //basic drawing
    /** Draws an ellipse with the center (x, y). Default width/height is 50 */
    function ellipse(x: number, y: number, width?: number, height?: number): void

    /** Draws a rectangle with the top-left corner (x, y) Default width/height is 50 */
    function rect(x: number, y: number, width?: number, height?: number): void

    /** Defines a vertex in a shape that is curved */
    function curveVertex(x: number, y: number): void

    /** Defines a vertex in a shape */
    function vertex(x: number, y: number): void

    /** Start creating a shape.
     * @example
     * beginShape()
     * curveVertex()
     */
    function beginShape(kind?: 0 | 1 | 4 | 5 | 6 | "quads" | "quad_strip"): void
    function endShape(close?: "close"): void

    /** Draws a straight line between two points. */
    function line(x1: number, y1: number, x2: number, y2: number): void;

    //math
    function atan2(y: number, x: number): number
    function atan(m: number): number
    function cos(m: number): number
    function sin(m: number): number
    function random(): number
    function randomNumber(min: number, max: number): number
    function dist(x: number, y: number, x2: number, y2: number): number

    //text
    function textAlign(x: p5.AlignmentX, y?: p5.AlignmentY): void
    function text(text: string, x: number, y: number, w?: number, h?: number): void
    function textFont(font: p5.FontString | p5.Font): void
    function textSize(size: number): void;

    //translations or whatever
    function translate(x: number, y: number): void;
    function rotate(r: number): void;


    //special stuff
    function loadFont(font: string): p5.Font;

    const CENTER = "center";
    const LEFT = "left";
    const RIGHT = "right";
    const BASELINE = "baseline";
    const TOP = "top";
    const BOTTOM = "bottom";

    const POINTS = 0;
    const LINES = 1;
    const TRIANGLES = 4;
    const TRIANGLE_STRIP = 5;
    const TRIANGLE_FAN = 6;

    const QUADS = "quads";
    const QUAD_STRIP = "quad_strip";

    const CLOSE = "close";

    const World: {
        readonly pInst: p5.pInst
    
        readonly allSprites: p5.Group
        readonly frameRate: number
        readonly frameCount: number
        readonly mouseX: number
        readonly mouseY: number
    }
    
    const camera: {
        readonly x: number
        readonly y: number
        readonly zoom: number
        readonly scale: number
        readonly mouseX: number
        readonly mouseY: number
        on(): void;
        off(): void;
        isActive(): boolean
        readonly init: true
    }

}
