"use strict";
const TARGET_FPS = 60;
const SECOND = 1000;

const cameraSpeed = 10
function tick(lag) {
    if (Input.left) {
        camera.x -= cameraSpeed
    }
    if (Input.right) {
        camera.x += cameraSpeed
    }
    if (Input.up) {
        camera.y -= cameraSpeed
    }
    if (Input.down) {
        camera.y += cameraSpeed
    }
    if (Input.downState) {
        camera.subMut(Input.speed)
        Input.speed.set(0, 0)
    }
}
function render() {
    Ctx.fillStyle(pause ? "rgb(200,200,200)" : "rgb(240,240,240)");
    Ctx.fillRect(Vector.zero, Screen.size);
    Ctx.save()

    const scale = 10 ** (Input.zoom / 2000)
    Ctx.translate(camera.flip())
    Ctx.scale(new Vector(scale, scale))
    Ctx.fillStyle("black")
    Ctx.fillRect(new Vector(10,10), new Vector(10, 10))

    nodes.forEach(node => node.render())

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
