"use strict";
const canvas = document.querySelector("#Canvas");
const ctx = canvas.getContext("2d", { alpha: false });
Ctx.ctx = ctx;
let pause = true;
let lastFrameTime = 0;

Screen.updateSize();

const camera = Screen.center.flip()
let zoom = 1
const nodes = []
for (let i = 0; i < 10; i++) {
	const label = new Array(10).fill(0).map(_ => String.fromCharCode(60 + Math.floor(Math.random() * 60))).join("")
	nodes.push(new Node(Vector.random().scale(100*(1 -Math.random()**2)), label))
}

frame();

window.addEventListener(EVENT.resize, Screen.resizeHandler);
canvas.addEventListener(EVENT.pointerdown, Input.pointerdownHandler);
canvas.addEventListener(EVENT.pointermove, Input.pointermoveHandler);
window.addEventListener(EVENT.pointerup, Input.pointerupHandler);
window.addEventListener(EVENT.keydown, Input.keydownHandler);
window.addEventListener(EVENT.keyup, Input.keyupHandler);
