import { window } from "vscode";

export default {
  watcherOpen: false,
  closeWatcher: (hideWarning?: true) => {
    if (!hideWarning) {
      window.showWarningMessage("File watchers are already closed.");
    }
  },
};
