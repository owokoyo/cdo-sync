import * as vscode from "vscode";

import { createFile, readFile } from "../functions/fs";
import getConfig from "../functions/getConfig";

async function setCookie() {
  const config = await getConfig();
  if (config) {
    const cookie = await vscode.window.showInputBox({
      placeHolder: "Cookie",
      ignoreFocusOut: true,
    });
    if (!cookie) {
      vscode.window.showErrorMessage("Must specify user cookie.");
      return;
    }
    const configJSON = JSON.parse(readFile("cdo-sync-config.json")!);
    configJSON.cookie = cookie;
    createFile("cdo-sync-config.json", JSON.stringify(configJSON, null, 1));
  }
}

async function setId() {
  const config = await getConfig();
  if (config) {
    const channelId = await vscode.window.showInputBox({
      placeHolder: "Channel Id",
      ignoreFocusOut: true,
    });
    if (!channelId) {
      vscode.window.showErrorMessage("Must specify channel id.");
      return;
    }
    const configJSON = JSON.parse(readFile("cdo-sync-config.json")!);
    configJSON.channelId = channelId;

    const metadata = JSON.parse(readFile("internal/metadata.json")!);
    metadata.channelId = channelId;

    createFile("cdo-sync-config.json", JSON.stringify(configJSON, null, 1));
    createFile("internal/metadata.json", JSON.stringify(metadata, null, 1));
  }
}

export { setCookie, setId };
