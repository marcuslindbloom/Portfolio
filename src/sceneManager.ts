import { kbm } from './kaboomCtx';
import { GameObj } from 'kaboom';
import { createPlayer, setupControls } from './utils/playerUtils';
import { loadMapData, processLayers } from './utils/mapUtils';
import { setupCamera } from './utils/cameraUtils';
import { setupEventHandlers } from './utils/displayUtils';
import { ISceneConfig, MapLayer } from './types';
import { houseScene } from './scenes/houseScene';
import { gardenScene } from './scenes/gardenScene';
import { scaleFactor, SCENES } from './constants';

export class SceneManager {
  private player: GameObj;
  private currentScene?: string;

  constructor() {
    this.player = createPlayer();
  }

  // Load a new scene by name
  async loadScene(sceneName: string) {
    const sceneConfig = this.getSceneConfig(sceneName);

    const { jsonResource, imageResource, additionalObjects } = sceneConfig;

    this.currentScene = sceneName;
    const mapData = await loadMapData(jsonResource);

    const layers: MapLayer[] = mapData.layers;

    // Load the image resource before defining the scene
    await kbm.loadSprite(imageResource, `./${imageResource}`);

    kbm.scene(this.currentScene, async () => {
      // Load the scene's map
      const map = kbm.add([
        kbm.sprite(imageResource),
        kbm.pos(0, 0),
        kbm.scale(scaleFactor),
      ]);

      processLayers(layers, map, this.player, this.loadScene.bind(this));
      setupCamera(this.player);
      setupControls(this.player);
      setupEventHandlers(this.player);

      // Add additional objects specific to the scene
      additionalObjects.forEach((obj) => {
        kbm.add(obj);
      });
    });
    kbm.go(this.currentScene);
  }

  getSceneConfig(sceneName: string): ISceneConfig {
    switch (sceneName) {
      case SCENES.HOUSE:
        return houseScene();
      case SCENES.GARDEN:
        return gardenScene();
      default:
        throw new Error(`Scene ${sceneName} not found`);
    }
  }

  getPlayer(): GameObj {
    return this.player;
  }
}
