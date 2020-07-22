const Application = PIXI.Application,
    Graphics = PIXI.Graphics,
    Container = PIXI.Container;

const CANVAS_X = 800,
    CANVAS_Y = 450;

const app = new Application({ width: CANVAS_X, height: CANVAS_Y });
document.body.appendChild(app.view);

const b = new Boundary(20, 20, 100, 100).body;
let rays = new Container();
app.stage.addChild(rays);

renderRay = () => {
    rays.removeChildren()
    const mouse = app.renderer.plugins.interaction.mouse.global;
    for (let a = 0; a < 2 * Math.PI; a += (2 * Math.PI) / 10) {
        const r = new Ray(mouse.x, mouse.y, a.x, a.y).body
        rays.addChild(r)
    }
}

// animation loop
app.ticker.add(_ => {
    renderRay()
    app.stage.addChild(b)
});