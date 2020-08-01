class Boundary {
    x1;
    y1;
    x2;
    y2;

    constructor(p5, x1, y1, x2, y2) {
        this.p5 = p5
        this.x1 = x1;
        this.y1 = y1;
        this.x2 = x2;
        this.y2 = y2;
    }

    show = () => {
        this.p5.push()
        this.p5.strokeWeight(3);
        this.p5.stroke(255);
        this.p5.line(this.x1, this.y1, this.x2, this.y2)
        this.p5.pop()
    }
}