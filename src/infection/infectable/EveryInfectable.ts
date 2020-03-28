import Organism from '../organism/Organism';
import Population from '../population/Population';
import Infectable from './Infectable';

export default class EveryInfectable<O extends Organism> implements Infectable<O> {

    infect(population: Population<O>): Population<O> {
        population
            .organisms()
            .forEach(organism => organism.infect());
        return population;
    }

}
