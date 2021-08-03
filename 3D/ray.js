import { CANVAS_X, CANVAS_Y, D_MARGIN, MAP_CELLS, MAP_CELL_PX, RAY_COUNT } from "./settings.js";

// Ray
export class Ray {
  SIGHT = 300; // eyesight power
  pos = {}; // player position
  dir = {};
  intersectionVec = undefined;

  constructor(p5, x1, y1, x2, y2, cell, offset) {
    this.p5 = p5;
    this.pos = p5.createVector(x1, y1);
    this.dir = p5.createVector(x2 * this.SIGHT, y2 * this.SIGHT);
    this.cell = cell;
    this.offset = p5.createVector(offset.x, offset.y);
  }

  // in minimap(ray)
  show = () => {
    this.p5.push();
    this.p5.strokeWeight(1);
    this.p5.stroke("#FFFFFF");
    this.p5.strokeWeight(1);
    this.p5.translate(this.pos.x, this.pos.y);
    if (this.intersectionVec !== undefined) {
      this.p5.line(0, 0, this.intersectionVec.x, this.intersectionVec.y);
    } else {
      this.p5.line(0, 0, this.dir.x, this.dir.y);
    }
    this.p5.pop();
  };
  // player's view(wall)
  show3d = (i) => {
    if (this.intersectionVec == undefined) {
      return;
    }
    const ratio = (1- this.intersectionVec.mag() / this.SIGHT)
    const height = CANVAS_Y * ratio
    const whiteness = this.p5.map(ratio,0,1,70,255)
    this.p5.push();
    this.p5.rectMode(this.p5.CENTER)
    this.p5.fill(whiteness)
    this.p5.noStroke()
    this.p5.rect(i*CANVAS_X/RAY_COUNT, CANVAS_Y/2, CANVAS_X/RAY_COUNT, height);
    this.p5.pop();
  };

  // DDA Algorithm
  // https://www.youtube.com/watch?v=NbSee-XM7WA
  cast = () => {
    const rayVec = this.dir.copy();

    const rayCellStepSize = {
      x: rayVec.x===0?0:(MAP_CELL_PX * rayVec.mag()) / Math.abs(rayVec.x), //x方向に1cell動くときのベクトルのサイズ
      y: rayVec.y===0?0:(MAP_CELL_PX * rayVec.mag()) / Math.abs(rayVec.y), //y方向に1cell動くときのベクトルのサイズ
    };

    let stepX = 0;
    let stepY = 0; // MAP_CELLSインデックスの方向の変数(+1 or -1) depend on rayVec
    let accX = 0;
    let accY = 0; // accumulate

    if (rayVec.x < 0) {
      stepX = -1;
      accX = (rayCellStepSize.x * this.offset.x) / MAP_CELL_PX;
    } else {
      stepX = 1;
      accX =
        rayCellStepSize.x * (MAP_CELL_PX - this.offset.x) / MAP_CELL_PX;
    }
    if (rayVec.y < 0) {
      stepY = -1;
      accY = (rayCellStepSize.y * this.offset.y) / MAP_CELL_PX;
    } else {
      stepY = 1;
      accY =
        rayCellStepSize.y * (MAP_CELL_PX - this.offset.y) / MAP_CELL_PX;
    }

    let isTileFound = false;
    let cellX = this.cell.x;
    let cellY = this.cell.y;

    let distance = 0
    while (!isTileFound && distance < this.SIGHT ) {
      //jump to next map square, OR in x-direction, OR in y-direction
      if (accX < accY) {
        cellX += stepX;
        distance = accX;
        accX += rayCellStepSize.x;
      } else {
        cellY += stepY;
        distance = accY;
        accY += rayCellStepSize.y;
      }
      //Check if ray has hit a wall
      if (MAP_CELLS[cellY][cellX] > 0) {
        isTileFound = true;
      }
    }

    if(isTileFound && distance < this.SIGHT) {
      this.intersectionVec = this.dir.copy().normalize().mult(distance);
    }
  };
}
