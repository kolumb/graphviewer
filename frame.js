"use strict";
const TARGET_FPS = 60;
const SECOND = 1000;

const cameraSpeed = 10
const previousCamera = new Vector()
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
    if (Input.downState && !hoveredNode) {
        cameraShift.setFrom(Input.downPos.sub(Input.pointer))
    }
    if (!Input.downState) hoveredNode = null
    nodes.reverse().forEach(node => node.update())
    nodes.reverse()
    if (Input.downState) {
        if (hoveredNode) {
            hoveredNode.pos.setFrom(cursor.add(hoveredNodeShift))
            if (!canvas.classList.contains("dragging")) {
                canvas.classList.add("dragging")
            }
        } else {
            if (canvas.classList.contains("dragging")) {
                canvas.classList.remove("dragging")
            }
            if (!canvas.classList.contains("moving")) {
                canvas.classList.add("moving")
            }
        }
    } else {
        if (hoveredNode) {
            if (!canvas.classList.contains("hovering")) {
                canvas.classList.add("hovering")
            }
        } else {
            if (canvas.classList.contains("hovering")) {
                canvas.classList.remove("hovering")
            }
            if (canvas.classList.contains("moving")) {
                canvas.classList.remove("moving")
            }
        }
    }
}
function render() {
    Ctx.fillStyle(pause ? "rgb(200,200,200)" : "rgb(240,240,240)");
    Ctx.fillRect(Vector.zero, Screen.size);
    Ctx.save()

    const scale = 10 ** (Input.zoom / 2000)
    Ctx.translate(camera.add(cameraShift).flip())
    Ctx.scale(new Vector(scale, scale))
    Ctx.fillStyle("black")
    Ctx.fillRect(new Vector(10,10), new Vector(10, 10))

    nodes.forEach(node => node.render())
    Ctx.fillRect(cursor, new Vector(10, 10))

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
