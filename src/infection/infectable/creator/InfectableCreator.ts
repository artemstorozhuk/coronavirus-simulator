import Organism from '../../organism/Organism';
import Population from '../../population/Population';
import Infectable from '../Infectable';

export default interface InfectableCreator<O extends Organism> {

    create(population: Population<O>): Infectable<O>;
}
