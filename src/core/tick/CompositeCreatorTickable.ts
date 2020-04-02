import Creator from '../creator/Creator';
import CompositeTickable from './CompositeTickable';
import Tickable from './Tickable';

export default class CompositeCreatorTickable<T> implements Tickable {

    private readonly creator: Creator<T, Tickable>;
    private readonly tickable = new CompositeTickable();

    constructor(creator: Creator<T, Tickable>) {
        this.creator = creator;
    }

    tick() {
        this.tickable.tick();
    }

    add(value: T) {
        this.tickable.add(this.creator.create(value));
    }

    clear() {
        this.tickable.clear();
    }

}
