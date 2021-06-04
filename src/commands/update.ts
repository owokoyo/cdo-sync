import * as vscode from "vscode";
import createProject from "../functions/createProject";
import { createDirectory, createFile, readFile } from "../functions/fs";
import getConfig from "../functions/getConfig";
import { getCSRF, getMetadata, getSource } from "../functions/request";
import state from "../functions/state";

export default async function updateProject() {
  if (state.watcherOpen) {
    vscode.window.showErrorMessage(
      "Stop the watcher first before retrieving the project as it may interfere."
    );
    return;
  }
  const config = await getConfig();
  if (config) {
    const metadata = await getMetadata(config.channelId);
    const source = await getSource(config.channelId);

    //having createProject overwrite pre-existing source essentially achieves the same functionality as updating it
    createProject(
      config.compilerType,
      config.cookie,
      config.projectType,
      config.channelId,
      metadata,
      source
    );

    vscode.window.showInformationMessage("Project has been updated.");
  }
}
