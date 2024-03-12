import { Edge } from "./edge.mjs";
import { Node } from "./node.mjs";
import { Vector } from "./vector.mjs";
declare enum States {
    default = 0,
    panning = 1,
    dragging = 2,
    paused = 3
}
declare class App {
    static pause: boolean;
    static cursor: Vector;
    static lastClickHandled: boolean;
    static potentialConnectionToggle: boolean;
    static state: States;
    static unstaged: {
        edges: Edge[];
        nodes: Node[];
    };
    static menu: Element;
    static placeFromUnstaged(): void;
    static updateCursor(): void;
    static update(lag: number): void;
    static applyShift(): void;
    static connectOveralpped(): void;
    static updateMenu(): void;
}
export { App };
