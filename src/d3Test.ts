import {select} from 'd3'
let data:number[] = [10, 15, 30, 50, 80, 65, 55, 30, 20, 10, 8]; // <- A

function render(data: number[]) { // <- B
    let bars =
        select<HTMLDivElement,number>("body")
            .selectAll<HTMLDivElement,number>("div.h-bar") // <- C
            .data<number>(data); // Update <- D

    // Enter
    bars.enter() // <- E
        .append("div") // <- F
        .attr("class", "h-bar") // <- G
        .merge(bars) // Enter + Update <- H
        .style("width", function (d) {
            return (d * 3) + "px"; // <- I
        })
        .text(function (d: number) {
            return d; // <- J
        })
        .exit() // Exit <- K
        .remove();

}

setInterval(function () { // <- L
    data.shift();
    data.push(Math.round(Math.random() * 100));
    render(data);
}, 1500);

render(data);
