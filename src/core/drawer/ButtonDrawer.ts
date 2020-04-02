import Point from '../geometry/primitive/Point';
import Measurer from '../measure/Measurer';
import PaddingMeasurer from '../measure/PaddingMeasurer';
import TextMeasurer from '../measure/TextMeasurer';
import CanvasCleaner from './CanvasClearer';
import CompositeDrawer from './CompositeDrawer';
import Drawer from './Drawer';
import RectangleDrawer from './RectangleDrawer';
import TextDrawer from './TextDrawer';

export default class ButtonDrawer implements Drawer {

    private readonly text: string;
    private readonly point: Point;
    private readonly padding: number;
    private readonly measurer: Measurer;

    constructor(text: string, point: Point, padding: number = 5) {
        this.text = text;
        this.point = point;
        this.padding = padding;
        this.measurer = new PaddingMeasurer(new TextMeasurer(text), this.padding);
    }

    draw(context: CanvasRenderingContext2D) {
        const rectangle = {
            point: this.point,
            size: this.measurer.measure(context)
        }

        const rectClearer = new CanvasCleaner(rectangle);
        const rectDrawer = new RectangleDrawer(rectangle);
        const textDrawer = new TextDrawer(this.text, {
            x: this.point.x + this.padding,
            y: this.point.y - this.padding + rectangle.size.height
        });

        new CompositeDrawer([rectClearer, rectDrawer, textDrawer])
            .draw(context);
    }

}
