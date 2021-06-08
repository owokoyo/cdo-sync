import * as vscode from "vscode";
import getConfig from "../functions/getConfig";
import { getLibrary, getLibraryVersions } from "../functions/request";
import { transformLibraries } from "../functions/sync";
import { library } from "../functions/types";

export default async function updateProject() {
  const config = await getConfig();
  if (config) {
    let libraryType = (await vscode.window.showQuickPick(
      ["Import ID", "Built-In Libraries"],
      {
        placeHolder: "Library Type",
        ignoreFocusOut: true,
      }
    ));
    if (libraryType === "Import ID") {
      const channelId = await vscode.window.showInputBox({
        placeHolder: "Library/Channel Id",
        ignoreFocusOut: true,
      });
      if (!channelId) {
        return vscode.window.showErrorMessage("Must specify a channel.");
      }
      const versions = await getLibraryVersions(channelId);
      const versionsArray = versions.map((v) => { return `${v.versionId} (${v.lastModified})`; });

      let libraryVersion = (await vscode.window.showQuickPick(
        ["@latest", ...versionsArray],
        {
          placeHolder: "Library Version",
          ignoreFocusOut: true,
        }
      ));

      let library: library;
      if (libraryVersion === "@latest") {
        library = await getLibrary(channelId);
      } else if (libraryVersion && libraryVersion.match(/(.+?) \(/)![1] in versionsArray) {
        library = await getLibrary(channelId, libraryVersion.match(/(.+?) \(/)![1]);
      } else {
        return vscode.window.showErrorMessage("Not a valid version id.");
      }
      transformLibraries((libs) => {
        const libLength = libs.length;
        libs.filter(val => val.channelId === channelId);
        if (libLength !== libs.length) {
          vscode.window.showWarningMessage(`Library ${library.name} (${channelId}) already exists. Replacing.`);
        }
        libs.push(library);
        return libs;
      });
    } else if (libraryType === "Built-In Libraries") {

    } else {
      vscode.window.showErrorMessage("Not valid library type.");
    }
  }
}
