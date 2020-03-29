import InfectableCreator from './infectable/creator/InfectableCreator';
import Organism from './organism/Organism';
import Population from './population/Population';

export default class Infection<O extends Organism> {

    private readonly population: Population<O>;
    private readonly infectableCreator: InfectableCreator<O>;

    constructor(population: Population<O>, infectableCreator: InfectableCreator<O>) {
        this.population = population;
        this.infectableCreator = infectableCreator;
    }

    spread() {
        this.infectableCreator
            .create(this.population)
            .infect(this.population);
    }

}
