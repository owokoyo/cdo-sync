import * as vscode from "vscode";
import * as fs from "fs";
const wsedit = new vscode.WorkspaceEdit();

function getRootPath() {
  if (vscode.workspace.workspaceFolders) {
    const wsPath = vscode.workspace.workspaceFolders[0].uri.fsPath; // gets the path of the first workspace folder
    return wsPath;
  } else {
    vscode.window.showErrorMessage("No workspace found");
  }
}

function createFile(path: string, content: string) {
  const root = getRootPath();
  if (!root) {
    return;
  }

  fs.writeFileSync(root + "/" + path, content);
}

function createDirectory(path: string) {
  const root = getRootPath();
  if (!root) {
    return;
  }
  fs.mkdirSync(root + "/" + path, { recursive: true });
}

function readFile(path: string) {
  const root = getRootPath();
  if (!root) {
    return;
  }
  return fs.readFileSync(root + "/" + path).toString();
}

export { createFile, createDirectory, readFile };
