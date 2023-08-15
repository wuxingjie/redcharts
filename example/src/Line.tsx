import { useEffect, useRef } from 'react';

import { Line } from '../../src/shape';

export const LineTsx = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const svgRef = useRef<SVGSVGElement>(null);

    useEffect(() => {
        if (svgRef.current) {
            const line = new Line(svgRef.current);
            line.start(10, 10);
            line.point(40, 10);
            line.point(40, 40);
            line.end(1, 'red');
        }
        if (canvasRef.current) {
            const ctx = canvasRef.current.getContext('2d');
            if (ctx) {
                const line = new Line(ctx);
                line.start(10, 10);
                line.point(40, 10);
                line.point(40, 40);
                line.end(1, 'red');
            }
        }
    });
    return (
        <div style={{ width: 800, height: 800 }}>
            <canvas width={400} height={400} style={{ width: 400, height: 400 }} ref={canvasRef} />
            <svg width={400} height={400} ref={svgRef} />
        </div>
    );
};
