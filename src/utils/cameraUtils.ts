import { CAMERA_SCALE_FACTORS } from '../constants';
import { GameObj, KaboomCtx } from 'kaboom';

// Set camera scale based on screen size
export const setCamScale = (kbm: any): void => {
  const resizeFactor = kbm.width() / kbm.height();
  if (resizeFactor < 1) {
    kbm.camScale(kbm.vec2(CAMERA_SCALE_FACTORS.MIN));
  } else {
    kbm.camScale(kbm.vec2(CAMERA_SCALE_FACTORS.MAX));
  }
};

// Setup camera to follow player
export const setupCamera = (player: GameObj, kbm: KaboomCtx) => {
  setCamScale(kbm);
  kbm.onResize(() => {
    setCamScale(kbm);
  });

  kbm.onUpdate(() => {
    kbm.camPos(player.worldPos().x, player.worldPos().y - 100);
  });
};
