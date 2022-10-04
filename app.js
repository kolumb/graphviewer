class App {
    static pause = false;

    static cursor = new Vector();

    static lastClickHandled = true

    static states = Enum(["default", "panning", "dragging", "paused"])
    static state = App.states.default

    static updateCursor() {
        App.cursor.setFrom(Input.pointer.add(Camera.pos.add(Camera.shift)).scale(1 / Camera.scale))
    }

    static update(lag) {
        if (!App.lastClickHandled) {
            App.lastClickHandled = true
            if (Graph.hovered) {
                if (Graph.selected) assert(false, "Unreachable")
                Graph.select(Graph.hovered)
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
                Graph.selected.pos.setFrom(App.cursor.add(Graph.hoveredShift))
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
}
