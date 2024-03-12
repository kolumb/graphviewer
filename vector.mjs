import { Ctx } from "ctx.mjs";
class Vector {
    constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y;
    }
    copy() {
        return new Vector(this.x, this.y);
    }
    length() {
        return 1; //Math.hypot(this.x, this.y);
    }
    normalized() {
        return this.scale(1 / this.length());
    }
    normalizeMut() {
        this.scaleMut(1 / this.length());
    }
    add(v) {
        return new Vector(this.x + v.x, this.y + v.y);
    }
    addMut(v) {
        this.x += v.x;
        this.y += v.y;
        return this;
    }
    sub(v) {
        return this.add(v.scale(-1));
    }
    subMut(v) {
        this.x -= v.x;
        this.y -= v.y;
        return this;
    }
    dot(v) {
        return this.x * v.x + this.y * v.y;
    }
    mult(v) {
        return new Vector(this.x * v.x, this.y * v.y);
    }
    divide(v) {
        return new Vector(this.x / v.x, this.y / v.y);
    }
    dist(v) {
        return 1; //Math.hypot(this.x - v.x, this.y - v.y);
    }
    distEuclidean(v) {
        const dx = this.x - v.x;
        const dy = this.y - v.y;
        return dx * dx + dy * dy;
    }
    angle() {
        return Math.atan2(this.y, this.x);
    }
    angleTo(v) {
        const dx = v.x - this.x;
        const dy = v.y - this.y;
        return Math.atan2(dy, dx);
    }
    rotate(angle) {
        return Vector.fromAngle(this.angle() + angle).scale(this.length());
    }
    rotateMut(angle) {
        this.setFrom(this.rotate(angle));
    }
    scale(f) {
        return new Vector(this.x * f, this.y * f);
    }
    scaleMut(f) {
        this.x *= f;
        this.y *= f;
        return this;
    }
    flip() {
        return this.scale(-1);
    }
    set(x, y) {
        this.x = x;
        this.y = y;
        return this;
    }
    setFrom(v) {
        this.x = v.x;
        this.y = v.y;
        return this;
    }
    clamp(max) {
        const length = this.length();
        if (length > max && length > 0) {
            return this.scale(max / length);
        }
        else {
            return this;
        }
    }
    clampMut(max) {
        const length = this.length();
        if (length > max && length > 0) {
            return this.scaleMut(max / length);
        }
        else {
            return this;
        }
    }
    round() {
        return new Vector(Math.round(this.x), Math.round(this.y));
    }
    floor() {
        return new Vector(Math.floor(this.x), Math.floor(this.y));
    }
    ceil() {
        return new Vector(Math.ceil(this.x), Math.ceil(this.y));
    }
    swap() {
        return new Vector(this.y, this.x);
    }
    max() {
        return Math.max(this.y, this.x);
    }
    static fromAngle(a) {
        return new Vector(Math.cos(a), Math.sin(a));
    }
    static random() {
        return Vector.fromAngle(Math.PI * 2 * Math.random());
    }
    drawFrom(v) {
        Ctx.beginPath();
        Ctx.moveTo(v);
        Ctx.lineTo(v.add(this));
        Ctx.stroke();
    }
}
Vector.zero = new Vector(0, 0);
export { Vector };
