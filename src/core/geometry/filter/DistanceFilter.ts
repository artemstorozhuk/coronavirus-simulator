import Filter from '../../filter/Filter';
import DistanceMeasurer from '../DistanceMeasurer';
import Point from '../primitive/Point';

export default class DistanceFilter implements Filter<Point> {

    private readonly measurer: DistanceMeasurer;
    private readonly distance: number;

    constructor(point: Point, distance: number) {
        this.measurer = new DistanceMeasurer(point);
        this.distance = distance;
    }

    filter(point: Point): boolean {
        return this.measurer.distanceTo(point) <= this.distance;
    }

}
