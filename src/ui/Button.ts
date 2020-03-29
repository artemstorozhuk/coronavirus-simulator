import CanvasCleaner from '../draw/CanvasClearer';
import CompositeDrawer from '../draw/CompositeDrawer';
import RectangleDrawer from '../draw/RectangleDrawer';
import TextDrawer from '../draw/TextDrawer';
import Point from '../geometry/Point';
import Rectangle from '../geometry/Rectangle';
import RectanglePointInside from '../geometry/RectanglePointInside';
import Drawable from '../tick/Drawable';

export default class Button {

    private readonly text: string;
    private readonly point: Point;
    private readonly context: CanvasRenderingContext2D;
    private readonly padding: number;

    constructor(context: CanvasRenderingContext2D, text: string, point: Point, padding: number = 5) {
        this.context = context;
        this.text = text;
        this.point = point;
        this.padding = padding;
    }

    drawable(context: CanvasRenderingContext2D): Drawable {
        const rectangle = this.rectangle();
        const textDrawer = new TextDrawer(this.text, {
            x: this.point.x + this.padding,
            y: this.point.y - this.padding + rectangle.size.height
        });
        const rectClearer = new CanvasCleaner(rectangle);
        const rectDrawer = new RectangleDrawer(rectangle);
        return new Drawable(context, new CompositeDrawer([rectClearer, rectDrawer, textDrawer]));
    }

    insideEvent(listener: () => void): (event: MouseEvent) => void {
        const rectangle = this.rectangle();
        const inside = new RectanglePointInside(rectangle);
        return (event: MouseEvent) => {
            const point = {
                x: event.x,
                y: event.y
            };
            if (inside.check(point)) {
                listener();
            }
        };
    }

    private rectangle() {
        const textMetrics = this.context.measureText(this.text);
        const width = textMetrics.width;
        const height = textMetrics.actualBoundingBoxAscent + textMetrics.actualBoundingBoxDescent;
        return new Rectangle({
            x: this.point.x,
            y: this.point.y
        }, {
            width: width + this.padding * 2,
            height: height + this.padding * 2
        });
    }

}
