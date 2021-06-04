type HttpStatusCode = string;
type storageValue = boolean | number | string | undefined | null
type recordTerm = {[s: string]: storageValue};
type recordObject = {id: number} & recordTerm;
type mime = string;
type ElementId = string;
type ScreenId = string;
type ImgData = {data: number[], width: number, height: number}
type ChartOptions = {bars?: "vertical" | "horizontal", title?: string, colors?: string[], legend?: {position?: "static" | "relative" | "fixed" | "absolute" | "sticky"}}

 //other stuff
function readRecords<search extends recordTerm>(table: string, terms: Partial<search & recordObject>, callback: (results: (search & recordObject)[])=>void): void
function readRecordsSync<search extends recordTerm>(table: string): (search & recordObject)[]

function createRecord<created extends recordTerm>(table: string, record: created, callback: (result: (created & recordObject))=>void): void
function createRecordSync<created extends recordTerm>(table: string, record: created): (created & recordObject)

function updateRecord<updated extends recordTerm>(table: string, record: updated & recordObject, callback: (result:(updated & recordObject))=>void): void
function updateRecordSync<updated extends recordTerm>(table: string, record: updated & recordObject): (updated & recordObject)

function deleteRecord<deleted extends recordTerm>(table: string, record: Partial<deleted & recordObject>, callback: (result: (deleted & recordObject))=>void): void
function deleteRecordSync<deleted extends recordTerm>(table: string, record: Partial<deleted & recordObject>): (deleted & recordObject)

function onRecordEvent<updated extends recordTerm>(table: string, callback: (updated: (updated & recordObject), type: "create" | "update" | "delete")=>void): void

function startWebRequest(url: string, callback:(status: HttpStatusCode, type: mime, content: string)=>void): void
function startWebRequestSync(url: string): string

function setKeyValue(key: string, value: recordTerm, callback?: (result: storageValue)=>void);
function setKeyValueSync(key: string, value: recordTerm): storageValue;

function getKeyValue(key: string, callback?: (result: storageValue)=>void);
function getKeyValueSync(key: string): storageValue;

function playSound(url: string, loop: true | false, loaded: ()=>void): void