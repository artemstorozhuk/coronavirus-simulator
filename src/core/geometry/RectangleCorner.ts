import Rectangle from './primitive/Rectangle';

export default class RectangleCorner {

    private readonly reactangle: Rectangle;

    constructor(rectangle: Rectangle) {
        this.reactangle = rectangle;
    }

    corner() {
        return {
            x: this.reactangle.point.x + this.reactangle.size.width,
            y: this.reactangle.point.y + this.reactangle.size.height
        }
    }

}
