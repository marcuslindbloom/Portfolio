import { SCENES } from './constants';
import { SceneManager } from './sceneManager';

const sceneManager = new SceneManager();

// Start the game by loading the initial scene
sceneManager.loadScene(SCENES.HOUSE);
