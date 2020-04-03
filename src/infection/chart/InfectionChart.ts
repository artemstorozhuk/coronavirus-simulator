import * as configuration from '../../configuration.json';
import CanvasCleaner from '../../core/drawer/CanvasClearer';
import CompositeTickable from '../../core/tick/CompositeTickable';
import Drawable from '../../core/tick/Drawable';
import Tickable from '../../core/tick/Tickable';
import AddInfectedCountTickable from './AddInfectedCountTickable';
import InfectionChartDrawable from './InfectionChartDrawable';
import InfectionGame from '../spread/InfectionSpread';

export default class InfectionChart implements Tickable {

    private readonly mainTickable = new CompositeTickable();
    private readonly addInfectedCountTickable: AddInfectedCountTickable;

    constructor(context: CanvasRenderingContext2D, game: InfectionGame) {
        this.addInfectedCountTickable = new AddInfectedCountTickable(game);
        this.mainTickable.add(this.addInfectedCountTickable);
        this.mainTickable.add(new Drawable(context, new CanvasCleaner({
            point: {
                x: 0,
                y: 0
            },
            size: {
                width: configuration.chartWidth,
                height: configuration.chartHeight
            }
        })));
        this.mainTickable.add(new InfectionChartDrawable(context, game,
            this.addInfectedCountTickable.valuesIterable(), configuration.barWidth, configuration.chartHeight));
    }

    tick() {
        this.mainTickable.tick();
    }

    reset() {
        this.addInfectedCountTickable.reset();
    }

}
