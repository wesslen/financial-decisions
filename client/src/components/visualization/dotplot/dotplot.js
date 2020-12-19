import React, { useRef, useEffect } from "react";
import * as d3 from "d3";
import quantileDotplot from "./quantiledotplot";

/* Component */
const Dotplot = (props) => {
  const d3Container = useRef(null);
  const width = props.width || "50%";
  const height = props.height || "50%";
  // const numBins = props.numBins || 10;

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
        const rightMarginPct = 0.15;
        const topMarginPct = 0.15;
        const bottomMarginPct = 0.05;

        const margins = {
          left: width * leftMarginPct,
          right: width * rightMarginPct,
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

          // sort data
        props.data.sort(function(b, a) {
          return b.value - a.value;
        });

        // X axis
        var x = d3.scaleBand()
          .range([ 0, w ])
          .domain(props.data.map(function(d) { return d.key; }))
          .padding(0.1);

        // Add Y axis
        var y = d3.scaleLinear()
          .domain([-0.05,0.1])
          .range([ h, 0]);

        // svg.append("g").call(d3.axisLeft(y));
        var formatPercent = d3.format(".0%");

        g.append("g")
          .attr('class', 'axis')
          .call(d3.axisLeft(y));

        // Bars
        g.selectAll("mybar")
          .data(props.data)
          .enter()
          .append("rect")
            .attr("x", function(d) { return x(d.key); })
            .attr("y", function(d) { return y(Math.max(0, d.value)); })
            .attr("width", x.bandwidth())
            .attr("height", function(d) { return Math.abs(y(d.value) - y(0)); })
            .attr("fill", "#69b3a2");

        g.selectAll(".label")
          .data(props.data)
          .enter()
          .append("text")
            .attr("class", "label")
            .attr("font-size","8px")
            .attr("text-anchor", "middle")
            .attr("font-family", "sans-serif")
            .text( function(d) { return formatPercent(d.value); } )
            .attr("x", function(d) { return x(d.key) + x.bandwidth()/2; })
            .attr("y", function(d) { return y(d.value) + 10; })

        g.append("g")
          .attr('class', 'axis')
          .attr('transform', 'translate(0,' + y(0) + ')')
          .call(d3.axisBottom(x));

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
export default Dotplot;
