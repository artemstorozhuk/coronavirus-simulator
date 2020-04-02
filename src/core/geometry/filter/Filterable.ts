import Creator from '../../creator/Creator';
import CompositeFilter from '../../filter/CompositeFilter';
import Filter from '../../filter/Filter';

export default class Filterable<T> {

    private readonly filterCreator: Creator<T, Filter<T>>;
    private readonly values = new Set<T>();
    private readonly filtered = new Set<T>();

    private readonly filter = new CompositeFilter<T>();

    constructor(filterCreator: Creator<T, Filter<T>>) {
        this.filterCreator = filterCreator;
    }

    doFilter() {
        const filtered = new Array<T>();
        this.values.forEach(value => {
            if (this.filter.filter(value)) {
                filtered.push(value);
            }
        });
        filtered.forEach(value => {
            this.values.delete(value);
            this.addFiltered(value);
        });
    }

    addValue(value: T) {
        this.values.add(value);
    }

    addFiltered(value: T) {
        this.filtered.add(value);
        this.filter.add(this.filterCreator.create(value));
    }

    reset() {
        this.values.clear();
        this.filtered.clear();
        this.filter.clear();
    }

    valuesCount() {
        return this.values.size;
    }

    filteredCount() {
        return this.filtered.size;
    }

    valuesIterable(): Iterable<T> {
        return this.values;
    }

    filteredIterable(): Iterable<T> {
        return this.filtered;
    }

}
