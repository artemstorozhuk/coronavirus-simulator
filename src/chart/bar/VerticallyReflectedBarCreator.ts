import Creator from '../../core/creator/Creator';
import Rectangle from '../../core/geometry/primitive/Rectangle';
import IndexedValue from './IndexedValue';

export default class VerticallyReflectedBarCreator<T> implements Creator<IndexedValue<T>, Rectangle> {

    private readonly creator: Creator<IndexedValue<T>, Rectangle>;
    private readonly height: number;

    constructor(creator: Creator<IndexedValue<T>, Rectangle>, height: number) {
        this.creator = creator;
        this.height = height;
    }

    create(arg: IndexedValue<T>): Rectangle {
        const rectangle = this.creator.create(arg);
        return {
            point: {
                x: rectangle.point.x,
                y: this.height - rectangle.point.y - rectangle.size.height
            },
            size: {
                width: rectangle.size.width,
                height: rectangle.size.height
            }
        };
    }

}
