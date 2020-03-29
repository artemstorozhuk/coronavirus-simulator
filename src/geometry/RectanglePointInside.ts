import Point from './Point';
import Rectangle from './Rectangle';

export default class RectanglePointInside {

    private readonly rectangle: Rectangle;

    constructor(rectangle: Rectangle) {
        this.rectangle = rectangle;
    }

    check(point: Point): boolean {
        const corner = this.rectangle.corner();
        return this.rectangle.point.x <= point.x && point.x <= corner.x
            && this.rectangle.point.y <= point.y && point.y <= corner.y;
    }

}
