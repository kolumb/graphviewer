class Node {
	static height = 15
	color = "black"
	constructor(pos = new Vector(), label = "") {
		this.pos = pos
		this.label = label
		this.textWidth = Ctx.measureText(label).width
	}
	update() {
		this.color = "black"
		const cursorDist = this.pos.sub(cursor)
		if (cursorDist.x > -this.textWidth / 2 - 10
			&& cursorDist.x < this.textWidth / 2 + 10
			&& cursorDist.y > -Node.height
			&& cursorDist.y < Node.height) {
			if (!hoveredNode) {
				hoveredNode = this
				this.color = "blue"
			}
		}
	}
	render() {
		Ctx.save()
		Ctx.translate(this.pos)
		Ctx.beginPath()
		Ctx.ellipse(Vector.zero, new Vector(this.textWidth / 2 + 10, Node.height), 0, 0, Math.PI * 2)
		if (hoveredNode === this) {
			Ctx.fillStyle("#ddd")
			Ctx.fill()
		}
		Ctx.strokeStyle(this.color)
		Ctx.stroke()
		Ctx.fillStyle("black")
		Ctx.fillText(this.label, new Vector(0, 4))
		Ctx.restore()
	}
}