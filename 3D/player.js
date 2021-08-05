import {
  CANVAS_X,
  CANVAS_Y,
  MAP_CELLS,
  MAP_CELL_PX,
  MAP_CELLS_COL_NUM,
  D_MARGIN,
  RAY_COUNT,
} from "./settings.js";
import { Ray } from "./ray.js";

export class Player {
  FOV = Math.PI / 3;
  DIR_ANGLE = Math.PI / 2; // center of player view
  SPEED = 2;

  pos = {}; // coordinate in canvas
  cell = {}; // tile position (= MAP_CELLS[cell.y][cell.x])
  offset = {}; // distance(px) from upper left of single cell

  rays = []; // player's gaze

  isMouseModeEnable = false; // can use mouse to control player

  constructor(p5, x, y) {
    this.p5 = p5;
    this.pos = p5.createVector(x, y);
    const t = this.calcCell(this.pos.x, this.pos.y);
    this.move(t, this.pos.x, this.pos.y);
  }

  initGaze = () => {
    this.rays = [];
    for (
      let theta = this.DIR_ANGLE - this.FOV / 2;
      theta < this.DIR_ANGLE + this.FOV / 2;
      theta += this.FOV / RAY_COUNT
    ) {
      this.rays.push(
        new Ray(
          this.p5,
          this.pos,
          this.p5.createVector(Math.cos(theta), Math.sin(theta)),
          theta,
          this.cell,
          this.offset
        )
      );
    }
  };
  move = (t, fX, fY) => {
    this.pos.x = fX;
    this.pos.y = fY;
    this.cell = t;
    this.updateOffset();
  };
  calcCell = (posX, posY) => {
    return {
      x: Math.floor(posX / MAP_CELL_PX),
      y: Math.floor(posY / MAP_CELL_PX),
    };
  };
  updateOffset = () => {
    this.offset = {
      x: this.pos.x - MAP_CELL_PX * this.cell.x,
      y: this.pos.y - MAP_CELL_PX * this.cell.y,
    };
  };

  cast = () => {
    this.rays.forEach((r) => {
      r.cast();
    });
  };

  controller = () => {
    if (!this.p5.keyIsPressed) {
      return; // for performance
    }
    if (this.p5.keyIsDown(87)) {
      // W
      // precompute future positions before change state
      let fX = this.pos.x + Math.cos(this.DIR_ANGLE) * this.SPEED;
      let fY = this.pos.y + Math.sin(this.DIR_ANGLE) * this.SPEED;
      let fCell = this.calcCell(fX, fY);
      if (MAP_CELLS[fCell.y][fCell.x] > 0) {
        // hit the wall so can't move
        return;
      }
      this.move(fCell, fX, fY);
    } else if (this.p5.keyIsDown(83)) {
      // S
      // precompute before change state
      let fX = this.pos.x - Math.cos(this.DIR_ANGLE) * this.SPEED;
      let fY = this.pos.y - Math.sin(this.DIR_ANGLE) * this.SPEED;
      let fCell = this.calcCell(fX, fY);
      if (MAP_CELLS[fCell.y][fCell.x] > 0) {
        // hit the wall so can't move
        return;
      }
      this.move(fCell, fX, fY);
    }
    if (this.p5.keyIsDown(68)) {
      // D
      this.DIR_ANGLE += Math.PI / 100;
    }
    if (this.p5.keyIsDown(65)) {
      // A
      this.DIR_ANGLE -= Math.PI / 100;
    }
    if (this.p5.keyIsDown(77)) {
      // M
      this.isMouseModeEnable = !this.isMouseModeEnable;
    }
  };

  controlWithMouse = () => {
    // precompute before change state
    const c = this.calcCell(this.p5.mouseX, this.p5.mouseY);
    if (
      MAP_CELLS[c.y][c.x] > 0 ||
      this.p5.mouseX > MAP_CELLS_COL_NUM * MAP_CELL_PX
    ) {
      // can't move so that hit the wall || pointing minimap outside
      return;
    }
    this.move(c, this.p5.mouseX, this.p5.mouseY);
  };

  show2d() {
    this.p5.push();
    this.p5.stroke(255);
    this.p5.circle(this.pos.x, this.pos.y, 5);
    this.rays.map((r) => {
      r.show2d();
    });
    this.p5.pop();
  }

  show3d() {
    this.p5.push();
    this.p5.translate(MAP_CELLS_COL_NUM * MAP_CELL_PX + D_MARGIN, 0);
    // draw sky
    this.p5.fill("#66bbea");
    this.p5.rect(0, 0, CANVAS_X, CANVAS_Y / 2);
    // draw ground
    this.p5.fill("#DE10D1");
    this.p5.rect(0, CANVAS_Y / 2, CANVAS_X, CANVAS_Y / 2);
    this.rays.map((r, i) => {
      r.show3d(i);
    });
    this.p5.pop();
  }

  show() {
    this.show2d();
    this.show3d();
  }
}
