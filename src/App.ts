import Game from "./game/Game";
import CanvasFactory from "./ui/CanvasFactory";
import CanvasCleaner from "./game/draw/CanvasClearer";
import ImageFactory from "./ui/ImageFactory";
import PersonDrawer from "./game/draw/PersonDrawer";
import PersonFactory from "./game/person/PersonFactory";
import Randomizer from "./game/random/Randomizer";
import Size from "./game/element/Size";

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
        const personDrawer = new PersonDrawer(person, fieldSize, imageSize);

        const game = new Game(canvas.getContext("2d"),
            [personDrawer],
            [new CanvasCleaner(canvasSize), personDrawer],
            tickerInterval);
        game.start();
    }
}

new App().start();
