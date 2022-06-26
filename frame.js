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
}
function render() {
    Ctx.fillStyle(pause ? "rgb(200,200,200)" : "rgb(240,240,240)");
    Ctx.fillRect(Vector.zero, Screen.size);
    Ctx.save()

    Ctx.translate(camera.flip())
    Ctx.fillStyle("black")
    Ctx.fillRect(new Vector(10,10), new Vector(10, 10))

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
