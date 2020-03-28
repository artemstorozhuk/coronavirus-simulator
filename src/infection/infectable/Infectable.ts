import Organism from '../organism/Organism';
import Population from '../population/Population';

export default interface Infectable<O extends Organism> {

    infect(population: Population<O>): Population<O>;

}
