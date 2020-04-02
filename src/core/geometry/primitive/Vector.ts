import Point from './Point';

export default interface Vector {
    readonly point: Point;
    readonly direction: Point;
}
