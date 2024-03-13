import { Edge } from "./edge.mjs";
import { Node } from "./node.mjs";
import { Vector } from "./vector.mjs";
declare class Graph {
    static nodes: Node[];
    static edges: Edge[];
    static hovered: Node | null;
    static selected: Node | null;
    static selectedShift: Vector;
    static selectedOriginalPos: Vector;
    static selectedList: never[];
    static repelling: number;
    static maxSpeed: number;
    static attraction: number;
    static edgeTension: number;
    static update(lag: number): void;
    static render(): void;
    static select(node: Node): void;
    static deselect(): void;
    static getCenterOfMass(): Vector;
    static serialize(): string;
    static deserialize(text: string): void;
    static parseAttributes(id: string, attributes: string): void;
}
export { Graph };
