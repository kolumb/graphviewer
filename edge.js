class Edge {
	constructor(node1, node2) {
		this.node1 = node1
		this.node2 = node2
	}
	static serialize(nodes) {
		let result = "strict graph {\n"
		result += nodes.map((node, i) => {
			const x = String(node.pos.x.toFixed(0)).padStart(5, " ")
			const y = String(node.pos.y.toFixed(0)).padStart(5, " ")
			return `    node${i} [x=${x}, y=${y}, label="${node.label.replaceAll("\\", "\\\\").replaceAll("\"", "\\\"")}"]`
		}).join(";\n")
		return result + ";\n}\n"
	}
	static deserialize(text) {
		nodes.length = 0
		const lines = text.split("\n").map(s => s.trim())
		if (lines[0] !== "strict graph {" || lines[lines.length - 1] !== "}") {
			console.log(lines[0])
			console.log(lines[lines.length - 1])
			todo("Error while parsing pasted data")
		}
		const result = []
		for (let i = 1; i < lines.length - 1; i++) {
			const line = lines[i]
			const [_, id, attributes] = line.trim().match(/(\S+)\s\[(.*)\];/)
			let [x, y, label] = attributes.split(", ").map(pair => pair.split("=").slice(1).join("=").trim())
			x = parseInt(x)
			y = parseInt(y)
			label = label.slice(1, label.length - 1)
			const pos = new Vector(x, y)
			result.push(new Node(pos, label))
		}
		nodes.push(...result)
	}

	update() {
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