import {
  CANVAS_X,
  CANVAS_Y,
  MAP_CELLS,
  MAP_CELL_PX,
  MAP_CELLS_COL_NUM,
  D_MARGIN,
} from "./settings.js";
import { Ray } from "./gaze.js";

export class Player {
  FOV = Math.PI / 3;
  angle = Math.PI / 2; // center of player view
  SPEED = 10;

  pos = {}; // coordinate in canvas
  cell = {}; // tile position (= MAP_CELLS[cell.y][cell.x])
  offset = {}; // distance(px) from upper left of single cell
  dir = {};
  rays = []; // player's gaze

  isMouseModeEnable = false; // can use mouse to control player

  constructor(p5, x, y) {
    this.p5 = p5;
    this.pos = { x: x, y: y };
    this.initGaze();
  }

  initGaze = () => {
    this.rays = [];
    for (let theta = 0; theta < this.FOV; theta += this.FOV / 90) {
      this.rays.push(
        new Ray(
          this.p5,
          this.pos.x,
          this.pos.y,
          Math.cos(theta + (this.angle - this.FOV / 2)),
          Math.sin(theta + (this.angle - this.FOV / 2)),
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
      x: Math.floor((posX - CANVAS_X - D_MARGIN) / MAP_CELL_PX),
      y: Math.floor(posY / MAP_CELL_PX),
    };
  };
  updateOffset = () => {
    this.offset = {
      x: this.pos.x - CANVAS_X - D_MARGIN - MAP_CELL_PX * this.cell.x,
      y: this.pos.y - MAP_CELL_PX * this.cell.y,
    };
  };

  cast = (mapCells) => {
    this.rays.forEach((g) => {
      let minDistance = Infinity;
      const pt = g.cast(mapCells);
      if (pt) {
        const distance = Math.sqrt(
          (pt.x - this.p5.mouseX) ** 2 + (pt.y - this.p5.mouseY) ** 2
        );
        if (distance < minDistance) {
          minDistance = distance;
          g.setDir(pt);
        }
      }
    });
  };

  controller = (event) => {
    switch (event.key) {
      case "w":
        // precompute future positions before change state
        let fX = this.pos.x + Math.cos(this.angle) * this.SPEED;
        let fY = this.pos.y + Math.sin(this.angle) * this.SPEED;
        let fCell = this.calcCell(fX, fY);
        if (MAP_CELLS[fCell.y][fCell.x] > 0) {
          // hit the wall so can't move
          break;
        }
        this.move(fCell, fX, fY);
        break;
      case "s":
        // precompute before change state
        let fX2 = this.pos.x - Math.cos(this.angle) * this.SPEED;
        let fY2 = this.pos.y - Math.sin(this.angle) * this.SPEED;
        let fCell2 = this.calcCell(fX2, fY2);
        if (MAP_CELLS[fCell2.y][fCell2.x] > 0) {
          // hit the wall so can't move
          break;
        }
        this.move(fCell2, fX2, fY2);
        break;
      case "d":
        this.angle += Math.PI / 30;
        this.dir.y = Math.sin(this.angle);
        this.dir.x = Math.cos(this.angle);
        break;
      case "a":
        this.angle -= Math.PI / 30;
        this.dir.y = Math.sin(this.angle);
        this.dir.x = Math.cos(this.angle);
        break;
      case "m":
        this.isMouseModeEnable = !this.isMouseModeEnable;
        break;
    }
  };

  controlWithMouse = () => {
    // precompute before change state
    const c = this.calcCell(this.p5.mouseX, this.p5.mouseY);
    if (MAP_CELLS[c.y][c.x] > 0 || this.p5.mouseX < CANVAS_X + D_MARGIN) {
      // can't move so that hit the wall || pointing minimap outside
      return;
    }
    this.move(c, this.p5.mouseX, this.p5.mouseY);
  };

  show2d() {
    this.p5.push();
    this.p5.stroke(255);
    this.p5.circle(this.pos.x, this.pos.y, 5);
    this.rays.forEach((r) => {
      r.show();
    });
    this.p5.pop();
  }

  show() {
    this.show2d();
  }
}
