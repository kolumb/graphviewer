class Graph {
    static nodes = []
    static edges = []
    static hovered
    static selected
    static selectedShift = new Vector();
    static selectedOriginalPos = new Vector();
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
    static getCenterOfMass() {
        if (Graph.nodes.length === 0) return new Vector()
        return Graph.nodes.reduce((acc, node) => {
            return acc.add(node.pos)
        }, new Vector()).scale(1/Graph.nodes.length)
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
        const lines = text.trim().split("\n").map(s => s.trim()).filter(String)
        if (lines[0] !== "strict graph {" || lines[lines.length - 1] !== "}") {
            console.log(lines[0])
            console.log(lines[lines.length - 1])
            assert(false, "Error while parsing pasted data")
        }
        const states = Enum(["trim", "node", "attributesOrSeparator", "attributes", "separator", "string"])
        const connectionTypes = Enum(["undefined", "undirected", "directed"])
        for (let i = 1; i < lines.length - 1; i++) {
            const line = lines[i]
            let currentState = states.trim
            let token = ""
            let id1 = ""
            let id2 = ""
            let connectionType = connectionTypes.undefined
            for (let j = 0; j < line.length; j++) {
                const c = line[j]
                // console.log(c)
                // console.log(currentState)
                switch (currentState) {
                case states.trim:
                    switch (c) {
                    case "\t":
                    case " ":
                        break
                    case "\"":
                        assert(id2 === "", "Orphan string literal")
                        currentState = states.string
                        break
                    case "-":
                        assert(connectionType === connectionType.undefined, id1 === ""
                            ? "Illigal start of node name"
                            : "Second connection is not supported")
                        break
                    case "\r":
                    case ";":
                        assert(connectionType === connectionTypes.undefined || id2 !== "", "Expected second node name")
                        break
                    default:
                        assert(id2 === "", "Unxpected third node name")
                        currentState = states.node
                        assert(token === "", "Garbage in token accumulator")
                        token += c
                    }
                    break
                case states.node:
                    switch (c) {
                    case "\t":
                    case " ":
                        currentState = states.attributesOrSeparator
                        if (id1 !== "") {
                            assert(id2 === "", "Illigal space in second node name")
                            id2 = token
                        } else {
                            id1 = token
                        }
                        token = ""
                        break
                    case "\r":
                    case ";":
                        currentState = states.trim
                        if (id1 !== "") {
                            assert(id2 === "")
                            assert(connectionType !== connectionType.undefined)
                            id2 = token
                        } else {
                            id1 = token
                        }
                        token = ""
                        break
                    default:
                        token += c
                    }
                    break
                case states.attributesOrSeparator:
                    switch (c) {
                    case "[":
                        currentState = states.attributes
                        break
                    case "\"":
                        assert(false, "Unexpected string")
                        break
                    case "-":
                        currentState = states.separator
                        break
                    case "\t":
                    case " ":
                        break
                    case "\r":
                    case ";":
                        // node without attributes and edge
                        break
                    default:
                        assert(false, "Unexpected string " + c)
                    }
                    break
                case states.attributes:
                    switch (c) {
                    case "]":
                        currentState = states.trim
                        Graph.parseAttributes(id1, token)
                        token = ""
                        break
                    case "\r":
                    case ";":
                        assert(false, "Unclosed attributes list (missing \"]\")")
                        break
                    default:
                        token += c
                    }
                    break
                case states.separator:
                    switch (c) {
                    case "-":
                        connectionType = connectionTypes.undirected
                        currentState = states.trim
                        break
                    case ">":
                        connectionType = connectionTypes.directed
                        currentState = states.trim
                        break
                    case "\r":
                    case ";":
                        assert(false, "Unfinished separator (supported connections are -- and -> )")
                        break
                    default:
                        assert(false, "Invalid separator. Expected -- or -> or attributes list in [ ]")
                    }
                    break
                case states.string:
                    switch (c) {
                    case "\"":
                        currentState = states.attributesOrSeparator
                        if (id1 !== "") {
                            assert(id2 === "")
                            assert(connectionType !== connectionType.undefined)
                            id2 = token
                        } else {
                            id1 = token
                        }
                        token = ""
                        break
                    case "\r":
                        assert(false, "Unfinished string literal")
                        break
                    default:
                        token += c
                    }
                    break
                default:
                    assert(false, "Unreachable " + currentState)
                }
            }
            assert(currentState == states.trim || currentState == states.attributesOrSeparator, "Unexpected state after deserialization " + currentState)
            assert(connectionType === connectionTypes.undefined || id2 !== "")

            if (connectionType !== connectionTypes.undefined) {
                let node1 = App.unstaged.nodes.find(node => `${node.id}` === id1)
                if (!node1) {
                    const pos = new Vector((Math.random()*500 - 250) | 0, (Math.random()*500 - 250) | 0)
                    node1 = new Node(id1, pos, id1)
                    App.unstaged.nodes.push(node1)
                }
                let node2 = App.unstaged.nodes.find(node => `${node.id}` === id2)
                if (!node2) {
                    const pos = new Vector((Math.random()*500 - 250) | 0, (Math.random()*500 - 250) | 0)
                    node2 = new Node(id2, pos, id2)
                    App.unstaged.nodes.push(node2)
                }
                App.unstaged.edges.push(new Edge(node1, node2, connectionType === connectionTypes.directed))
            }
        }
    }
    static parseAttributes(id, attributes) {
        // TODO: Search for existing node, before creating new one
        let [x, y, label] = attributes.split(", ").map(pair => pair.split("=").slice(1).join("=").trim())
        x = parseInt(x)
        y = parseInt(y)
        label = label.slice(1, label.length - 1).replaceAll("\\\"", "\"").replaceAll("\\\\", "\\")
        const pos = new Vector(x, y)
        App.unstaged.nodes.push(new Node(id, pos, label))
    }
}
