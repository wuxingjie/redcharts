class Path {
    private readonly ctx: RenderingContext | SVGElement;
    constructor(ctx: RenderingContext | SVGElement) {
        this.ctx = ctx;
    }

    start(x: number, y: number) {}

    moveTo(x: number, y: number) {}

    bezierCurveTo(x: number, y: number) {}

    end(x: number, y: number) {
        return 0;
    }
}

function shape(mode: 'canvas' | 'svg', ctx: RenderingContext | SVGElement) {
    if (isSVGMode(ctx)) {
    }
    return {
        line: () => {},
    };
}

function isSVGMode(ctx: RenderingContext | SVGElement): ctx is SVGElement {
    return true;
}

function isCanvasMode(ctx: RenderingContext | SVGElement): ctx is RenderingContext {
    return true;
}
