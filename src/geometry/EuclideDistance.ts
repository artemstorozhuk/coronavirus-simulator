import Point from './Point';

export default class EuclideDistance {

    measure(p1: Point, p2: Point): number {
        return (p1.x - p2.x) * (p1.x - p2.x) + (p1.y - p2.y) * (p1.y - p2.y);
    }

}
