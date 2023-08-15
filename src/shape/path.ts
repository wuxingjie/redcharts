import { isNotNull } from '../utils/types';

type Point = {
    x: number;
    y: number;
};

class Path {
    private pathString = '';
    private start?: Point;
    private end?: Point;
    constructor(private ctx: CanvasRenderingContext2D | SVGElement) {}

    moveTo(x: number, y: number) {
        this.start = { x, y };
        this.end = { x, y };
        this.append(`M ${x},${y}`);
    }

    closePath() {
        if (isNotNull(this.start) && isNotNull(this.end)) {
            this.end = { ...this.start };
            this.append('Z');
        }
    }

    lineTo(x: number, y: number) {
        this.end = { x, y };
        this.append(`L${x},${y}`);
    }

    bezierCurveTo(x1: number, y1: number, x2: number, y2: number, x: number, y: number) {
        this.end = { x, y };
        this.append(`C ${x1} ${y1},${x2} ${y2},${x} ${y}`);
    }

    rect(x: number, y: number, w: number, h: number) {
        this.start = { x, y };
        this.end = { x, y };
        this.append(`M${x},${y}h${w}v${h}h${w}Z`);
    }

    toString(): string {
        return this.pathString;
    }

    private append(path: string) {
        this.pathString += ` ${path} `;
    }
}

export { Path };
