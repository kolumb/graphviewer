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
    static pointerIDs = [] // TODO: Fix bugs in multitouch zoom
    static lastDist = 0

    static pointerdownHandler(e) {
        if (Input.pointerIDs.length !== 1) {
            Input.pointer.set(e.offsetX, e.offsetY); // TODO: Check if e.clientY - canvas.offsetTop will be useful for embedding
            Input.downPos.setFrom(Input.pointer)
            Input.downState = true;
            App.lastClickHandled = false
            App.updateCursor()
        }
        Input.pointerIDs.push({id: e.pointerId, pos: new Vector(e.offsetX, e.offsetY)})
    }
    static pointermoveHandler(e) {
        if (Input.pointerIDs.length === 2) {
            const newDist = Input.pointerIDs[0].pos.distEuclidean(Input.pointerIDs[1].pos)
            if (Input.lastDist != 0) {
                Input.zoom += (newDist - Input.lastDist) / 100
                Camera.updateScale()
            }
            Input.lastDist = newDist
        } else {
            Input.pointer.set(e.offsetX, e.offsetY);
            Input.lastDist = 0
            App.updateCursor()
        }
        Input.pointerIDs.find(p => p.id === e.pointerId)?.pos.set(e.offsetX, e.offsetY)
    }
    static pointerupHandler(e) {
        if (Input.pointerIDs.length !== 2) {
            Input.pointer.set(e.offsetX, e.offsetY);
            Input.downState = false;
            App.connectOveralpped()
            App.applyShift()
        }
        const index = Input.pointerIDs.find(p => p.id === e.pointerId)
        Input.pointerIDs.splice(index, 1)
    }

    static keydownHandler(e) {
        switch (e.code) {
            case KEY.space:
                if (e.target.tagName === "BUTTON") return;
            case KEY.p:
                App.pause = !App.pause;
                if (App.pause === false) {
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
        if (App.pause) return;
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
        if (App.pause) render()
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
