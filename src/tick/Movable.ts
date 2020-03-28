import Point from '../element/Point';
import Size from '../element/Size';
import Tickable from './Tickable';

export default class Movable implements Tickable {

    private readonly point: Point;
    private readonly direction: Point;
    private readonly fieldSize: Size;

    constructor(position: Point, direction: Point, fieldSize: Size) {
        this.point = position;
        this.direction = direction;
        this.fieldSize = fieldSize;
    }

    tick() {
        this.point.x += this.direction.x;
        if (this.point.x < 0) {
            this.direction.x = -this.direction.x;
            this.point.x = -this.point.x;
        } else if (this.point.x > this.fieldSize.width) {
            this.direction.x = -this.direction.x;
            this.point.x = this.fieldSize.width - (this.point.x - this.fieldSize.width);
        }

        this.point.y += this.direction.y;
        if (this.point.y < 0) {
            this.direction.y = -this.direction.y;
            this.point.y = -this.point.y;
        } else if (this.point.y > this.fieldSize.height) {
            this.direction.y = -this.direction.y;
            this.point.y = this.fieldSize.height - (this.point.y - this.fieldSize.height);
        }
    }

}
