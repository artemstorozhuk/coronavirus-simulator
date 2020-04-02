import Size from '../geometry/primitive/Size';

export default interface Measurer {

    measure(context: CanvasRenderingContext2D): Size;
}
