import Organism from './Organism';

export default class SimpleOrganism implements Organism {

    private infected: boolean;

    constructor(infected: boolean = false) {
        this.infected = infected;
    }

    infect() {
        this.infected = true;
    }

    isInfected() {
        return this.infected;
    }

}
