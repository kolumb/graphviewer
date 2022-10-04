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
        Input.pointer.set(e.offsetX, e.offsetY); // TODO: Check if e.clientY - canvas.offsetTop will be useful for embedding
        Input.downState = true;
        if (Graph.hovered) {
            Graph.hoveredShift.setFrom(Graph.hovered.pos.sub(App.cursor))
        } else {
            Input.downPos.setFrom(Input.pointer)
        }
        App.lastClickHandled = false
    }
    static pointermoveHandler(e) {
        Input.pointer.set(e.offsetX, e.offsetY);
        App.updateCursor()
    }
    static pointerupHandler(e) {
        Input.pointer.set(e.offsetX, e.offsetY);
        Input.downState = false;
        if (Graph.selected) {
            Graph.selected.color = "black"
            Graph.selected = null
            canvas.classList.remove("dragging")
        } else {
            Camera.applyShift()
            canvas.classList.remove("moving")
        }
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
        if (pause) return;
        Input.zoom += e.deltaY
        Camera.updateScale()
    }

    static copyHandler(e) {
        e.clipboardData.setData("text/plain", Graph.serialize())
        e.preventDefault()
    }

    static pasteHandler(e) {
        e.preventDefault()
        const text = (e.clipboardData || window.clipboardData)?.getData("text")
        Graph.deserialize(text.trim())
        if (pause) render()
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
    "copy",
    "paste",
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
