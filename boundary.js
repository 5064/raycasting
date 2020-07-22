class Boundary {
    constructor(x1, y1, x2, y2) {
        this.x1 = x1;
        this.y1 = y1;
        this.x2 = x2;
        this.y2 = y2;
    };

    get body() {
        const b = new PIXI.Graphics();
        b.lineStyle(2, 0xffffff).moveTo(this.x1, this.y1).lineTo(this.x2, this.y2);
        return b
    }
}