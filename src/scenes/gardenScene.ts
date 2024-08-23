import { GameObj } from 'kaboom';
import { ISceneConfig } from '../types';

export const gardenScene = (): ISceneConfig => {
  const jsonFile = 'garden.json';
  const pngFile = 'garden.png';

  const additionalObjects: GameObj[] = [
    // Define additional objects specific to the garden scene, if any
  ];

  return {
    jsonResource: jsonFile,
    imageResource: pngFile,
    additionalObjects,
  };
};
