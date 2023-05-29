class Edge {
	constructor(node1, node2, directed = false) {
		this.node1 = node1
		this.node2 = node2
		this.directed = directed
	}
	update(lag) {
	}
	render() {
		Ctx.save()
		Ctx.beginPath()
		Ctx.moveTo(this.node1.pos)
		Ctx.lineTo(this.node2.pos)
		if (this.directed) {
			const perpShift = this.node2.pos.sub(this.node1.pos).clamp(10)
			Ctx.lineTo(this.node2.pos.add(new Vector(perpShift.y, -perpShift.x)))
			Ctx.lineTo(this.node1.pos)
		}
		Ctx.strokeStyle("black")
		Ctx.stroke()
		Ctx.restore()
	}
}
