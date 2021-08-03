import { CANVAS_X, D_MARGIN, MAP_CELLS, MAP_CELL_PX } from "./settings.js";

// Ray
export class Ray {
  SIGHT = 100; // eyesight power
  pos = {}; // player position
  dir = {};
  intersectionVec = {};

  constructor(p5, x1, y1, x2, y2, cell, offset) {
    this.p5 = p5;
    this.pos = p5.createVector(x1, y1);
    this.dir = p5.createVector(x2 * this.SIGHT, y2 * this.SIGHT);
    this.cell = cell;
    this.offset = p5.createVector(offset.x, offset.y);
  }

  show = () => {
    this.p5.push();
    this.p5.strokeWeight(1);
    this.p5.stroke("#FFFFFF");
    this.p5.translate(this.pos.x, this.pos.y);
    this.p5.line(0, 0, this.dir.x, this.dir.y);
    this.p5.strokeWeight(1);
    this.p5.stroke("#820600");
    this.p5.line(0, 0, this.intersectionVec.x, this.intersectionVec.y);
    this.p5.pop();
  };

  // DDA Algorithm
  // https://www.youtube.com/watch?v=NbSee-XM7WA
  cast = () => {
    const rayVec = this.dir.copy();

    const rayCellStepSize = {
      x: (MAP_CELL_PX * rayVec.mag()) / Math.abs(rayVec.x), //x方向に1cell動くときのベクトルのサイズ
      y: (MAP_CELL_PX * rayVec.mag()) / Math.abs(rayVec.y), //y方向に1cell動くときのベクトルのサイズ
    };
    // console.log(rayCellStepSize);

    let stepX = 0;
    let stepY = 0; // MAP_CELLSインデックスの方向の変数(+1 or -1) depend on rayVec
    const accVec = this.p5.createVector();

    if (rayVec.x < 0) {
      stepX = -1;
      accVec.x = (rayCellStepSize.x * this.offset.x) / MAP_CELL_PX;
    } else {
      stepX = 1;
      accVec.x =
        (rayCellStepSize.x * this.offset.x) / (MAP_CELL_PX - this.offset.x);
    }
    if (rayVec.y < 0) {
      stepY = -1;
      accVec.y = (rayCellStepSize.y * this.offset.y) / MAP_CELL_PX;
    } else {
      stepY = 1;
      accVec.y =
        (rayCellStepSize.y * this.offset.y) / (MAP_CELL_PX - this.offset.y);
    }

    let isTileFound = false;
    let cellX = this.cell.x;
    let cellY = this.cell.y;

    let accX = 0;
    let accY = 0; // accumulate
    while (!isTileFound && accVec.mag() < this.dir.mag()) {
      //jump to next map square, OR in x-direction, OR in y-direction
      if (accX < accY) {
        accX += rayCellStepSize.x;
        cellX += stepX;
        accVec.x = accX;
      } else {
        accY += rayCellStepSize.y;
        cellY += stepY;
        accVec.y = accY;
      }
      //Check if ray has hit a wall
      if (MAP_CELLS[cellY][cellX] > 0) {
        isTileFound = true;
      }
    }
    const copy = this.dir.copy();
    copy.normalize().mult(accVec.mag());

    this.intersectionVec = this.p5.createVector(copy.x, copy.y);
  };
}
