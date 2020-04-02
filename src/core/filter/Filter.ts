export default interface Filter<T> {
    filter(value: T): boolean;
}
