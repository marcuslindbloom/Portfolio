import kaboom, { KaboomOpt } from 'kaboom';

const options: KaboomOpt = {
  global: false,
  touchToMouse: true,
  canvas: document.getElementById('game') as HTMLCanvasElement,
  // debug: false, // set to false once ready for production
};

export const kbm = kaboom(options);
