import type { Vector } from "vector.mjs";

class Ctx {
  static ctx: CanvasRenderingContext2D;

  static fillStyle(style: string) {
    Ctx.ctx.fillStyle = style;
  }
  static strokeStyle(style: string) {
    Ctx.ctx.strokeStyle = style;
  }

  static beginPath() {
    Ctx.ctx.beginPath();
  }
  static closePath() {
    Ctx.ctx.closePath();
  }
  static moveTo(v: Vector) {
    Ctx.ctx.moveTo(v.x, v.y);
  }
  static lineTo(v: Vector) {
    Ctx.ctx.lineTo(v.x, v.y);
  }
  static quadraticCurveTo(controlPoint: Vector, endPos: Vector) {
    Ctx.ctx.quadraticCurveTo(
      controlPoint.x,
      controlPoint.y,
      endPos.x,
      endPos.y
    );
  }
  static bezierCurveTo(
    controlPoint1: Vector,
    controlPoint2: Vector,
    endPos: Vector
  ) {
    Ctx.ctx.bezierCurveTo(
      controlPoint1.x,
      controlPoint1.y,
      controlPoint2.x,
      controlPoint2.y,
      endPos.x,
      endPos.y
    );
  }
  static arc(
    pos: Vector,
    radius: number,
    startAngle: number,
    endAngle: number,
    counterclockwise: boolean
  ) {
    Ctx.ctx.arc(pos.x, pos.y, radius, startAngle, endAngle, counterclockwise);
  }
  static arcTo(controlPoint1: Vector, controlPoint2: Vector, radius: number) {
    Ctx.ctx.arcTo(
      controlPoint1.x,
      controlPoint1.y,
      controlPoint2.x,
      controlPoint2.y,
      radius
    );
  }
  static ellipse(
    pos: Vector,
    radius: Vector,
    rotation: number,
    startAngle: number,
    endAngle: number,
    counterclockwise: boolean
  ) {
    Ctx.ctx.ellipse(
      pos.x,
      pos.y,
      radius.x,
      radius.y,
      rotation,
      startAngle,
      endAngle,
      counterclockwise
    );
  }
  static rect(topLeft: Vector, size: Vector) {
    Ctx.ctx.rect(topLeft.x, topLeft.y, size.x, size.y);
  }

  static lineWidth(width: number) {
    Ctx.ctx.lineWidth = width;
  }
  static lineCap(cap: CanvasLineCap) {
    Ctx.ctx.lineCap = cap;
  }
  static lineJoin(join: CanvasLineJoin) {
    Ctx.ctx.lineJoin = join;
  }
  static miterLimit(limit: number) {
    Ctx.ctx.miterLimit = limit;
  }
  static getLineDash() {
    return Ctx.ctx.getLineDash();
  }
  static setLineDash(segments: number[]) {
    Ctx.ctx.setLineDash(segments);
  }
  static lineDashOffset(offset: number) {
    Ctx.ctx.lineDashOffset = offset;
  }
  static font(fontDescription: string) {
    Ctx.ctx.font = fontDescription;
  }
  static textAlign(align: CanvasTextAlign) {
    Ctx.ctx.textAlign = align;
  }
  static textBaseline(baseline: CanvasTextBaseline) {
    Ctx.ctx.textBaseline = baseline;
  }
  static direction(direction: CanvasDirection) {
    Ctx.ctx.direction = direction;
  }

  static clearRect(topLeft: Vector, size: Vector) {
    Ctx.ctx.clearRect(topLeft.x, topLeft.y, size.x, size.y);
  }
  static fillRect(topLeft: Vector, size: Vector) {
    Ctx.ctx.fillRect(topLeft.x, topLeft.y, size.x, size.y);
  }
  static strokeRect(topLeft: Vector, size: Vector) {
    Ctx.ctx.strokeRect(topLeft.x, topLeft.y, size.x, size.y);
  }

  static fill() {
    Ctx.ctx.fill();
  }
  static stroke() {
    Ctx.ctx.stroke();
  }
  static fillText(text: string, pos: Vector) {
    Ctx.ctx.fillText(text, pos.x, pos.y);
  }
  static strokeText(text: string, pos: Vector) {
    Ctx.ctx.strokeText(text, pos.x, pos.y);
  }
  static measureText(text: string): TextMetrics {
    return Ctx.ctx.measureText(text);
  }
  static rotate(angle: number) {
    Ctx.ctx.rotate(angle);
  }
  static scale(v: Vector) {
    Ctx.ctx.scale(v.x, v.y);
  }
  static translate(v: Vector) {
    Ctx.ctx.translate(v.x, v.y);
  }
  static drawImage(image: CanvasImageSource, pos: Vector) {
    Ctx.ctx.drawImage(image, pos.x, pos.y);
  }
  static save() {
    Ctx.ctx.save();
  }
  static restore() {
    Ctx.ctx.restore();
  }
}
export { Ctx };
