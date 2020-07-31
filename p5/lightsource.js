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
        for (let boundary of boundaries) {
            this.rays.forEach(r => {
                const pt = r.cast(boundary)
                if (pt) {
                    r.setDir(pt)
                }
            })
        }
    }

    show() {
        this.rays.forEach(r => {
            r.show()
        })
    }
}