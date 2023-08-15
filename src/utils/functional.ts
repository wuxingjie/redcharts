function constFunc<T>(a: T): () => T {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    return (...ignore: any[]) => a;
}

function identity<T>(a: T): T {
    return a;
}

interface ChainableFunction<T, R> {
    (v: T): R;

    andThen<N>(f: (v: R) => N): ChainableFunction<T, N>;
}

function chainable<T, R>(func: (v: T) => R): ChainableFunction<T, R> {
    // @ts-ignore
    func.andThen = <N>(n: (v: R) => N): ChainableFunction<T, N> => {
        return chainable((v: T) => n(func(v)));
    };
    return func as ChainableFunction<T, R>;
}

export { constFunc, identity, chainable };
export type { ChainableFunction };
