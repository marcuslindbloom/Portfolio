/*import { kbm } from "./kaboomCtx";

import { mainScene } from "./scenes/mainScene";
import {
    SPRITES,
    ANIMATIONS,
    COLORS,
    SCENES
} from "./constants";


kbm.loadSprite(SPRITES.SHEET, "./spritesheet.png", {
    sliceX: 39,
    sliceY: 31,
    anims: {
        [ANIMATIONS.IDLE_DOWN]: 936,
        [ANIMATIONS.WALK_DOWN]: { from: 936, to: 939, loop: true, speed: 8 },
        [ANIMATIONS.IDLE_SIDE]: 975,
        [ANIMATIONS.WALK_SIDE]: { from: 975, to: 978, loop: true, speed: 8 },
        [ANIMATIONS.IDLE_UP]: 1014,
        [ANIMATIONS.WALK_UP]: { from: 1014, to: 1017, loop: true, speed: 8 },
        [ANIMATIONS.FIRE]: { from: 488, to: 490, loop: true, speed: 1 },
    },
});

kbm.loadSprite(SPRITES.MAP, "./map.png");

kbm.setBackground(kbm.Color.fromHex(COLORS.BACKGROUND_HEX));

kbm.scene(SCENES.HOUSE, mainScene);
kbm.go(SCENES.HOUSE);*/

import { kbm } from './kaboomCtx';
import { SceneManager } from './sceneManager';
import { SPRITES, ANIMATIONS, COLORS, SCENES } from './constants';

// Load necessary sprites
kbm.loadSprite(SPRITES.SHEET, './spritesheet.png', {
  sliceX: 39,
  sliceY: 31,
  anims: {
    [ANIMATIONS.IDLE_DOWN]: 936,
    [ANIMATIONS.WALK_DOWN]: { from: 936, to: 939, loop: true, speed: 8 },
    [ANIMATIONS.IDLE_SIDE]: 975,
    [ANIMATIONS.WALK_SIDE]: { from: 975, to: 978, loop: true, speed: 8 },
    [ANIMATIONS.IDLE_UP]: 1014,
    [ANIMATIONS.WALK_UP]: { from: 1014, to: 1017, loop: true, speed: 8 },
    [ANIMATIONS.FIRE]: { from: 488, to: 490, loop: true, speed: 1 },
  },
});

kbm.setBackground(kbm.Color.fromHex(COLORS.BACKGROUND_HEX));

const sceneManager = new SceneManager();

// Start the game by loading the initial scene
sceneManager.loadScene(SCENES.HOUSE);
