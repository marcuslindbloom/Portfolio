import { GameObj, KaboomCtx } from 'kaboom';
import { createPlayer, setupControls } from './utils/playerUtils';
import { loadMapData, processLayers } from './utils/mapUtils';
import { setupCamera } from './utils/cameraUtils';
import { setupEventHandlers } from './utils/displayUtils';
import { ISceneConfig, MapLayer } from './types';
import { houseScene } from './scenes/houseScene';
import { gardenScene } from './scenes/gardenScene';
import { ANIMATIONS, COLORS, scaleFactor, SCENES, SPRITES } from './constants';
import kaboom, { KaboomOpt } from 'kaboom';

export class SceneManager {
  private player: GameObj;
  private currentScene?: string;
  private kbm: KaboomCtx;

  constructor() {
    this.kbm = this.initializeKaboomContext();
    this.loadSprites();
    this.kbm.setBackground(this.kbm.Color.fromHex(COLORS.BACKGROUND_HEX));
    this.player = createPlayer(this.kbm);
  }

  // Load a new scene by name
  async loadScene(sceneName: string) {
    const sceneConfig = this.sceneConfig(sceneName);

    const { jsonResource, imageResource, additionalObjects } = sceneConfig;

    this.currentScene = sceneName;
    const mapData = await loadMapData(jsonResource);

    const layers: MapLayer[] = mapData.layers;

    // Load the image resource before defining the scene
    await this.kbm.loadSprite(imageResource, `./${imageResource}`);

    this.kbm.scene(this.currentScene, async () => {
      // Load the scene's map
      const map = this.kbm.add([
        this.kbm.sprite(imageResource),
        this.kbm.pos(0, 0),
        this.kbm.scale(scaleFactor),
      ]);

      processLayers(
        layers,
        map,
        this.player,
        this.loadScene.bind(this),
        this.kbm
      );
      setupCamera(this.player, this.kbm);
      setupControls(this.player, this.kbm);
      setupEventHandlers(this.player, this.kbm);

      // Add additional objects specific to the scene
      additionalObjects.forEach((obj) => {
        this.kbm.add(obj);
      });
    });
    this.kbm.go(this.currentScene);
  }

  sceneConfig(sceneName: string): ISceneConfig {
    switch (sceneName) {
      case SCENES.HOUSE:
        return houseScene(this.kbm);
      case SCENES.GARDEN:
        return gardenScene();
      default:
        throw new Error(`Scene ${sceneName} not found`);
    }
  }

  private initializeKaboomContext(): KaboomCtx {
    const options: KaboomOpt = {
      global: false,
      touchToMouse: true,
      canvas: document.getElementById('game') as HTMLCanvasElement,
      // debug: false
    };
    return kaboom(options);
  }

  private loadSprites(): void {
    // Load necessary sprites
    this.kbm.loadSprite(SPRITES.SHEET, './spritesheet.png', {
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
  }
}
