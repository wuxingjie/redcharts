import { Path } from '../shape/path';

test('demo', () => {
    const path = new Path(0);
    path.moveTo(10, 10);
    path.lineTo(20, 20);
    expect(path.toString()).toBe(' M 10,10  L20,20 ');
});

export {};
