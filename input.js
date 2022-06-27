"use strict";

class Input {
    static up = false;
    static down = false;
    static left = false;
    static right = false;
    static pointer = new Vector();
    static downState = false;
    static zoom = 0;
    static downPos = new Vector()

    static pointerdownHandler(e) {
        Input.pointer.set(e.offsetX, e.offsetY); // e.clientY - canvas.offsetTop
        Input.downState = true;
        Input.downPos.set(e.offsetX, e.offsetY)
    }
    static pointermoveHandler(e) {
        const newPos = new Vector(e.offsetX, e.offsetY)
        Input.pointer.set(e.offsetX, e.offsetY);
    }
    static pointerupHandler(e) {
        Input.pointer.set(e.offsetX, e.offsetY);
        Input.downState = false;
        camera.setFrom(camera.add(cameraShift))
        cameraShift.setFrom(Vector.zero)
    }

    static keydownHandler(e) {
        switch (e.code) {
            case KEY.space:
                if (e.target.tagName === "BUTTON") return;
            case KEY.p:
                pause = !pause;
                if (pause === false) {
                    frame();
                }
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
    static keyupHandler(e) {
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

    static wheelHandler(e) {
        Input.zoom += e.deltaY
        const zoom = 10 ** (Input.zoom / 2000)
        // if (e.deltaY > 0) {
        //     camera.addMut(Input.pointer.sub(Screen.center).scale(1 / zoom))
        // } else {
        //     camera.subMut(Input.pointer.sub(Screen.center).scale(1 / zoom))
        // }
    }
}

const EVENT = Enum([
    "resize",
    "pointerdown",
    "pointermove",
    "pointerup",
    "keydown",
    "keyup",
    "click",
    "wheel",
]);

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
};
for (
    let charCode = "a".charCodeAt(0);
    charCode <= "z".charCodeAt(0);
    charCode++
) {
    KEY[String.fromCharCode(charCode)] =
        "Key" + String.fromCharCode(charCode).toUpperCase();
}
for (let i = 0; i < 10; i++) {
    KEY[`digit${i}`] = `Digit${i}`;
    KEY[`num${i}`] = `Numpad${i}`;
}
for (let i = 1; i <= 12; i++) {
    KEY[`f${i}`] = `F${i}`;
}
