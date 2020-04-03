import * as configuration from '../configuration.json';
import CanvasCleaner from '../core/drawer/CanvasClearer';
import PointImageDrawerCreator from '../core/drawer/creator/PointImageDrawerCreator';
import IterableDrawer from '../core/drawer/IterableDrawer';
import RectangleDrawer from '../core/drawer/RectangleDrawer';
import RandomPointCreator from '../core/geometry/creator/RandomPointCreator';
import Point from '../core/geometry/primitive/Point';
import CompositeCreatorTickable from '../core/tick/CompositeCreatorTickable';
import CompositeTickable from '../core/tick/CompositeTickable';
import DistanceFilterable from '../core/tick/DistanceFilterable';
import Drawable from '../core/tick/Drawable';
import Tickable from '../core/tick/Tickable';
import ImageFactory from '../core/ui/ImageFactory';
import BrownianMovableCreator from './move/brownian/BrownianMovableCreator';
import VectorMovableCreator from './move/vector/VectorMovableCreator';

export default class InfectionGame implements Tickable {

    private readonly fieldRectangle = {
        point: {
            x: 0,
            y: 0
        },
        size: {
            width: configuration.canvasWidth - configuration.imageSize,
            height: configuration.canvasHeight - configuration.imageSize
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

        const canvasRectangle = {
            point: {
                x: 0,
                y: 0
            },
            size: {
                width: configuration.canvasWidth,
                height: configuration.canvasHeight
            }
        };
        const imageSize = {
            width: configuration.imageSize,
            height: configuration.imageSize
        };
        this.mainTickable.add(new Drawable(context, new CanvasCleaner(canvasRectangle)));
        this.mainTickable.add(new Drawable(context, new RectangleDrawer(canvasRectangle)));

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

    count() {
        return this.distanceFilterable.filteredCount() + this.distanceFilterable.valuesCount();
    }

    infectedCount() {
        return this.distanceFilterable.filteredCount();
    }

    reset() {
        this.distanceFilterable.reset();
        this.movable.clear();
    }

}
