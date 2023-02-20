/* CONSTANTS AND GLOBALS */
const height = window.innerHeight * 0.8;
const width = window.innerWidth * 0.8;

const margin = {
    top: 50,
    left: 50,
    right: 200,
    bottom: 50
  };


/* LOAD DATA */
d3.csv("cleaned_data.csv", d3.autoType).then(data => {

    console.log(data);
//   /* SCALES ##################################################### */

//   const xScale = d3.scaleLinear()
//     .domain([0, d3.max(data.map(d => d["Rotten Tomatoes Ratings %"]))])
//     .range([margin.left, width - margin.right])

//   const yScale = d3.scaleLinear()
//     .domain([0, d3.max(data, d => d["Audience Ratings %"])])
//     .range([height - margin.top, margin.bottom])

//   // Placing genres and colors in variables to be reused in colorScale & Legend
//   const allGenres = ["Comedy", "Drama", "Adventure", "Thriller", "Horror", "Action", "Romance"];
//   const allColors = ["Yellow", "Red", "Green", "Purple", "Black", "Blue", "Pink"];

//   const colorScale = d3.scaleOrdinal()
//     .domain(allGenres)
//     .range(allColors)

//   const sizeScale = d3.scaleSqrt()
//     .domain([1, d3.max(data, d => d["Budget (million $)"])])
//     .range([3, 16]);


//   /* HTML ELEMENTS ############################################## */

  // SVG CANVAS -----------------------------------------------
  const svg = d3.select("#container")
    .append("svg")
    .attr("width", width)
    .attr("height", height)
    .style("background-color", "lavender")

//   // AXIS TICKS  ----------------------------------------------
//   svg.append("g")
//     .attr("transform", `translate(0,${height - margin.top})`)
//     .call(d3.axisBottom(xScale));
  
//   svg.append("g")
//     .attr("transform", `translate(${margin.bottom},0)`)
//     .call(d3.axisLeft(yScale));

//   // AXIS LABELS ----------------------------------------------
//   svg.append("text")
//     .attr("text-anchor", "end")
//     .attr("x", width / 2 + margin.left * 2)
//     .attr("y", height - 6)
//     .style("font-weight", "bold")
//     .style("font-size", "1.2rem")
//     .text("Rotten Tomatoes Ratings %");

//   svg.append("text")
//     .attr("text-anchor", "end")
//     .attr("x", -height / 2 + margin.left * 2)
//     .attr("y", 15)
//     .style("font-weight", "bold")
//     .style("font-size", "1.2rem")
//     .attr("transform", "rotate(-90)")
//     .text("Audience Ratings %");

//   // DOTS FOR SCATTERPLOT ----------------------------------
//   const dot = svg
//     .selectAll(".dot") // Line below sorts films by largest budget to smallest, so small dots appear on top
//     .data(data.sort((a, b) => b["Budget (million $)"] - a["Budget (million $)"])) 
//     .join(
//       enter => enter
//         .append("circle")
//           .attr("class", "dot")
//           .attr("transform", `translate(${margin.left}, ${height - margin.top})`)
//           .attr("r", d => sizeScale(d["Budget (million $)"]))
//           .attr("fill", d => colorScale(d.Genre))
//           .attr("stroke", "black")
//           .attr("opacity", "0.4")
//           .on("mouseover", tipMouseover)
//           .on("mouseout", tipMouseout)
//         .call(enter => enter
//           .transition()
//             .duration(1500)
//             .delay((d, i) => yScale(d["Audience Ratings %"]) + i * 2)
//             .attr("transform", d => `translate(${xScale(d["Rotten Tomatoes Ratings %"])}, ${yScale(d["Audience Ratings %"])})`)
//         )
//     );
});