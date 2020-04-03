import * as configuration from './configuration.json';
import Repeatable from './core/tick/Repeatable';
import CanvasFactory from './core/ui/CanvasFactory';
import InfectionChart from './infection/chart/InfectionChart';
import InfectionGame from './infection/spread/InfectionSpread';

class App {

    start() {
        const canvasFactory = new CanvasFactory();
        const canvas = canvasFactory.canvas("game-canvas", {
            width: configuration.canvasWidth,
            height: configuration.canvasHeight
        });
        const context = canvas.getContext("2d");

        const infectionGame = new InfectionGame(context);
        new Repeatable(infectionGame, configuration.updatePeriod)
            .tick();

        const chartCanvas = canvasFactory.canvas("chart-canvas", {
            width: configuration.chartWidth,
            height: configuration.chartHeight
        });
        const chartContext = chartCanvas.getContext("2d");

        const infectionChart = new InfectionChart(chartContext, infectionGame);
        new Repeatable(infectionChart, configuration.chartUpdatePeriod)
            .tick();

        document.getElementById("add-normal").addEventListener("click", () => infectionGame.addNormal());
        document.getElementById("add-infected").addEventListener("click", () => infectionGame.addInfected());
        document.getElementById("reset").addEventListener("click", () => {
            infectionGame.reset();
            infectionChart.reset();
        });
    }

}

const app = new App();
app.start();
