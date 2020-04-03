import Creator from '../../../core/creator/Creator';
import Point from '../../../core/geometry/primitive/Point';
import Rectangle from '../../../core/geometry/primitive/Rectangle';
import BrownianMovable from './BrownianMovable';

export default class BrownianMovableCreator implements Creator<Point, BrownianMovable> {

    private readonly rectangle: Rectangle;
    private readonly speed: number;

    constructor(rectangle: Rectangle, speed: number) {
        this.rectangle = rectangle;
        this.speed = speed;
    }

    create(point: Point): BrownianMovable {
        return new BrownianMovable(point, this.rectangle, this.speed);
    }

}
