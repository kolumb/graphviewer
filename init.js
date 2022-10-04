"use strict";

const canvas = document.querySelector("#Canvas");
const menu = document.querySelector("#side-menu");
const ctx = canvas.getContext("2d", { alpha: false });
Ctx.ctx = ctx;

Screen.updateSize();
Camera.pos = Screen.center.flip()

for (let i = 0; i < 10; i++) {
	const label = new Array(Math.floor(Math.random() * 20 + 6)).fill(0).map(_ => String.fromCharCode(60 + Math.floor(Math.random() * 60))).join("")
	Graph.nodes.push(new Node(Node.idCounter++, Vector.random().scale(400*(1 -Math.random()**2)), label))
}
Graph.edges.push(new Edge(Graph.nodes[0], Graph.nodes[1]))

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
