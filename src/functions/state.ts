import { window } from "vscode";

export default {
  closeWatcher: (hideWarning?: true) => {
    if (!hideWarning) {
      window.showWarningMessage("File watchers are already closed.");
    }
  },
};
