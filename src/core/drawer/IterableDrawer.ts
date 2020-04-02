import Creator from '../creator/Creator';
import Drawer from './Drawer';

export default class IterableDrawer<T> implements Drawer {

    private readonly iterable: Iterable<T>;
    private readonly drawerCreator: Creator<T, Drawer>;

    constructor(iterable: Iterable<T>, drawerCreator: Creator<T, Drawer>) {
        this.iterable = iterable;
        this.drawerCreator = drawerCreator;
    }

    draw(context: CanvasRenderingContext2D) {
        for (const value of this.iterable) {
            this.drawerCreator
                .create(value)
                .draw(context);
        }
    }

}
