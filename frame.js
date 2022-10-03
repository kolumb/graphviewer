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
    hoveredNode = null
    nodes.forEach(node => node.update())

    if (!lastClickHandled) {
        lastClickHandled = true
        if (hoveredNode) {
            if (!selectedNode) {
                selectedNode = hoveredNode
                selectedNode.color = "blue"
                canvas.classList.add("dragging")
            }
        } else {
            if (selectedNode) {
                selectedNode.color = "orange"
                selectedNode = null
            }
            canvas.classList.add("moving")
        }
    }
    if (Input.downState) {
        if (selectedNode) {
            selectedNode.pos.setFrom(App.cursor.add(hoveredNodeShift))
        } else {
            cameraShift.setFrom(Input.downPos.sub(Input.pointer))
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
        }
    }


    // if (Input.downState && !hoveredNode) {
    //     cameraShift.setFrom(Input.downPos.sub(Input.pointer))
    // }
    // if (Input.downState) {
    //     if (hoveredNode) {
    //         hoveredNode.pos.setFrom(cursor.add(hoveredNodeShift))
    //         if (!canvas.classList.contains("dragging")) {
    //             canvas.classList.add("dragging")
    //         }
    //     } else {
    //         if (canvas.classList.contains("dragging")) {
    //             canvas.classList.remove("dragging")
    //         }
    //         if (!canvas.classList.contains("moving")) {
    //             canvas.classList.add("moving")
    //         }
    //     }
    // } else {
    //     if (hoveredNode) {
    //         if (!canvas.classList.contains("hovering")) {
    //             canvas.classList.add("hovering")
    //         }
    //     } else {
    //         if (canvas.classList.contains("hovering")) {
    //             canvas.classList.remove("hovering")
    //         }
    //         if (canvas.classList.contains("moving")) {
    //             canvas.classList.remove("moving")
    //         }
    //     }
    // }
}
function render() {
    Ctx.fillStyle(pause ? "rgb(200,200,200)" : "rgb(240,240,240)");
    Ctx.fillRect(Vector.zero, Screen.size);
    Ctx.save()

    Ctx.translate(cameraTopLeft.add(cameraShift).flip())
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
