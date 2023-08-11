import { isNotNull } from './types';

function map<T, R>(m: (v: T) => R): (f: Iterable<T>) => Iterable<R> {
    return (input: Iterable<T>): Iterable<R> => {
        function* gen(): Generator<R> {
            for (const e of input) {
                yield m(e);
            }
        }
        return gen();
    };
}

function flatMap<T, R>(mapper: (e: T) => Iterable<R>): (f: Iterable<T>) => Iterable<R> {
    return (input: Iterable<T>): Iterable<R> => {
        function* gen(): Generator<R> {
            for (const e of input) {
                for (const eElement of mapper(e)) {
                    yield eElement;
                }
            }
        }
        return gen();
    };
}

function scanLeft<T, B>(init: B, op: (b: B, e: T) => B): (f: Iterable<T>) => Iterable<B> {
    return (input: Iterable<T>): Iterable<B> => {
        function* gen(): Generator<B> {
            for (const e of input) {
                yield op(init, e);
            }
        }
        return gen();
    };
}

function filter<T>(f: (e: T, index: number) => boolean): (f: Iterable<T>) => Iterable<T> {
    return (input: Iterable<T>): Iterable<T> => {
        let index = 0;
        function* gen(): Generator<T> {
            for (const e of input) {
                if (f(e, index++)) {
                    yield e;
                }
            }
        }
        return gen();
    };
}

function filterNotNull<T>(): (f: Iterable<T>) => Iterable<NonNullable<T>> {
    return filter(isNotNull) as (f: Iterable<T>) => Iterable<NonNullable<T>>;
}

function filterNot<T>(p: (e: T, index: number) => boolean): (f: Iterable<T>) => Iterable<T> {
    return filter<T>((e, i) => !p(e, i));
}

function take<T>(n: number): (f: Iterable<T>) => Iterable<T> {
    return filter<T>((_, index) => {
        return index < n;
    });
}

function takeWhile<T>(p: (e: T) => boolean): (f: Iterable<T>) => Iterable<T> {
    return (input: Iterable<T>): Iterable<T> => {
        function* gen(): Generator<T> {
            for (const e of input) {
                if (p(e)) {
                    return;
                }
                yield e;
            }
        }
        return gen();
    };
}

function skip<T>(n: number): (f: Iterable<T>) => Iterable<T> {
    return filter<T>((_, index) => {
        return index > n;
    });
}

function skipWhile<T>(p: (e: T) => boolean): (f: Iterable<T>) => Iterable<T> {
    let status = false;
    return filter<T>((e) => {
        status = status || p(e);
        return status;
    });
}

function slice<T>(from: number, until: number): (f: Iterable<T>) => Iterable<T> {
    return (input: Iterable<T>): Iterable<T> => {
        function* gen(): Generator<T> {
            let index = 0;
            for (const e of input) {
                if (index > from || index === from) {
                    yield e;
                } else if (index === until) {
                    return;
                }
                index++;
            }
        }
        return gen();
    };
}

function zip<T, B>(curr: Iterable<T>, that: Iterable<B>): Iterable<[T, B]> {
    function* gen(): Generator<[T, B]> {
        const thatIt = that[Symbol.iterator];
        for (const e of curr) {
            const thatNext = thatIt().next();
            if (!thatNext.done) {
                yield [e, thatNext.value];
            } else {
                break;
            }
        }
    }
    return gen();
}

function zipWithIndex<T>(): (i: Iterable<T>) => Iterable<[T, number]> {
    return (it: Iterable<T>): Iterable<[T, number]> => {
        function* gen(): Generator<[T, number]> {
            let i = 0;
            for (const e of it) {
                yield [e, i++];
            }
        }
        return gen();
    };
}

// -------------------------collectors-----------------------
function toArray<T>(): (f: Iterable<T>) => T[] {
    return (f: Iterable<T>) => Array.from(f);
}

// -------------------------creator---------------------------
function iterate<T>(seed: T, p: () => boolean, next: (v: T) => T): Iterable<T> {
    function* gen(): Generator<T> {
        yield seed;
        while (p()) {
            yield (seed = next(seed));
        }
    }
    return gen();
}

function* generate<T>(supplier: () => T): Generator<T> {
    yield supplier();
}

export {
    map,
    flatMap,
    skip,
    skipWhile,
    takeWhile,
    take,
    slice,
    filter,
    filterNotNull,
    filterNot,
    scanLeft,
    zip,
    zipWithIndex,
    toArray,
    // creators
    iterate,
    generate,
};
