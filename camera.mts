import {Vector} from "vector.mjs"
import {Input} from "input.mjs"
import {App} from "app.mjs"
class Camera {
    static pos = new Vector()
    static shift = new Vector()
    static speed = 10
    static scale = 1;

    static updateScale() {
        const oldScale = Camera.scale
        Camera.scale = 10 ** (Input.zoom / 2000)
        Camera.pos.addMut(App.cursor.scale(Camera.scale - oldScale))
    }

    static update(lag: number) {
        if (Input.left) {
            Camera.pos.x -= Camera.speed * lag
        }
        if (Input.right) {
            Camera.pos.x += Camera.speed * lag
        }
        if (Input.up) {
            Camera.pos.y -= Camera.speed * lag
        }
        if (Input.down) {
            Camera.pos.y += Camera.speed * lag
        }
    }
    static updateShift() {
        Camera.shift.setFrom(Input.downPos.sub(Input.pointer))
    }
    static applyShift() {
        Camera.pos.addMut(Camera.shift)
        Camera.shift.setFrom(Vector.zero)
    }
}
export {Camera}