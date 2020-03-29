import Rectangle from '../geometry/Rectangle';
import Size from '../geometry/Size';

export default class Random {

    generate(max: number, min: number = 0): number {
        return Math.random() * (max - min) - min;
    }

    inSize(size: Size) {
        return {
            x: this.generate(size.width),
            y: this.generate(size.height)
        }
    }

    inRectangle(rectangle: Rectangle) {
        const corner = rectangle.corner();
        return {
            x: this.generate(corner.x, rectangle.point.x),
            y: this.generate(corner.y, rectangle.point.y)
        }
    }

    direction(speed: number) {
        return {
            x: this.generate(-speed, speed),
            y: this.generate(-speed, speed)
        };
    }

}
