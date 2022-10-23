"use strict";

const canvas = document.querySelector("#Canvas");
const menu = document.querySelector("#side-menu");
const ctx = canvas.getContext("2d", { alpha: false });
Ctx.ctx = ctx;

Screen.updateSize();
Camera.pos = Screen.center.flip()

Graph.deserialize(`strict graph {
    node0 [x=  -30, y=  -48, label="App"];
    node1 [x= -105, y=  -48, label="Camera"];
    node2 [x=   59, y=   13, label="Ctx"];
    node3 [x=  -85, y=   71, label="Edge"];
    node4 [x=   47, y=  -49, label="frame.js"];
    node5 [x=  -50, y=   12, label="Graph"];
    node6 [x=    2, y= -108, label="init.js"];
    node7 [x=  -69, y= -108, label="Input"];
    node8 [x=  -13, y=   66, label="Node"];
    node9 [x=  129, y=   12, label="Screen"];
    node10 [x=   16, y=  114, label="Vector"];
    node11 [x=   83, y= -109, label="utils.js"];
    node5 -- node8;
    node5 -- node3;
    node0 -- node5;
    node6 -- node0;
    node4 -- node2;
    node2 -- node10;
}`)

frame(0);

window.addEventListener(EVENT.resize, Screen.resizeHandler);
canvas.addEventListener(EVENT.pointerdown, Input.pointerdownHandler);
canvas.addEventListener(EVENT.pointermove, Input.pointermoveHandler);
window.addEventListener(EVENT.pointerup, Input.pointerupHandler);
window.addEventListener(EVENT.keydown, Input.keydownHandler);
window.addEventListener(EVENT.keyup, Input.keyupHandler);
window.addEventListener(EVENT.wheel, Input.wheelHandler);
window.addEventListener(EVENT.copy, Input.copyHandler);
window.addEventListener(EVENT.paste, Input.pasteHandler);
