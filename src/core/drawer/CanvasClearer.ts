import Rectangle from '../geometry/primitive/Rectangle';
import Drawer from './Drawer';

export default class CanvasCleaner implements Drawer {

    private readonly rectangle: Rectangle;

    constructor(rectangle: Rectangle) {
        this.rectangle = rectangle;
    }

    draw(context: CanvasRenderingContext2D) {
        context.clearRect(this.rectangle.point.x, this.rectangle.point.y,
            this.rectangle.size.width, this.rectangle.size.height);
    }

}
