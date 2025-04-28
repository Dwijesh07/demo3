let binGenerator, innerChart; // Shared across histogram and updates

const drawHistogram = (data) => {
  d3.select("#histogram").selectAll("*").remove();

  const svg = d3.select("#histogram")
    .append("svg")
    .attr("viewBox", `0 0 ${width} ${height}`);

  innerChart = svg.append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);

  binGenerator = d3.bin().value(d => d.energyConsumption);
  const bins = binGenerator(data);

  const minEng = bins[0].x0;
  const maxEng = bins[bins.length - 1].x1;
  const binsMaxLength = d3.max(bins, d => d.length);

  xScale.domain([minEng, maxEng]).range([0, innerWidth]);
  yScale.domain([0, binsMaxLength]).range([innerHeight, 0]).nice();

  innerChart.selectAll("rect")
    .data(bins)
    .join("rect")
    .attr("x", d => xScale(d.x0))
    .attr("y", d => yScale(d.length))
    .attr("width", d => xScale(d.x1) - xScale(d.x0) - 1)
    .attr("height", d => innerHeight - yScale(d.length))
    .attr("fill", "steelblue")
    .attr("stroke", "white")
    .attr("stroke-width", 2);

  innerChart.append("g")
    .attr("transform", `translate(0, ${innerHeight})`)
    .call(d3.axisBottom(xScale));

  svg.append("text")
    .text("Labelled Energy Consumption (kWh/year)")
    .attr("text-anchor", "end")
    .attr("x", width - 20)
    .attr("y", height - 5)
    .attr("class", "axis-label");

  innerChart.append("g")
    .attr("class", "y-axis")
    .call(d3.axisLeft(yScale));

  svg.append("text")
    .text("Frequency")
    .attr("x", 30)
    .attr("y", 20)
    .attr("class", "axis-label");
};