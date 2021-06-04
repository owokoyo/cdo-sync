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
function getValue(ex){
    let r;
    console.log(ex)
    try {
        eval("r ="+ex)
    } catch(e) {
        r = ex
    }
    return r
}
function fix(v){
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

function onEvent(id: ElementId, type: "click" | "change" | "keyup" | "keydown" | "keypress" | "mousemove" | "mousedown" | "mouseup" | "mouseover" | "mouseout" | "input", callback: function): void

function button(id: ElementId, text: string): void

function textInput(id: ElementId, text: string): void

function textLabel(id: ElementId, text: string): void

function dropdown(id: ElementId, option1: string, etc: string): void

function getText(id: ElementId): string

function setText(id: ElementId, text: string): void

function getNumber(id: ElementId): number

function setNumber(id: ElementId, number: number): void

function checkbox(id: ElementId, checked: true | false): void

function radioButton(id: ElementId, checked: true | false): void

function getChecked(id: ElementId): boolean

function setChecked(id: ElementId, checked: true | false): void

function image(id: ElementId, url: string): void

function getImageURL(id: ElementId): string

function setImageURL(id: ElementId, url: string): void

//function playSound(url: string, loop: true | false): void

function stopSound(url: string): void

function playSpeech(text: string, gender: "female" | "male", language: "العربية" | "български" | "Català" | "Čeština" | "Dansk" | "Deutsch" | "Ελληνικά" | "English (UK)" | "English" | "Español (España)" | "Español (LATAM)" | "Eesti" | "Suomi" | "Français" | "Gaeilge" | "हिन्दी" | "Hrvatski" | "Magyar" | "Bahasa Indonesia" | "Italiano" | "日本語" | "한국어" | "Lietuvių" | "Latviešu" | "بهاس ملايو" | "Malti" | "Nederlands" | "Polski" | "Português (Brasil)" | "Português (Portugal)" | "Română" | "Pусский" | "Slovenčina" | "Slovenščina" | "Svenska" | "தமிழ்" | "తెలుగు" | "ภาษาไทย" | "Türkçe" | "Українська" | "اردو" | "Tiếng Việt" | "简体字" | "繁體字"): void

function showElement(id: ElementId): void

function hideElement(id: ElementId): void

function deleteElement(id: ElementId): void

function setPosition(id: ElementId, x: number, y: number, width: number, height: number): void

function setSize(id: ElementId, width: number, height: number): void

function setProperty(id: ElementId, property: string, value: any): void

function getProperty(id: ElementId, property: string): any

function write(text: string): void

function getXPosition(id: ElementId): number

function getYPosition(id: ElementId): number

function setScreen(screenId: ScreenId): void

function rgb(r: number, g: number, b: number, a: number): string

function open(url: string): void

function createCanvas(id: ElementId, width: number, height: number): void

function setActiveCanvas(id: ElementId): void

function line(x1: number, y1: number, x2: number, y2: number): void

function circle(x: number, y: number, radius: number): void

function rect(x: number, y: number, width: number, height: number): void

function setStrokeWidth(width: number): void

function setStrokeColor(color: string): void

function setFillColor(color: string): void

function drawImage(id: ElementId, x: number, y: number): void

function drawImageURL(url: string): void

function getImageData(x: number, y: number, width: number, height: number): ImgData

function putImageData(imgData: ImgData, x: number, y: number): void

function clearCanvas(): void

function getRed(imgData: ImgData, x: number, y: number): number

function getGreen(imgData: ImgData, x: number, y: number): number

function getBlue(imgData: ImgData, x: number, y: number): number

function getAlpha(imgData: ImgData, x: number, y: number): number

function setRed(imgData: ImgData, x: number, y: number, r: number): void

function setGreen(imgData: ImgData, x: number, y: number, g: number): void

function setBlue(imgData: ImgData, x: number, y: number, b: number): void

function setAlpha(imgData: ImgData, x: number, y: number, a: number): void

function setRGB(imgData: ImgData, x: number, y: number, r: number, g: number, b: number): void

function getColumn(table: string, column: string): void

/*
function startWebRequest(url: string, callback: function): void

function startWebRequestSync(url: string): void

function setKeyValue(key: string, value: string, callback: function): void

function setKeyValueSync(key: string, value: string): void

function getKeyValue(key: string, callback: function): void

function getKeyValueSync(key: string): void

function createRecord(table: string, record: object, callback: function): void

function createRecordSync(table: string, record: object): void

function readRecords(table: string, terms: object, callback: function): void

function readRecordsSync(table: string): void

function updateRecord(table: string, record: object, callback: function): void

function updateRecordSync(table: string, record: object): void

function deleteRecord(table: string, record: object, callback: function): void

function deleteRecordSync(table: string, record: object): void

function onRecordEvent(table: string, callback: function): void
*/

function getUserId(): string

function drawChart(chartId: ElementId, chartType: "bar" | "line" | "pie" | "scatter", chartData: recordTerm[], options?: ChartOptions, callback?: ()=>void): void

function drawChartFromRecords(chartId: ElementId, chartType: "bar" | "line" | "pie" | "scatter", tableName: string, columns: string[], options?: ChartOptions, callback?: ()=>void): void

function moveForward(pixels: number): void

function moveBackward(pixels: number): void

function move(x: number, y: number): void

function moveTo(x: number, y: number): void

function dot(radius: number): void

function turnRight(angle: number): void

function turnLeft(angle: number): void

function turnTo(angle: number): void

function arcRight(angle: number, radius: number): void

function arcLeft(angle: number, radius: number): void

function getX(): number

function getY(): number

function getDirection(): number

function penUp(): void

function penDown(): void

function penWidth(width: number): void

function penColor(color: string): void

function penRGB(r: number, g: number, b: number): void

function show(): void

function hide(): void

function speed(value: number): void

function setTimeout(callback: ()=>void, ms: number): number

function clearTimeout(id: number): void

function setInterval(callback: ()=>void, ms: number): number

function clearInterval(id: number): void

function timedLoop(ms: number, callback: ()=>void): number

function stopTimedLoop(id?: number): void

function insertItem(list: [], index: number, item: any): void

function appendItem(list: [], item: any): void

function removeItem(list: [], index: number): void

function imageUploadButton(id: ElementId, text: string): void

function container(id: ElementId, text: string): void

function innerHTML(id: ElementId, html: string): void

function setParent(id: ElementId, parent: ElementId): void

function setStyle(id: ElementId, style: string): void

function getAttribute(id: ElementId, attribute: string): any

function setAttribute(id: ElementId, attribute: "scrollTop", value: any): void

function setSelectionRange(id: ElementId, start: number, end: number): void