import RandomDirectionCreator from '../../../../core/geometry/creator/RandomDirectionCreator';
import Point from '../../../../core/geometry/primitive/Point';
import Rectangle from '../../../../core/geometry/primitive/Rectangle';
import RectangleCorner from '../../../../core/geometry/RectangleCorner';
import Tickable from '../../../../core/tick/Tickable';

export default class BrownianMovable implements Tickable {

    private readonly randomDirectionCreator = new RandomDirectionCreator();
    private readonly point: Point;
    private readonly rectangle: Rectangle;
    private readonly rectangleCorner: RectangleCorner;
    private readonly speed: number;

    constructor(point: Point, rectangle: Rectangle, speed: number) {
        this.point = point;
        this.rectangle = rectangle;
        this.rectangleCorner = new RectangleCorner(rectangle);
        this.speed = speed;
    }

    tick() {
        const corner = this.rectangleCorner.corner();
        const direction = this.randomDirectionCreator.create(this.speed);

        this.point.x += direction.x;
        if (this.point.x < this.rectangle.point.x) {
            this.point.x = this.rectangle.point.x + this.rectangle.point.x - this.point.x;
        } else if (this.point.x > corner.x) {
            this.point.x = corner.x - (this.point.x - corner.x);
        }

        this.point.y += direction.y;
        if (this.point.y < this.rectangle.point.y) {
            this.point.y = this.rectangle.point.y + this.rectangle.point.y - this.point.y;
        } else if (this.point.y > corner.y) {
            this.point.y = corner.y - (this.point.y - corner.y);
        }
    }

}
