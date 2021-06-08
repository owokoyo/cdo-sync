type HttpStatusCode = string;
type storageValue = boolean | number | string | undefined | null
type recordTerm = { [s: string]: storageValue };
type recordObject = { id: number } & recordTerm;
type mime = string;
type ElementId = string;
type ScreenId = string;
type ImgData = { data: number[], width: number, height: number }
type ChartOptions = { bars?: "vertical" | "horizontal", title?: string, colors?: string[], legend?: { position?: "static" | "relative" | "fixed" | "absolute" | "sticky" } }

//other stuff
declare function readRecords<search extends recordTerm>(table: string, terms: Partial<search & recordObject>, callback: (results: (search & recordObject)[]) => void): void
declare function readRecordsSync<search extends recordTerm>(table: string): (search & recordObject)[]

declare function createRecord<created extends recordTerm>(table: string, record: created, callback: (result: (created & recordObject)) => void): void
declare function createRecordSync<created extends recordTerm>(table: string, record: created): (created & recordObject)

declare function updateRecord<updated extends recordTerm>(table: string, record: updated & recordObject, callback: (result: (updated & recordObject)) => void): void
declare function updateRecordSync<updated extends recordTerm>(table: string, record: updated & recordObject): (updated & recordObject)

declare function deleteRecord<deleted extends recordTerm>(table: string, record: Partial<deleted & recordObject>, callback: (result: (deleted & recordObject)) => void): void
declare function deleteRecordSync<deleted extends recordTerm>(table: string, record: Partial<deleted & recordObject>): (deleted & recordObject)

declare function onRecordEvent<updated extends recordTerm>(table: string, callback: (updated: (updated & recordObject), type: "create" | "update" | "delete") => void): void

declare function startWebRequest(url: string, callback: (status: HttpStatusCode, type: mime, content: string) => void): void
declare function startWebRequestSync(url: string): string

declare function setKeyValue(key: string, value: recordTerm, callback?: (result: storageValue) => void);
declare function setKeyValueSync(key: string, value: recordTerm): storageValue;

declare function getKeyValue(key: string, callback?: (result: storageValue) => void);
declare function getKeyValueSync(key: string): storageValue;

declare function playSound(url: string, loop: true | false, loaded: () => void): void