const RayCasting = new p5((p5) => {
    const CANVAS_X = 1000,
        CANVAS_Y = 600;

    const boundaries = [];

    prepareBoundary = () => {
        const b = new Boundary(p5, 50, 50, 150, 150),
            b2 = new Boundary(p5, 500, 250, 450, 100),
            b3 = new Boundary(p5, 450, 100, 300, 70),
            b4 = new Boundary(p5, 500, 250, 250, 300),
            b5 = new Boundary(p5, 600, 400, 800, 400,),
            b6 = new Boundary(p5, 800, 400, 800, 550),
            b7 = new Boundary(p5, 800, 550, 600, 550),
            b8 = new Boundary(p5, 600, 550, 600, 400);
        boundaries.push(b, b2, b3, b4, b5, b6, b7, b8);
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