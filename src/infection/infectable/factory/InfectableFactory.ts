import Infectable from '../Infectable';
import Organism from '../../organism/Organism';
import Population from '../../population/Population';

export default interface InfectableFactory<O extends Organism> {

    create(population: Population<O>): Infectable<O>;
}
