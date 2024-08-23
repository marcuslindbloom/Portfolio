import { GameObj } from 'kaboom';
import {
  ANIMATIONS,
  DEFAULTS,
  DIRECTIONS,
  ELEMENT_IDS,
  EVENTS,
  INPUT,
  STYLES,
  TIMING,
} from '../constants';
import { kbm } from '../kaboomCtx';

export const displayDialogue = (
  text: string,
  onDisplayEnd: () => void
): void => {
  const dialogueUI = document.getElementById(
    ELEMENT_IDS.TEXTBOX_CONTAINER
  ) as HTMLElement;
  const dialogue = document.getElementById(ELEMENT_IDS.DIALOGUE) as HTMLElement;

  dialogueUI.style.display = STYLES.DISPLAY_BLOCK;
  let index = 0;
  let currentText = DEFAULTS.EMPTY_STRING;
  const intervalRef = setInterval(() => {
    if (index < text.length) {
      currentText += text[index];
      dialogue.innerHTML = currentText;
      index++;
      return;
    }
    clearInterval(intervalRef);
  }, TIMING.INTERVAL_DELAY);

  const closeBtn = document.getElementById(
    ELEMENT_IDS.CLOSE_BUTTON
  ) as HTMLElement;

  const onCloseBtnClick = (): void => {
    onDisplayEnd();
    dialogueUI.style.display = STYLES.DISPLAY_NONE;
    dialogue.innerHTML = DEFAULTS.EMPTY_STRING;
    clearInterval(intervalRef);
    closeBtn.removeEventListener(EVENTS.CLICK, onCloseBtnClick);
  };

  closeBtn.addEventListener(EVENTS.CLICK, onCloseBtnClick);

  window.addEventListener(EVENTS.KEYPRESS as keyof WindowEventMap, (event) => {
    const keyboardEvent = event as KeyboardEvent;
    if (keyboardEvent.code === INPUT.ENTER_KEY) {
      closeBtn.click();
    }
  });
};

export const setupEventHandlers = (player: GameObj) => {
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
