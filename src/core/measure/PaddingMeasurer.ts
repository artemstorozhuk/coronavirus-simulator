import Measurer from './Measurer';

export default class PaddingMeasurer implements Measurer {

    private readonly measurer: Measurer;
    private readonly padding: number;

    constructor(measurer: Measurer, padding: number) {
        this.measurer = measurer;
        this.padding = padding;
    }

    measure(context: CanvasRenderingContext2D) {
        const size = this.measurer.measure(context);
        return {
            width: size.width + this.padding,
            height: size.height + this.padding
        }
    }

}
