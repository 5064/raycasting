class Ray {
    constructor(p5, x1, y1, x2, y2) {
        this.p5 = p5
        this.posX = x1;
        this.posY = y1;
        this.dirX = x2 * 1000;
        this.dirY = y2 * 1000;
    }

    show = () => {
        this.p5.push()
        this.p5.strokeWeight(1);
        this.p5.stroke(128);
        this.p5.translate(this.posX, this.posY)
        this.p5.line(0, 0, this.dirX, this.dirY)
        this.p5.pop()
    }

    cast = (boundary) => {
        const x1 = boundary.x1;
        const y1 = boundary.y1;
        const x2 = boundary.x2;
        const y2 = boundary.y2;

        const x3 = this.posX;
        const y3 = this.posY;
        const x4 = this.posX + this.dirX;
        const y4 = this.posY + this.dirY;

        const denominator = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4)
        if (denominator === 0) {
            return null;
        }
        const t = ((x1 - x3) * (y3 - y4) - (y1 - y3) * (x3 - x4)) / denominator;
        const u = -((x1 - x2) * (y1 - y3) - (y1 - y2) * (x1 - x3)) / denominator;
        if (t > 0 && t < 1 && u > 0) {
            const pt = this.p5.createVector();
            pt.x = x1 + t * (x2 - x1);
            pt.y = y1 + t * (y2 - y1);
            return pt;
        } else {
            return null;
        }
    }

    setDir = (pt) => {
        this.dirX = pt.x - this.posX
        this.dirY = pt.y - this.posY
    }
}