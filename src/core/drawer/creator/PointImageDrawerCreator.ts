import Creator from '../../creator/Creator';
import Point from '../../geometry/primitive/Point';
import Size from '../../geometry/primitive/Size';
import ImageDrawer from '../ImageDrawer';

export default class PointImageDrawerCreator implements Creator<Point, ImageDrawer> {

    private readonly image: CanvasImageSource;
    private readonly imageSize: Size;

    constructor(image: CanvasImageSource, imageSize: Size) {
        this.image = image;
        this.imageSize = imageSize;
    }

    create(point: Point): ImageDrawer {
        return new ImageDrawer(this.image, point, this.imageSize);
    }
}
