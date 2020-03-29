import EuclideDistance from '../../../geometry/EuclideDistance';
import OrganismFilter from '../OrganismFilter';
import PositionedOrganism from './PositionedOrganism';

export default class DistanceOrganismFilter implements OrganismFilter<PositionedOrganism> {

    private readonly euclideDistance = new EuclideDistance();
    private readonly distance: number;
    private readonly organism: PositionedOrganism;

    constructor(distance: number, organism: PositionedOrganism) {
        this.distance = distance;
        this.organism = organism;
    }

    filter(organism: PositionedOrganism): boolean {
        return this.euclideDistance.measure(this.organism.position, organism.position) <= this.distance;
    }

}
