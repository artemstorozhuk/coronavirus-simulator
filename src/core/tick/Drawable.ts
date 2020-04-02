import Drawer from '../drawer/Drawer';
import Tickable from './Tickable';

export default class Drawable implements Tickable {

    private readonly context: CanvasRenderingContext2D;
    private readonly drawer: Drawer;

    constructor(context: CanvasRenderingContext2D, drawer: Drawer) {
        this.context = context;
        this.drawer = drawer;
    }

    tick() {
        this.drawer.draw(this.context);
    }

}
