import Organism from '../organism/Organism';
import Population from '../population/Population';
import PopulationFilter from '../population/PopulationFilter';
import Infectable from './Infectable';

export default class FilteredInfectable<O extends Organism> implements Infectable<O> {

    private readonly populationFilter: PopulationFilter<O>;
    private readonly infectable: Infectable<O>;

    constructor(populationFilter: PopulationFilter<O>, infectable: Infectable<O>) {
        this.populationFilter = populationFilter;
        this.infectable = infectable;
    }

    infect(population: Population<O>): Population<O> {
        const filteredPopulation = this.populationFilter
            .filter(population);
        return this.infectable
            .infect(filteredPopulation);
    }

}
