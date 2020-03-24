import Drawer from "./Drawer";
import Point from "../element/Point";
import Size from "../element/Size";

export default class ImageDrawer implements Drawer {

    private readonly image: CanvasImageSource;
    private readonly point: Point;
    private readonly size: Size;

    constructor(image: CanvasImageSource, point: Point, size: Size) {
        this.image = image;
        this.point = point;
        this.size = size;
    }

    draw(context: CanvasRenderingContext2D) {
        context.drawImage(this.image, this.point.x, this.point.y, this.size.width, this.size.height);
    }
   
}
