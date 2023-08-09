function number(a: number, b: number): (t: number) => number {
    return (t: number) => {
        return a * (1 - t) + b * t;
    };
}

export default {
    interpolateNumber: number
}