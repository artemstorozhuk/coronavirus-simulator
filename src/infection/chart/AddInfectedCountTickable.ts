import Tickable from '../../core/tick/Tickable';
import InfectionGame from '../spread/InfectionSpread';

export default class AddInfectedCountTickable implements Tickable {

    private readonly values = new Array<number>();
    private readonly game: InfectionGame;

    constructor(game: InfectionGame) {
        this.game = game;
    }

    tick() {
        this.values.push(this.game.infectedCount());
    }

    valuesIterable(): Iterable<number> {
        return this.values;
    }

    reset() {
        this.values.splice(0, this.values.length);
    }

}
