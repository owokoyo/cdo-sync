import { readdirSync } from "fs";
import getConfig from "../functions/getConfig";
import { getCSRF, uploadFileAsAnimation } from "../functions/request";

async function syncAnimations() {
  const config = await getConfig();
  if (config && config.projectType === "gamelab") {
    const csrf = await getCSRF(config.channelId, config.cookie);
    readdirSync(config.rootPath + "/animations").forEach((fileName) => {
      if (fileName === ".DS_STORE" || fileName === "animations.json") {
        return;
      }
      uploadFileAsAnimation(
        config.rootPath + "/animations/" + fileName,
        fileName,
        csrf,
        config.channelId,
        config.cookie
      );
    });
  }
}
export default syncAnimations;
