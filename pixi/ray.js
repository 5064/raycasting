class Ray {
    constructor(x1, y1, x2, y2) {
        this.posX = x1;
        this.posY = y1;
        this.dirX = x2;
        this.dirY = y2;
    }
    get body() {
        const b = new PIXI.Graphics();
        b.lineStyle(1, 0xffffff).moveTo(this.posX, this.posY).lineTo(this.dirX * 1000, this.dirY * 1000);
        return b
    }

    // cast = (wall) => {
    //     const x1 = wall.a.x;
    //     const y1 = wall.a.y;
    //     const x2 = wall.b.x;
    //     const y2 = wall.b.y;

    //     const x3 = this.posX;
    //     const y3 = this.posy;
    //     const x4 = this.posX + this.dirX;
    //     const y4 = this.posX + this.dirY;
    // }
}