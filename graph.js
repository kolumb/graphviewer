class Graph {
    static nodes = []
    static edges = []
    static hovered
    static selected
    static selectedShift = new Vector();
    static selectedList = [];
    static update(lag) {
        Graph.hovered = null
        Graph.nodes.forEach(node => node.update(lag))
    }
    static render(lag) {
        Graph.edges.forEach(edge => edge.render())
        Graph.nodes.forEach(node => node.render())
    }
    static select(node) {
        Graph.selected = node
        Graph.selectedShift.setFrom(node.pos.sub(App.cursor))
        Graph.nodes.splice(Graph.nodes.indexOf(node), 1)
        Graph.nodes.push(node)
        Graph.selected.color = "blue"
    }
    static deselect() {
        Graph.selected.color = "black"
        Graph.selected = null
    }
    static serialize() {
        let result = "strict graph {\n"
        result += Graph.nodes.map(node => {
            const x = String(node.pos.x.toFixed(0)).padStart(5, " ")
            const y = String(node.pos.y.toFixed(0)).padStart(5, " ")
            return `    node${node.id} [x=${x}, y=${y}, label="${node.label.replaceAll("\\", "\\\\").replaceAll("\"", "\\\"")}"]`
        }).join(";\n")
        result += Graph.nodes.length ? ";\n" : ""
        result += Graph.edges.map(edge => {
            return `    node${edge.node1.id} -- node${edge.node2.id}`
        }).join(";\n")
        result += Graph.edges.length ? ";\n" : ""
        return result + "}\n"
    }
    static deserialize(text) {
        Graph.nodes.length = 0
        Graph.edges.length = 0
        const lines = text.trim().split("\n").map(s => s.trim())
        if (lines[0] !== "strict graph {" || lines[lines.length - 1] !== "}") {
            console.log(lines[0])
            console.log(lines[lines.length - 1])
            assert(false, "Error while parsing pasted data")
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
                Graph.nodes.push(new Node(id.slice(4), pos, label))
            } else {
                const [_, node1ID, node2ID] = line.trim().match(/(\S+)\s*--\s*(\S+);/)
                const node1 = Graph.nodes.find(node => `node${node.id}` === node1ID)
                const node2 = Graph.nodes.find(node => `node${node.id}` === node2ID)
                Graph.edges.push(new Edge(node1, node2))
            }
        }
    }
}
