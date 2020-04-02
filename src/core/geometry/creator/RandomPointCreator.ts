import Creator from '../../creator/Creator';
import Random from '../../random/Random';
import Point from '../primitive/Point';
import Rectangle from '../primitive/Rectangle';
import RectangleCorner from '../RectangleCorner';

export default class RandomPointCreator implements Creator<Rectangle, Point> {

    private readonly random = new Random();

    create(rectangle: Rectangle): Point {
        const corner = new RectangleCorner(rectangle).corner();
        return {
            x: this.random.value(corner.x, rectangle.point.x),
            y: this.random.value(corner.y, rectangle.point.y)
        }
    }

}
