import {
  CANVAS_X,
  CANVAS_Y,
  MAP_CELL_PX,
  MAP_CELLS_COL_NUM,
  D_MARGIN,
} from "./settings.js";
import { Map } from "./map.js";
import { Player } from "./player.js";

const Sketch = new p5((p5) => {
  const player = new Player(
    p5,
    MAP_CELL_PX * 1.5,
    MAP_CELL_PX * 1.5
  );
  const map = new Map(p5);

  p5.setup = () => {
    p5.createCanvas(
      CANVAS_X + MAP_CELLS_COL_NUM * MAP_CELL_PX + D_MARGIN,
      CANVAS_Y
    );
  };

  p5.draw = () => {
    p5.background(0);
    map.draw2dMiniMap();
    player.controller();
    if (player.isMouseModeEnable) {
      player.controlWithMouse();
    }
    player.initGaze();
    player.cast();
    player.show();
    // draw margin
    p5.fill(255)
    p5.rect(MAP_CELLS_COL_NUM * MAP_CELL_PX,0,D_MARGIN,CANVAS_Y)
  };
});
