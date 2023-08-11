import {filterNotNull, generate, map, takeWhile, toArray} from '../utils/Iterators';
import {chainable, identity} from '../utils/functional';
import {Iterator} from '../utils/Iterator';

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
        const regs: IterableIterator<RegExpExecArray | null> = generate(() => numRegExp1.exec(t))
        const jd =
        chainable(filterNotNull<RegExpExecArray | null>())
            .andThen(map(r => r.input))
            .andThen((value) =>{
                return value;
            })
            .andThen(map(d => d))
            .andThen(toArray())
            (regs);

        while (numRegExp1.exec(a) && numRegExp2.exec(b)) {

        }
        return ''
    };
}
export default {
    interpolateNumber: number,
    interpolateNumberRound: numberRound
}