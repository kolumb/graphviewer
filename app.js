class App {
    static pause = false;

    static cursor = new Vector();

    static lastClickHandled = true
    static potentialConnectionToggle = false

    static states = Enum(["default", "panning", "dragging", "paused"])
    static state = App.states.default

    static updateCursor() {
        App.cursor.setFrom(Input.pointer.add(Camera.pos.add(Camera.shift)).scale(1 / Camera.scale))
    }

    static update(lag) {
        if (!App.lastClickHandled) {
            App.lastClickHandled = true
            if (App.pause) {
                conosole.log("TODO: Skipping in pause")
                return;
            }
            if (Graph.hovered && Graph.hovered.checkCollision(App.cursor)) {
                if (Graph.selected) console.log("Unreachable")
                Graph.select(Graph.hovered)
                Graph.hovered = null
                canvas.classList.add("dragging")
            } else {
                if (Graph.selected) {
                    Graph.selected.color = "orange"
                    Graph.selected = null
                }
                canvas.classList.add("moving")
            }
        }
        if (Input.downState) {
            if (Graph.selected) {
                Graph.selected.pos.setFrom(App.cursor.add(Graph.selectedShift))
                App.potentialConnectionToggle = Graph.hovered !== null
            } else {
                Camera.updateShift()
            }
        } else {
            if (Graph.hovered) {
                if (!canvas.classList.contains("hovering")) {
                    canvas.classList.add("hovering")
                }
            } else {
                if (canvas.classList.contains("hovering")) {
                    canvas.classList.remove("hovering")
                }
            }
        }
    }

    static applyShift() {
        if (Graph.selected) {
            Graph.deselect()
            canvas.classList.remove("dragging")
        } else {
            Camera.applyShift()
            canvas.classList.remove("moving")
        }
    }

    static connectOveralpped() {
        if (Graph.selected && Graph.hovered && Graph.selected != Graph.hovered) {
            const existingEgde = Graph.edges.find(e =>
                (e.node1.id === Graph.selected.id && e.node2.id === Graph.hovered.id)
                || (e.node1.id === Graph.hovered.id && e.node2.id === Graph.selected.id)
            )
            if (existingEgde) {
                existingEgde.node1 = null
                existingEgde.node2 = null
                Graph.edges.splice(Graph.edges.indexOf(existingEgde), 1)
            } else {
                Graph.edges.push(new Edge(Graph.selected, Graph.hovered))
            }
        }
    }
}
