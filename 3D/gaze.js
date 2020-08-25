// Ray
class Gaze {
    pos = {};
    dir = {};

    constructor(p5, x1, y1, x2, y2) {
        this.p5 = p5
        this.pos.x = x1;
        this.pos.y = y1;
        this.dir.x = x2 * 200;
        this.dir.y = y2 * 200;
    }

    show = () => {
        this.p5.push()
        this.p5.strokeWeight(1);
        this.p5.stroke("#820600");
        this.p5.translate(this.pos.x, this.pos.y)
        this.p5.line(0, 0, this.dir.x, this.dir.y)
        this.p5.pop()
    }

    cast = (mapCells) => {

    }

    setDir = (pt) => {
        this.dir.x = pt.x - this.pos.x
        this.dir.y = pt.y - this.pos.y
    }
}