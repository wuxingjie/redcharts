import {
    filter,
    filterNot,
    filterNotNull,
    flatMap, generate,
    map,
    scanLeft,
    skip,
    skipWhile,
    slice,
    take,
    takeWhile, toArray
} from "./Iterators";
import {Nullable} from './types';

class Stream<T> implements Iterable<T> {

    constructor(private it: Iterable<T>) {}

    static from<T>(it: Iterable<T>) {
        return new Stream(it)
    }

    static of<T>(...items: T[]) {
        return new Stream(items);
    }

    static generate<T>(supplier: () => T): Stream<Nullable<T>> {
        return Stream.from(generate(supplier))
    }

    [Symbol.iterator](): Iterator<T> {
        return this.it[Symbol.iterator]();
    }

    map = <R>(m: (v: T) => R): Stream<R> => new Stream(map(m)(this));

    flatMap = <R>(m: (v: T) => Iterable<R>): Stream<R> => new Stream(flatMap(m)(this));

    scanLeft = <R>(init: R, op: (b: R, e: T) => R): Stream<R> => new Stream(scanLeft(init,op)(this));

    filter = (f: (e: T, index: number) => boolean): Stream<T> => new Stream(filter(f)(this));

    filterNot = (f: (e: T, index: number) => boolean): Stream<T> => new Stream(filterNot(f)(this));

    filterNotNull = (): Stream<NonNullable<T>> => new Stream(filterNotNull<T>()(this));

    take = (n: number): Stream<T> => new Stream(take<T>(n)(this));

    takeWhile = (p: (e: T) => boolean): Stream<T> => new Stream(takeWhile(p)(this));

    skip = (n: number): Stream<T> => new Stream(skip<T>(n)(this));

    skipWhile = (p: (e: T) => boolean): Stream<T> => new Stream(skipWhile(p)(this));

    slice = (from: number, until: number): Stream<T> => new Stream(slice<T>(from, until)(this));

    toArray = (): T[] => toArray<T>()(this)

}

export {
    Stream
}