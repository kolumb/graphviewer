"use strict";
const canvas = document.querySelector("#Canvas");
const ctx = canvas.getContext("2d", { alpha: false });
Ctx.ctx = ctx;
let pause = true;
let lastFrameTime = 0;

Screen.updateSize();

const camera = Screen.center.flip()
let zoom = 1

frame();

window.addEventListener(EVENT.resize, Screen.resizeHandler);
canvas.addEventListener(EVENT.pointerdown, Input.pointerdownHandler);
canvas.addEventListener(EVENT.pointermove, Input.pointermoveHandler);
window.addEventListener(EVENT.pointerup, Input.pointerupHandler);
window.addEventListener(EVENT.keydown, Input.keydownHandler);
window.addEventListener(EVENT.keyup, Input.keyupHandler);
