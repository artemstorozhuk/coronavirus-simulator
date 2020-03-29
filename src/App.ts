import CanvasCleaner from './draw/CanvasClearer';
import CompositeDrawer from './draw/CompositeDrawer';
import Drawer from './draw/Drawer';
import ImageDrawer from './draw/ImageDrawer';
import OrganismDrawer from './draw/OrganismDrawer';
import DistanceSpreadableCreator from './infection/infectable/creator/DistanceSpreadableCreator';
import OnlyInfectedCreator from './infection/infectable/creator/OnlyInfectedCreator';
import Infection from './infection/Infection';
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
import CanvasFactory from './ui/CanvasFactory';
import ImageFactory from './ui/ImageFactory';

class App {
    start() {
        const canvasSize = { width: 640, height: 480 };
        const size = 10;
        const imageSize = { width: size, height: size };
        const sizeSq = size * size;
        const fieldSize = { width: canvasSize.width - imageSize.width, height: canvasSize.height - imageSize.height };
        const speed = 1;
        const updatePeriod = 20;
        const populationSize = 100;

        const canvasFactory = new CanvasFactory();
        const canvas = canvasFactory.create(canvasSize);
        const context = canvas.getContext("2d");

        const random = new Random();

        const imageFactory = new ImageFactory();
        const happyImage = imageFactory.happy();
        const infectedImage = imageFactory.infected();

        const tickablesArray = new Array<Tickable>();

        const organismArray = new Array<PositionedOrganism>();

        const drawersArray = new Array<Drawer>();
        drawersArray.push(new CanvasCleaner(canvasSize));

        for (let i = 0; i < populationSize; i++) {
            const point = random.generatePoint(fieldSize);

            const movable = new Movable(point, random.generateDirection(speed), fieldSize);
            tickablesArray.push(movable);

            const organism = new SimpleOrganism(i == 0);
            const normalDrawer = new ImageDrawer(happyImage, point, imageSize);
            const infectedDrawer = new ImageDrawer(infectedImage, point, imageSize);

            drawersArray.push(new OrganismDrawer(organism, normalDrawer, infectedDrawer));

            organismArray.push(new PositionedOrganism(organism, point));
        }

        const population = new Population<PositionedOrganism>(organismArray);
        const creator = new OnlyInfectedCreator<PositionedOrganism>(new DistanceSpreadableCreator(sizeSq));
        const infection = new Infection<PositionedOrganism>(population, creator);

        tickablesArray.push(new InfectionSpreadable<PositionedOrganism>(infection));

        tickablesArray.push(new Drawable(context, new CompositeDrawer(drawersArray)));

        const tickable = new CompositeTickable(tickablesArray);
        const repeatable = new Repeatable(tickable, updatePeriod);
        repeatable.tick();
    }
}

const app = new App();
app.start();
