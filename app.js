class App {
    static cursor = new Vector();

    static hoveredNode;
    static hoveredNodeShift = new Vector();

    static lastClickHandled = true

    static selectedNode;
    static selectedNodes = [];


    static states = Enum(["default", "panning", "dragging"])
    static state = App.states.default

    static updateCursor() {
        App.cursor.setFrom(Input.pointer.add(Camera.pos.add(Camera.shift)).scale(1 / Camera.scale))
    }

    static update(lag) {
        if (!App.lastClickHandled) {
            App.lastClickHandled = true
            if (App.hoveredNode) {
                if (!App.selectedNode) {
                    App.selectedNode = App.hoveredNode
                    App.selectedNode.color = "blue"
                    canvas.classList.add("dragging")
                }
            } else {
                if (App.selectedNode) {
                    App.selectedNode.color = "orange"
                    App.selectedNode = null
                }
                canvas.classList.add("moving")
            }
        }
        if (Input.downState) {
            if (App.selectedNode) {
                App.selectedNode.pos.setFrom(App.cursor.add(App.hoveredNodeShift))
            } else {
                Camera.updateShift()
            }
        } else {
            if (App.hoveredNode) {
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
