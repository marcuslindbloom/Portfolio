import { kbm } from '../kaboomCtx';
import { GameObj } from 'kaboom';
import {
  SPRITES,
  LAYERS,
  scaleFactor,
  dialogueData,
  ENTITIES,
} from '../constants';
import {
  BoundaryObject,
  ExitObject,
  Layer,
  MapData,
  SpawnObject,
} from '../types';
import { displayDialogue } from './displayUtils';

// Load map data
export const loadMapData = async (jsonResource: string): Promise<MapData> => {
  return (await fetch(`./${jsonResource}`)).json();
};

// Create the map
export const createMap = (): GameObj => {
  return kbm.add([kbm.sprite(SPRITES.MAP), kbm.pos(0), kbm.scale(scaleFactor)]);
};

// Process map layers

export const processLayers = (
  layers: Layer[],
  map: GameObj,
  player: GameObj,
  loadScene: (sceneName: string) => void
) => {
  layers.forEach((layer) => {
    if (layer.name === LAYERS.BOUNDARIES) {
      const boundaryObjects = layer.objects.filter(
        (obj) => 'width' in obj && 'height' in obj
      ) as BoundaryObject[];
      addBoundaries(boundaryObjects, map, player);
    } else if (layer.name === LAYERS.SPAWNPOINTS) {
      setSpawnPoints(layer.objects as SpawnObject[], player);
    } else if (layer.name === LAYERS.EXITS) {
      addExits(layer.objects as ExitObject[], map, player, loadScene);
    }
  });
};

// Add boundaries to the map
export const addBoundaries = (
  objects: BoundaryObject[],
  map: GameObj,
  player: GameObj
) => {
  objects.forEach((boundary) => {
    map.add([
      kbm.area({
        shape: new kbm.Rect(kbm.vec2(0), boundary.width, boundary.height),
      }),
      kbm.body({ isStatic: true }),
      kbm.pos(boundary.x, boundary.y),
      boundary.name,
    ]);

    if (boundary.name && boundary.name in dialogueData) {
      const boundaryName = boundary.name as keyof typeof dialogueData;
      player.onCollide(boundary.name, () => {
        player.isInDialogue = true;
        displayDialogue(
          dialogueData[boundaryName],
          () => (player.isInDialogue = false)
        );
      });
    }
  });
};

// Set spawn points for entities
export const setSpawnPoints = (objects: SpawnObject[], player: GameObj) => {
  objects.forEach((entity) => {
    if (entity.name === ENTITIES.PLAYER) {
      player.pos = kbm.vec2(entity.x * scaleFactor, entity.y * scaleFactor);
      kbm.add(player);
    }
  });
};

// Add exits to the map
export const addExits = (
  objects: ExitObject[],
  map: GameObj,
  player: GameObj,
  loadScene: (sceneName: string) => void
) => {
  objects.forEach((exit) => {
    map.add([
      kbm.area({
        shape: new kbm.Rect(kbm.vec2(0), exit.width, exit.height),
      }),
      kbm.body({ isStatic: true }),
      kbm.pos(exit.x, exit.y),
      exit.name,
    ]);

    // Listen for collisions with the exit area
    player.onCollide(exit.name, () => {
      console.log(exit);

      const targetProperty = exit.properties?.find(
        (prop) => prop.name === 'target'
      );

      if (targetProperty && targetProperty.value) {
        loadScene(targetProperty.value); 
      }
    });
  });
};
