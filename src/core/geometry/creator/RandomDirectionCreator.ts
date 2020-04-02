import Creator from '../../creator/Creator';
import Random from '../../random/Random';
import Point from '../primitive/Point';

export default class RandomDirectionCreator implements Creator<number, Point> {

    private readonly random = new Random();

    create(speed: number): Point {
        return {
            x: this.random.value(speed, -speed),
            y: this.random.value(speed, -speed)
        };
    }

}
