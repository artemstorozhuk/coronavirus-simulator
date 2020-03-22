import Size from "./Size";

export default class Point {
    public readonly x: number;
    public readonly y: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    shift(direction: Point): Point {
        return new Point(this.x + direction.x, this.y + direction.y);
    }

    normalize(size: Size): Point {
        return new Point(
            Math.max(0, Math.min(this.x, size.width)),
            Math.max(0, Math.min(this.y, size.height)));
    }

    direct(position: Point, size: Size): Point {
        return new Point(
            position.isEdgeX(size) ? -this.x : this.x,
            position.isEdgeY(size) ? -this.y : this.y);
    }

    isEdgeX(size: Size): boolean {
        return this.x == 0 || this.x == size.width;
    }

    isEdgeY(size: Size): boolean {
        return this.y == 0 || this.y == size.height;
    }

}
