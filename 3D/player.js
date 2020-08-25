class Player {
    FOV = Math.PI / 3;
    angle = Math.PI / 2;
    SPEED = 7;

    pos = { x: 0, y: 0 };
    dir = { x: 0, y: 0 };
    gaze = [];

    constructor(p5, x, y) {
        this.p5 = p5;
        this.pos.x = x;
        this.pos.y = y;
        this.initGaze();
    }

    initGaze() {
        this.gaze = [];
        for (let a = 0; a < this.FOV; a += this.FOV / 90) {
            this.gaze.push(new Gaze(this.p5, this.pos.x, this.pos.y, Math.cos(a + (this.angle - this.FOV / 2)), Math.sin(a + (this.angle - this.FOV / 2))));
        }
    }

    cast(mapCells) {
        this.gaze.forEach(g => {
            let minDistance = Infinity
            const pt = g.cast(mapCells)
            if (pt) {
                const distance = Math.sqrt((pt.x - this.p5.mouseX) ** 2 + (pt.y - this.p5.mouseY) ** 2);
                if (distance < minDistance) {
                    minDistance = distance
                    g.setDir(pt);
                }
            }
        })
    }

    controller = (event) => {
        switch (event.key) {
            case "w":
                this.pos.x += Math.cos(this.angle) * this.SPEED;
                this.pos.y += Math.sin(this.angle) * this.SPEED;
                break;
            case "s":
                this.pos.x -= Math.cos(this.angle) * this.SPEED;
                this.pos.y -= Math.sin(this.angle) * this.SPEED;
                break;
            case "d":
                this.angle += Math.PI / 30;
                this.dir.y = Math.sin(this.angle);
                this.dir.x = Math.cos(this.angle);
                break;
            case "a":
                this.angle -= Math.PI / 30;
                this.dir.y = Math.sin(this.angle);
                this.dir.x = Math.cos(this.angle);
                break;
        }
    }

    show2d() {
        this.p5.push()
        this.p5.stroke(255)
        this.p5.circle(this.pos.x, this.pos.y, 5)
        this.gaze.forEach(g => {
            g.show();
        })
        this.p5.pop()
    }

    show() {
        this.show2d();
    }
}