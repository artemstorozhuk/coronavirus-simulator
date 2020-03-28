import Infection from '../infection/Infection';
import Organism from '../infection/organism/Organism';
import Tickable from './Tickable';

export default class InfectionOutbreakable<O extends Organism> implements Tickable {

    private readonly infection: Infection<O>;

    constructor(infection: Infection<O>) {
        this.infection = infection;
    }

    tick() {
        this.infection.outbreak();
    }

}
