import * as vscode from "vscode";
import { readFile } from "../functions/fs";
import getConfig from "../functions/getConfig";
import { getLibrary, getLibraryVersions } from "../functions/request";
import { transformLibraries } from "../functions/sync";
import { library } from "../functions/types";

export default async function removeLibrary() {
  const config = await getConfig();
  if (config) {
    const source = JSON.parse(readFile("internal/source.json")!);
    if (Array.isArray(source.libraries)) {
      const libraries = source.libraries.map((l: library, index: number) => {
        return `[${index}] ${l.name} (${l.description})`;
      });
      const result = await vscode.window.showQuickPick(libraries);
      if (result) {
        transformLibraries((lib) => {
          lib.splice(libraries.indexOf(result), 1);
          return lib;
        });
        vscode.window.showInformationMessage(`Removed "${source.libraries[libraries.indexOf(result)].name}"`);
      } else {
        vscode.window.showErrorMessage("Not valid library");
      }
    } else {
      vscode.window.showErrorMessage("No libraries to remove");
    }

  }
}