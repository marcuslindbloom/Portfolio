import { createPlayer, setupControls } from "../utils/playerUtils";
import { createMap, loadMapData, processLayers } from "../utils/mapUtils";
import { setupCamera } from "../utils/cameraUtils";
import { setupEventHandlers } from "../utils/displayUtils";

export const mainScene = async () => {
    const mapData = await loadMapData();
    const layers = mapData.layers;

    const map = createMap();
    const player = createPlayer();

    processLayers(layers, map, player);
    setupCamera(player);
    setupControls(player);
    setupEventHandlers(player);
};

