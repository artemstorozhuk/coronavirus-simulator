import Tickable from './Tickable';

export default class CompositeTickable implements Tickable {

    private readonly tickables = new Array<Tickable>();

    tick() {
        this.tickables.forEach(ticker => ticker.tick());
    }

    add(tickable: Tickable) {
        this.tickables.push(tickable);
    }

    remove(tickable: Tickable) {
        const index = this.tickables.indexOf(tickable);
        if (index >= 0) {
            this.tickables.splice(index, 1);
        }
    }

    clear() {
        this.tickables.splice(0, this.tickables.length);
    }

}
