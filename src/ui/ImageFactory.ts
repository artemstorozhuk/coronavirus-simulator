export default class ImageFactory {

    loadHappy() {
        return this.load("../resources/happy.png");
    }

    load(src: string) {
        const image = new Image();
        image.src = src;
        return image;
    }

}
