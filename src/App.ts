import Game from "./game/Game";
import CanvasFactory from "./ui/CanvasFactory";
import CanvasCleaner from "./game/draw/CanvasClearer";
import ImageFactory from "./ui/ImageFactory";
import Randomizer from "./game/random/Randomizer";
import ImageDrawer from "./game/draw/ImageDrawer";
import CompositeDrawer from "./game/draw/CompositeDrawer";
import Movable from "./game/tick/Movable";
import CompositeTicker from "./game/tick/CompositeTicker";

class App {
    start() {
        const canvasSize = { width: 640, height: 480 };
        const imageSize = { width: 10, height: 10 };
        const fieldSize = { width: canvasSize.width - imageSize.width, height: canvasSize.height - imageSize.height };
        const speed = 2;
        const tickerInterval = 20;
        const population = 100;

        const canvas = new CanvasFactory().create(canvasSize);
        const randomizer = new Randomizer();
        const imageFactory = new ImageFactory();
        const happyImage = imageFactory.loadHappy();

        const tickers = [];
        const drawers = [];
        drawers.push(new CanvasCleaner(canvasSize));
        for (let i = 0; i < population; i++) {
            const point = randomizer.randomPoint(fieldSize);
            const movable = new Movable(point, randomizer.randomDirection(speed), fieldSize);
            tickers.push(movable);
            drawers.push(new ImageDrawer(happyImage, point, imageSize))
        }

        const game = new Game(canvas.getContext("2d"), new CompositeTicker(tickers), new CompositeDrawer(drawers), tickerInterval);
        game.tick();
    }
}

new App().start();
