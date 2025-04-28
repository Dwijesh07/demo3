// Create the SVG inside the responsive container
const svg = d3.select(".responsive-svg-container")
    .append("svg")
    .attr("viewBox", "0 0 500 1600") // Smaller width for testing scaling
    .style("border", "1px solid black");

// Load the CSV data
d3.csv("./data/tvBrandCount.csv", d => {
    return {
        brand: d["Brand_Reg"],             // Correct column name
        count: +d["Count(Model_No)"]        // Correct column name
    };
}).then(data => {
    console.log(data);
    console.log("Number of rows:", data.length);
    console.log("Max count:", d3.max(data, d => d.count));
    console.log("Min count:", d3.min(data, d => d.count));
    console.log("Extent (min and max):", d3.extent(data, d => d.count));

    createBarChart(data);
});

// Function to create the bar chart
const createBarChart = data => {
    const xScale = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.count)])
        .range([0, 500]);

    const yScale = d3.scaleBand()
        .domain(data.map(d => d.brand))
        .range([0, 1600])
        .padding(0.2);

    svg.selectAll("rect")
        .data(data)
        .join("rect")
        .attr("class", d => `bar bar-${d.count}`)
        .attr("x", 0)
        .attr("y", d => yScale(d.brand))
        .attr("width", d => xScale(d.count))
        .attr("height", yScale.bandwidth())
        .attr("fill", "steelblue");
};
