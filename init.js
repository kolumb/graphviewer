"use strict";
const canvas = document.querySelector("#Canvas");
const ctx = canvas.getContext("2d", { alpha: false });
Ctx.ctx = ctx;
let pause = true;
let lastFrameTime = 0;

Screen.updateSize();

const camera = Screen.center.flip()
const cameraShift = new Vector()
let zoom = 1
const nodes = []
const edges = []
for (let i = 0; i < 10; i++) {
	const label = new Array(Math.floor(Math.random() * 20 + 6)).fill(0).map(_ => String.fromCharCode(60 + Math.floor(Math.random() * 60))).join("")
	nodes.push(new Node(Node.idCounter++, Vector.random().scale(400*(1 -Math.random()**2)), label))
}
edges.push(new Edge(nodes[0], nodes[1]))
const cursor = new Vector()
let hoveredNode = null
const hoveredNodeShift = new Vector()

frame();

window.addEventListener(EVENT.resize, Screen.resizeHandler);
canvas.addEventListener(EVENT.pointerdown, Input.pointerdownHandler);
canvas.addEventListener(EVENT.pointermove, Input.pointermoveHandler);
window.addEventListener(EVENT.pointerup, Input.pointerupHandler);
window.addEventListener(EVENT.keydown, Input.keydownHandler);
window.addEventListener(EVENT.keyup, Input.keyupHandler);
window.addEventListener(EVENT.wheel, Input.wheelHandler);
window.addEventListener(EVENT.copy, Input.copyHandler);
window.addEventListener(EVENT.paste, Input.pasteHandler);
