import { chainable, identity } from '../utils/functional';
import { Iterator } from '../utils/Iterator';
import { filterNotNull, generate, map, takeWhile, toArray, zip } from '../utils/Iterators';
import { Stream } from '../utils/stream';
import { isNotNull } from '../utils/types';

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
function string(a: string, b: string): (t: number) => string {
    return (t: number) => {
        numRegExp1.lastIndex = numRegExp2.lastIndex = 0;
        const aNumbers = Stream.generate(() => numRegExp1.exec(a))
            .takeWhile(isNotNull)
            .filterNotNull()
            .map((r) => Number(r[0]))
            .toArray();
        const bNumbers = Stream.generate(() => numRegExp1.exec(b))
            .takeWhile(isNotNull)
            .filterNotNull()
            .map((r) => {
                return {
                    numStr: r[0],
                    num: Number(r[0]),
                    startIndex: r.index,
                    endIndex: r.index + r[0].length,
                };
            })
            .toArray();
        Stream.from(aNumbers)
            .zip(bNumbers)
            .map(([aNum, bInfo]) => {
                number(aNum, bInfo.num);
            });
        const ziped = Stream.zip(aNumbers, bNumbers);
        if (bNumbers.length > aNumbers.length) {
            return b;
        }

        return '';
    };
}
export { number as interpolateNumber, numberRound as interpolateNumberRound, string as interpolateString };
