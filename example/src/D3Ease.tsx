import * as d3 from 'd3';
import { useEffect, useRef } from 'react';
export const D3Ease = () => {
    const svgRef = useRef(null);
    useEffect(() => {
        const margin = { top: 120, right: 120, bottom: 120, left: 120 },
            width = 960 - margin.left - margin.right,
            height = 960 - margin.top - margin.bottom;

        const x = d3.scaleLinear().range([0, width]);
        const y = d3.scaleLinear().range([height, 0]);
        if (svgRef.current) {
            const svg = d3.select(svgRef.current);
            const path = d3
                .line()
                .x(function (t) {
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore
                    return x(t);
                })
                .y(function (t) {
                    return y(ease(t));
                });

            let ease: (arg0: number | [number, number]) => d3.NumberValue;

            svg.attr('width', width + margin.left + margin.right)
                .attr('height', height + margin.top + margin.bottom)
                .append('g')
                .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

            svg.append('g')
                .attr('class', 'axis axis--x')
                .attr('transform', 'translate(0,' + height + ')')
                .call(d3.axisBottom(x).tickSize(-height).tickPadding(6))
                .append('text')
                .attr('class', 'axis-title')
                .attr('x', width - 10)
                .attr('y', 8)
                .attr('dy', '.71em')
                .attr('text-anchor', 'end')
                .attr('font-weight', 'bold')
                .text('t = ');

            svg.append('g')
                .attr('class', 'axis axis--y')
                .call(d3.axisLeft(y).tickSize(-width).tickPadding(6))
                .append('text')
                .attr('class', 'axis-title')
                .attr('x', -24)
                .attr('dy', '.32em')
                .attr('text-anchor', 'end')
                .attr('font-weight', 'bold')
                .text('ease(t) = ');

            const line = svg
                .append('g')
                .attr('class', 'line')
                .append('path')
                .datum(d3.range(0, 1, 0.002).concat(1));

            const dot1 = svg.append('circle').attr('r', 5);

            const dot2 = svg
                .append('circle')
                .attr('cx', width + 20)
                .attr('r', 5);

            d3.select('#ease-type')
                .on('change', changed)
                .property('value', top?.location.hash ? top?.location.hash.slice(1) : 'linear')
                .each(changed);

            // eslint-disable-next-line no-inner-declarations
            function changed() {
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                ease = d3['ease' + this.value[0].toUpperCase() + this.value.slice(1)] || d3.easeLinearIn;
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                line.attr('d', path);
            }
            d3.line;
            d3.timer(function (elapsed) {
                const t = (elapsed % 3000) / 3000;
                dot1.attr('cx', x(t)).attr('cy', y(ease(t)));
                dot2.attr('cy', y(ease(t)));
            });
        }
    });
    return (
        <div style={{ width: '100%', height: '100%' }}>
            <select id="ease-type" defaultValue={'quadIn'}>
                <option value="linear">linear</option>
                <option value="quadIn">quadIn</option>
                <option value="quadOut">quadOut</option>
                <option value="quadInOut">quadInOut</option>
                <option value="cubicIn">cubicIn</option>
                <option value="cubicOut">cubicOut</option>
                <option value="cubicInOut">cubicInOut</option>
                <option value="polyIn">polyIn</option>
                <option value="polyOut">polyOut</option>
                <option value="polyInOut">polyInOut</option>
                <option value="sinIn">sinIn</option>
                <option value="sinOut">sinOut</option>
                <option value="sinInOut">sinInOut</option>
                <option value="expIn">expIn</option>
                <option value="expOut">expOut</option>
                <option value="expInOut">expInOut</option>
                <option value="circleIn">circleIn</option>
                <option value="circleOut">circleOut</option>
                <option value="circleInOut">circleInOut</option>
                <option value="bounceIn">bounceIn</option>
                <option value="bounceOut">bounceOut</option>
                <option value="bounceInOut">bounceInOut</option>
                <option value="backIn">backIn</option>
                <option value="backOut">backOut</option>
                <option value="backInOut">backInOut</option>
                <option value="elasticIn">elasticIn</option>
                <option value="elasticOut">elasticOut</option>
                <option value="elasticInOut">elasticInOut</option>
            </select>
            <svg ref={svgRef} height={600} width="600" />
        </div>
    );
};
