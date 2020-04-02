import * as configuration from '../configuration.json';
import PointImageDrawerCreator from '../core/drawer/creator/PointImageDrawerCreator';
import IterableDrawer from '../core/drawer/IterableDrawer';
import RandomPointCreator from '../core/geometry/creator/RandomPointCreator';
import Point from '../core/geometry/primitive/Point';
import BrownianMovableCreator from '../core/move/brownian/BrownianMovableCreator';
import VectorMovableCreator from '../core/move/vector/VectorMovableCreator';
import CompositeCreatorTickable from '../core/tick/CompositeCreatorTickable';
import CompositeTickable from '../core/tick/CompositeTickable';
import DistanceFilterable from '../core/tick/DistanceFilterable';
import Drawable from '../core/tick/Drawable';
import Tickable from '../core/tick/Tickable';
import ImageFactory from '../core/ui/ImageFactory';

export default class InfectionGame implements Tickable {

    private readonly fieldRectangle = {
        point: {
            x: configuration.canvasX,
            y: configuration.canvasY
        },
        size: {
            width: configuration.canvasWidth - 2 * configuration.imageSize,
            height: configuration.canvasHeight - 2 * configuration.imageSize
        }
    };

    private readonly randomPointCreator = new RandomPointCreator();

    private readonly mainTickable = new CompositeTickable();
    private readonly distanceFilterable = new DistanceFilterable(configuration.infectionDistance);
    private readonly movable: CompositeCreatorTickable<Point>;

    constructor(context: CanvasRenderingContext2D) {
        const vectorCreator = new VectorMovableCreator(this.fieldRectangle, configuration.speed);
        const brownianCreator = new BrownianMovableCreator(this.fieldRectangle, configuration.speed);

        this.movable = new CompositeCreatorTickable<Point>(vectorCreator);
        this.mainTickable.add(this.movable);

        this.mainTickable.add(this.distanceFilterable);

        const imageSize = {
            width: configuration.imageSize,
            height: configuration.imageSize
        };
        const imageFactory = new ImageFactory();
        this.mainTickable.add(new Drawable(context, new IterableDrawer<Point>(this.distanceFilterable.valuesIterable(),
            new PointImageDrawerCreator(imageFactory.happy(), imageSize))));
        this.mainTickable.add(new Drawable(context, new IterableDrawer<Point>(this.distanceFilterable.filteredIterable(),
            new PointImageDrawerCreator(imageFactory.infected(), imageSize))));
    }

    tick() {
        this.mainTickable.tick();
    }

    addNormal(point: Point = this.randomPointCreator.create(this.fieldRectangle)) {
        this.movable.add(point);
        this.distanceFilterable.addValue(point);
    }

    addInfected(point: Point = this.randomPointCreator.create(this.fieldRectangle)) {
        this.movable.add(point);
        this.distanceFilterable.addFiltered(point);
    }

    reset() {
        this.distanceFilterable.reset();
        this.movable.clear();
    }

}
