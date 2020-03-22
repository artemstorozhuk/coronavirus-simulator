import Drawer from "./Drawer";
import Person from "../person/Person";
import Size from "../element/Size";
import Ticker from "../tick/Ticker";

export default class PersonDrawer implements Ticker, Drawer {

    private readonly fieldSize: Size;
    private readonly imageSize: Size;
    private person: Person;

    constructor(person: Person, fieldSize: Size, imageSize: Size) {
        this.person = person;
        this.fieldSize = fieldSize;
        this.imageSize = imageSize;
    }

    tick() {
        this.person = this.person.move(this.fieldSize);
    }

    draw(context: CanvasRenderingContext2D) {
        this.person.draw(context, this.imageSize);
    }

}
