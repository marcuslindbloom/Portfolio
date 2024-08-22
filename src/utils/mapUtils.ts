import { kbm } from "../kaboomCtx";
import { GameObj } from "kaboom"; 
import { SPRITES, LAYERS, scaleFactor, dialogueData, ENTITIES } from "../constants";
import { BoundaryObject, Layer, MapData, SpawnObject } from "../types";
import { displayDialogue } from "./displayUtils";

// Load map data
export const loadMapData = async (): Promise<MapData> => {
    return (await fetch("./map.json")).json();
};

// Create the map
export const createMap = (): GameObj => {
    return kbm.add([kbm.sprite(SPRITES.MAP), kbm.pos(0), kbm.scale(scaleFactor)]);
};

// Process map layers
export const processLayers = (layers: Layer[], map: GameObj, player: GameObj) => {
    layers.forEach(layer => {
        if (layer.name === LAYERS.BOUNDARIES) {
            const boundaryObjects = layer.objects.filter(obj => 'width' in obj && 'height' in obj) as BoundaryObject[];
            addBoundaries(boundaryObjects, map, player);
        } else if (layer.name === LAYERS.SPAWNPOINTS) {
            setSpawnPoints(layer.objects as SpawnObject[], player);
        }
    });
};

// Add boundaries to the map
export const addBoundaries = (objects: BoundaryObject[], map: GameObj, player: GameObj) => {
    objects.forEach(boundary => {
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
    objects.forEach(entity => {
        if (entity.name === ENTITIES.PLAYER) {
            player.pos = kbm.vec2(
                entity.x * scaleFactor,
                entity.y * scaleFactor
            );
            kbm.add(player);
        }
    });
};
