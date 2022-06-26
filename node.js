class Node {
	constructor(pos = new Vector(), label = "") {
		this.pos = pos
		this.label = label
	}
	render() {
		Ctx.save()
		Ctx.translate(this.pos)
		Ctx.beginPath()
		Ctx.arc(Vector.zero, 20, 0, Math.PI * 2)
		Ctx.stroke()
		Ctx.restore()
	}
}