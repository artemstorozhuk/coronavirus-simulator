import Point from './Point';
import Size from './Size';

export default class Rectangle {
    readonly point: Point;
    readonly size: Size;

    constructor(point: Point, size: Size) {
        this.point = point;
        this.size = size;
    }

    corner() {
        return {
            x: this.point.x + this.size.width,
            y: this.point.y + this.size.height
        }
    }

}
