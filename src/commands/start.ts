import * as fs from "fs";
import { watch } from "../compilers/compile";
import getConfig from "../functions/getConfig";
import { debounce } from "debounce";
import { syncMetadata, syncSource } from "../functions/sync";
import { getCSRF } from "../functions/request";
import state from "../functions/state";
import { window } from "vscode";

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

    let isClosed = false;
    function close(hideWarning?: true) {
      if (isClosed) {
        if (!hideWarning) {
          window.showWarningMessage("File watchers are already closed.");
        }
        return;
      }
      process.close();
      sourceWatcher.close();
      metadataWatcher.close();
      window.showInformationMessage("(Hopefully) closed all watchers.");
      isClosed = true;
    }
    state.closeWatcher = close;
  }
}
