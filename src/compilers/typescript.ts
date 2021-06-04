import * as fs from "fs";
import { exec } from "child_process";
import { createFile, readFile } from "../functions/fs";
import * as vscode from "vscode";

function transform(file: string, rootPath: string) {
  exec(
    "cd " +
      __dirname +
      "\nnpx tsc " +
      rootPath +
      "/" +
      file +
      " --out " +
      rootPath +
      "/out/out.js"
  );
  return readFile(rootPath + "/out/out.js");
}

function watch(rootPath: string, update: (newCode: string) => void) {
  let last = "";
  const process = exec(
    "cd " +
      __dirname +
      "\nnpx tsc -w " +
      rootPath +
      "/workspace/main.ts --out " +
      rootPath +
      "/out/out.js"
  );
  if (process) {
    process.stdout?.on("data", (data) => {
      console.log(`Received chunk ${data}`);
    });
  }

  const watcher = fs.watch(rootPath + "/out/out.js", {}, (event) => {
    const newCode = readFile("out/out.js");
    if (newCode && last !== newCode) {
      update(newCode);
      last = newCode;
    }
  });
  vscode.window.showInformationMessage("Typescript Compiler: Watching");
  function close() {
    process.kill();
    watcher.close();
  }
  return close;
}

export { transform, watch };
