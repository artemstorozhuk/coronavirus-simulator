import Drawer from './Drawer';

export default class CompositeDrawer implements Drawer {

    private readonly drawers: Array<Drawer>;

    constructor(drawers: Array<Drawer>) {
        this.drawers = drawers;
    }

    draw(context: CanvasRenderingContext2D) {
        this.drawers.forEach(drawer => drawer.draw(context));
    }

}
