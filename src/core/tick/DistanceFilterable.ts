import DistanceFilterCreator from '../geometry/filter/DistanceFilterCreator';
import Filterable from '../geometry/filter/Filterable';
import Point from '../geometry/primitive/Point';
import Tickable from './Tickable';

export default class DistanceFilterable implements Tickable {

    private readonly filterable: Filterable<Point>;

    constructor(distance: number) {
        const filterCreator = new DistanceFilterCreator(distance);
        this.filterable = new Filterable<Point>(filterCreator)
    }

    tick() {
        this.filterable.doFilter();
    }

    addValue(point: Point) {
        this.filterable.addValue(point);
    }

    addFiltered(point: Point) {
        this.filterable.addFiltered(point);
    }

    reset() {
        this.filterable.reset();
    }

    filteredCount() {
        return this.filterable.filteredCount();
    }

    valuesCount() {
        return this.filterable.valuesCount();
    }

    valuesIterable() {
        return this.filterable.valuesIterable();
    }

    filteredIterable() {
        return this.filterable.filteredIterable();
    }

}
