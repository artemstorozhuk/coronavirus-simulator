import Organism from '../organism/Organism';

export default class Population<O extends Organism> {

    private readonly organismArray: Array<O>;

    constructor(organismArray: Array<O>) {
        this.organismArray = organismArray;
    }

    organisms(): Array<O> {
        return this.organismArray;
    }

}
