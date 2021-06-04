import * as fs from "fs";
import { readFile } from "../functions/fs";
import * as vscode from "vscode";

function transform(s: string) {
  return s;
}

function watch(rootPath: string, update: (newCode: string) => void) {
  let last = "";
  const watcher = fs.watch(rootPath + "/workspace/main.js", {}, () => {
    const newCode = readFile("out/out.js");
    if (newCode && last !== newCode) {
      update(newCode);
      last = newCode;
    }
  });
  vscode.window.showInformationMessage("Watching (Compiler: None)");
  function close() {
    watcher.close();
  }
  return close;
}

export { transform, watch };
