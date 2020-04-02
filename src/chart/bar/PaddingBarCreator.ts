import Creator from '../../core/creator/Creator';
import Rectangle from '../../core/geometry/primitive/Rectangle';
import IndexedValue from './IndexedValue';

export default class PaddingBarCreator<T> implements Creator<IndexedValue<T>, Rectangle> {

    private readonly creator: Creator<IndexedValue<T>, Rectangle>;
    private readonly padding: number;

    constructor(creator: Creator<IndexedValue<T>, Rectangle>, padding: number) {
        this.creator = creator;
        this.padding = padding;
    }

    create(arg: IndexedValue<T>): Rectangle {
        const rectangle = this.creator.create(arg);
        return {
            point: {
                x: this.padding + rectangle.point.x,
                y: this.padding + rectangle.point.y
            },
            size: {
                width: rectangle.size.width - 2 * this.padding,
                height: rectangle.size.height - 2 * this.padding
            }
        };
    }

}