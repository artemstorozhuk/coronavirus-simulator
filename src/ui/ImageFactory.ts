export default class ImageFactory {

    happy() {
        return this.image("../resources/happy.png");
    }

    infected() {
        return this.image("../resources/infected.png");
    }

    private image(src: string) {
        const image = new Image();
        image.src = src;
        return image;
    }

}
