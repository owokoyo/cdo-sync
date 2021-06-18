//import "./applab"
//Auto-generated with a bit of refining
/*
function getType(ex){
    let r;
    try {
        eval("r ="+ex)
        r = typeof r;
    } catch(e) {
        r = ex
    }
    return r
}
declare function getValue(ex){
    let r;
    console.log(ex)
    try {
        eval("r ="+ex)
    } catch(e) {
        r = ex
    }
    return r
}
declare function fix(v){
    if (typeof v === "object"){
        return "string"
    }
    return v
}

document.write(appOptions.dropletConfig.blocks.filter(e=>!e.block&&!e.blockPrefix&&e.category&&e.func.match(/^[^\.]+$/)).map(f=>{
    let params = "";
    if (f.paletteParams) {
        params = f.paletteParams.map((paramName, index)=>{
            let annotation = ""
           if (paramName === "id") {
                annotation = ": ElementId"
            } else if (f.dropdown && f.dropdown[index]) {
                if (typeof f.dropdown[index] === "function") {
                    try {
                        annotation = ": " + f.dropdown[index]().map(fix).join(" | ")
                    } catch (e){}
                } else {
                    const val = f.dropdown[index].join(" | ");
                    if (val)
                    annotation = ": " + val
                }
            } else if (paramName === "imgData"){
                annotation = ": ImgData"
            } else if (paramName === "list"){
                annotation = ": []"
            } else if (f.params) {
                
                annotation = ": " + getType(f.params[index])
            }
            return paramName + annotation
        }).join(", ")
    } else if (f.params) {
        params = f.params.map((exArg, index)=>{
            return "arg"+index + ": " + getType(exArg)
        }).join(", ")
    }
    return `function ${f.func}(${params}): void`
}).join("<br><br>"))
*/

//declare function onEvent(id: ElementId, type: "click" | "change" | "keyup" | "keydown" | "keypress" | "mousemove" | "mousedown" | "mouseup" | "mouseover" | "mouseout" | "input", callback: (event: UIEvent) => void): void

declare function button(id: ElementId, text: string): void

declare function textInput(id: ElementId, text: string): void

declare function textLabel(id: ElementId, text: string): void

declare function dropdown(id: ElementId, option1: string, etc: string): void

declare function getText(id: ElementId): string

declare function setText(id: ElementId, text: string): void

declare function getNumber(id: ElementId): number

declare function setNumber(id: ElementId, number: number): void

declare function checkbox(id: ElementId, checked: true | false): void

declare function radioButton(id: ElementId, checked: true | false): void

declare function getChecked(id: ElementId): boolean

declare function setChecked(id: ElementId, checked: true | false): void

declare function image(id: ElementId, url: string): void

declare function getImageURL(id: ElementId): string

declare function setImageURL(id: ElementId, url: string): void

//declare function playSound(url: string, loop: true | false): void

declare function stopSound(url: string): void

declare function playSpeech(text: string, gender: "female" | "male", language: "العربية" | "български" | "Català" | "Čeština" | "Dansk" | "Deutsch" | "Ελληνικά" | "English (UK)" | "English" | "Español (España)" | "Español (LATAM)" | "Eesti" | "Suomi" | "Français" | "Gaeilge" | "हिन्दी" | "Hrvatski" | "Magyar" | "Bahasa Indonesia" | "Italiano" | "日本語" | "한국어" | "Lietuvių" | "Latviešu" | "بهاس ملايو" | "Malti" | "Nederlands" | "Polski" | "Português (Brasil)" | "Português (Portugal)" | "Română" | "Pусский" | "Slovenčina" | "Slovenščina" | "Svenska" | "தமிழ்" | "తెలుగు" | "ภาษาไทย" | "Türkçe" | "Українська" | "اردو" | "Tiếng Việt" | "简体字" | "繁體字"): void

declare function showElement(id: ElementId): void

declare function hideElement(id: ElementId): void

declare function deleteElement(id: ElementId): void

declare function setPosition(id: ElementId, x: number, y: number, width: number, height: number): void

declare function setSize(id: ElementId, width: number, height: number): void

declare function setProperty(id: ElementId, property: string, value: any): void

declare function getProperty(id: ElementId, property: string): any

declare function write(text: string): void

declare function getXPosition(id: ElementId): number

declare function getYPosition(id: ElementId): number

declare function setScreen(screenId: ScreenId): void

declare function rgb(r: number, g: number, b: number, a: number): string

declare function open(url: string): void

