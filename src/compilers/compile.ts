import * as none from "./none";
import * as typescript from "./typescript";
import * as babelCompiler from "./babel";
//import babel from "./babel";
import { config } from "../functions/types";
import { updateSourceFile } from "../functions/sync";
import { window } from "vscode";

async function compile(file: string, config: config) {
  let result;
  if (config.compilerType === "typescript") {
    result = typescript.transform(file, config.rootPath);
  } else if (config.compilerType === "babel") {
    result = babelCompiler.transform(file, config.rootPath);
  } else if (config.compilerType === "none") {
    result = none.transform(file); //aka result = code
  }

  if (!result) {
    window.showErrorMessage("Failed to compile code");
    return "";
  }
  return result;
}

function watch(config: config) {
  let close = () => {};
  if (config.compilerType === "typescript") {
    close = typescript.watch(config.rootPath, (newCode: string) => {
      updateSourceFile(newCode, config);
      //sync
    });
  } else if (config.compilerType === "babel") {
    close = babelCompiler.watch(config.rootPath, (newCode: string) => {
      updateSourceFile(newCode, config);
      //sync
    });
  } else if (config.compilerType === "none") {
    close = none.watch(config.rootPath, (newCode: string) => {
      updateSourceFile(newCode, config);
      //sync
    });
  }
  return { close };
}

export { compile, watch };
