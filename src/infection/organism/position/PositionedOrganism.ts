import Point from '../../../element/Point';
import Organism from '../Organism';

export default class PositionedOrganism implements Organism {

    private readonly organism: Organism;
    readonly position: Point;

    constructor(organism: Organism, position: Point) {
        this.organism = organism;
        this.position = position;
    }

    infect() {
        this.organism.infect();
    }


    isInfected() {
        return this.organism.isInfected();
    }

}
