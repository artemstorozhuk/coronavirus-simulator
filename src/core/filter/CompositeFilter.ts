import Filter from './Filter';

export default class CompositeFilter<T> implements Filter<T> {

    private readonly filters = new Array<Filter<T>>();

    filter(value: T): boolean {
        return this.filters
            .some(filter => filter.filter(value));
    }

    add(filter: Filter<T>) {
        this.filters.push(filter);
    }

    remove(filter: Filter<T>) {
        const index = this.filters.indexOf(filter);
        if (index >= 0) {
            this.filters.splice(index, 1);
        }
    }

    clear() {
        this.filters.splice(0, this.filters.length);
    }

}
