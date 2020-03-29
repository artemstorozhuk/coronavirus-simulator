import Rectangle from '../geometry/Rectangle';
import Drawer from './Drawer';

export default class RectangleDrawer implements Drawer {

    private readonly rectangle: Rectangle;

    constructor(rectangle: Rectangle) {
        this.rectangle = rectangle;
    }

    draw(context: CanvasRenderingContext2D) {
        context.strokeRect(this.rectangle.point.x, this.rectangle.point.y,
            this.rectangle.size.width, this.rectangle.size.height);
    }

}
