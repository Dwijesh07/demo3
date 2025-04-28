// Donut Chart - Screen Technology Distribution

const donutWidth = 500;
const donutHeight = 500;
const radius = Math.min(donutWidth, donutHeight) / 2;

const svgDonut = d3.select("#donut-chart")
    .append("svg")
    .attr("viewBox", `0 0 ${donutWidth} ${donutHeight}`)
    .style("border", "1px solid #ccc");

const donutGroup = svgDonut.append("g")
    .attr("transform", `translate(${donutWidth / 2}, ${donutHeight / 2})`);

const color = d3.scaleOrdinal(d3.schemeSet2);

d3.csv("./data/Ex5_TV_energy_Allsizes_byScreenType.csv", d => {
    return {
        screenType: d["Screen_Tech"],
        totalEnergy: +d["Mean(Labelled energy consumption (kWh/year))"]
    };
}).then(data => {
    console.log("Donut Data:", data);

    const pie = d3.pie()
        .value(d => d.totalEnergy);

    const arc = d3.arc()
        .innerRadius(radius * 0.5)
        .outerRadius(radius * 0.9);

    donutGroup.selectAll("path")
        .data(pie(data))
        .join("path")
        .attr("d", arc)
        .attr("fill", d => color(d.data.screenType))
        .attr("stroke", "white")
        .attr("stroke-width", 2);

    const labelArc = d3.arc()
        .innerRadius(radius * 0.6)
        .outerRadius(radius * 0.9);

    donutGroup.selectAll("text")
        .data(pie(data))
        .join("text")
        .attr("transform", d => `translate(${labelArc.centroid(d)})`)
        .attr("text-anchor", "middle")
        .attr("alignment-baseline", "middle")
        .style("font-size", "12px")
        .text(d => d.data.screenType);
});
