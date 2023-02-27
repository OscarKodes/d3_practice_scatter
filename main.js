/* CONSTANTS AND GLOBALS */
const height = window.innerHeight * 0.7;
const width = window.innerWidth * 0.9;

const margin = {
    top: 50,
    left: 80,
    right: 200,
    bottom: 50
  };


/* LOAD DATA */
d3.csv("cleaned_data.csv", d3.autoType).then(data => {

    console.log(data);

    // Remove the first 5 outliers with high mileage. 
    // (It skews the x-axis, shoving all the other datapoints to the left.)
    data = data.sort((a, b) => b.mileage - a.mileage).slice(5);


  /* SCALES ##################################################### */


  const xScale = d3.scaleLinear()
    .domain([0, d3.max(data.map(d => d.mileage))])
    .range([margin.left, width - margin.right])

  const yScale = d3.scaleLinear()
    .domain([0, d3.max(data, d => d.price)])
    .range([height - margin.top, margin.bottom])

  console.log()

  // Placing brands and colors in variables to be reused in colorScale & Legend
  const allBrands = Array.from(new Set(data.map(d => d.brand)));
  const allColors = new Array(28).fill("grey");

  const colorScale = d3.scaleOrdinal()
    .domain(allBrands)
    .range(allColors)

  const sizeScale = d3.scaleSqrt()
    .domain([1, d3.max(data, d => d["Budget (million $)"])])
    .range([3, 16]);


//   /* HTML ELEMENTS ############################################## */

  // SVG CANVAS -----------------------------------------------
  const svg = d3.select("#container")
    .append("svg")
    .attr("width", width)
    .attr("height", height)
    .style("background-color", "lavender")

  // AXIS TICKS  ----------------------------------------------
  svg.append("g")
    .attr("transform", `translate(0,${height - margin.top})`)
    .call(d3.axisBottom(xScale));
  
  svg.append("g")
    .attr("transform", `translate(${margin.left}, ${0})`)
    .call(d3.axisLeft(yScale));

  // AXIS LABELS ----------------------------------------------
  svg.append("text")
    .attr("text-anchor", "end")
    .attr("x", width / 2 + margin.left)
    .attr("y", height - 6)
    .style("font-weight", "bold")
    .style("font-size", "1.2rem")
    .text("Mileage");

  svg.append("text")
    .attr("text-anchor", "end")
    .attr("x", -height / 2 + margin.left)
    .attr("y", 25)
    .style("font-weight", "bold")
    .style("font-size", "1.2rem")
    .attr("transform", "rotate(-90)")
    .text("Price (USD)");



  // LEGEND ------------------------------------------------

  // Title for Legend
  svg.append("text")
    .text("Brands:")
    .attr("x", width - margin.right + 70)
    .attr("y", 60)
    .style("font-size", "1rem")
    .style("font-weight", "bold")

  // Color dots for Legend
  svg.selectAll(".legend-dot")
    .data(allColors)
    .join("circle")
    .attr("class", "legend-dot")
    .attr("cx", width - margin.right + 60)
    .attr("cy", (_, i) => 80 + i * 20)
    .attr("r", 6)
    .style("fill", d => d)
    .attr("stroke", "black")
    .attr("opacity", "0.6")

  // labels for Legend
  svg.selectAll(".legend-brand")
    .data(allBrands)
    .join("text")
    .attr("class", "legend-brand")
    .attr("x", width - margin.right + 72)
    .attr("y", (_, i) => 81 + i * 20)
    .text(d => d[0].toUpperCase() + d.slice(1))
    .style("font-size", "15px")
    .attr("alignment-baseline","middle")



  // DOTS FOR SCATTERPLOT ----------------------------------

  const dot = svg
    .selectAll(".dot") 
    .data(data)
    .join("circle")
    .attr("class", "dot")
    .attr("transform", d => `translate(${xScale(d.mileage)}, ${yScale(d.price)})`)
    .attr("r", 5)
    .attr("fill", d => colorScale(d.brand))
    .attr("stroke", "black")
    .attr("opacity", "0.5");

    // ============================================

    // // set default arrows on tool tips
    // tippy.setDefaults({
    //   "arrow": true
    // })

    // set the tooltip content
    dot
      .attr("allowHTML", true)
      .attr("data-tippy-content", d => {

        let brand = d.brand[0].toUpperCase() + d.brand.slice(1);
        let price = d.price;
        let miles = d.mileage;

        let txt = `${brand} ($${price}) (${miles} miles)`

        return txt;
      })


    // call tippy on the dots
    tippy(dot.nodes());
});