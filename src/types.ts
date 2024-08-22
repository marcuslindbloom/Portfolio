import { kbm } from "./kaboomCtx";

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

// Type for Kaboom game objects
export type GameObj = ReturnType<typeof kbm.add>;

// Kaboom context type
export type KaboomCtx = typeof kbm;
