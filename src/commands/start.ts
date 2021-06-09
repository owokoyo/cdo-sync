import * as fs from "fs";
import { watch } from "../compilers/compile";
import getConfig from "../functions/getConfig";
import { debounce } from "debounce";
import {
  Anim,
  syncMetadata,
  syncSource,
  updateAnimations,
} from "../functions/sync";
import { getCSRF, uploadFileAsAnimation } from "../functions/request";
import state from "../functions/state";
import * as vscode from "vscode";
import { readFile } from "../functions/fs";
import { v4 as uuid } from "uuid";
import imageSize from "image-size";
import transformAnimations from "../functions/transformAnimations";

export default async function startInWatch() {
  const config = await getConfig();
  if (config) {
    //stops any pre-existing listeners
    state.closeWatcher(true);

    const process = watch(config);

    const csrf = await getCSRF(config.channelId, config.cookie);
    const sourceWatcher = fs.watch(
      config.rootPath + "/internal/source.json",
      debounce(function () {
        syncSource(csrf);
      }, 200)
    );
    const metadataWatcher = fs.watch(
      config.rootPath + "/internal/metadata.json",
      debounce(function () {
        syncMetadata(csrf);
      }, 200)
    );

    let specialWatcher: fs.FSWatcher;

    if (config.projectType === "gamelab") {
      //a single debounce for every file will leave some unincluded if they are all imported at once
      const debounces: {
        [s: string]: (() => void) & { clear(): void } & { flush(): void };
      } = {};
      debounces["animations.json"] = debounce(function () {
        updateAnimations(
          transformAnimations(
            JSON.parse(readFile("animations/animations.json")!),
            config
          )
        );
      }, 200);
      debounces["animations.json"]();

      specialWatcher = fs.watch(
        config.rootPath + "/animations",
        function (event, fileName) {
          if (!debounces[fileName] && fileName !== ".DS_STORE") {
            if (fileName === "animations.json") {
              //ee
            } else {
              debounces[fileName] = debounce(function () {
                uploadFileAsAnimation(
                  config.rootPath + "/animations/" + fileName,
                  fileName,
                  csrf,
                  config.channelId,
                  config.cookie
                );
              }, 200);
            }
          }
          if (readFile("animations/" + fileName)) {
            debounces[fileName]();
          } else {
            vscode.window.showInformationMessage(
              fileName + " appears to have been deleted"
            );
          }
        }
      );
    } else if (config.projectType === "applab") {
      specialWatcher = fs.watch(
        config.rootPath + "/workspace/design.html",
        debounce(function () {
          const newHtml = readFile("workspace/design.html");
          if (newHtml) {
            const source = JSON.parse(readFile("internal/source.json")!);
            source.html = newHtml;
          } else {
            vscode.window.showErrorMessage("Cannot find workspace/design.html");
          }
        }, 200)
      );
    }

    const preview = vscode.window.createWebviewPanel("prview", "Code.org Preview", vscode.ViewColumn.Two, {
      enableScripts: true
    });
    preview.webview.html =
      `
          <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Code.org Preview</title>
        <script>
        function reload(){
          document.getElementById("reloadContainer").innerHTML = ''
          document.getElementById("reloadContainer").innerHTML = '<iframe sandbox="allow-same-origin allow-scripts allow-popups allow-forms" width="432" height="757" style="border: 0px;" src="https://studio.code.org/projects/${config.projectType}/${config.channelId}/embed"></iframe>'
          //document.getElementById("reloadBtn").style = "display: none"
        }
        window.addEventListener("message", (event)=>{
          if (event.data === "reload"){
            document.getElementById("reloadBtn").style = ""
          }
        })
      </script>
    </head>
    <body>
    <div id = "reloadContainer" style = "height: ${config.projectType === "gamelab" ? 400 : 700}px; overflow: hidden"></div>
    <button id="reloadBtn" style = "display: none"; onClick = "reload()">Reload</button> <div style="color: #FFF">Click the screen to run the project.</div>
    <script>
    reload();
    </script>
    </body>
    </html>
    `;

    state.sourceUpdatedCallback = function () {
      preview.webview.postMessage("reload");
    };

    let isClosed = false;
    function close(hideWarning?: true) {
      if (isClosed) {
        if (!hideWarning) {
          vscode.window.showWarningMessage("File watchers are already closed.");
        }
        return;
      }
      specialWatcher.close();
      process.close();
      sourceWatcher.close();
      metadataWatcher.close();
      vscode.window.showInformationMessage("(Hopefully) closed all watchers.");
      isClosed = true;
      state.watcherOpen = false;
    }
    state.watcherOpen = true;
    state.closeWatcher = close;
  }
}
