class Node {
	constructor(pos = new Vector(), label = "") {
		this.pos = pos
		this.label = label
		this.textWidth = Ctx.measureText(label).width
	}
	render() {
		Ctx.save()
		Ctx.translate(this.pos)
		Ctx.beginPath()
		Ctx.ellipse(Vector.zero, new Vector(this.textWidth / 2 + 10, 15), 0, 0, Math.PI * 2)
		Ctx.stroke()
		Ctx.fillText(this.label, new Vector(0, 4))
		Ctx.restore()
	}
}