import Point from '../geometry/Point';
import Drawer from './Drawer';

export default class TextDrawer implements Drawer {

    private readonly text: string;
    private readonly point: Point;

    constructor(text: string, point: Point) {
        this.text = text;
        this.point = point;
    }

    draw(context: CanvasRenderingContext2D) {
        const textMetrics = context.measureText(this.text);
        context.strokeText(this.text, this.point.x, this.point.y, textMetrics.width);
    }

}
