import * as configuration from './configuration.json';
import CanvasCleaner from './draw/CanvasClearer';
import RectangleDrawer from './draw/RectangleDrawer';
import Rectangle from './geometry/Rectangle';
import Size from './geometry/Size';
import InfectionGame from './infection/InfectionGame';
import CompositeTickable from './tick/CompositeTickable';
import Drawable from './tick/Drawable';
import Repeatable from './tick/Repeatable';
import Tickable from './tick/Tickable';
import TickableRegistry from './tick/TickableRegistry';
import Button from './ui/Button';
import CanvasFactory from './ui/CanvasFactory';

class App implements TickableRegistry {

    private readonly gameSize: Size;
    private readonly gameRectangle: Rectangle;

    private readonly updatePeriod: number;

    private readonly tickablesArray = new Array<Tickable>();

    constructor() {
        this.gameSize = {
            width: configuration.gameWidth,
            height: configuration.gameHeight
        };
        this.gameRectangle = new Rectangle({
            x: 0,
            y: 0
        }, this.gameSize);
    }

    start() {
        const canvasFactory = new CanvasFactory();
        const canvas = canvasFactory.create(this.gameSize);
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

        this.tickablesArray.push(new Drawable(context, new CanvasCleaner(this.gameRectangle)));
        this.tickablesArray.push(new Drawable(context, new RectangleDrawer(canvasRectangle)));

        const infectionGame = new InfectionGame();
        infectionGame.init(context, this);

        this.addButton(canvas, new Button(context, "Add infected", {
            x: configuration.padding,
            y: corner.y + configuration.padding
        }), () => {
            infectionGame.addInfected();
        });

        this.addButton(canvas, new Button(context, "Add normal", {
            x: configuration.padding + 150,
            y: corner.y + configuration.padding
        }), () => {
            infectionGame.addNormal();
        });

        this.addButton(canvas, new Button(context, "Reset", {
            x: configuration.padding + 300,
            y: corner.y + configuration.padding
        }), () => {
            infectionGame.reset();
        });

        const tickable = new CompositeTickable(this.tickablesArray);
        const repeatable = new Repeatable(tickable, this.updatePeriod);
        repeatable.tick();
    }

    register(tickable: Tickable) {
        this.tickablesArray.push(tickable);
    }

    private addButton(canvas: HTMLCanvasElement, button: Button, event: () => void) {
        this.tickablesArray.push(new Drawable(canvas.getContext("2d"), button.drawer()));
        const insideEvent = button.insideEvent(event);
        canvas.addEventListener("click", insideEvent);
    }

}

const app = new App();
app.start();
