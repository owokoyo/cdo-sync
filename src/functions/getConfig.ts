import { basename, dirname } from "path";
import * as vscode from "vscode";
import { readFile } from "./fs";
import { compilerType, config, projectType } from "./types";
import { Uri } from "vscode";
import * as fs from "fs";
async function getConfig() {
  const file = (await vscode.workspace.findFiles("cdo-sync-config.json"))[0];
  if (file) {
    return {
      rootPath: dirname(file.fsPath),
      ...JSON.parse(fs.readFileSync(file.fsPath).toString()),
    } as config & { rootPath: string };
  } else {
    vscode.window.showErrorMessage(
      "Project configuration file not found. (cdo-sync-config.json). Initialize using cdo-sync.init"
    );
  }
}

export default getConfig;
