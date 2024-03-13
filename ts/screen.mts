import { App } from "./app.mjs";
import { Ctx } from "./ctx.mjs";
import { render } from "./frame.mjs";
import { Vector } from "./vector.mjs";
class Screen {
  static size: Vector;
  static center: Vector;
  static lesser: number;
  static bigger: number;
  static updateSize() {
    Screen.size = new Vector(window.innerWidth, window.innerHeight);
    App.canvas.width = Screen.size.x;
    App.canvas.height = Screen.size.y;
    Screen.center = Screen.size.scale(0.5);
    // ctx.imageSmoothingEnabled = false;
    // ctx.font = "15px sans-serif"
    Ctx.textAlign("center");
    Screen.lesser = Math.min(Screen.size.x, Screen.size.y);
    Screen.bigger = Math.max(Screen.size.x, Screen.size.y);
  }

  static resizeHandler() {
    Screen.updateSize();
    if (App.pause) render();
  }
}
export { Screen };
