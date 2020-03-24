import CanvasFactory from "./ui/CanvasFactory";
import Randomizer from "./game/random/Randomizer";
import ImageFactory from "./ui/ImageFactory";
import CanvasCleaner from "./game/draw/CanvasClearer";
import Movable from "./game/tick/Movable";
import ImageDrawer from "./game/draw/ImageDrawer";
import CompositeTickable from "./game/tick/CompositeTickable";
import CompositeDrawer from "./game/draw/CompositeDrawer";
import Drawable from "./game/tick/Drawable";
import Repeatable from "./game/tick/Repeatable";

class App {
    start() {
        const canvasSize = { width: 640, height: 480 };
        const imageSize = { width: 10, height: 10 };
        const fieldSize = { width: canvasSize.width - imageSize.width, height: canvasSize.height - imageSize.height };
        const speed = 2;
        const updatePeriod = 20;
        const population = 100;

        const canvas = new CanvasFactory().create(canvasSize);
        const context = canvas.getContext("2d");
        const randomizer = new Randomizer();
        const imageFactory = new ImageFactory();
        const happyImage = imageFactory.loadHappy();

        const tickablesArray = [];
        const drawersArray = [];
        drawersArray.push(new CanvasCleaner(canvasSize));
        for (let i = 0; i < population; i++) {
            const point = randomizer.randomPoint(fieldSize);
            const movable = new Movable(point, randomizer.randomDirection(speed), fieldSize);
            tickablesArray.push(movable);
            drawersArray.push(new ImageDrawer(happyImage, point, imageSize))
        }

        tickablesArray.push(new Drawable(context, new CompositeDrawer(drawersArray)));
        const tickable = new CompositeTickable(tickablesArray);
        new Repeatable(tickable, updatePeriod).tick();
    }
}

new App().start();
