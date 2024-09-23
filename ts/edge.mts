import { Ctx } from "./ctx.mjs";
import { Graph } from "./graph.mjs";
import { Node } from "./node.mjs";
import { Vector } from "./vector.mjs";
class Edge {
  node1: Node;
  node2: Node;
  directed: boolean;
  constructor(node1: Node, node2: Node, directed = false) {
    this.node1 = node1;
    this.node2 = node2;
    this.directed = directed;
  }
  update(lag: number) {
    const dt = this.node1.pos.sub(this.node2.pos).scale(Graph.edgeTension);
    if (this.directed === false) this.node1.pos.addMut(dt.scale(-0.5));
    this.node2.pos.addMut(dt.scale(0.5));
  }
  render() {
    Ctx.save();
    Ctx.beginPath();
    Ctx.moveTo(this.node1.pos);
    Ctx.lineTo(this.node2.pos);
    if (this.directed) {
      const perpShift = this.node2.pos.sub(this.node1.pos).clamp(10);
      Ctx.lineTo(this.node2.pos.add(new Vector(perpShift.y, -perpShift.x)));
      Ctx.lineTo(this.node1.pos);
    }
    Ctx.strokeStyle("black");
    Ctx.stroke();
    Ctx.restore();
  }
  toString() {
    return `${this.node1.label} ${this.directed ? "->" : "--"} ${
      this.node2.label
    }`;
  }
}
export { Edge };