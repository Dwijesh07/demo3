const populateFilters = (data) => {
    d3.select("#filters_screen")
      .selectAll("button")
      .data(filters_screen)
      .join("button")
      .attr("class", d => `filter ${d.isActive ? "active" : ""}`)
      .text(d => d.label)
      .on("click", (e, d) => {
        if (!d.isActive) {
          filters_screen.forEach(filter => {
            filter.isActive = filter.id === d.id;
          });
  
          d3.selectAll("#filters_screen .filter")
            .classed("active", d => d.isActive);
  
          updateHistogram(d.id, data);
        }
      });
  };
  
  const updateHistogram = (filterId, data) => {
    const filteredData = filterId === "all"
      ? data
      : data.filter(tv => tv.screenTech === filterId);
  
    const updatedBins = binGenerator(filteredData);
    const binsMaxLength = d3.max(updatedBins, d => d.length);
    yScale.domain([0, binsMaxLength]).nice();
  
    const bars = innerChart.selectAll("rect").data(updatedBins);
  
    bars.join(
      enter => enter.append("rect")
        .attr("x", d => xScale(d.x0))
        .attr("y", d => yScale(d.length))
        .attr("width", d => xScale(d.x1) - xScale(d.x0) - 1)
        .attr("height", d => innerHeight - yScale(d.length))
        .attr("fill", "steelblue")
        .attr("stroke", "white")
        .attr("stroke-width", 2),
      update => update.transition()
        .duration(500)
        .attr("x", d => xScale(d.x0))
        .attr("y", d => yScale(d.length))
        .attr("width", d => xScale(d.x1) - xScale(d.x0) - 1)
        .attr("height", d => innerHeight - yScale(d.length)),
      exit => exit.remove()
    );
  
    innerChart.select(".y-axis")
      .transition()
      .duration(500)
      .call(d3.axisLeft(yScale));
  };