import Creator from '../../creator/Creator';
import RandomDirectionCreator from '../../geometry/creator/RandomDirectionCreator';
import Point from '../../geometry/primitive/Point';
import Rectangle from '../../geometry/primitive/Rectangle';
import VectorMovable from './VectorMovable';

export default class VectorMovableCreator implements Creator<Point, VectorMovable> {

    private readonly randomDirectionCreator = new RandomDirectionCreator();
    private readonly rectangle: Rectangle;
    private readonly speed: number;

    constructor(rectangle: Rectangle, speed: number) {
        this.rectangle = rectangle;
        this.speed = speed;
    }

    create(point: Point): VectorMovable {
        return new VectorMovable({
            point: point,
            direction: this.randomDirectionCreator.create(this.speed)
        }, this.rectangle);
    }
}
