import { join } from "path";
import * as vscode from "vscode";
import { createFile, readFile } from "./fs";
import getConfig from "./getConfig";
import * as request from "./request";
import { compile } from "../compilers/compile";
import { config } from "./types";

async function syncSource(csrf?: string) {
  const config = await getConfig();
  if (config) {
    if (!csrf) {
      csrf = await request.getCSRF(config.channelId, config.cookie);
    }
    const source = readFile(join("internal", "source.json"))!;
    request.syncSource(source, csrf, config.channelId, config.cookie);
  }
}

async function syncMetadata(csrf?: string) {
  const config = await getConfig();
  if (config) {
    if (!csrf) {
      csrf = await request.getCSRF(config.channelId, config.cookie);
    }
    const metadata = readFile(join("internal", "metadata.json"))!;
    request.syncMetadata(metadata, csrf, config.channelId, config.cookie);
  }
}

async function updateAndSyncSource() {
  const config = await getConfig();
  if (config) {
    const compiledCode = await compile(
      join(
        "workspace",
        config.compilerType === "typescript" ? "main.ts" : "main.js"
      ),
      config
    );
    updateSourceFile(compiledCode, config);
    syncSource();
  }
}

async function updateSourceFile(compiledCode: string, config: config) {
  const source = JSON.parse(readFile(join("internal", "source.json"))!);

  source.source = compiledCode;
  createFile(join("internal", "source.json"), JSON.stringify(source));
}

export { syncSource, syncMetadata, updateAndSyncSource, updateSourceFile };
