const RayCasting = new p5((p5) => {
    const CANVAS_X = 800,
        CANVAS_Y = 450;

    const boundaries = [];

    prepareBoundary = () => {
        const b = new Boundary(p5, 40, 40, 150, 100),
            b2 = new Boundary(p5, 500, 300, 450, 100),
            b3 = new Boundary(p5, 450, 100, 300, 70),
            b4 = new Boundary(p5, 500, 300, 250, 400);
        boundaries.push(b, b2, b3, b4)
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
        const lightSource = new LightSource(p5);
        lightSource.cast(boundaries)
        lightSource.show()
    }
})