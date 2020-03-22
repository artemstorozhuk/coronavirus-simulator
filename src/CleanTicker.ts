import Drawer from "./Drawer";
import Size from "./Size";

export default class CleanTicker implements Drawer {

    private readonly size: Size;

    constructor(size: Size) {
        this.size = size;
    }

    draw(context: CanvasRenderingContext2D) {
        context.clearRect(0, 0, this.size.width, this.size.height);
    }
}
