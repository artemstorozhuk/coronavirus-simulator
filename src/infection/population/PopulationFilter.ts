import Organism from '../organism/Organism';
import OrganismFilter from '../organism/OrganismFilter';
import Population from './Population';

export default class PopulationFilter<O extends Organism> {

    private readonly organismFilter: OrganismFilter<O>;

    constructor(organismFilter: OrganismFilter<O>) {
        this.organismFilter = organismFilter;
    }

    filter(population: Population<O>): Population<O> {
        const filteredPopulation = population
            .organisms()
            .filter(organism => this.organismFilter.filter(organism));
        return new Population(filteredPopulation);
    }

}
