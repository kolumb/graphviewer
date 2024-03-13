import { Vector } from "./vector.mjs";
type PointerID = {
    id: number;
    pos: Vector;
};
declare class Input {
    static up: boolean;
    static down: boolean;
    static left: boolean;
    static right: boolean;
    static pointer: Vector;
    static downState: boolean;
    static zoom: number;
    static downPos: Vector;
    static pointerIDs: PointerID[];
    static lastDist: number;
    static pointerdownHandler(e: PointerEvent): void;
    static pointermoveHandler(e: PointerEvent): void;
    static pointerupHandler(e: PointerEvent): void;
    static keydownHandler(e: KeyboardEvent): void;
    static keyupHandler(e: KeyboardEvent): void;
    static wheelHandler(e: WheelEvent): void;
    static copyHandler(e: ClipboardEvent): void;
    static pasteHandler(e: ClipboardEvent): void;
}
declare const EVENT: {
    [key: string]: string | number;
};
export { Input, EVENT };
