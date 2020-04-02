import * as configuration from './configuration.json';
import CanvasCleaner from './core/drawer/CanvasClearer';
import CompositeTickable from './core/tick/CompositeTickable';
import Drawable from './core/tick/Drawable';
import Repeatable from './core/tick/Repeatable';
import CanvasFactory from './core/ui/CanvasFactory';
import InfectionGame from './infection/InfectionGame';
import RectangleDrawer from './core/drawer/RectangleDrawer';

class App {

    start() {
        const canvasSize = {
            width: configuration.canvasWidth,
            height: configuration.canvasHeight
        };
        const gameRectangle = {
            point: {
                x: 0,
                y: 0
            },
            size: canvasSize
        };

        const canvasFactory = new CanvasFactory();
        const canvas = canvasFactory.create(canvasSize);
        const context = canvas.getContext("2d");

        const mainTickable = new CompositeTickable();
        mainTickable.add(new Drawable(context, new CanvasCleaner(gameRectangle)));
        mainTickable.add(new Drawable(context, new RectangleDrawer(gameRectangle)));

        const infectionGame = new InfectionGame(context);
        mainTickable.add(infectionGame);

        document.getElementById("add-normal").addEventListener("click", () => infectionGame.addNormal());
        document.getElementById("add-infected").addEventListener("click", () => infectionGame.addInfected());
        document.getElementById("reset").addEventListener("click", () => infectionGame.reset());

        const repeatable = new Repeatable(mainTickable, configuration.updatePeriod);
        repeatable.tick();
    }

}

const app = new App();
app.start();
