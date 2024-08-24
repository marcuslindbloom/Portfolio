import { GameObj, KaboomCtx, MouseButton } from 'kaboom';
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
export const createPlayer = (kbm: KaboomCtx): GameObj => {
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

// Set the player animation based on direction
const setPlayerAnimation = (
  player: GameObj,
  direction: string,
  flipX: boolean = false
) => {
  const animationMap = {
    [DIRECTIONS.UP]: ANIMATIONS.WALK_UP,
    [DIRECTIONS.DOWN]: ANIMATIONS.WALK_DOWN,
    [DIRECTIONS.LEFT]: ANIMATIONS.WALK_SIDE,
    [DIRECTIONS.RIGHT]: ANIMATIONS.WALK_SIDE,
  };

  player.flipX = flipX;
  const animation = animationMap[direction];
  if (player.curAnim() !== animation) {
    player.play(animation);
  }
  player.direction = direction;
};

export const setupControls = (player: GameObj, kbm: KaboomCtx) => {
  // Mouse controls
  kbm.onMouseDown((mouseBtn: MouseButton) => {
    if (mouseBtn !== INPUT.MOUSE_BUTTON_LEFT || player.isInDialogue) return;

    const worldMousePos = kbm.toWorld(kbm.mousePos());
    player.moveTo(worldMousePos, player.speed);

    const mouseAngle = player.pos.angle(worldMousePos);

    if (mouseAngle > ANGLES.LOWER_BOUND && mouseAngle < ANGLES.UPPER_BOUND) {
      setPlayerAnimation(player, DIRECTIONS.UP);
    } else if (
      mouseAngle < -ANGLES.LOWER_BOUND &&
      mouseAngle > -ANGLES.UPPER_BOUND
    ) {
      setPlayerAnimation(player, DIRECTIONS.DOWN);
    } else if (Math.abs(mouseAngle) > ANGLES.UPPER_BOUND) {
      setPlayerAnimation(player, DIRECTIONS.RIGHT, false);
    } else {
      setPlayerAnimation(player, DIRECTIONS.LEFT, true);
    }
  });

  // Keyboard controls
  kbm.onKeyDown(() => {
    if (player.isInDialogue) return;

    const keyMap = {
      [DIRECTIONS.RIGHT]: kbm.isKeyDown(KeyMap.RIGHT),
      [DIRECTIONS.LEFT]: kbm.isKeyDown(KeyMap.LEFT),
      [DIRECTIONS.UP]: kbm.isKeyDown(KeyMap.UP),
      [DIRECTIONS.DOWN]: kbm.isKeyDown(KeyMap.DOWN),
    };

    const pressedDirection = Object.entries(keyMap).find(
      ([_, pressed]) => pressed
    )?.[0];

    if (!pressedDirection) return;

    const directionToMoveMap = {
      [DIRECTIONS.RIGHT]: () => player.move(player.speed, 0),
      [DIRECTIONS.LEFT]: () => player.move(-player.speed, 0),
      [DIRECTIONS.UP]: () => player.move(0, -player.speed),
      [DIRECTIONS.DOWN]: () => player.move(0, player.speed),
    };

    setPlayerAnimation(
      player,
      pressedDirection as string,
      pressedDirection === DIRECTIONS.LEFT
    );
    directionToMoveMap[pressedDirection]?.();
  });

  // Handle stopping animations when keys or mouse are released
  const stopAnims = () => {
    const idleAnimations = {
      [DIRECTIONS.DOWN]: ANIMATIONS.IDLE_DOWN,
      [DIRECTIONS.UP]: ANIMATIONS.IDLE_UP,
      [DIRECTIONS.LEFT]: ANIMATIONS.IDLE_SIDE,
      [DIRECTIONS.RIGHT]: ANIMATIONS.IDLE_SIDE,
    };

    player.play(idleAnimations[player.direction]);
  };

  kbm.onMouseRelease(stopAnims);
  kbm.onKeyRelease(stopAnims);
};
