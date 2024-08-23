import { kbm } from '../kaboomCtx';
import { CAMERA_SCALE_FACTORS } from '../constants';
import { GameObj } from 'kaboom';

// Set camera scale based on screen size
export const setCamScale = (k: any): void => {
  const resizeFactor = k.width() / k.height();
  if (resizeFactor < 1) {
    k.camScale(k.vec2(CAMERA_SCALE_FACTORS.MIN));
  } else {
    k.camScale(k.vec2(CAMERA_SCALE_FACTORS.MAX));
  }
};

// Setup camera to follow player
export const setupCamera = (player: GameObj) => {
  setCamScale(kbm);
  kbm.onResize(() => {
    setCamScale(kbm);
  });

  kbm.onUpdate(() => {
    kbm.camPos(player.worldPos().x, player.worldPos().y - 100);
  });
};
