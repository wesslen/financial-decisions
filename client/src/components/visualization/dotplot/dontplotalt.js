import React, { useRef, useEffect } from "react";
import { jStat } from "jstat";
import * as d3 from "d3";

const ecdf = (data) => {
  data = data.sort((a, b) => {
    return a - b;
  });
  // let inds = [...Array(data.length).keys()];
  // let probs = inds.map((ind) => {
  //   return (ind + 1) / data.length;
  // });
  let probs = jStat.seq(
    1 / data.length / 2,
    1 - 1 / data.length / 2,
    data.length
  );
  return data.map((d, i) => {
    return { x: d, p_less_than_x: probs[i] };
  });
};

const generateDotplotStacks = (data, binwidth) => {
  data = data.sort((a, b) => a - b);
  const stacks = [];
  for (let i = 0; i < data.length; ) {
    const threshold = data[i] + binwidth;
    const stack = [data[i]];
    let j = i + 1;

    while (data[j] < threshold) {
      stack.push(data[j++]);
    }
    let v = (stack[stack.length - 1] - stack[0]) / 2;
    const diff = data[i] - data[i - 1];
    // if (diff > binwidth || i == 0) { // X_0 = -inf in the original algorithm
    //   v = (stack[stack.length - 1] - stack[0]) / 2;
    // }

    stacks.push({
      values: stack,
      // "x": jStat.median(stack),
      // "x": (stack[0] + stack[stack.length - 1]) / 2
      x: stack[0] + v,
      v: v,
      diff: diff,
      threshold: threshold,
    });
    i = j;
  }

  return stacks;
};

/* Component */
const Dotplot = (props) => {
  const d3Container = useRef(null);
  const width = props.width || "50%";
  const height = props.height || "100%";

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
        console.log(data);
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
        const topMarginPct = 0.3;
        const bottomMarginPct = 0.1;

        const margins = {
          left: width * leftMarginPct,
          right: width * rightMarginPct,
          top: height * topMarginPct,
          bottom: height * bottomMarginPct,
        };
        const w = width - margins.left - margins.right;
        const h = height - margins.top - margins.bottom;

        // console.log(props.data);

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
          .call(d3.axisBottom(x));

        const histogram = d3
          .histogram()
          .domain(x.domain())
          .thresholds(x.ticks(nbins))
          .value(function (d) {
            return d.Value;
          });

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
          .transition()
          .duration(500)
          .attr("r", function (d) {
            return d.length == 0 ? 0 : d.radius;
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
    [props.data]
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
