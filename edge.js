class Edge {
	constructor(node1, node2) {
		this.node1 = node1
		this.node2 = node2
	}
	update(lag) {
	}
	render() {
		Ctx.save()
		Ctx.beginPath()
		Ctx.moveTo(this.node1.pos)
		Ctx.lineTo(this.node2.pos)
		Ctx.strokeStyle("black")
		Ctx.stroke()
		Ctx.restore()
	}
}
