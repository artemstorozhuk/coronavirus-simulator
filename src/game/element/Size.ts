export default class Size {
    public readonly width: number;
    public readonly height: number;

    constructor(width: number, height: number) {
        this.width = width;
        this.height = height;
    }

    add(size: Size) {
        return new Size(this.width + size.width, this.height + size.height);
    }

    subtract(size: Size) {
        return new Size(this.width - size.width, this.height - size.height);
    }
}
