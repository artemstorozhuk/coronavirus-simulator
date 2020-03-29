import * as configuration from '../configuration.json';
import CompositeDrawer from '../draw/CompositeDrawer';
import Drawer from '../draw/Drawer';
import ImageDrawer from '../draw/ImageDrawer';
import OrganismDrawer from '../draw/OrganismDrawer';
import Rectangle from '../geometry/Rectangle';
import Random from '../random/Random';
import CompositeTickable from '../tick/CompositeTickable';
import Drawable from '../tick/Drawable';
import InfectionSpreadable from '../tick/InfectionSpreadable';
import Movable from '../tick/Movable';
import Tickable from '../tick/Tickable';
import ImageFactory from '../ui/ImageFactory';
import DistanceSpreadableCreator from './infectable/creator/DistanceSpreadableCreator';
import OnlyInfectedCreator from './infectable/creator/OnlyInfectedCreator';
import Infection from './Infection';
import Organism from './organism/Organism';
import PositionedOrganism from './organism/position/PositionedOrganism';
import SimpleOrganism from './organism/SimpleOrganism';
import Population from './population/Population';

export default class InfectionGame implements Tickable {

    private readonly random = new Random();

    private readonly imageSize = {
        width: configuration.imageSize,
        height: configuration.imageSize,
    };

    private readonly imageFactory = new ImageFactory();
    private readonly happyImage = this.imageFactory.happy();
    private readonly infectedImage = this.imageFactory.infected();

    private readonly fieldRectangle: Rectangle;

    private readonly organisms = new Array<PositionedOrganism>();
    private readonly organismDrawers = new Array<Drawer>();
    private readonly organismMovables = new Array<Movable>();

    private readonly tickable: Tickable;

    constructor(context: CanvasRenderingContext2D) {
        const canvasPoint = {
            x: configuration.canvasX,
            y: configuration.canvasY
        };
        const canvasSize = {
            width: configuration.canvasWidth,
            height: configuration.canvasHeight
        };

        const fieldSize = {
            width: canvasSize.width - this.imageSize.width,
            height: canvasSize.height - this.imageSize.height
        };
        this.fieldRectangle = new Rectangle(canvasPoint, fieldSize);

        const population = new Population<PositionedOrganism>(this.organisms);
        const infectionDistanceSq = configuration.infectionDistance * configuration.infectionDistance;
        const creator = new OnlyInfectedCreator<PositionedOrganism>(new DistanceSpreadableCreator(infectionDistanceSq));
        const infection = new Infection<PositionedOrganism>(population, creator);

        this.tickable = new CompositeTickable([new InfectionSpreadable<PositionedOrganism>(infection),
        new CompositeTickable(this.organismMovables),
        new Drawable(context, new CompositeDrawer(this.organismDrawers))]);
    }

    tick() {
        this.tickable.tick();
    }

    addInfected() {
        this.addOrganism(new SimpleOrganism(true));
    }

    addNormal() {
        this.addOrganism(new SimpleOrganism());
    }

    reset() {
        this.organisms.splice(0, this.organisms.length);
        this.organismDrawers.splice(0, this.organismDrawers.length);
        this.organismMovables.splice(0, this.organismMovables.length);
    }

    ingectedCount() {
        return this.organisms
            .filter(o => o.isInfected())
            .length;
    }

    totalCount() {
        return this.organisms.length;
    }

    private addOrganism(organism: Organism) {
        const point = this.random.inRectangle(this.fieldRectangle);

        const movable = new Movable(point, this.random.direction(configuration.speed), this.fieldRectangle);
        this.organismMovables.push(movable);

        const normalDrawer = new ImageDrawer(this.happyImage, point, this.imageSize);
        const infectedDrawer = new ImageDrawer(this.infectedImage, point, this.imageSize);

        this.organismDrawers.push(new OrganismDrawer(organism, normalDrawer, infectedDrawer));

        this.organisms.push(new PositionedOrganism(organism, point));
    }

}
