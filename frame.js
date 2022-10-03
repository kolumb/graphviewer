"use strict";

const TARGET_FPS = 60;
const SECOND = 1000;

function tick(lag) {
    App.updateCamera(lag)
    App.hoveredNode = null
    nodes.forEach(node => node.update(lag))
    App.update(lag)
}
function render() {
    Ctx.fillStyle(pause ? "rgb(200,200,200)" : "rgb(240,240,240)");
    Ctx.fillRect(Vector.zero, Screen.size);
    Ctx.save()

    Ctx.translate(App.camera.add(App.cameraShift).flip())
    Ctx.scale(new Vector(App.scale, App.scale))
    Ctx.fillStyle("black")
    Ctx.fillRect(new Vector(10,10), new Vector(10, 10))

    edges.forEach(edge => edge.render())
    nodes.forEach(node => node.render())
    Ctx.fillRect(App.cursor, new Vector(10, 10))

    Ctx.restore()
}

function frame(timestamp) {
    const dt = timestamp - lastFrameTime;
    lastFrameTime = timestamp;

    if (dt < SECOND) tick(dt * TARGET_FPS / SECOND);
    render();
    if (pause === false) {
        requestAnimationFrame(frame);
    }
}
