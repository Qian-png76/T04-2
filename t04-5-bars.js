const createBarChart = (data) => {
    // 1. Define logical canvas size (viewBox) and visible display size
    const viewW = 500; 
    const viewH = 1600; 

    const displayW = 640; 
    const displayH = 420; 

    const svg = d3.select(".responsive-svg-container")
        .append("svg")
        .attr("viewBox", `0 0 ${viewW} ${viewH}`) // Logical coordinate system
        .attr("width", displayW) // Actual pixel width on screen
        .attr("height", displayH) // Actual pixel height on screen
        .style("border", "1px solid black");

    // 2. X Scale (Numeric - handles the bar width)
    const xMax = d3.max(data, d => d.count); // Find the highest count
    const xScale = d3.scaleLinear()
        .domain([0, xMax]) // Map data from 0 to the max count
        .range([0, viewW]); // Map output from 0 to the logical width (500)

    // 3. Y Scale (Categorical - handles the vertical spacing)
    const yScale = d3.scaleBand()
        .domain(data.map(d => d.brand)) // Extract all unique brands for the Y axis
        .range([0, viewH]) // Spread across the logical height (1600)
        .paddingInner(0.2) // Add space between bars
        .paddingOuter(0.1); // Add space at the top and bottom

    // 4. Draw the Bars
    svg.selectAll("rect")
        .data(data)
        .join("rect")
        .attr("class", d => `bar bar-${d.count}`)
        .attr("x", 0) // All bars start at the left edge
        .attr("y", d => yScale(d.brand)) // Set vertical position based on brand
        .attr("width", d => xScale(d.count)) // Set width based on count
        .attr("height", yScale.bandwidth()) // Height comes from the band scale spacing
        .attr("fill", "steelblue"); // Add some colour!
};