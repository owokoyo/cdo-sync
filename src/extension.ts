// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";
import addLibrary from "./commands/addLibrary";

import initProject from "./commands/init";
import removeLibrary from "./commands/removeLibrary";
import { setAuth, setId } from "./commands/setConfigItem";
import startInWatch from "./commands/start";
import closeWatcher from "./commands/stop";
import syncAnimations from "./commands/syncAnimations";
import updateProject from "./commands/update";
import { syncMetadata, updateAndSyncSource } from "./functions/sync";

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated

  // The command has been defined in the package.json file
  // Now provide the implementation of the command with registerCommand
  // The commandId parameter must match the command field in package.json
  context.subscriptions.push(
    vscode.commands.registerCommand("cdo-sync.init", initProject)
  );

  context.subscriptions.push(
    vscode.commands.registerCommand("cdo-sync.update", updateProject)
  );

  context.subscriptions.push(
    vscode.commands.registerCommand("cdo-sync.syncSource", updateAndSyncSource)
  );

  context.subscriptions.push(
    vscode.commands.registerCommand("cdo-sync.syncAnimations", syncAnimations)
  );

  context.subscriptions.push(
    vscode.commands.registerCommand("cdo-sync.syncMetadata", syncMetadata)
  );

  context.subscriptions.push(
    vscode.commands.registerCommand("cdo-sync.setAuth", setAuth)
  );
  context.subscriptions.push(
    vscode.commands.registerCommand("cdo-sync.setId", setId)
  );

  context.subscriptions.push(
    vscode.commands.registerCommand("cdo-sync.start", startInWatch)
  );
  context.subscriptions.push(
    vscode.commands.registerCommand("cdo-sync.stop", closeWatcher)
  );
  context.subscriptions.push(
    vscode.commands.registerCommand("cdo-sync.addLibrary", addLibrary)
  );
  context.subscriptions.push(
    vscode.commands.registerCommand("cdo-sync.removeLibrary", removeLibrary)
  );
}

// this method is called when your extension is deactivated
export function deactivate() { }
