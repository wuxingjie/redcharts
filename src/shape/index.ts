import { Path } from './path';

const xmlns = 'http://www.w3.org/2000/svg';

abstract class Shape {
    abstract start(x: number, y: number): void;
    abstract point(x: number, y: number): void;
}

class Line extends Shape {
    private path: Path;
    private beforePoint?: [number, number];

    constructor(
        private ctx: CanvasRenderingContext2D | SVGElement,
        public smooth = false,
    ) {
        super();
        this.path = new Path(ctx);
    }

    start(x: number, y: number): Line {
        this.path.moveTo(x, y);
        this.beforePoint = [x, y];
        return this;
    }

    point(x: number, y: number): Line {
        if (this.smooth && this.beforePoint) {
            const [x0, y0] = this.beforePoint;
            this.path.bezierCurveTo((x0 + x) / 2, y0, x0, y, x, y);
        } else {
            this.path.lineTo(x, y);
        }
        this.beforePoint = [x, y];
        return this;
    }

    end(width: number, color: string) {
        if (isSVGMode(this.ctx)) {
            console.log(this.path.toString());
            const path = document.createElementNS(xmlns, 'path');
            path.setAttribute('d', this.path.toString());
            path.setAttribute('stroke-width', `${width}px`);
            path.setAttribute('stroke', color);
            path.setAttribute('fill', 'none');
            this.ctx.appendChild(path);
        } else {
            this.ctx.strokeStyle = color;
            this.ctx.lineWidth = width;
            this.ctx.stroke(new Path2D(this.path.toString()));
        }
    }
}

class Area extends Path {}

function isSVGMode(ctx: CanvasRenderingContext2D | SVGElement): ctx is SVGElement {
    return !!(ctx as SVGElement).addEventListener;
}

function isCanvasMode(ctx: CanvasRenderingContext2D | SVGElement): ctx is CanvasRenderingContext2D {
    return !!(ctx as CanvasRenderingContext2D).canvas;
}

export { Line, Area, isSVGMode, isCanvasMode };
