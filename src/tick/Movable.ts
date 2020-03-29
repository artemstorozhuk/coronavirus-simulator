import Point from '../geometry/Point';
import Rectangle from '../geometry/Rectangle';
import Tickable from './Tickable';

export default class Movable implements Tickable {

    private readonly point: Point;
    private readonly direction: Point;
    private readonly rectangle: Rectangle;

    constructor(position: Point, direction: Point, rectangle: Rectangle) {
        this.point = position;
        this.direction = direction;
        this.rectangle = rectangle;
    }

    tick() {
        const corner = this.rectangle.corner();

        this.point.x += this.direction.x;
        if (this.point.x < this.rectangle.point.x) {
            this.direction.x = -this.direction.x;
            this.point.x = this.rectangle.point.x + this.rectangle.point.x - this.point.x;
        } else if (this.point.x > corner.x) {
            this.direction.x = -this.direction.x;
            this.point.x = corner.x - (this.point.x - corner.x);
        }

        this.point.y += this.direction.y;
        if (this.point.y < this.rectangle.point.y) {
            this.direction.y = -this.direction.y;
            this.point.y = this.rectangle.point.y + this.rectangle.point.y - this.point.y;
        } else if (this.point.y > corner.y) {
            this.direction.y = -this.direction.y;
            this.point.y = corner.y - (this.point.y - corner.y);
        }
    }

}
