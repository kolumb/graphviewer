import { Vector } from "./vector.mjs";
declare class Camera {
    static pos: Vector;
    static shift: Vector;
    static speed: number;
    static scale: number;
    static updateScale(): void;
    static update(lag: number): void;
    static updateShift(): void;
    static applyShift(): void;
}
export { Camera };
