import * as vscode from "vscode";
import { createFile, createDirectory } from "./fs";
import tsconfig from "../resources/_tsconfig.json";
import { compilerType, projectType } from "./types";
import * as fsExtra from "fs-extra";
import path = require("path");
import { Anim } from "./sync";
function createProject(
  compilerType: compilerType,
  cookie: string,
  projectType: projectType,
  channelId: string,
  metadata: string,
  source: string
) {
  createFile(
    "cdo-sync-config.json",
    JSON.stringify(
      {
        compilerType,
        cookie,
        projectType,
        channelId,
      },
      null,
      1
    )
  );
  createFile(
    ".vsls.json",
    JSON.stringify(
      {
        excludeFiles: ["cdo-sync-config.json"],
      },
      null,
      1
    )
  );

  createDirectory("internal");

  let sourceJSON: {
    source: string;
    html?: string;
    animations?: { orderedKeys: string[]; propsByKey: { [s: string]: Anim } };
    generatedProperties: {};
    libraries: [];
    typescriptSource?: string;
  },
    metadataJSON;
  try {
    sourceJSON = JSON.parse(source);
  } catch (e) {
    if (projectType === "gamelab") {
      sourceJSON = {
        source: "",
        animations: { orderedKeys: [], propsByKey: {} },
        generatedProperties: {},
        libraries: [],
      };
    } else if (projectType === "applab" || true) {
      sourceJSON = {
        source: "",
        html: "",
        generatedProperties: {},
        libraries: [],
      };
    }
    vscode.window.showErrorMessage("Source was malformed. Attempting to fix.");
  }

  try {
    metadataJSON = JSON.parse(metadata);
  } catch (e) {
    metadataJSON = {};
    vscode.window.showErrorMessage("Metadata was malformed.");
  }
  let tssource: string | undefined;
  if (sourceJSON.typescriptSource) {
    tssource = sourceJSON.typescriptSource;
    delete sourceJSON.typescriptSource;
  }

  createFile("internal/metadata.json", JSON.stringify(metadataJSON, null, 1));
  createFile("internal/source.json", JSON.stringify(sourceJSON, null, 1));

  createDirectory("workspace");
  createDirectory("out");

  if (compilerType === "typescript") {
    createFile("out/out.js", "");
    if (tssource) {
      createFile("main.ts", tssource);
    } else {
      createFile(
        "workspace/main.ts",
        `/* As the source is written in javascript, it cannot be converted to typescript automatically.
	You will have to rewrite the code by manually adding type annotations to your program.
	The original javascript source has been written to main-old.js.
	Make sure to delete it when you are done.
*/`
      );
      createFile("workspace/main-old.js", sourceJSON.source);
    }
    createFile("tsconfig.json", JSON.stringify(tsconfig, null, 1));

    const wsPath = vscode.workspace.workspaceFolders![0].uri.fsPath; // gets the path of the first workspace folder

    fsExtra.copy(
      path.dirname(path.dirname(__dirname)) + "/types",
      wsPath + "/workspace/types"
    );
  } else {
    createFile("workspace/main.js", sourceJSON.source);
  }

  if (projectType === "gamelab") {
    createDirectory("animations");
    createFile(
      "animations/animations.json",
      JSON.stringify(
        (sourceJSON.animations!.orderedKeys as string[]).map((key) => {
          return { _id: key, ...sourceJSON.animations!.propsByKey[key] };
        }),
        null,
        1
      )
    );
  } else if (projectType === "applab") {
    createFile(
      "workspace/design.html",
      JSON.parse(source).html ||
      `<div id="designModeViz" class="appModern clip-content" tabindex="1" data-radium="true" style="width: 320px; height:
    450px;">
  <div class="screen" tabindex="1" data-theme="default" id="screen1" style="display: block; height: 450px; width: 320px;
      left: 0px; top: 0px; position: absolute; z-index: 0; ">
			Change the HTML in this project by going to <em>PROJECT/workspace/design.html</em>
    </div>
</div>`
    );
  }
}

export default createProject;
