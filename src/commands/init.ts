import * as vscode from "vscode";
import createProject from "../functions/createProject";
import { createDirectory, createFile } from "../functions/fs";
import { getCSRF, getMetadata, getSource } from "../functions/request";
import { compilerType, projectType } from "../functions/types";

export default async function initProject() {
  const channelId = await vscode.window.showInputBox({
    placeHolder: "Channel Id",
    ignoreFocusOut: true,
  });
  if (!channelId) {
    vscode.window.showErrorMessage("Must specify channel id.");
    return;
  }

  let cookie = await vscode.window.showInputBox({
    placeHolder: "_learn_session cookie value",
    ignoreFocusOut: true,
  });

  if (!cookie) {
    vscode.window.showErrorMessage("Must specify _learn_session.");
    return;
  }
  cookie = "_learn_session=" + cookie;

  let compilerType = (await vscode.window.showQuickPick(
    ["typescript", "babel", "none"],
    {
      placeHolder: "Compiler Type. Typescript: TS, Babel: ES6, None: ES5",
      ignoreFocusOut: true,
    }
  )) as compilerType;

  if (!compilerType) {
    compilerType = "none";
  }

  //const csrf = await getCSRF(channelId, cookie);

  const metadata = await getMetadata(channelId);
  const source = await getSource(channelId);
  const projectType = JSON.parse(metadata).projectType;

  createProject(compilerType, cookie, projectType, channelId, metadata, source);
  vscode.window.showInformationMessage("Project has been initialized.");
}
