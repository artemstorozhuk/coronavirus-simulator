import Filter from '../../filter/Filter';
import Point from '../primitive/Point';
import Rectangle from '../primitive/Rectangle';
import RectangleCorner from '../RectangleCorner';

export default class RectangleInsideFilter implements Filter<Point> {

    private readonly rectangle: Rectangle;
    private readonly rectangleCorner: RectangleCorner;

    constructor(rectangle: Rectangle) {
        this.rectangle = rectangle;
        this.rectangleCorner = new RectangleCorner(rectangle);
    }

    filter(point: Point): boolean {
        const corner = this.rectangleCorner.corner();
        return this.rectangle.point.x <= point.x && point.x <= corner.x
            && this.rectangle.point.y <= point.y && point.y <= corner.y;
    }

}
