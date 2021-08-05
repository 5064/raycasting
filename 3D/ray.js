import {
  CANVAS_X,
  CANVAS_Y,
  MAP_CELLS,
  MAP_CELL_PX,
  RAY_COUNT,
} from "./settings.js";

// Ray
export class Ray {
  SIGHT = 400; // eyesight power
  pos = {}; // player position(vector)
  cell; // player position(MAP_CELLS index)
  dir = {};
  theta; // radian that how different angle from player's center of view

  intersectionVec = undefined;
  intersectAxis = undefined;
  cameraPlaneDistance = undefined;

  constructor(p5, pos, dir, theta, cell, offset) {
    this.p5 = p5;
    this.pos = pos;
    this.dir = p5.createVector(dir.x * this.SIGHT, dir.y * this.SIGHT);
    this.theta = theta;
    this.cell = cell;
    this.offset = p5.createVector(offset.x, offset.y);
  }
  // DDA Algorithm
  // https://www.youtube.com/watch?v=NbSee-XM7WA
  cast = () => {
    const rayVec = this.dir.copy();

    const rayCellStepSize = {
      x: rayVec.x === 0 ? 0 : (MAP_CELL_PX * rayVec.mag()) / Math.abs(rayVec.x), //x方向に1cell動くときのベクトルのサイズ
      y: rayVec.y === 0 ? 0 : (MAP_CELL_PX * rayVec.mag()) / Math.abs(rayVec.y), //y方向に1cell動くときのベクトルのサイズ
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
      accX = (rayCellStepSize.x * (MAP_CELL_PX - this.offset.x)) / MAP_CELL_PX;
    }
    if (rayVec.y < 0) {
      stepY = -1;
      accY = (rayCellStepSize.y * this.offset.y) / MAP_CELL_PX;
    } else {
      stepY = 1;
      accY = (rayCellStepSize.y * (MAP_CELL_PX - this.offset.y)) / MAP_CELL_PX;
    }

    let isTileFound = false;
    let hitAxis;
    let cellX = this.cell.x;
    let cellY = this.cell.y;

    let distance = 0;
    while (!isTileFound && distance < this.SIGHT) {
      //jump to next map square, OR in x-direction, OR in y-direction
      if (accX < accY) {
        cellX += stepX;
        distance = accX;
        accX += rayCellStepSize.x;
        hitAxis = "y";
      } else {
        cellY += stepY;
        distance = accY;
        accY += rayCellStepSize.y;
        hitAxis = "x";
      }
      //Check if ray has hit a wall
      if (MAP_CELLS[cellY][cellX] > 0) {
        isTileFound = true;
        this.intersectAxis = hitAxis;
      }
    }

    if (isTileFound && distance < this.SIGHT) {
      this.intersectionVec = this.dir.copy().normalize().mult(distance);
    }
  };

  // in minimap(ray)
  show2d = () => {
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
    const ratio = this.intersectionVec.mag();
    const height = this.p5.map(ratio, 0, this.SIGHT, CANVAS_Y, 0); // to avoid "fisheye" effect
    let whiteness = this.p5.map(ratio, 0, this.SIGHT, 255, 200);
    if (this.intersectAxis == "y") {
      whiteness -= 100;
    }
    this.p5.push();
    this.p5.rectMode(this.p5.CENTER);
    this.p5.fill(whiteness);
    this.p5.noStroke();
    this.p5.rect(
      (i * CANVAS_X) / RAY_COUNT,
      CANVAS_Y / 2,
      (CANVAS_X / RAY_COUNT) * 1.2,
      height
    ); // mult 1.2 to fill margin between each rect
    this.p5.pop();
  };
}
