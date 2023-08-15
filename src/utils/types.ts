type Nullable<T> = T | null | undefined;

function isNotNull<T>(v: T | null | undefined): v is T {
    return v != null;
}

function isNull(v: any): v is null {
    return v == null;
}

function isNumeric(v: any): v is number {
    return !isNaN(v) && !isNaN(parseFloat(v));
}

export type { Nullable };
export { isNotNull, isNull, isNumeric };
