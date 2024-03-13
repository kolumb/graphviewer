import { App } from "./app.mjs";
import { assert } from "./utils.mjs";
import { Camera } from "./camera.mjs";
import { Ctx } from "./ctx.mjs";
import { frame } from "./frame.mjs";
import { Graph } from "./graph.mjs";
import { Input, EVENT } from "./input.mjs";
import { Screen } from "./screen.mjs";

const canvas: HTMLCanvasElement | null = document.querySelector("#Canvas")
if (canvas === null) {
    assert(false, "Can't find canvas");
} else {
  App.canvas = canvas;
  const ctx = App.canvas.getContext("2d", { alpha: false });
  if (ctx !== null) Ctx.ctx = ctx;
}
const menu = document.querySelector("#side-menu");

Screen.updateSize();
Camera.pos = Screen.center.flip();

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
}`);

if (menu) App.menu = menu;
App.updateMenu();

frame(0);
window.addEventListener(
  EVENT.resize as unknown as keyof WindowEventMap,
  Screen.resizeHandler as EventListenerOrEventListenerObject
);
App.canvas.addEventListener(
  EVENT.pointerdown as unknown as keyof ElementEventMap,
  Input.pointerdownHandler as EventListenerOrEventListenerObject
);
App.canvas.addEventListener(
  EVENT.pointermove as unknown as keyof ElementEventMap,
  Input.pointermoveHandler as EventListenerOrEventListenerObject
);
window.addEventListener(
  EVENT.pointerup as unknown as keyof WindowEventMap,
  Input.pointerupHandler as EventListenerOrEventListenerObject
);
window.addEventListener(
  EVENT.keydown as unknown as keyof WindowEventMap,
  Input.keydownHandler as EventListenerOrEventListenerObject
);
window.addEventListener(
  EVENT.keyup as unknown as keyof WindowEventMap,
  Input.keyupHandler as EventListenerOrEventListenerObject
);
window.addEventListener(
  EVENT.wheel as unknown as keyof WindowEventMap,
  Input.wheelHandler as EventListenerOrEventListenerObject
);
window.addEventListener(
  EVENT.copy as unknown as keyof WindowEventMap,
  Input.copyHandler as EventListenerOrEventListenerObject
);
window.addEventListener(
  EVENT.paste as unknown as keyof WindowEventMap,
  Input.pasteHandler as EventListenerOrEventListenerObject
);
