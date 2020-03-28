import Size from '../element/Size';

export default class Random {

    generate(max: number, min: number = 0): number {
        return Math.random() * (max - min) - min;
    }

    generatePoint(size: Size) {
        return {
            x: this.generate(size.width),
            y: this.generate(size.height)
        }
    }

    generateDirection(speed: number) {
        return {
            x: this.generate(-speed, speed),
            y: this.generate(-speed, speed)
        };
    }

}
