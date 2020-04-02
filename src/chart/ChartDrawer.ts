import Creator from '../core/creator/Creator';
import Drawer from '../core/drawer/Drawer';
import Rectangle from '../core/geometry/primitive/Rectangle';
import IndexedValue from './bar/IndexedValue';

export default class ChartDrawer<T> implements Drawer {

    private readonly iterable: Iterable<T>;
    private readonly barCreator: Creator<IndexedValue<T>, Rectangle>;

    constructor(iterable: Iterable<T>, barCreator: Creator<IndexedValue<T>, Rectangle>) {
        this.iterable = iterable;
        this.barCreator = barCreator;
    }

    draw(context: CanvasRenderingContext2D) {
        let i = 0;
        for (const value of this.iterable) {
            const rectangle = this.barCreator.create({
                index: i,
                value: value
            });
            context.strokeRect(rectangle.point.x, rectangle.point.y, rectangle.size.width, rectangle.size.height);
            i++;
        }
    }

}
