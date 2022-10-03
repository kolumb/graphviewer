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
	// TODO: Because both Node and Edge need serialization, it has to be done outside.
	static serialize(nodes) {
		let result = "strict graph {\n"
		result += nodes.map(node => {
			const x = String(node.pos.x.toFixed(0)).padStart(5, " ")
			const y = String(node.pos.y.toFixed(0)).padStart(5, " ")
			return `    node${node.id} [x=${x}, y=${y}, label="${node.label.replaceAll("\\", "\\\\").replaceAll("\"", "\\\"")}"]`
		}).join(";\n")
		result += nodes.length ? ";\n" : ""
		result += edges.map(edge => {
			return `    node${edge.node1.id} -- node${edge.node2.id}`
		}).join(";\n")
		result += edges.length ? ";\n" : ""
		return result + "}\n"
	}
	static deserialize(text) {
		nodes.length = 0
		edges.length = 0
		const lines = text.split("\n").map(s => s.trim())
		if (lines[0] !== "strict graph {" || lines[lines.length - 1] !== "}") {
			console.log(lines[0])
			console.log(lines[lines.length - 1])
			todo("Error while parsing pasted data")
		}
		for (let i = 1; i < lines.length - 1; i++) {
			const line = lines[i]
			if (line.indexOf("--") < 0) {
				const [_, id, attributes] = line.trim().match(/(\S+)\s\[(.*)\];/)
				let [x, y, label] = attributes.split(", ").map(pair => pair.split("=").slice(1).join("=").trim())
				x = parseInt(x)
				y = parseInt(y)
				label = label.slice(1, label.length - 1).replaceAll("\\\"", "\"").replaceAll("\\\\", "\\")
				const pos = new Vector(x, y)
				nodes.push(new Node(id.slice(4), pos, label))
			} else {
				const [_, node1ID, node2ID] = line.trim().match(/(\S+)\s*--\s*(\S+);/)
				const node1 = nodes.find(node => `node${node.id}` === node1ID)
				const node2 = nodes.find(node => `node${node.id}` === node2ID)
				edges.push(new Edge(node1, node2))
			}
		}
	}

	checkCollision(pos) {
		const dist = this.pos.sub(pos)
		return dist.x > -this.textWidth / 2 - 10
			&& dist.x < this.textWidth / 2 + 10
			&& dist.y > -Node.height
			&& dist.y < Node.height
	}

	update() {
		if (this.checkCollision(App.cursor)) {
			App.hoveredNode = this
		}
	}
	render() {
		Ctx.save()
		Ctx.translate(this.pos)
		Ctx.beginPath()
		Ctx.ellipse(Vector.zero, new Vector(this.textWidth / 2 + 10, Node.height), 0, 0, Math.PI * 2)
		Ctx.fillStyle(this === App.hoveredNode ? "#ddd" : "#ccc")
		Ctx.fill()
		Ctx.strokeStyle(this.color)
		Ctx.stroke()
		Ctx.fillStyle("black")
		Ctx.fillText(this.label, new Vector(0, 4))
		Ctx.restore()
	}
}
