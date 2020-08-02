const Sketch = new p5((p5) => {
    const CANVAS_X = 1000,
        CANVAS_Y = 600;

    const boundaries = [];

    prepareBoundary = () => {
        const b = new Boundary(p5, 150, 150, 250, 250),
            b2 = new Boundary(p5, 550, 150, 600, 300),
            b3 = new Boundary(p5, 550, 150, 400, 125),
            b4 = new Boundary(p5, 600, 300, 300, 400),
            b5 = new Boundary(p5, 650, 400, 800, 400,),
            b6 = new Boundary(p5, 800, 400, 800, 550),
            b7 = new Boundary(p5, 800, 550, 650, 550),
            b8 = new Boundary(p5, 650, 550, 650, 400);
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