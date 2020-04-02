import Point from './Point';
import Size from './Size';

export default interface Rectangle {
    readonly point: Point;
    readonly size: Size;
}
