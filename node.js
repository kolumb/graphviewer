class Node {
	static idCounter = 0
	static height = 15
	color = "black"
	constructor(id, pos = new Vector(), label = "") {
		this.id = id
		this.pos = pos
		this.label = label
		this.textWidth = Ctx.measureText(label).width
	}

	checkCollision(pos) {
		const dist = this.pos.sub(pos)
		return dist.x > -this.textWidth / 2 - 10
			&& dist.x < this.textWidth / 2 + 10
			&& dist.y > -Node.height
			&& dist.y < Node.height
	}

	update(lag) {
		if (this.checkCollision(App.cursor)) {
			if (Graph.selected !== this) {
				Graph.hovered = this
			}
		}
	}
	render() {
		Ctx.save()
		Ctx.translate(this.pos)
		Ctx.beginPath()
		Ctx.ellipse(Vector.zero, new Vector(this.textWidth / 2 + 10, Node.height), 0, 0, Math.PI * 2)
		Ctx.fillStyle(this === Graph.hovered ? "#ddd" : "#ccc")
		Ctx.fill()
		Ctx.strokeStyle(this.color)
		Ctx.stroke()
		Ctx.fillStyle("black")
		Ctx.fillText(this.label, new Vector(0, 3))
		if (App.potentialConnectionToggle && this === Graph.selected) {
			Ctx.fillText("Toggle connection", new Vector(0, -20))
		}
		Ctx.restore()
	}
}
