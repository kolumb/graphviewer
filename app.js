class App {
    static cursor = new Vector();
    static scale = 1;
    static updateCursor() {
        App.cursor.setFrom(Input.pointer.add(cameraTopLeft.add(cameraShift)).scale(1 / App.scale))
    }
    static updateScale() {
        App.scale = 10 ** (Input.zoom / 2000)
    }
}
