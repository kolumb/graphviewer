import { Vector } from "./vector.mjs";
declare class Node {
    static idCounter: number;
    static height: number;
    color: string;
    id: string;
    pos: Vector;
    label: string;
    textWidth: number;
    constructor(id: string, pos?: Vector, label?: string);
    checkCollision(pos: Vector): boolean;
    update(lag: number): void;
    render(): void;
    renderPrevious(pos: Vector): void;
}
export { Node };
