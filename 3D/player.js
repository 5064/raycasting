class Player {
    FOV = Math.PI / 2;
    position = { x: 0, y: 0 }
    gaze = [];

    constructor(p5, x, y) {
        this.p5 = p5;
        this.position.x = x;
        this.position.y = y;
        this.initGaze();
    }

    initGaze() {
        for (let a = 0; a < this.FOV; a += this.FOV / 100) {
            this.gaze.push(new Gaze(this.p5, this.position.x, this.position.y, Math.cos(a), Math.sin(a)));
        }
    }

    cast(mapCells) {
        this.rays.forEach(r => {
            let minDistance = Infinity
            for (let boundary of boundaries) {
                const pt = r.cast(boundary)
                if (pt) {
                    const distance = Math.sqrt((pt.x - this.p5.mouseX) ** 2 + (pt.y - this.p5.mouseY) ** 2);
                    if (distance < minDistance) {
                        minDistance = distance
                        r.setDir(pt);
                    }
                }
            }
        })
    }

    show2d() {
        this.p5.push()
        this.p5.stroke(255)
        this.p5.circle(this.position.x, this.position.y, 5)
        this.gaze.forEach(r => {
            r.show();
        })
        this.p5.pop()
    }

    show() {
        this.show2d();
    }
}