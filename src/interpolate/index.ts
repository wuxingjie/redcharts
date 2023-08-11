import { constFunc } from '../utils/functional';
import { Stream } from '../utils/stream';
import { isNotNull, isNull, isNumeric } from '../utils/types';

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
const numRegExpSplit = /([-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?)/g;
function string(a: string, b: string): (t: number) => string {
    numRegExp1.lastIndex = numRegExpSplit.lastIndex = 0;
    const aNumbers = Stream.generate(() => numRegExp1.exec(a))
        .takeWhile(isNull)
        .filterNotNull()
        .map((r) => Number(r[0]))
        .toArray();

    let numIndex = 0;
    const tokenFunctions = Stream.from(b.split(numRegExpSplit))
        .map((r) => {
            // number
            if (isNumeric(r) && aNumbers[numIndex] !== undefined) {
                const numInterp = number(aNumbers[numIndex], Number(r));
                numIndex++;
                return numInterp;
            }
            // string
            return constFunc(r);
        })
        .toArray();
    return (t: number) => {
        return tokenFunctions.map((f) => f(t)).join('');
    };
}
export { number as interpolateNumber, numberRound as interpolateNumberRound, string as interpolateString };
