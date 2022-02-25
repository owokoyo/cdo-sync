import * as fs from "fs";
import { exec } from "child_process";
import { createFile, readFile } from "../functions/fs";
import * as vscode from "vscode";

import path, { dirname, join } from "path";

const extPath = dirname(dirname(__dirname));
const tscPath = escape(join(extPath, "node_modules", ".bin", "tsc"));

function escape(str: string){
  return str.replace(" ", "\\");
}

function transform(file: string, rootPath: string) {
  exec(`${tscPath} --project ${escape(rootPath)}`);

  return readFile(join("out", "main.js"));
}


function watch(rootPath: string, update: (newCode: string) => void) {

//vscode.window.showErrorMessage("You shouldn't put spaces in your workspace folders you sussy baka, ");


  /*
  tsc.compile({jsx: "react", watch:true, jsxFactory: "Nomx.create", skipLibCheck: true, target: "es5", project: join(rootPath, "main."+fileExt), out: join(rootPath, "out", "out.js")}).then(()=>{
    console.log(readFile("/out/out.js"))
  });
  */
  
  const process = exec(`${tscPath} -w --project ${escape(rootPath)}`);
  
  if (process) {
    process.stdout?.on("data", (data) => {
      console.log(`Received chunk ${data}`);
    });
  }

  fs.writeFileSync(rootPath+"/out/main.js", "// waiting until watch makes cool stuff happen");

  let last = "";
  const watcher = fs.watch(rootPath + "/out/main.js", {}, (event) => {
    const newCode = readFile("out/main.js");
    if (newCode && last !== newCode) {
      update(newCode);
      last = newCode;
    }
  });


  vscode.window.showInformationMessage(`Typescript Compiler: Watching`);
  function close() {
    process.kill();
    watcher.close();
  }
  return close;
}

export { transform, watch };
