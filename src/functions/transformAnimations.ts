import imageSize from "image-size";
import { Anim } from "./sync";
import { v4 as uuid } from "uuid";
import { readFile } from "./fs";
import { config } from "./types";

function transformAnimations(animations_: any, config: config) {
  const animations: {
    orderedKeys: string[];
    propsByKey: { [s: string]: Anim };
  } = { orderedKeys: [], propsByKey: {} };
  animations_.forEach(function (anim: {
    isTemplate?: true;
    name: string;
    file?: string;
    sourceUrl?: string;
    frameSize?: { x: number; y: number };
    looping?: boolean;
    frameDelay?: number;
    frameCount?: number;
    _key?: string;
  }) {
    if (anim.isTemplate) {
      return;
    }

    const id = anim._key || uuid();
    animations.orderedKeys.push(id);
    const sourceUrl = anim.file
      ? `/v3/animations/${config.channelId}/${anim.file}`
      : anim.sourceUrl!;
    let size;
    if (anim.file) {
      const dimensions = imageSize(
        config.rootPath + "/animations/" + anim.file
      );
      size = {
        x: dimensions.width || 400,
        y: dimensions.height || 400,
      };
    }
    animations.propsByKey[id] = {
      name: anim.name,
      sourceUrl: sourceUrl,
      frameSize: anim.frameSize || size || { x: 400, y: 400 },
      frameCount: anim.frameCount || 1,
      looping: anim.looping || true,
      frameDelay: anim.frameDelay ? anim.frameDelay : 4,
    };
  });
  return animations;
}

export default transformAnimations;
