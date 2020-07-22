class Ray {
    constructor(x, y) {
        this.posX = x;
        this.posY = y;
        this.dirX = 1;
        this.dirY = 0;
    }
    get body() {
        const b = new PIXI.Graphics();
        b.lineStyle(1, 0xffffff).moveTo(this.posX, this.posY).lineTo(this.dirX * 100, this.dirY * 100);
        return b
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