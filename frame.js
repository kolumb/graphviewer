"use strict";

const TARGET_FPS = 60;
const SECOND = 1000;

function tick(lag) {
    App.updateCamera(lag)
    App.hoveredNode = null
    nodes.forEach(node => node.update())

    if (!App.lastClickHandled) {
        App.lastClickHandled = true
        if (App.hoveredNode) {
            if (!App.selectedNode) {
                App.selectedNode = App.hoveredNode
                App.selectedNode.color = "blue"
                canvas.classList.add("dragging")
            }
        } else {
            if (App.selectedNode) {
                App.selectedNode.color = "orange"
                App.selectedNode = null
            }
            canvas.classList.add("moving")
        }
    }
    if (Input.downState) {
        if (App.selectedNode) {
            App.selectedNode.pos.setFrom(App.cursor.add(App.hoveredNodeShift))
        } else {
            App.updateCameraShift()
        }
    } else {
        if (App.hoveredNode) {
            if (!canvas.classList.contains("hovering")) {
                canvas.classList.add("hovering")
            }
        } else {
            if (canvas.classList.contains("hovering")) {
                canvas.classList.remove("hovering")
            }
        }
    }
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
