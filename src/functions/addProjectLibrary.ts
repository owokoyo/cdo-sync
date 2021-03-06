import { fstat, readFileSync } from "fs";
import { readFile } from "fs-extra";
import { dirname } from "path";
import * as vscode from "vscode";
import { transformLibraries } from "./sync";
import { library } from "./types";

export default function addProjectLibrary(library: library) {
	transformLibraries((libs) => {
		const libLength = libs.length;
		libs = libs.filter(val => val.channelId !== library.channelId);
		if (libLength !== libs.length) {
			vscode.window.showWarningMessage(`Library ${library.name} (${library.channelId}) already exists. Replacing.`);
		}
		vscode.window.showInformationMessage(`Added ${library.name}!`);
		if (library.codeLink) {
			library.code = readFileSync(dirname(dirname(__dirname))+"/resources/libraries/"+library.codeLink).toString();
		}
		if (library.code) {
			library.source = `}); ${library.code}\n !(function(){0`
			delete library.code;
		}
		libs.push(library);
		return libs;
	});
}