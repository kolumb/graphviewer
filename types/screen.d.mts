import { Vector } from "vector.mjs";
declare class Screen {
    static size: Vector;
    static center: Vector;
    static lesser: number;
    static bigger: number;
    static updateSize(): void;
    static resizeHandler(): void;
}
export { Screen };
