import Point from './primitive/Point';

export default class DistanceMeasurer {

    private readonly point: Point;

    constructor(point: Point) {
        this.point = point;
    }

    distanceTo(point: Point): number {
        return Math.sqrt((this.point.x - point.x) * (this.point.x - point.x)
            + (this.point.y - point.y) * (this.point.y - point.y));
    }

}
