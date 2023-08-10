function number(a: number, b: number): (t: number) => number {
    return (t: number) => {
        return a * (1 - t) + b * t;
    };
}

function numberRound(a: number, b: number): (t: number) => number {
    const interpolateNumber = number(a, b);
    return (t: number) => {
        return Math.round(interpolateNumber(t));
    };
}

const numRegExp1 = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g;
const numRegExp2 = new RegExp(numRegExp1.source);
function string(a: string, b: string): (t: string) => string {
    return (t: string) => {
        numRegExp1.lastIndex = numRegExp2.lastIndex = 0;
        "asdf12asdf12aadf 12px"
        while (numRegExp1.exec(a) && numRegExp2.exec(b)) {

        }
        return ''
    };
}
export default {
    interpolateNumber: number,
    interpolateNumberRound: numberRound
}