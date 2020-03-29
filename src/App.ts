import * as configuration from './configuration.json';
import CanvasCleaner from './draw/CanvasClearer';
import CompositeDrawer from './draw/CompositeDrawer';
import Drawer from './draw/Drawer';
import ImageDrawer from './draw/ImageDrawer';
import OrganismDrawer from './draw/OrganismDrawer';
import RectangleDrawer from './draw/RectangleDrawer';
import Point from './geometry/Point';
import Rectangle from './geometry/Rectangle';
import Size from './geometry/Size';
import DistanceSpreadableCreator from './infection/infectable/creator/DistanceSpreadableCreator';
import OnlyInfectedCreator from './infection/infectable/creator/OnlyInfectedCreator';
import Infection from './infection/Infection';
import Organism from './infection/organism/Organism';
import PositionedOrganism from './infection/organism/position/PositionedOrganism';
import SimpleOrganism from './infection/organism/SimpleOrganism';
import Population from './infection/population/Population';
import Random from './random/Random';
import CompositeTickable from './tick/CompositeTickable';
import Drawable from './tick/Drawable';
import InfectionSpreadable from './tick/InfectionSpreadable';
import Movable from './tick/Movable';
import Repeatable from './tick/Repeatable';
import Tickable from './tick/Tickable';
import Button from './ui/Button';
import CanvasFactory from './ui/CanvasFactory';
import ImageFactory from './ui/ImageFactory';

class App {

    private readonly random = new Random();

    private readonly imageFactory = new ImageFactory();
    private readonly happyImage = this.imageFactory.happy();
    private readonly infectedImage = this.imageFactory.infected();

    private readonly gameSize: Size;

    private readonly canvasPoint: Point;
    private readonly canvasSize: Size;
    private readonly canvasRectangle: Rectangle;

    private readonly fieldSize: Size;
    private readonly fieldRectangle: Rectangle;

    private readonly size: number;
    private readonly imageSize: Size;

    private readonly speed: number;
    private readonly updatePeriod: number;
    private readonly populationSize: number;

    private readonly tickablesArray = new Array<Tickable>();
    private readonly organismArray = new Array<PositionedOrganism>();
    private readonly drawersArray = new Array<Drawer>();

    constructor() {
        this.gameSize = {
            width: configuration.gameWidth,
            height: configuration.gameHeight
        };

        this.canvasPoint = {
            x: configuration.canvasX,
            y: configuration.canvasY
        };
        this.canvasSize = {
            width: configuration.canvasWidth,
            height: configuration.canvasHeight
        };
        this.canvasRectangle = new Rectangle(this.canvasPoint, this.canvasSize);

        this.size = configuration.imageSize;
        this.imageSize = {
            width: this.size,
            height: this.size
        };

        this.fieldSize = {
            width: this.canvasSize.width - this.imageSize.width,
            height: this.canvasSize.height - this.imageSize.height
        };
        this.fieldRectangle = new Rectangle(this.canvasPoint, this.fieldSize);

        this.speed = configuration.speed;
        this.updatePeriod = configuration.updatePeriod;
        this.populationSize = configuration.population;
    }

    start() {
        const canvasFactory = new CanvasFactory();
        const canvas = canvasFactory.create(this.gameSize);
        const context = canvas.getContext("2d");

        this.drawersArray.push(new CanvasCleaner(this.canvasRectangle));
        this.drawersArray.push(new RectangleDrawer(this.canvasRectangle));

        this.addInfectedButton(canvas);
        this.addNormalButton(canvas);

        const population = new Population<PositionedOrganism>(this.organismArray);
        const creator = new OnlyInfectedCreator<PositionedOrganism>(new DistanceSpreadableCreator(this.size * this.size));
        const infection = new Infection<PositionedOrganism>(population, creator);

        this.tickablesArray.push(new InfectionSpreadable<PositionedOrganism>(infection));

        this.tickablesArray.push(new Drawable(context, new CompositeDrawer(this.drawersArray)));

        const tickable = new CompositeTickable(this.tickablesArray);
        const repeatable = new Repeatable(tickable, this.updatePeriod);
        repeatable.tick();
    }

    private addInfectedButton(canvas: HTMLCanvasElement) {
        const button = new Button(canvas.getContext("2d"), "Add infected", {
            x: configuration.padding,
            y: this.canvasRectangle.corner().y + configuration.padding
        });

        this.drawersArray.push(button.drawer());
        const inside = button.inside(() => {
            this.addOrganism(new SimpleOrganism(true));
        });
        canvas.addEventListener("click", inside);
    }

    private addNormalButton(canvas: HTMLCanvasElement) {
        const button = new Button(canvas.getContext("2d"), "Add normal", {
            x: configuration.padding + 100,
            y: this.canvasRectangle.corner().y + configuration.padding
        });

        this.drawersArray.push(button.drawer());
        const inside = button.inside(() => {
            this.addOrganism(new SimpleOrganism());
        });
        canvas.addEventListener("click", inside);
    }

    private addOrganism(organism: Organism) {
        const point = this.random.generatePoint(this.fieldSize);

        const movable = new Movable(point, this.random.generateDirection(this.speed), this.fieldRectangle);
        this.tickablesArray.push(movable);

        const normalDrawer = new ImageDrawer(this.happyImage, point, this.imageSize);
        const infectedDrawer = new ImageDrawer(this.infectedImage, point, this.imageSize);

        this.drawersArray.push(new OrganismDrawer(organism, normalDrawer, infectedDrawer));

        this.organismArray.push(new PositionedOrganism(organism, point));
    }
}

const app = new App();
app.start();
