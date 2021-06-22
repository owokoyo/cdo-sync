import * as fs from "fs";
import { exec } from "child_process";
import { createFile, readFile } from "../functions/fs";
import * as vscode from "vscode";
import babel from "@babel/core";

function transform(file: string, rootPath: string) {

  exec(
    "cd " +
    __dirname +
    "\nnpx tsc --jsx react --jsxFactory Nomx.create --skipLibCheck -t es5" +
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

  let fileExt = "ts"
  if (fs.existsSync(rootPath+"/workspace/main.tsx")) {
    fileExt = "tsx";
  }

  const process = exec(
    "cd " +
    __dirname +
    "\nnpx tsc --jsx react --jsxFactory Nomx.create --skipLibCheck -t es5 -w " +
    rootPath +
    `/workspace/main.${fileExt} --out ` +
    rootPath +
    "/out/out.js"
  );
  if (process) {
    process.stdout?.on("data", (data) => {
      console.log(`Received chunk ${data}`);
    });
  }



  let last = "";
  const watcher = fs.watch(rootPath + "/out/out.js", {}, (event) => {
    const newCode = readFile("out/out.js");
    if (newCode && last !== newCode) {
      update(newCode);
      last = newCode;
    }
  });

  vscode.window.showInformationMessage(`Typescript Compiler: Watching (${fileExt.toUpperCase()})`);
  function close() {
    process.kill();
    watcher.close();
  }
  return close;
}

export { transform, watch };
