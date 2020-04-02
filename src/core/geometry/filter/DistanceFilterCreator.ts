import Creator from '../../creator/Creator';
import DistanceFilter from './DistanceFilter';
import Point from '../primitive/Point';

export default class DistanceFilterCreator implements Creator<Point, DistanceFilter> {

    private readonly distance: number;

    constructor(distance: number) {
        this.distance = distance;
    }

    create(point: Point): DistanceFilter {
        return new DistanceFilter(point, this.distance);
    }

}
