class Ray {
    constructor(p5, x1, y1, x2, y2) {
        this.p5 = p5
        this.posX = x1;
        this.posY = y1;
        this.dirX = x2;
        this.dirY = y2;
    }

    show = () => {
        this.p5.push()
        this.p5.strokeWeight(1);
        this.p5.stroke(255);
        this.p5.translate(this.posX, this.posY)
        this.p5.line(0, 0, this.dirX * 1000, this.dirY * 1000)
        this.p5.pop()
    }

    cast = (wall) => {
        const x1 = wall.a.x;
        const y1 = wall.a.y;
        const x2 = wall.b.x;
        const y2 = wall.b.y;

        const x3 = this.posX;
        const y3 = this.posy;
        const x4 = this.posX + this.dirX;
        const y4 = this.posX + this.dirY;
    }
}