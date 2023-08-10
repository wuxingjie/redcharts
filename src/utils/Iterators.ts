function map<T,R>(m: (v: T) => R): (f: Iterable<T>) => Iterable<R> {
    return (input: Iterable<T>): Iterable<R> => {
        function* gen(): Generator<R> {
            for (const e of input){
                yield m(e)
            }
        }
        return gen();
    }
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

export {
    map
}
