export default class Random {

    value(max: number, min: number = 0): number {
        return min + Math.random() * (max - min);
    }

}
