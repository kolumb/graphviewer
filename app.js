class App {
    static cursor = new Vector();
    static camera = new Vector();
    static cameraShift = new Vector();
    static cameraSpeed = 10
    static scale = 1;

    static hoveredNode;
    static hoveredNodeShift = new Vector();

    static lastClickHandled = true

    static selectedNode;
    static selectedNodes = [];

    static updateCursor() {
        App.cursor.setFrom(Input.pointer.add(App.camera.add(App.cameraShift)).scale(1 / App.scale))
    }
    static updateScale() {
        const oldScale = App.scale
        App.scale = 10 ** (Input.zoom / 2000)
        App.camera.addMut(App.cursor.scale(App.scale - oldScale))
    }
    static updateCamera(lag) {
        if (Input.left) {
            App.camera.x -= App.cameraSpeed * lag
        }
        if (Input.right) {
            App.camera.x += App.cameraSpeed * lag
        }
        if (Input.up) {
            App.camera.y -= App.cameraSpeed * lag
        }
        if (Input.down) {
            App.camera.y += App.cameraSpeed * lag
        }
    }
    static updateCameraShift() {
        App.cameraShift.setFrom(Input.downPos.sub(Input.pointer))
    }
    static applyCameraShift() {
        App.camera.addMut(App.cameraShift)
        App.cameraShift.setFrom(Vector.zero)
    }
}
