type Nullable<T> = T | null | undefined;

function isNotNull<T>(v: T | null | undefined): v is T {
    return v != null;
}

function isNull(v: any): v is null {
    return v == null;
}

export { isNotNull, isNull };
export type { Nullable };
