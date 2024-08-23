import { kbm } from '../kaboomCtx';
import { SPRITES, ANIMATIONS, scaleFactor } from '../constants';
import { ISceneConfig } from '../types';

export const houseScene = (): ISceneConfig => {
  const jsonFile = 'house.json';
  const pngFile = 'house.png';

  const additionalObjects = [
    kbm.add([
      kbm.sprite(SPRITES.SHEET, { anim: ANIMATIONS.FIRE }),
      kbm.pos(513, 320),
      kbm.scale(scaleFactor),
    ]),
  ];

  return {
    jsonResource: jsonFile,
    imageResource: pngFile,
    additionalObjects,
  };
};
