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
