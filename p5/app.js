const RayCasting = new p5((p5) => {
    const CANVAS_X = 800,
        CANVAS_Y = 450;

    const boundaries = [];

    renderRay = () => {
        for (let a = 0; a < 2 * Math.PI; a += (2 * Math.PI) / 90) {
            const aY = Math.sin(a);
            const aX = Math.cos(a);
            const r = new Ray(p5, p5.mouseX, p5.mouseY, aX, aY);
            for (let boundary of boundaries) {
                const pt = r.cast(boundary);
                if (pt) {
                    r.setDir(pt)
                }
            }
            r.show();
        }
    }

    prepareBoundary = () => {
        const b = new Boundary(p5, 40, 40, 150, 100);
        const b2 = new Boundary(p5, 500, 300, 450, 100);
        boundaries.push(b, b2)
    }

    p5.setup = () => {
        p5.createCanvas(CANVAS_X, CANVAS_Y);
        prepareBoundary();
    }

    p5.draw = () => {
        p5.background(0);
        for (let boundary of boundaries) {
            boundary.show()
        }
        renderRay();
    }
})