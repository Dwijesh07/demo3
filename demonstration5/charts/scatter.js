// Scatter Plot - Energy Consumption vs Star Rating

const scatterWidth = 800;
const scatterHeight = 400;
const margin = {top: 20, right: 20, bottom: 50, left: 60};

const svgScatter = d3.select("#scatter-chart")
    .append("svg")
    .attr("viewBox", `0 0 ${scatterWidth} ${scatterHeight}`)
    .style("border", "1px solid #ccc");

const innerScatter = svgScatter.append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

const innerWidth = scatterWidth - margin.left - margin.right;
const innerHeight = scatterHeight - margin.top - margin.bottom;

d3.csv("./data/Ex5_TV_energy.csv", d => {
    return {
        starRating: +d["star2"],
        energyConsumption: +d["energy_consumpt"]
    };
}).then(data => {
    console.log("Scatter Data:", data);

    const xScale = d3.scaleLinear()
        .domain(d3.extent(data, d => d.starRating))
        .nice()
        .range([0, innerWidth]);

    const yScale = d3.scaleLinear()
        .domain(d3.extent(data, d => d.energyConsumption))
        .nice()
        .range([innerHeight, 0]);

    const xAxis = d3.axisBottom(xScale);
    const yAxis = d3.axisLeft(yScale);

    innerScatter.append("g")
        .attr("transform", `translate(0, ${innerHeight})`)
        .call(xAxis)
        .append("text")
        .attr("x", innerWidth / 2)
        .attr("y", 40)
        .attr("fill", "black")
        .text("Star Rating");

    innerScatter.append("g")
        .call(yAxis)
        .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", -50)
        .attr("x", -innerHeight / 2)
        .attr("text-anchor", "middle")
        .attr("fill", "black")
        .text("Energy Consumption (kWh)");

    innerScatter.selectAll("circle")
        .data(data)
        .join("circle")
        .attr("cx", d => xScale(d.starRating))
        .attr("cy", d => yScale(d.energyConsumption))
        .attr("r", 4)
        .attr("fill", "#3399ff")
        .attr("opacity", 0.7);
});
