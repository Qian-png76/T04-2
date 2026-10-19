const createBarChart = (data) => {
    // 1. Create the SVG container
    const svg = d3.select(".responsive-svg-container")
        .append("svg")
        .attr("viewBox", "0 0 1200 400") // temporary layout
        .style("border", "1px solid black");

    // 2 & 3. Bind data, create rects, and add attributes
    svg
        .selectAll("rect")
        .data(data)
        .join("rect")
            // Add a class to each bar based on the data
            .attr("class", d => `bar bar-${d.count}`)
            // Set the width based on the count value
            .attr("width", d => d.count)
            // Set a constant height for all bars
            .attr("height", 16);
};