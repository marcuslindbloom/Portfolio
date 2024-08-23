import { kbm } from '../kaboomCtx';
import { GameObj, MouseButton } from 'kaboom';
import {
  ANIMATIONS,
  DIRECTIONS,
  PLAYER,
  ENTITIES,
  INPUT,
  ANGLES,
  scaleFactor,
  SPRITES,
} from '../constants';
import { KeyMap } from '../enums';

// Create the player
export const createPlayer = (): GameObj => {
  return kbm.make([
    kbm.sprite(SPRITES.SHEET, { anim: ANIMATIONS.IDLE_DOWN }),
    kbm.area({
      shape: new kbm.Rect(kbm.vec2(0, 3), 10, 10),
    }),
    kbm.body(),
    kbm.anchor('center'),
    kbm.pos(),
    kbm.scale(scaleFactor),
    {
      speed: PLAYER.SPEED,
      direction: DIRECTIONS.DOWN,
      isInDialogue: false,
    },
    ENTITIES.PLAYER,
  ]);
};

export const setupControls = (player: GameObj) => {
  // Mouse controls
  kbm.onMouseDown((mouseBtn: MouseButton) => {
    if (mouseBtn !== INPUT.MOUSE_BUTTON_LEFT || player.isInDialogue) return;

    const worldMousePos = kbm.toWorld(kbm.mousePos());
    player.moveTo(worldMousePos, player.speed);

    const mouseAngle = player.pos.angle(worldMousePos);

    if (
      mouseAngle > ANGLES.LOWER_BOUND &&
      mouseAngle < ANGLES.UPPER_BOUND &&
      player.curAnim() !== ANIMATIONS.WALK_UP
    ) {
      player.play(ANIMATIONS.WALK_UP);
      player.direction = DIRECTIONS.UP;
      return;
    }

    if (
      mouseAngle < -ANGLES.LOWER_BOUND &&
      mouseAngle > -ANGLES.UPPER_BOUND &&
      player.curAnim() !== ANIMATIONS.WALK_DOWN
    ) {
      player.play(ANIMATIONS.WALK_DOWN);
      player.direction = DIRECTIONS.DOWN;
      return;
    }

    if (Math.abs(mouseAngle) > ANGLES.UPPER_BOUND) {
      player.flipX = false;
      if (player.curAnim() !== ANIMATIONS.WALK_SIDE)
        player.play(ANIMATIONS.WALK_SIDE);
      player.direction = DIRECTIONS.RIGHT;
      return;
    }

    if (Math.abs(mouseAngle) < ANGLES.LOWER_BOUND) {
      player.flipX = true;
      if (player.curAnim() !== ANIMATIONS.WALK_SIDE)
        player.play(ANIMATIONS.WALK_SIDE);
      player.direction = DIRECTIONS.LEFT;
      return;
    }
  });

  // Keyboard controls
  kbm.onKeyDown(() => {
    const keyMap = {
      right: kbm.isKeyDown(KeyMap.RIGHT),
      left: kbm.isKeyDown(KeyMap.LEFT),
      up: kbm.isKeyDown(KeyMap.UP),
      down: kbm.isKeyDown(KeyMap.DOWN),
    };

    const nbOfKeyPressed = Object.values(keyMap).filter(Boolean).length;

    if (nbOfKeyPressed > 1) return;

    if (player.isInDialogue) return;

    if (keyMap.right) {
      player.flipX = false;
      if (player.curAnim() !== ANIMATIONS.WALK_SIDE)
        player.play(ANIMATIONS.WALK_SIDE);
      player.direction = DIRECTIONS.RIGHT;
      player.move(player.speed, 0);
      return;
    }

    if (keyMap.left) {
      player.flipX = true;
      if (player.curAnim() !== ANIMATIONS.WALK_SIDE)
        player.play(ANIMATIONS.WALK_SIDE);
      player.direction = DIRECTIONS.LEFT;
      player.move(-player.speed, 0);
      return;
    }

    if (keyMap.up) {
      if (player.curAnim() !== ANIMATIONS.WALK_UP)
        player.play(ANIMATIONS.WALK_UP);
      player.direction = DIRECTIONS.UP;
      player.move(0, -player.speed);
      return;
    }

    if (keyMap.down) {
      if (player.curAnim() !== ANIMATIONS.WALK_DOWN)
        player.play(ANIMATIONS.WALK_DOWN);
      player.direction = DIRECTIONS.DOWN;
      player.move(0, player.speed);
    }
  });

  // Handle stopping animations when keys or mouse are released
  const stopAnims = () => {
    if (player.direction === DIRECTIONS.DOWN) {
      player.play(ANIMATIONS.IDLE_DOWN);
      return;
    }
    if (player.direction === DIRECTIONS.UP) {
      player.play(ANIMATIONS.IDLE_UP);
      return;
    }
    player.play(ANIMATIONS.IDLE_SIDE);
  };

  kbm.onMouseRelease(stopAnims);
  kbm.onKeyRelease(stopAnims);
};
