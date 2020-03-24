import Drawer from "./Drawer";
import Size from "../element/Size";

export default class CanvasCleaner implements Drawer {

    private readonly size: Size;

    constructor(size: Size) {
        this.size = size;
    }

    draw(context: CanvasRenderingContext2D) {
        context.clearRect(0, 0, this.size.width, this.size.height);
    }

}
