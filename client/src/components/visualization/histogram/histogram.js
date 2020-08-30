import React, { useRef, useEffect } from "react";
import * as d3 from "d3";

/* Component */
const Histogram = (props) => {
  const d3Container = useRef(null);
  const width = props.width || "100%";
  const height = props.height || "100%";
  const numBins = props.numBins || 10;

  useEffect(
    () => {
      if (d3Container.current) {
        //svg returned by this component
        const svg = d3.select(d3Container.current);
        //width of svg
        const width = svg.node().getBoundingClientRect().width;
        //height of svg
        const height = svg.node().getBoundingClientRect().height;

        const leftMarginPct = 0.1;
        const rightMarginpct = 0.08;
        const topMarginPct = 0.15;
        const bottomMarginPct = 0.05;

        const margins = {
          left: width * leftMarginPct,
          right: width * rightMarginpct,
          top: height * topMarginPct,
          bottom: height * bottomMarginPct,
        };
        const w = width - margins.left - margins.right;
        const h = height - margins.top - margins.bottom;

        const g = svg
          .append("g")
          .attr(
            "transform",
            "translate(" + margins.left + "," + margins.top + ")"
          );

        // get the data
        // X axis: scale and draw:

        const maxData = d3.max(props.data, (d) => d.value);

        const x = d3
          .scaleLinear()
          .domain([0, maxData]) // can use this instead of 1000 to have the max of data: d3.max(data, function(d) { return +d.price })
          .range([0, w]);
        g.append("g")
          .attr("transform", "translate(0," + h + ")")
          .call(d3.axisBottom(x));

        // set the parameters for the histogram
        const histogram = d3
          .histogram()
          .value(function (d) {
            return d.value;
          }) // I need to give the vector of value
          .domain(x.domain()) // then the domain of the graphic
          .thresholds(x.ticks(numBins)); // then the numbers of bins

        // And apply this function to data to get the bins
        var bins = histogram(props.data);

        // Y axis: scale and draw:
        var y = d3.scaleLinear().range([h, 0]);
        y.domain([
          0,
          d3.max(bins, function (d) {
            return d.length;
          }),
        ]); // d3.hist has to be called before the Y axis obviously
        g.append("g").call(d3.axisLeft(y));

        // append the bar rectangles to the svg element
        g.selectAll("rect")
          .data(bins)
          .enter()
          .append("rect")
          .attr("x", 1)
          .attr("transform", function (d) {
            return "translate(" + x(d.x0) + "," + y(d.length) + ")";
          })
          .attr("width", function (d) {
            return x(d.x1) - x(d.x0) - 1;
          })
          .attr("height", function (d) {
            return h - y(d.length);
          })
          .style("fill", "#69b3a2");
      }
    },

    /*
            useEffect has a dependency array (below). It's a list of dependency
            variables for this useEffect block. The block will run after mount
            and whenever any of these variables change. We still have to check
            if the variables are valid, but we do not have to compare old props
            to next props to decide whether to rerender.
        */
    []
  );

  return (
    <div
      className="histContainer"
      style={{
        width: width,
        height: height,
        margin: "0 auto",
        marginBottom: "10px",
      }}
    >
      <svg
        className="histComponent"
        style={{ cursor: "pointer" }}
        width={"100%"}
        height={"100%"}
        ref={d3Container}
      />
    </div>
  );
};

/* App */
export default Histogram;
