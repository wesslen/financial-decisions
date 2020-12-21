import React, { useRef, useEffect } from "react";
import * as d3 from "d3";
// import quantileDotplot from "./quantiledotplot";

// use: https://observablehq.com/@ale0xb/quantile-dotplots

function generateDotplotStacks(data, binwidth) {
  data = data.sort((a, b) => a.value - b.value);
  // data = data.sort(function(b, a) {return b.value - a.value;});
  const stacks = [];
  for (let i = 0; i < data.length; ) {
    const threshold = data[i].value + binwidth;

    const stack = [data[i].value];
    let j = i + 1;

    while (data[j] < threshold) {
      stack.push(data[j++].value);
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
      threshold: threshold
    });
    i = j;
  }
  return stacks;
}

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
          .attr('id','chart')
          .attr(
            "transform",
            "translate(" + margins.left + "," + margins.top + ")"
          );

        //
        // // const kernelPath = g.append("path");
        //

        // var formatPercent = d3.format(".0%");

        var binwidth = 0.01; // for 20 bins

        const data = props.data;
        const stacks = generateDotplotStacks(data, binwidth);
        // const samples = 20;
        // const bandwidth = d3.deviation(data) * Math.pow(4 / 3 / samples, 1 / 5);

        const xScale = d3
          .scaleLinear()
          .domain(d3.extent(data, d => d.value))
          //.domain([-0.06,0.1]) // hard coded -- need to change
          .rangeRound([0, w])
          .nice()

          g
            .append('g')
            .attr('class', 'axis axis--x')
            .attr('transform', `translate(0, h)`)
            .call(d3.axisBottom(xScale));

                // Add Y axis
        const yScale = d3.scaleLinear()
          .domain([0, 0.25])
          .range([ h, 0]);

        g.append("g")
          .attr('class', 'axis')
          .call(d3.axisLeft(yScale));

          g.selectAll(".gBin")
              .data(stacks)
              .join(
                  enter => {
                    const g = enter
                        .append("g")
                        .attr("class", "gBin")
                        .attr("transform", d => `translate(${xScale(d.x)}, h)`);

                    g.selectAll("circle")
                        .data(d =>
                            d.values.map((p, i) => {
                              return {idx: i, value: p, radius: xScale(binwidth / 2)};
                            })
                        )
                        .join(enter =>
                            enter
                                .append("circle")
                                .attr("cx", 0)
                                .attr("cy", d => -d.idx * 2 * d.radius - d.radius)
                                .attr("r", d => d.radius)
                                .attr("stroke", "black")
                        );
                    return g;
                  },
                  // update => {
                  //   update
                  //       .selectAll("circle")
                  //       .data(d =>
                  //           d.values.map((p, i) => {
                  //             return {idx: i, value: p, radius: xScale(binwidth / 2)};
                  //           })
                  //       )
                  //       .join(
                  //           enter =>
                  //               enter
                  //                   .append("circle")
                  //                   .attr("cx", 0)
                  //                   .attr("cy", d => -d.idx * 2 * d.radius - d.radius)
                  //                   .attr("r", d => d.radius)
                  //                   .attr("stroke", "black"),
                  //           update =>
                  //               update.attr("cy", d => -d.idx * 2 * d.radius - d.radius),
                  //           exit => exit.remove()
                  //       );
                  //   return update.attr(
                  //       "transform",
                  //       d => `translate(${xScale(d.x)}, h)`
                  //   );
                  // },
              //     exit => exit.remove()
              );

        //
        // g.append("g")
        //   .attr('class', 'axis')
        //   .call(d3.axisLeft(x));
        //
        // // Bars
        // g.selectAll("mybar")
        //   .data(props.data)
        //   .enter()
        //   .append("rect")
        //     .attr("x", function(d) { return x(d.key); })
        //     .attr("y", function(d) { return y(Math.max(0, d.value)); })
        //     .attr("width", x.bandwidth())
        //     .attr("height", function(d) { return Math.abs(y(d.value) - y(0)); })
        //     .attr("fill", "#69b3a2");
        //
        // g.selectAll(".label")
        //   .data(props.data)
        //   .enter()
        //   .append("text")
        //     .attr("class", "label")
        //     .attr("font-size","8px")
        //     .attr("text-anchor", "middle")
        //     .attr("font-family", "sans-serif")
        //     .text( function(d) { return formatPercent(d.value); } )
        //     .attr("x", function(d) { return x(d.key) + x.bandwidth()/2; })
        //     .attr("y", function(d) { return y(d.value) + 10; })
        //
        // g.append("g")
        //   .attr('class', 'axis')
        //   .attr('transform', 'translate(0,' + y(0) + ')')
        //   .call(d3.axisBottom(x));

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
