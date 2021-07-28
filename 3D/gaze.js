import { MAP_CELLS, MAP_CELL_PX } from "./settings.js";

// Ray
export class Ray {
  SIGHT = 200; // eyesight power
  pos = {}; // player position
  dir = {};

  constructor(p5, x1, y1, x2, y2, cell, offset) {
    this.p5 = p5;
    this.pos = p5.createVector(x1, y1);
    this.dir = p5.createVector(x2 * this.SIGHT, y2 * this.SIGHT);
    this.cell = cell;
    this.offset = offset;
  }

  show = () => {
    this.p5.push();
    this.p5.strokeWeight(1);
    this.p5.stroke("#820600");
    this.p5.translate(this.pos.x, this.pos.y);
    this.p5.line(0, 0, this.dir.x, this.dir.y);
    this.p5.pop();
  };

  // DDA Algorithm
  // https://www.youtube.com/watch?v=NbSee-XM7WA
  cast = () => {
    const rayVec = p5.Vector2d.sub(this.dir, this.pos).normalize();

    const rayUnitStepSize = {
      x: Math.sqrt(1 + rayVec.y ** 2 / rayVec.x ** 2), //x方向に1unit動くときのベクトルのサイズ
      y: Math.sqrt(1 + rayVec.x ** 2 / rayVec.y ** 2), //y方向に1unit動くときのベクトルのサイズ
    };
    let stepX, stepY; // x,yそれぞれどちらにスカラー倍していくかの変数(+1 or -1) depend on rayVec

    if (rayVec.x < 0) {
      stepX = -1;
    } else {
      stepX = 1;
    }
    if (rayVec.y < 0) {
      stepY = -1;
    } else {
      stepY = 1;
    }

    let isTileFound = false;
    let cellX = this.cell.x;
    let cellY = this.cell.y;
    while (!isTileFound) {
      //jump to next map square, OR in x-direction, OR in y-direction
      if (sideDistX < sideDistY) {
        sideDistX += deltaDistX;
        cellX += stepX;
        side = 0;
      } else {
        sideDistY += deltaDistY;
        cellY += stepY;
        side = 1;
      }
      //Check if ray has hit a wall
      if (MAP_CELLS[cellX][cellY] > 0) isTileFound = true;
    }
  };

  setDir = (pt) => {
    this.dir.x = pt.x - this.pos.x;
    this.dir.y = pt.y - this.pos.y;
  };
}
