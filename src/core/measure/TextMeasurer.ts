import Size from '../geometry/primitive/Size';
import Measurer from './Measurer';

export default class TextMeasurer implements Measurer {

    private readonly text: string;

    constructor(text: string) {
        this.text = text;
    }

    measure(context: CanvasRenderingContext2D): Size {
        const textMetrics = context.measureText(this.text);
        const width = textMetrics.width;
        const height = textMetrics.actualBoundingBoxAscent + textMetrics.actualBoundingBoxDescent;
        return {
            width: width,
            height: height
        }
    }

}