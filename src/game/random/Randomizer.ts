import Size from "../element/Size";

export default class Randomizer {

    random(max: number, min: number = 0): number {
        return Math.random() * (max - min) - min;
    }

    randomPoint(size: Size) {
        return {
            x: this.random(size.width),
            y: this.random(size.height)
        }
    }

    randomDirection(speed: number) {
        return {
            x: this.random(-speed, speed),
            y: this.random(-speed, speed)
        };
    }

}
