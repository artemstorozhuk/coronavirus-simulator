export default class Randomizer {

    random(max: number, min: number = 0): number {
        return Math.random() * (max - min) - min;
    }

}
