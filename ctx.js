class Ctx {
  static fillStyle(style) {
    Ctx.ctx.fillStyle = style;
  }
  static strokeStyle(style) {
    Ctx.ctx.strokeStyle = style;
  }
  static beginPath() {
    Ctx.ctx.beginPath();
  }
  static closePath() {
    Ctx.ctx.closePath();
  }
  static moveTo(v) {
    Ctx.ctx.moveTo(v.x, v.y);
  }
  static lineTo(v) {
    Ctx.ctx.lineTo(v.x, v.y);
  }
  static quadraticCurveTo(controlPoint, endPos) {
    Ctx.ctx.quadraticCurveTo(
      controlPoint.x,
      controlPoint.y,
      endPos.x,
      endPos.y
    );
  }
  static bezierCurveTo(controlPoint1, controlPoint2, endPos) {
    Ctx.ctx.bezierCurveTo(
      controlPoint1.x,
      controlPoint1.y,
      controlPoint2.x,
      controlPoint2.y,
      endPos.x,
      endPos.y
    );
  }
  static arc(pos, radius, startAngle, endAngle, counterclockwise) {
    Ctx.ctx.arc(pos.x, pos.y, radius, startAngle, endAngle, counterclockwise);
  }
  static arcTo(controlPoint1, controlPoint2, radius) {
    Ctx.ctx.arcTo(
      controlPoint1.x,
      controlPoint1.y,
      controlPoint2.x,
      controlPoint2.y,
      radius
    );
  }
  static ellipse(
    pos,
    radius,
    rotation,
    startAngle,
    endAngle,
    counterclockwise
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
  static rect(topLeft, size) {
    Ctx.ctx.rect(topLeft.x, topLeft.y, size.x, size.y);
  }
  static lineWidth(width) {
    Ctx.ctx.lineWidth = width;
  }
  static lineCap(cap) {
    Ctx.ctx.lineCap = cap;
  }
  static lineJoin(join) {
    Ctx.ctx.lineJoin = join;
  }
  static miterLimit(limit) {
    Ctx.ctx.miterLimit = limit;
  }
  static getLineDash() {
    return Ctx.ctx.getLineDash();
  }
  static setLineDash(segments) {
    Ctx.ctx.setLineDash(segments);
  }
  static lineDashOffset(offset) {
    Ctx.ctx.lineDashOffset = offset;
  }
  static font(fontDescription) {
    Ctx.ctx.font = fontDescription;
  }
  static textAlign(align) {
    Ctx.ctx.textAlign = align;
  }
  static textBaseline(baseline) {
    Ctx.ctx.textBaseline = baseline;
  }
  static direction(direction) {
    Ctx.ctx.direction = direction;
  }
  static clearRect(topLeft, size) {
    Ctx.ctx.clearRect(topLeft.x, topLeft.y, size.x, size.y);
  }
  static fillRect(topLeft, size) {
    Ctx.ctx.fillRect(topLeft.x, topLeft.y, size.x, size.y);
  }
  static strokeRect(topLeft, size) {
    Ctx.ctx.strokeRect(topLeft.x, topLeft.y, size.x, size.y);
  }
  static fill() {
    Ctx.ctx.fill();
  }
  static stroke() {
    Ctx.ctx.stroke();
  }
  static fillText(text, pos) {
    Ctx.ctx.fillText(text, pos.x, pos.y);
  }
  static strokeText(text, pos) {
    Ctx.ctx.strokeText(text, pos.x, pos.y);
  }
  static measureText(text) {
    return Ctx.ctx.measureText(text);
  }
  static rotate(angle) {
    Ctx.ctx.rotate(angle);
  }
  static scale(v) {
    Ctx.ctx.scale(v.x, v.y);
  }
  static translate(v) {
    Ctx.ctx.translate(v.x, v.y);
  }
  static drawImage(image, pos) {
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
