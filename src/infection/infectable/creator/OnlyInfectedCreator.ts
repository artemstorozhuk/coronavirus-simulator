import Organism from '../../organism/Organism';
import Population from '../../population/Population';
import Infectable from '../Infectable';
import InfectableFactory from './InfectableCreator';

export default class OnlyInfectedCreator<O extends Organism> implements InfectableFactory<O> {

    private readonly factory: InfectableFactory<O>;

    constructor(factory: InfectableFactory<O>) {
        this.factory = factory;
    }

    create(population: Population<O>): Infectable<O> {
        const infectedOrganisms = population.organisms()
            .filter(o => o.isInfected());
        const infectedPopulation = new Population<O>(infectedOrganisms);
        return this.factory.create(infectedPopulation);
    }

}
