import Point from '../element/Point';
import Size from '../element/Size';
import Drawer from './Drawer';

export default class RectangleDrawer implements Drawer {

    private readonly point: Point;
    private readonly size: Size;

    constructor(point: Point, size: Size) {
        this.point = point;
        this.size = size;
    }

    draw(context: CanvasRenderingContext2D) {
        context.strokeRect(this.point.x, this.point.y, this.size.width, this.size.height);
    }

}
