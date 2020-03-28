import Organism from './Organism';

export default interface OrganismFilter<O extends Organism> {

    filter(organism: O): boolean;
}
