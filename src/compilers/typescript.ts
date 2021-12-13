import * as fs from "fs";
import { exec } from "child_process";
import { createFile, readFile } from "../functions/fs";
import * as vscode from "vscode";

import path, { dirname, join } from "path";

const tscPath = join("node_modules", ".bin", "tsc");
const extPath = dirname(dirname(__dirname));

function escape(str: string){
  return str.replace(" ", "\\");
}

function transform(file: string, rootPath: string) {
  console.log(rootPath);
  

  exec(
    "cd " +
    extPath +
    "\n" + tscPath + " --jsx react --jsxFactory Nomx.create --skipLibCheck -t es5" +
    escape(rootPath) +
    path.sep +
    escape(file) +
    " --out " +
    join(escape(rootPath), "out", "out.js").replace(" ","\\ ")
  );
  return readFile(join("out", "out.js"));
}


function watch(rootPath: string, update: (newCode: string) => void) {

//vscode.window.showErrorMessage("You shouldn't put spaces in your workspace folders you sussy baka, ");


  let fileExt = "ts";
  if (fs.existsSync(rootPath+"/workspace/main.tsx")) {
    fileExt = "tsx";
  }
  /*
  tsc.compile({jsx: "react", watch:true, jsxFactory: "Nomx.create", skipLibCheck: true, target: "es5", project: join(rootPath, "main."+fileExt), out: join(rootPath, "out", "out.js")}).then(()=>{
    console.log(readFile("/out/out.js"))
  });
  */
  
  const process = exec(
    `cd ${extPath}` +
    "\n" + tscPath + " --jsx react --jsxFactory Nomx.create --skipLibCheck -t es5 -w " +
    join(escape(rootPath), `workspace`, `main.${fileExt}`) +
    ` --out ${join(escape(rootPath), "out", "out.js")}`
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
