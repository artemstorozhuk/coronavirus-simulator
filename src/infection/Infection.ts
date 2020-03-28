import InfectableFactory from './InfectableFactory';
import Organism from './organism/Organism';
import Population from './population/Population';

export default class Infection<O extends Organism> {

    private readonly population: Population<O>;
    private readonly infectableFactory: InfectableFactory<O>;

    constructor(population: Population<O>, infectableFactory: InfectableFactory<O>) {
        this.population = population;
        this.infectableFactory = infectableFactory;
    }

    outbreak() {
        const infectedOrganisms = this.population.organisms()
            .filter(o => o.isInfected());
        const infectedPopulation = new Population<O>(infectedOrganisms);
        const infectable = this.infectableFactory.create(infectedPopulation);
        infectable.infect(this.population);
    }

}
