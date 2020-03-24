import Size from "../game/element/Size";

export default class CanvasFactory {

    create(size: Size): HTMLCanvasElement {
        document.getElementById('wrapper').innerHTML = "<canvas id='game-canvas'><canvas/>";
        const canvas = <HTMLCanvasElement>document.getElementById("game-canvas");
        canvas.width = size.width;
        canvas.height = size.height;
        return canvas;
    }

}
