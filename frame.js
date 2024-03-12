"use strict";

const TARGET_FPS = 60;
const SECOND = 1000;
let lastFrameTime = 0;

function tick(lag) {
  Camera.update(lag);
  Graph.update(lag);
  App.update(lag);
}
function render() {
  Ctx.fillStyle(App.pause ? "rgb(200,200,200)" : "rgb(240,240,240)");
  Ctx.fillRect(Vector.zero, Screen.size);
  Ctx.save();

  Ctx.translate(Camera.pos.add(Camera.shift).flip());
  Ctx.scale(new Vector(Camera.scale, Camera.scale));
  Ctx.fillStyle("black");
  Ctx.fillRect(new Vector(10, 10), new Vector(10, 10));

  Graph.render();

  Ctx.restore();
}

function frame(timestamp) {
  const dt = timestamp - lastFrameTime;
  lastFrameTime = timestamp;

  if (dt < SECOND) tick((dt * TARGET_FPS) / SECOND);
  render();
  if (App.pause === false) {
    requestAnimationFrame(frame);
  }
}
