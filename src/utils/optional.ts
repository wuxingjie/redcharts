class Optional<T>{

    isEmpty = ():boolean => true;

    isDefined = ():boolean => !this.isEmpty()

    get = <R>(): T => null as unknown as T;

    getOrElse<N>(v: N | (() => N)): Optional<N> {
        return null as unknown as Optional<N>
    }

    map<N>(f: (v: T) => N): Optional<N> {
        return null as unknown as Optional<N>;
    }

    filter(f: (v: T) => boolean): Optional<T> {
        return null as unknown as Optional<T>;
    }

    exist(f: (v: T) => boolean): boolean {
        return true;
    }

    contains = (v: T): boolean => this.isDefined() && this.get() === v;

}
