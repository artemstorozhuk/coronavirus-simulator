import Drawer from "./draw/Drawer";
import Ticker from "./tick/Ticker";

export default class Game implements Ticker {

    private readonly context: CanvasRenderingContext2D;
    private readonly ticker: Ticker;
    private readonly drawer: Drawer;
    private readonly updateTime: number;

    constructor(context: CanvasRenderingContext2D, ticker: Ticker, drawer: Drawer, updateTime: number) {
        this.context = context;
        this.ticker = ticker;
        this.drawer = drawer;
        this.updateTime = updateTime;
    }

    tick() {
        const now = new Date().getTime();
        this.ticker.tick();
        this.drawer.draw(this.context);
        const delta = new Date().getTime() - now;
        setTimeout(() => this.tick(), Math.max(0, this.updateTime - delta));
    }

}
