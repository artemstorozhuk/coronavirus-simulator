import Creator from '../../creator/Creator';
import Point from '../primitive/Point';
import DistanceFilter from './DistanceFilter';

export default class DistanceFilterCreator implements Creator<Point, DistanceFilter> {

    private readonly distance: number;

    constructor(distance: number) {
        this.distance = distance;
    }

    create(point: Point): DistanceFilter {
        return new DistanceFilter(point, this.distance);
    }

}
