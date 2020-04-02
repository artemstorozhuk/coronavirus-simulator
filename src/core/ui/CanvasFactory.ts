import Size from "../geometry/primitive/Size";

export default class CanvasFactory {

    create(size: Size): HTMLCanvasElement {
        const canvas = <HTMLCanvasElement>document.getElementById("game-canvas");
        canvas.width = size.width;
        canvas.height = size.height;
        return canvas;
    }

}
