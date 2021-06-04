import * as babel from "@babel/core";
import * as fs from "fs";
import { window } from "vscode";
import { createFile, readFile } from "../functions/fs";
import { updateSourceFile } from "../functions/sync";

function transform(file: string, rootPath: string) {
  return new Promise<string>((res, rej) => {
    babel.transform(
      fs.readFileSync(rootPath + "/" + file).toString(),
      {
        presets: ["@babel/preset-env"],
      },
      function (e, f) {
        if (f && f.code) {
          res(f.code);
        } else {
          window.showErrorMessage("Babel: Failed to compile.");
        }
      }
    );
  });
}

function watch(rootPath: string, update: (newCode: string) => void) {
  let last = "";
  const watcher = fs.watch(rootPath + "/workspace/main.js", {}, async () => {
    const newCode = await transform("workspace/main.js", rootPath);
    if (newCode && last !== newCode) {
      update(newCode);
      last = newCode;
    }
  });
  function close() {
    watcher.close();
  }
  return close;
}

export { transform, watch };
