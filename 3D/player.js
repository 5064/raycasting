class Player {
    FOV = Math.PI / 2;
    CENTER_OF_VIEW = this.FOV / 2;
    SPEED = 3

    pos = { x: 0, y: 0 }
    gaze = [];

    constructor(p5, x, y) {
        this.p5 = p5;
        this.pos.x = x;
        this.pos.y = y;
        this.initGaze();
    }

    initGaze() {
        for (let a = 0; a < this.FOV; a += this.FOV / 100) {
            this.gaze.push(new Gaze(this.p5, this.pos.x, this.pos.y, Math.cos(a), Math.sin(a)));
        }
    }

    updateGaze = () => {
        for (let g of this.gaze) {
            g.pos.x = this.pos.x;
            g.pos.y = this.pos.y;
            // g.dir.x = this.dir.x;
            // g.dir.y = this.dir.y;
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

    controller = (event) => {
        switch (event.key) {
            case "w":
                this.pos.x += Math.cos(this.CENTER_OF_VIEW) * this.SPEED;
                this.pos.y += Math.sin(this.CENTER_OF_VIEW) * this.SPEED;
                break;
            case "s":
                this.pos.x -= Math.cos(this.CENTER_OF_VIEW) * this.SPEED;
                this.pos.y -= Math.sin(this.CENTER_OF_VIEW) * this.SPEED;
                break;
            case "d":
                this.CENTER_OF_VIEW -= Math.PI / 90;
                break;
            case "a":
                this.CENTER_OF_VIEW += Math.PI / 90;
                break;
        }
    }

    show2d() {
        this.p5.push()
        this.p5.stroke(255)
        this.p5.circle(this.pos.x, this.pos.y, 5)
        this.gaze.forEach(r => {
            r.show();
        })
        this.p5.pop()
    }

    show() {
        this.show2d();
    }
}