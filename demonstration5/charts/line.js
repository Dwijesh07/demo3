// Line Chart - Power Prices Over Years

const lineWidth = 800;
const lineHeight = 400;
const marginLine = {top: 20, right: 20, bottom: 50, left: 60};

const svgLine = d3.select("#line-chart")
    .append("svg")
    .attr("viewBox", `0 0 ${lineWidth} ${lineHeight}`)
    .style("border", "1px solid #ccc");

const innerLine = svgLine.append("g")
    .attr("transform", `translate(${marginLine.left}, ${marginLine.top})`);

const innerWidthLine = lineWidth - marginLine.left - marginLine.right;
const innerHeightLine = lineHeight - marginLine.top - marginLine.bottom;

d3.csv("./data/Ex5_ARE_Spot_Prices.csv", d => {
    return {
        year: new Date(+d["Year"], 0, 1),
        averagePrice: +d["Average Price (notTas-Snowy)"]
    };
}).then(data => {
    console.log("Line Data:", data);

    const xScale = d3.scaleTime()
        .domain(d3.extent(data, d => d.year))
        .range([0, innerWidthLine]);

    const yScale = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.averagePrice)])
        .nice()
        .range([innerHeightLine, 0]);

    const xAxis = d3.axisBottom(xScale).tickFormat(d3.timeFormat("%Y"));
    const yAxis = d3.axisLeft(yScale);

    innerLine.append("g")
        .attr("transform", `translate(0, ${innerHeightLine})`)
        .call(xAxis);

    innerLine.append("g")
        .call(yAxis);

    const line = d3.line()
        .x(d => xScale(d.year))
        .y(d => yScale(d.averagePrice))
        .curve(d3.curveMonotoneX);

    innerLine.append("path")
        .datum(data)
        .attr("fill", "none")
        .attr("stroke", "#ff5733")
        .attr("stroke-width", 2)
        .attr("d", line);
});
