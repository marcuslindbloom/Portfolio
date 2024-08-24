import { GameObj } from 'kaboom';

// Type for the map data loaded from the JSON file
export interface MapData {
  layers: Layer[];
}

// Type for a generic layer
export interface Layer {
  name: string;
  objects: (BoundaryObject | SpawnObject)[];
}

// Type for boundary objects within a layer
export interface BoundaryObject {
  name: string;
  x: number;
  y: number;
  width: number;
  height: number;
}

// Type for spawn point objects within a layer
export interface SpawnObject {
  name: string;
  x: number;
  y: number;
}

// Type for the player object
export interface Player extends GameObj {
  speed: number;
  direction: string;
  isInDialogue: boolean;
}

export interface MapLayer {
  name: string;
  objects: MapObject[];
}

export interface BoundaryObject {
  name: string;
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface SpawnObject {
  name: string;
  x: number;
  y: number;
}

export interface ExitObject {
  name: string;
  properties?: Array<{
    name: string;
    value: string;
  }>;
  x: number;
  y: number;
  width: number;
  height: number;
}

export type MapObject = BoundaryObject | SpawnObject | ExitObject;

export interface ISceneManager {
  loadScene(sceneName: string): Promise<void>;
  setupSceneExits(exitLayer: MapLayer): void;
  getPlayer(): GameObj;
}

export interface ISceneConfig {
  jsonResource: string;
  imageResource: string;
  additionalObjects: GameObj[];
}
