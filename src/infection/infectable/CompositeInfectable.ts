import Organism from '../organism/Organism';
import Population from '../population/Population';
import Infectable from './Infectable';

export default class CompositeInfectable<O extends Organism> implements Infectable<O> {

    private readonly infectables: Array<Infectable<O>>;

    constructor(infectables: Array<Infectable<O>>) {
        this.infectables = infectables;
    }

    infect(population: Population<O>): Population<O> {
        const organisms = new Array<O>();
        this.infectables.forEach(infectable => {
            infectable.infect(population)
                .organisms()
                .filter(o => organisms.indexOf(o) < 0)
                .forEach(o => organisms.push(o))
        });
        return new Population<O>(organisms);
    }

}
