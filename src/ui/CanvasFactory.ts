import Size from "../game/element/Size";

export default class CanvasFactory {

    canvas(fieldSize: Size): HTMLCanvasElement {
        document.getElementById('wrapper').innerHTML = "<canvas id='game-canvas'><canvas/>";

        const canvas = <HTMLCanvasElement>document.getElementById("game-canvas");
        canvas.width = fieldSize.width;
        canvas.height = fieldSize.height;
        return canvas;
    }

}
