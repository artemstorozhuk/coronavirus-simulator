import Point from "./Point";
import Size from "./Size";

export default class Person {
    private readonly position: Point;
    private readonly direction: Point;
    private readonly image: HTMLImageElement;

    constructor(position: Point, direction: Point, image: HTMLImageElement) {
        this.position = position;
        this.direction = direction;
        this.image = image;
    }

    move(fieldSize: Size): Person {
        const newPosition = this.position
            .shift(this.direction)
            .normalize(fieldSize);
        return new Person(newPosition, this.direction.direct(newPosition, fieldSize), this.image);
    }

    draw(context: CanvasRenderingContext2D, imageSize: Size) {
        context.drawImage(this.image, this.position.x, this.position.y, imageSize.width, imageSize.height);
    }

}
