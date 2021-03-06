class LightSource {
    rays = [];

    constructor(p5) {
        this.p5 = p5;
        this.initRays();
    }

    initRays() {
        for (let a = 0; a < 2 * Math.PI; a += (2 * Math.PI) / 90) {
            this.rays.push(new Ray(this.p5, this.p5.mouseX, this.p5.mouseY, Math.cos(a), Math.sin(a)));
        }
    }

    cast(boundaries) {
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

    show() {
        this.rays.forEach(r => {
            r.show();
        })
    }
}