export default interface Creator<T, R> {
    create(arg: T): R;
}
