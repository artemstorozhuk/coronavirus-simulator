import DistanceOrganismFilter from '../../organism/position/DistanceOrganismFilter';
import PositionedOrganism from '../../organism/position/PositionedOrganism';
import Population from '../../population/Population';
import PopulationFilter from '../../population/PopulationFilter';
import CompositeInfectable from '../CompositeInfectable';
import EveryInfectable from '../EveryInfectable';
import FilteredInfectable from '../FilteredInfectable';
import Infectable from '../Infectable';
import InfectableCreator from './InfectableCreator';

export default class DistanceSpreadableCreator implements InfectableCreator<PositionedOrganism> {

    private readonly everyInfectable = new EveryInfectable<PositionedOrganism>();
    private readonly distance: number;

    constructor(distance: number) {
        this.distance = distance;
    }

    create(population: Population<PositionedOrganism>): Infectable<PositionedOrganism> {
        const organisms = population.organisms();
        const infectables = organisms
            .map(o => this.createInfectable(o));
        return new CompositeInfectable<PositionedOrganism>(infectables);
    }

    private createInfectable(o: PositionedOrganism): FilteredInfectable<PositionedOrganism> {
        const distanceFilter = new DistanceOrganismFilter(this.distance, o);
        const populationFilter = new PopulationFilter<PositionedOrganism>(distanceFilter);
        return new FilteredInfectable<PositionedOrganism>(populationFilter, this.everyInfectable);
    }

}
