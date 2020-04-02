import Size from '../geometry/primitive/Size';

export default class CanvasFactory {

    canvas(id: string, size: Size): HTMLCanvasElement {
        const canvas = <HTMLCanvasElement>document.getElementById(id);
        canvas.width = size.width;
        canvas.height = size.height;
        return canvas;
    }

}
