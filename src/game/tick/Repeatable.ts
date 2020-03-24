import Tickable from "./Tickable";

export default class Repeatable implements Tickable {

    private readonly tickable: Tickable;
    private repeatPeriod: number;

    constructor(tickable: Tickable, repeatPeriod: number) {
        this.tickable = tickable;
        this.repeatPeriod = repeatPeriod;
    }

    tick() {
        const now = new Date().getTime();
        this.tickable.tick();
        const delta = new Date().getTime() - now;
        setTimeout(() => this.tick(), Math.max(0, this.repeatPeriod - delta));
    }

}
