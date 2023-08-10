function identity<T>(a: T): () => T{
    return () => a;
}
interface ChainableFunction<T, R> {
    (v: T): R

    andThen<N>(f: (v: R) => N): ChainableFunction<R, N>
}

function chainable<T, R>(func: (v: T) => R): ChainableFunction<T, R> {
    // @ts-ignore
    func.andThen = (n: (v: R) => N): ChainableFunction<T, R> => {
        return chainable((v: T) => n(func(v)))
    }
    return func as ChainableFunction<T, R>;
}

export {
    identity,
    chainable,
    ChainableFunction
}