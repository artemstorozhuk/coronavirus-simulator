import Drawer from "./draw/Drawer";
import Ticker from "./tick/Ticker";

export default class Game {

    private readonly context: CanvasRenderingContext2D;
    private readonly tickers: Array<Ticker>;
    private readonly drawers: Array<Drawer>;
    private tickInterval: number;
    private intervalTickId: number = 0;

    constructor(context: CanvasRenderingContext2D,
        tickers: Array<Ticker>,
        drawers: Array<Drawer>,
        tickInterval: number) {
        this.context = context;
        this.tickers = tickers;
        this.drawers = drawers;
        this.tickInterval = tickInterval;
    }

    start() {
        this.intervalTickId = setInterval(() => this.tick(), this.tickInterval);
    }

    stop() {
        clearInterval(this.intervalTickId);
        this.intervalTickId = 0;
    }

    tick() {
        this.tickers.forEach(ticker => ticker.tick());
        this.drawers.forEach(drawer => drawer.draw(this.context));
    }

}
