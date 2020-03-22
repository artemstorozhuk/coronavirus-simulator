export default class ImageFactory {

    happy() {
        const image = new Image();
        image.src = "../resources/happy.png";
        return image;
    }
}
