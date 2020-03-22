import Person from "./Person";
import Point from "../element/Point";
import Randomizer from "../random/Randomizer";
import Size from "../element/Size";

export default class PersonFactory {
    random(randomizer: Randomizer, fieldSize: Size, image: HTMLImageElement, speed: number): Person {
        return new Person(
            new Point(randomizer.random(fieldSize.width), randomizer.random(fieldSize.height)),
            new Point(randomizer.random(-speed, speed), randomizer.random(-speed, speed)), image);
    }

}
