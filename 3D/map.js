import { CANVAS_X, D_MARGIN, MAP_CELLS, MAP_CELL_PX } from "./settings.js";

export class Map {
  walls = [];

  constructor(p5) {
    this.p5 = p5;
  }
  draw2dMiniMap = () => {
    this.p5.push();
    this.p5.fill(178);
    this.p5.noStroke();
    for (let y = 0; y < MAP_CELLS.length; y++) {
      for (let x = 0; x < MAP_CELLS[y].length; x++) {
        if (MAP_CELLS[y][x] === 1) {
          this.p5.rect(x * MAP_CELL_PX, y * MAP_CELL_PX, MAP_CELL_PX);
        }
      }
    }
    this.p5.pop();
  };

  calcWall = () => {};
}
