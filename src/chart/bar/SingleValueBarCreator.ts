import Creator from '../../core/creator/Creator';
import Rectangle from '../../core/geometry/primitive/Rectangle';
import IndexedValue from './IndexedValue';

export default class SingleValueBarCreator implements Creator<IndexedValue<number>, Rectangle> {

    private readonly max: number;
    private readonly barWidth: number;
    private readonly height: number;

    constructor(max: number, barWidth: number, height: number) {
        this.max = max;
        this.barWidth = barWidth;
        this.height = height;
    }

    create(arg: IndexedValue<number>): Rectangle {
        return {
            point: {
                x: this.barWidth * arg.index,
                y: 0
            },
            size: {
                width: this.barWidth,
                height: this.height * arg.value / this.max
            }
        };
    }

}
