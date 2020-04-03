import PaddingBarCreator from '../../chart/bar/PaddingBarCreator';
import SingleValueBarCreator from '../../chart/bar/SingleValueBarCreator';
import VerticallyReflectedBarCreator from '../../chart/bar/VerticallyReflectedBarCreator';
import ChartDrawer from '../../chart/ChartDrawer';
import Tickable from '../../core/tick/Tickable';
import InfectionGame from '../spread/InfectionSpread';

export default class InfectionChartDrawable implements Tickable {

    private readonly context: CanvasRenderingContext2D;
    private readonly game: InfectionGame;
    private readonly values: Iterable<number>;
    private readonly barWidth: number;
    private readonly height: number;

    constructor(context: CanvasRenderingContext2D,
        game: InfectionGame,
        values: Iterable<number>,
        barWidth: number,
        height: number) {
        this.context = context;
        this.game = game;
        this.values = values;
        this.barWidth = barWidth;
        this.height = height;
    }

    tick() {
        const max = this.game.count();
        const creator = new PaddingBarCreator(
            new VerticallyReflectedBarCreator(
                new SingleValueBarCreator(max, this.barWidth, this.height),
                this.height),
            1);
        new ChartDrawer<number>(this.values, creator)
            .draw(this.context);
    }

}
