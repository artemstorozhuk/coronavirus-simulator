import Rectangle from '../../geometry/primitive/Rectangle';
import Vector from '../../geometry/primitive/Vector';
import RectangleCorner from '../../geometry/RectangleCorner';
import Tickable from '../../tick/Tickable';

export default class VectorMovable implements Tickable {

    private readonly vector: Vector;
    private readonly rectangle: Rectangle;
    private readonly rectangleCorner: RectangleCorner;

    constructor(vector: Vector, rectangle: Rectangle) {
        this.vector = vector;
        this.rectangle = rectangle;
        this.rectangleCorner = new RectangleCorner(rectangle);
    }

    tick() {
        const corner = this.rectangleCorner.corner();

        this.vector.point.x += this.vector.direction.x;
        if (this.vector.point.x < this.rectangle.point.x) {
            this.vector.direction.x = -this.vector.direction.x;
            this.vector.point.x = this.rectangle.point.x + this.rectangle.point.x - this.vector.point.x;
        } else if (this.vector.point.x > corner.x) {
            this.vector.direction.x = -this.vector.direction.x;
            this.vector.point.x = corner.x - (this.vector.point.x - corner.x);
        }

        this.vector.point.y += this.vector.direction.y;
        if (this.vector.point.y < this.rectangle.point.y) {
            this.vector.direction.y = -this.vector.direction.y;
            this.vector.point.y = this.rectangle.point.y + this.rectangle.point.y - this.vector.point.y;
        } else if (this.vector.point.y > corner.y) {
            this.vector.direction.y = -this.vector.direction.y;
            this.vector.point.y = corner.y - (this.vector.point.y - corner.y);
        }
    }

}
