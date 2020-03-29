import * as configuration from './configuration.json';
import CanvasCleaner from './draw/CanvasClearer';
import RectangleDrawer from './draw/RectangleDrawer';
import Rectangle from './geometry/Rectangle';
import InfectionGame from './infection/InfectionGame';
import CompositeTickable from './tick/CompositeTickable';
import Drawable from './tick/Drawable';
import Repeatable from './tick/Repeatable';
import Tickable from './tick/Tickable';
import Button from './ui/Button';
import CanvasFactory from './ui/CanvasFactory';

class App {

    start() {
        const gameSize = {
            width: configuration.gameWidth,
            height: configuration.gameHeight
        };
        const gameRectangle = new Rectangle({
            x: 0,
            y: 0
        }, gameSize);

        const canvasFactory = new CanvasFactory();
        const canvas = canvasFactory.create(gameSize);
        const context = canvas.getContext("2d");
        context.font = "20px Arial";

        const canvasRectangle = new Rectangle(
            {
                x: configuration.canvasX,
                y: configuration.canvasY
            },
            {
                width: configuration.canvasWidth,
                height: configuration.canvasHeight
            }
        );
        const corner = canvasRectangle.corner();

        const tickablesArray = new Array<Tickable>();

        tickablesArray.push(new Drawable(context, new CanvasCleaner(gameRectangle)));
        tickablesArray.push(new Drawable(context, new RectangleDrawer(canvasRectangle)));

        const infectionGame = new InfectionGame(context);
        tickablesArray.push(infectionGame);

        const addInfectedButton = new Button(context, "Add infected", {
            x: configuration.padding,
            y: corner.y + configuration.padding
        });
        tickablesArray.push(addInfectedButton.drawable(context));
        canvas.addEventListener("click", addInfectedButton.insideEvent(() => {
            infectionGame.addInfected();
        }));

        const addNormalButton = new Button(context, "Add normal", {
            x: configuration.padding + 150,
            y: corner.y + configuration.padding
        });
        tickablesArray.push(addNormalButton.drawable(context));
        canvas.addEventListener("click", addNormalButton.insideEvent(() => {
            infectionGame.addNormal();
        }));

        const resetButton = new Button(context, "Reset", {
            x: configuration.padding + 300,
            y: corner.y + configuration.padding
        });
        tickablesArray.push(resetButton.drawable(context));
        canvas.addEventListener("click", resetButton.insideEvent(() => {
            infectionGame.reset();
        }));

        const tickable = new CompositeTickable(tickablesArray);
        const repeatable = new Repeatable(tickable, configuration.updatePeriod);
        repeatable.tick();
    }

}

const app = new App();
app.start();
