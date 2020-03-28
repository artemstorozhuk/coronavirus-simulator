import Organism from '../infection/organism/Organism';
import Drawer from './Drawer';

export default class OrganismDrawer implements Drawer {

    private readonly organism: Organism;
    private readonly normalDrawer: Drawer;
    private readonly infectedDrawer: Drawer;

    constructor(organism: Organism, normalDrawer: Drawer, infectedDrawer: Drawer) {
        this.organism = organism;
        this.normalDrawer = normalDrawer;
        this.infectedDrawer = infectedDrawer;
    }

    draw(context: CanvasRenderingContext2D) {
        if (this.organism.isInfected()) {
            this.infectedDrawer.draw(context);
        } else {
            this.normalDrawer.draw(context);
        }
    }

}
