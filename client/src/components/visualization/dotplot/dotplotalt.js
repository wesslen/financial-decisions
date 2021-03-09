import React, { useRef, useEffect } from "react";
import { jStat } from "jstat";
import * as d3 from "d3";

/* Component */
const Dotplot = (props) => {
  const d3Container = useRef(null);
  const width = props.width || "75%";
  const height = props.height || "60%";

  // const numBins = props.numBins || 10;

  useEffect(
    () => {
      if (d3Container.current) {
        const data = props.data.map((d, i) => {
          return {
            Name: d.key,
            Value: d.value,
          };
        });

        //svg returned by this component
        const svg = d3.select(d3Container.current);
        //width of svg
        svg.selectAll(".charttitle").remove();
        svg.selectAll(".axis").remove();
        svg.selectAll("g").remove();
        const width = svg.node().getBoundingClientRect().width;
        //height of svg
        const height = svg.node().getBoundingClientRect().height;
        const extent = props.extent || [-0.5, 0.5];
        const nbins = props.nBins || props.data.length;
        const leftMarginPct = 0.1;
        const rightMarginPct = 0.15;
        const topMarginPct = 0.2;
        const bottomMarginPct = 0.15;
        const allocation = props.allocation || 0;
        const margins = {
          left: width * leftMarginPct,
          right: width * rightMarginPct,
          top: height * topMarginPct,
          bottom: height * bottomMarginPct,
        };
        const w = width - margins.left - margins.right;
        const h = height - margins.top - margins.bottom;

        // console.log(props.data);

        svg
          .append("text")
          .attr("x", margins.left)
          .attr("y", margins.top)
          .attr("fill", "teal")
          .attr("class", "charttitle")
          .text(`Fund ${props.title}: ${allocation}%`);

        const dotplotContainer = svg
          .append("g")
          .attr("id", "dotplot-container")
          .attr(
            "transform",
            "translate(" + margins.left + "," + margins.top + ")"
          );

        let x = d3.scaleLinear().domain(extent).rangeRound([0, w]).nice();

        dotplotContainer
          .append("g")
          .attr("class", "axis axis--x")
          .attr("transform", "translate(0," + h + ")")
          .call(d3.axisBottom(x).tickFormat(d3.format(".0%")));

        const histogram = d3
          .histogram()
          .domain(x.domain())
          .thresholds(x.ticks(nbins))
          .value(function (d) {
            return d.Value;
          });

        let tip = d3.select(".tooltip");
        let formatPercent = d3.format(".1%");

        const bins = histogram(data).filter((d) => d.length > 0);

        let binContainer = dotplotContainer.selectAll(".gBin").data(bins);

        binContainer.exit().remove();

        let binContainerEnter = binContainer
          .enter()
          .append("g")
          .attr("class", "gBin")
          .attr("transform", (d) => `translate(${x(d.x0)}, ${h})`);

        //need to populate the bin containers with data the first time
        binContainerEnter
          .selectAll("circle")
          .data((d) =>
            d.map((p, i) => {
              return {
                idx: i,
                name: p.Name,
                value: p.Value,
                radius: (x(d.x1) - x(d.x0)) / 2,
              };
            })
          )
          .enter()
          .append("circle")
          .attr("class", "enter")
          .attr("cx", 0) //g element already at correct x pos
          .attr("cy", function (d) {
            return -d.idx * 2 * d.radius - d.radius;
          })
          .attr("r", 0)
          .attr("r", function (d) {
            return d.length == 0 ? 0 : d.radius;
          })
          .on("mousemove", function (d) {
            tip.style("opacity", 1);
            tip
              .html(formatPercent(d.value.toFixed(3)))
              .style("left", d3.event.pageX + "px")
              .style("top", d3.event.pageY - 28 + "px");
          })
          .on("mouseout", function (d) {
            tip.style("opacity", 0);
          });

        binContainerEnter
          .merge(binContainer)
          .attr("transform", (d) => `translate(${x(d.x0)}, ${h})`);
      }
    },

    /*
            useEffect has a dependency array (below). It's a list of dependency
            variables for this useEffect block. The block will run after mount
            and whenever any of these variables change. We still have to check
            if the variables are valid, but we do not have to compare old props
            to next props to decide whether to rerender.
        */
    [props.data, props.allocation]
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
