import { Node } from "./node.mjs";
declare class Edge {
    node1: Node;
    node2: Node;
    directed: boolean;
    constructor(node1: Node, node2: Node, directed?: boolean);
    update(lag: number): void;
    render(): void;
    toString(): string;
}
export { Edge };
