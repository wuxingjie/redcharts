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

function flatMap<T>(mapper: (e: T) => IterableIterator<T>): (f: Iterable<T>) => Iterable<T> {
    return (input: Iterable<T>): Iterable<T> => {
        function* gen(): Generator<T> {
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

function filter<T>(f: (e: T, i: number) => boolean): (f: Iterable<T>) => Iterable<T> {
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

function filterNot<T>(p: (e: T) => boolean): (f: Iterable<T>) => Iterable<T> {
    return filter<T>((e) => !p(e));
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

export { map, flatMap, skip, skipWhile, takeWhile, take, slice, filter, filterNot, scanLeft };
