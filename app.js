class App {
    static cursor = new Vector()
    updateCursor() {
        App.cursor.setFrom(Input.pointer.add(cameraTopLeft.add(cameraShift)).scale(1 / Input.scale))
    }
}
