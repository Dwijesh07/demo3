// Bar Chart - Energy Consumption by Screen Type (55 inch TVs)

const barWidth = 800;
const barHeight = 400;
const marginBar = {top: 20, right: 20, bottom: 80, left: 60};

const svgBar = d3.select("#bar-chart")
    .append("svg")
    .attr("viewBox", `0 0 ${barWidth} ${barHeight}`)
    .style("border", "1px solid #ccc");

const innerBar = svgBar.append("g")
    .attr("transform", `translate(${marginBar.left}, ${marginBar.top})`);

const innerWidthBar = barWidth - marginBar.left - marginBar.right;
const innerHeightBar = barHeight - marginBar.top - marginBar.bottom;

d3.csv("./data/Ex5_TV_energy_55inchtv_byScreenType.csv", d => {
    return {
        screenType: d["Screen_Tech"],
        avgEnergyConsumption: +d["Mean(Labelled energy consumption (kWh/year))"]
    };
}).then(data => {
    console.log("Bar Data:", data);

    const xScale = d3.scaleBand()
        .domain(data.map(d => d.screenType))
        .range([0, innerWidthBar])
        .padding(0.3);

    const yScale = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.avgEnergyConsumption)])
        .nice()
        .range([innerHeightBar, 0]);

    innerBar.append("g")
        .attr("transform", `translate(0, ${innerHeightBar})`)
        .call(d3.axisBottom(xScale))
        .selectAll("text")
        .attr("transform", "rotate(-40)")
        .style("text-anchor", "end");

    innerBar.append("g")
        .call(d3.axisLeft(yScale));

    innerBar.selectAll("rect")
        .data(data)
        .join("rect")
        .attr("x", d => xScale(d.screenType))
        .attr("y", d => yScale(d.avgEnergyConsumption))
        .attr("width", xScale.bandwidth())
        .attr("height", d => innerHeightBar - yScale(d.avgEnergyConsumption))
        .attr("fill", "#6a1b9a");
});
