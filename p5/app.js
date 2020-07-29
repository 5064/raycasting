const RayCasting = new p5((p5) => {
    const CANVAS_X = 800,
        CANVAS_Y = 450;

    renderRay = () => {
        for (let a = 0; a < 2 * Math.PI; a += (2 * Math.PI) / 90) {
            aY = Math.sin(a);
            aX = Math.cos(a);
            const r = new Ray(p5, p5.mouseX, p5.mouseY, aX, aY);
            r.show();
        }
    }

    renderBoundary = () => {
        const b = new Boundary(p5, 40, 40, 150, 100);
        b.show();
    }

    p5.setup = () => {
        p5.createCanvas(CANVAS_X, CANVAS_Y);
    }

    p5.draw = () => {
        p5.background(0);
        renderBoundary();
        renderRay();
    }
})