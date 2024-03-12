class Node {
  static idCounter = 0;
  static height = 15;
  color = "black";
  constructor(id, pos = new Vector(), label = "") {
    this.id = id;
    this.pos = pos;
    this.label = label;
    this.textWidth = Ctx.measureText(label).width;
  }

  checkCollision(pos) {
    const dist = this.pos.sub(pos);
    return (
      dist.x > -this.textWidth / 2 - 10 &&
      dist.x < this.textWidth / 2 + 10 &&
      dist.y > -Node.height &&
      dist.y < Node.height
    );
  }

  update(lag) {
    if (this.checkCollision(App.cursor)) {
      if (Graph.selected !== this) {
        Graph.hovered = this;
      }
    }
    const repellingForce = Graph.nodes.reduce((acc, node, i) => {
      if (node === this) return acc;
      const dt = this.pos.sub(node.pos);
      const length = dt.length();
      const force = Graph.repelling / length;
      return acc.add(dt.normalized().scale(force));
    }, new Vector());
    // this.vel = repellingForce.clamp(Graph.maxSpeed)
    this.pos.addMut(repellingForce.clamp(Graph.maxSpeed));
    const centerOfMass = Graph.getCenterOfMass();
    const hackToPreventInfinityInSingleNodeGraph = this.pos.add(
      Vector.random()
    );
    const attraction = centerOfMass
      .sub(hackToPreventInfinityInSingleNodeGraph)
      .normalized()
      .scale(Graph.attraction);
    this.pos.addMut(attraction);
  }
  render() {
    Ctx.save();
    Ctx.translate(this.pos);
    Ctx.beginPath();
    Ctx.ellipse(
      Vector.zero,
      new Vector(this.textWidth / 2 + 10, Node.height),
      0,
      0,
      Math.PI * 2
    );
    Ctx.fillStyle(this === Graph.hovered ? "#ddd" : "#ccc");
    Ctx.fill();
    Ctx.strokeStyle(this.color);
    Ctx.stroke();
    Ctx.fillStyle("black");
    Ctx.fillText(this.label, new Vector(0, 3));
    if (App.potentialConnectionToggle && this === Graph.selected) {
      Ctx.fillText("Toggle connection", new Vector(0, -20));
    }
    Ctx.restore();
  }
}
