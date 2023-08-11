import { interpolateString } from './index';

test('interpolateString', () => {
    const interp = interpolateString('1px', '10px');
    const res = interp(0.5);
    expect(res).toBe('5.5px');
    const interp1 = interpolateString('1px', '10px red');
    const res1 = interp1(0.5);
    expect(res1).toBe('5.5px red');
});

export {};
