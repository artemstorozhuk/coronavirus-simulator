import Tickable from './Tickable';

export default class CompositeTickable implements Tickable {

    private readonly tickables: Array<Tickable>;

    constructor(tickables: Array<Tickable>) {
        this.tickables = tickables;
    }

    tick() {
        this.tickables.forEach(ticker => ticker.tick());
    }

}
