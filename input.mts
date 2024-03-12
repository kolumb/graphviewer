import { App } from "./app.mjs";
import { Camera } from "./camera.mjs";
import { frame, render } from "./frame.mjs";
import { Graph } from "./graph.mjs";
import { Vector } from "./vector.mjs";

type PointerID = { id: number; pos: Vector };
class Input {
  static up = false;
  static down = false;
  static left = false;
  static right = false;
  static pointer = new Vector();
  static downState = false;
  static zoom = 0;
  static downPos = new Vector();
  static pointerIDs: PointerID[] = []; // TODO: Check if there's still bug in multitouch zoom
  static lastDist = 0;

  static pointerdownHandler(e: PointerEvent) {
    if (Input.pointerIDs.length !== 1) {
      Input.pointer.set(e.offsetX, e.offsetY); // TODO: Check if e.clientY - canvas.offsetTop will be useful for embedding
      Input.downPos.setFrom(Input.pointer);
      Input.downState = true;
      App.lastClickHandled = false;
      App.updateCursor();
    }
    Input.pointerIDs.push({
      id: e.pointerId,
      pos: new Vector(e.offsetX, e.offsetY),
    });
  }
  static pointermoveHandler(e: PointerEvent) {
    if (Input.pointerIDs.length === 2) {
      const newDist = Input.pointerIDs[0].pos.distEuclidean(
        Input.pointerIDs[1].pos
      );
      if (Input.lastDist != 0) {
        Input.zoom += (newDist - Input.lastDist) / 100;
        Camera.updateScale();
      }
      Input.lastDist = newDist;
    } else {
      Input.pointer.set(e.offsetX, e.offsetY);
      Input.lastDist = 0;
      App.updateCursor();
    }
    Input.pointerIDs
      .find((p) => p.id === e.pointerId)
      ?.pos.set(e.offsetX, e.offsetY);
  }
  static pointerupHandler(e: PointerEvent) {
    if (Input.pointerIDs.length !== 2) {
      Input.pointer.set(e.offsetX, e.offsetY);
      Input.downState = false;
      App.connectOveralpped();
      App.applyShift();
    }
    const index = Input.pointerIDs.findIndex((p) => p.id === e.pointerId);
    Input.pointerIDs.splice(index, 1);
  }

  static keydownHandler(e: KeyboardEvent) {
    switch (e.code) {
      case KEY.space:
        if (e.target instanceof Element && e.target.tagName === "BUTTON")
          return;
      case KEY.p:
        App.pause = !App.pause;
        if (App.pause === false) {
          frame(performance.now());
        }
        break;
      case KEY.n:
        App.placeFromUnstaged();
        break;
      case KEY.up:
      case KEY.w:
        Input.up = true;
        break;
      case KEY.down:
      case KEY.s:
        Input.down = true;
        break;
      case KEY.left:
      case KEY.a:
        Input.left = true;
        break;
      case KEY.right:
      case KEY.d:
        Input.right = true;
        break;
    }
  }
  static keyupHandler(e: KeyboardEvent) {
    switch (e.code) {
      case KEY.up:
      case KEY.w:
        Input.up = false;
        break;
      case KEY.down:
      case KEY.s:
        Input.down = false;
        break;
      case KEY.left:
      case KEY.a:
        Input.left = false;
        break;
      case KEY.right:
      case KEY.d:
        Input.right = false;
        break;
    }
  }

  static wheelHandler(e: WheelEvent) {
    if (App.pause) return;
    Input.zoom += e.deltaY;
    Camera.updateScale();
  }

  static copyHandler(e: ClipboardEvent) {
    e.clipboardData?.setData("text/plain", Graph.serialize());
    e.preventDefault();
  }

  static pasteHandler(e: ClipboardEvent) {
    e.preventDefault();
    const text = e.clipboardData?.getData("text") ?? "";
    Graph.deserialize(text.trim());
    App.updateMenu();
    if (App.pause) render();
  }
}

enum EVENT {
  resize,
  pointerdown,
  pointermove,
  pointerup,
  keydown,
  keyup,
  click,
  wheel,
  copy,
  paste,
}

const KEY = {
  space: "Space",
  up: "ArrowUp",
  down: "ArrowDown",
  left: "ArrowLeft",
  right: "ArrowRight",
  enter: "Enter",
  backspace: "Backspace",
  escape: "Escape",
  tab: "Tab",
  control: "ControlLeft",
  meta: "MetaLeft",
  shift: "ShiftLeft",
  alt: "AltLeft",
  controlRight: "ControlRight",
  metaRight: "MetaRight",
  shiftRight: "ShiftRight",
  altRight: "AltRight",
  capsLock: "CapsLock",
  contextMenu: "ContextMenu",
  scrollLock: "ScrollLock",
  backquote: "Backquote",
  equal: "Equal",
  minus: "Minus",
  comma: "Comma",
  period: "Period",
  slash: "Slash",
  quote: "Quote",
  semicolon: "Semicolon",
  bracketLeft: "BracketLeft",
  bracketRight: "BracketRight",
  pause: "Pause",
  delete: "Delete",
  insert: "Insert",
  home: "Home",
  end: "End",
  pageUp: "PageUp",
  pageDown: "PageDown",
  printScreen: "PrintScreen",
  numEnter: "NumpadEnter",
  numDecimal: "NumpadDecimal",
  numAdd: "NumpadAdd",
  numSub: "NumpadSubtract",
  numMul: "NumpadMultiply",
  numDiv: "NumpadDivide",
  launchApp2: "LaunchApp2",
  mediaTrackPrevious: "MediaTrackPrevious",
  mediaTrackNext: "MediaTrackNext",
  audioVolumeMute: "AudioVolumeMute",
  audioVolumeDown: "AudioVolumeDown",
  audioVolumeUp: "AudioVolumeUp",
  mediaPlayPause: "MediaPlayPause",
  mediaStop: "MediaStop",
  a: "KeyA",
  b: "KeyB",
  c: "KeyC",
  d: "KeyD",
  e: "KeyE",
  f: "KeyF",
  g: "KeyG",
  h: "KeyH",
  i: "KeyI",
  j: "KeyJ",
  k: "KeyK",
  l: "KeyL",
  m: "KeyM",
  n: "KeyN",
  o: "KeyO",
  p: "KeyP",
  q: "KeyQ",
  r: "KeyR",
  s: "KeyS",
  t: "KeyT",
  u: "KeyU",
  v: "KeyV",
  w: "KeyW",
  x: "KeyX",
  y: "KeyY",
  z: "KeyZ",
  digit1: "Digit1",
  digit2: "Digit2",
  digit3: "Digit3",
  digit4: "Digit4",
  digit5: "Digit5",
  digit6: "Digit6",
  digit7: "Digit7",
  digit8: "Digit8",
  digit9: "Digit9",
  digit0: "Digit0",
  f1: "F1",
  f2: "F2",
  f3: "F3",
  f4: "F4",
  f5: "F5",
  f6: "F6",
  f7: "F7",
  f8: "F8",
  f9: "F9",
  f10: "F10",
  f11: "F11",
  f12: "F12",
};

export {Input, EVENT}