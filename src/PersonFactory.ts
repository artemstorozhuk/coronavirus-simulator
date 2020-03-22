import Person from "./Person";
import Point from "./Point";
import Randomizer from "./Randomizer";
import Size from "./Size";

export default class PersonFactory {
    random(randomizer: Randomizer, fieldSize: Size, image: HTMLImageElement, speed: number): Person {
        return new Person(
            new Point(randomizer.random(fieldSize.width), randomizer.random(fieldSize.height)),
            new Point(randomizer.random(-speed, speed), randomizer.random(-speed, speed)), image);
    }

}