declare function createCanvas(id: ElementId, width: number, height: number): void

declare function setActiveCanvas(id: ElementId): void

declare function line(x1: number, y1: number, x2: number, y2: number): void

declare function circle(x: number, y: number, radius: number): void

declare function rect(x: number, y: number, width: number, height: number): void

declare function setStrokeWidth(width: number): void

declare function setStrokeColor(color: string): void

declare function setFillColor(color: string): void

declare function drawImage(id: ElementId, x: number, y: number): void

declare function drawImageURL(url: string): void

declare function getImageData(x: number, y: number, width: number, height: number): ImgData

declare function putImageData(imgData: ImgData, x: number, y: number): void

declare function clearCanvas(): void

declare function getRed(imgData: ImgData, x: number, y: number): number

declare function getGreen(imgData: ImgData, x: number, y: number): number

declare function getBlue(imgData: ImgData, x: number, y: number): number

declare function getAlpha(imgData: ImgData, x: number, y: number): number

declare function setRed(imgData: ImgData, x: number, y: number, r: number): void

declare function setGreen(imgData: ImgData, x: number, y: number, g: number): void

declare function setBlue(imgData: ImgData, x: number, y: number, b: number): void

declare function setAlpha(imgData: ImgData, x: number, y: number, a: number): void

declare function setRGB(imgData: ImgData, x: number, y: number, r: number, g: number, b: number): void

//declare function getColumn(table: string, column: string): string[]

/*
declare function startWebRequest(url: string, callback: function): void

declare function startWebRequestSync(url: string): void

declare function setKeyValue(key: string, value: string, callback: function): void

declare function setKeyValueSync(key: string, value: string): void

declare function getKeyValue(key: string, callback: function): void

declare function getKeyValueSync(key: string): void

declare function createRecord(table: string, record: object, callback: function): void

declare function createRecordSync(table: string, record: object): void

declare function readRecords(table: string, terms: object, callback: function): void

declare function readRecordsSync(table: string): void

declare function updateRecord(table: string, record: object, callback: function): void

declare function updateRecordSync(table: string, record: object): void

declare function deleteRecord(table: string, record: object, callback: function): void

declare function deleteRecordSync(table: string, record: object): void

declare function onRecordEvent(table: string, callback: function): void
*/

declare function getUserId(): string

declare function drawChart(chartId: ElementId, chartType: "bar" | "line" | "pie" | "scatter", chartData: recordTerm[], options?: ChartOptions, callback?: () => void): void

declare function drawChartFromRecords(chartId: ElementId, chartType: "bar" | "line" | "pie" | "scatter", tableName: string, columns: string[], options?: ChartOptions, callback?: () => void): void

declare function moveForward(pixels: number): void

declare function moveBackward(pixels: number): void

declare function move(x: number, y: number): void

declare function moveTo(x: number, y: number): void

declare function dot(radius: number): void

declare function turnRight(angle: number): void

declare function turnLeft(angle: number): void

declare function turnTo(angle: number): void

declare function arcRight(angle: number, radius: number): void

declare function arcLeft(angle: number, radius: number): void

declare function getX(): number

declare function getY(): number

declare function getDirection(): number

declare function penUp(): void

declare function penDown(): void

declare function penWidth(width: number): void

declare function penColor(color: string): void

declare function penRGB(r: number, g: number, b: number): void

declare function show(): void

declare function hide(): void

declare function speed(value: number): void

declare function setTimeout(callback: () => void, ms: number): number

declare function clearTimeout(id: number): void

declare function setInterval(callback: () => void, ms: number): number

declare function clearInterval(id: number): void

declare function timedLoop(ms: number, callback: () => void): number

declare function stopTimedLoop(id?: number): void

/**
 * @deprecated Use Array.splice losers
 */
declare function insertItem<t>(list: t[], index: number, item: any): void

/**
 * @deprecated Use Array.push losers
 */
declare function appendItem<t>(list: t[], item: any): void

/**
 * @deprecated Use Array.splice() losers
 */
declare function removeItem<t>(list: t[], index: number): void

declare function imageUploadButton(id: ElementId, text: string): void

declare function container(id: ElementId, text: string): void

declare function innerHTML(id: ElementId, html: string): void

declare function setParent(id: ElementId, parent: ElementId): void

declare function setStyle(id: ElementId, style: string): void

declare function getAttribute(id: ElementId, attribute: string): any

declare function setAttribute(id: ElementId, attribute: "scrollTop", value: any): void

declare function setSelectionRange(id: ElementId, start: number, end: number): void