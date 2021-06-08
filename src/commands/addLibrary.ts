import * as vscode from "vscode";
import addProjectLibrary from "../functions/addProjectLibrary";
import getConfig from "../functions/getConfig";
import { getLibrary, getLibraryVersions } from "../functions/request";
import { transformLibraries } from "../functions/sync";
import { library } from "../functions/types";
import libs from "../resources/libraries.json";

export default async function addLibrary() {
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
          placeHolder: `Library Version`,
          ignoreFocusOut: true,
        }
      ));

      let library: library;
      if (libraryVersion === "@latest") {
        library = await getLibrary(channelId);
      } else if (libraryVersion && libraryVersion in versionsArray) {
        library = await getLibrary(channelId, libraryVersion.match(/(.+?) \(/)![1]);
      } else {
        return vscode.window.showErrorMessage("Not a valid version id.");
      }
      addProjectLibrary(library);
    } else if (libraryType === "Built-In Libraries") {
      const libResult = await vscode.window.showQuickPick(Object.keys(libs));
      if (libResult) {
        const lib = (libs as { [s: string]: any })[libResult];
        if (lib.getChannelId) {
          addProjectLibrary(await getLibrary(lib.getChannelId));
        } else {
          addProjectLibrary(lib);
        }
      } else {
        return vscode.window.showErrorMessage("Not a valid built-in library.");
      }
    } else {
      vscode.window.showErrorMessage("Not valid library type.");
    }
  }
}
