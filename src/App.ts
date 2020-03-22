import Game from "./Game";
import CanvasFactory from "./CanvasFactory";
import CleanTicker from "./CleanTicker";
import ImageFactory from "./ImageFactory";
import PersonElement from "./PersonElement";
import PersonFactory from "./PersonFactory";
import Randomizer from "./Randomizer";
import Size from "./Size";

class App {
    start() {
        const canvasSize = new Size(640, 480);
        const imageSize = new Size(10, 10);
        const fieldSize = canvasSize.subtract(imageSize);
        const speed = 2;
        const tickerInterval = 20;

        const canvas = new CanvasFactory().canvas(canvasSize);
        const personFactory = new PersonFactory();
        const randomizer = new Randomizer();
        const imageFactory = new ImageFactory();

        const person = personFactory.random(randomizer, fieldSize, imageFactory.happy(), speed);
        const personElement = new PersonElement(person, fieldSize, imageSize);

        const game = new Game(canvas.getContext("2d"),
            [personElement],
            [new CleanTicker(canvasSize), personElement],
            tickerInterval);
        game.start();
    }
}

new App().start();
