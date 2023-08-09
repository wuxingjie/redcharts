class Iterator<T> implements IterableIterator<T> {

    [Symbol.iterator](): IterableIterator<T> {
        return this;
    }

    next(): IteratorResult<T, T> {
    }

    map<N>(mapper: (e: T) => N): Iterator<N> {

    }

    flatMap(mapper: (e: T) => IterableIterator<T>): Iterator<T>{

    }

    scanLeft<B>(init: B, op: (b: B, e: T) => B): Iterator<B> {
    }

    filter(p: (e: T) => boolean): Iterator<T>{

    }

    filterNot(p: (e: T) => boolean): Iterator<T>{

    }

    take(n: number): Iterator<T> {

    }

    takeWhile(p: (e: T) => boolean): Iterator<T>{

    }

    skip(n: number): Iterator<T>{

    }

    skipWhile(n: number): Iterator<T>{

    }

    slice(from: number, until: number): Iterator<T> {

    }

}
