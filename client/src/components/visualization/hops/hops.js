import React, { useRef, useEffect } from "react";
import * as d3 from "d3";

/* Component */
const Hops = (props) => {
  const d3Container = useRef(null);
  const width = props.width || "75%";
  const height = props.height || "60%";
  const hopSpeed = props.hopSpeed | 450;
  const showDist = props.showDist;
  const svg = useRef(null);
  const allocation = props.allocation || 0;
  useEffect(
    () => {
      if (d3Container.current) {
        //svg returned by this component
        svg.current = d3.select(d3Container.current);
        svg.current.selectAll(".charttitle").remove();
        svg.current.selectAll(".axis").remove();
        svg.current.selectAll("g").remove();
        //width of svg
        const width = svg.current.node().getBoundingClientRect().width;
        //height of svg
        const height = svg.current.node().getBoundingClientRect().height;

        const leftMarginPct = 0.08;
        const rightMarginpct = 0.08;
        const topMarginPct = 0.15;
        const bottomMarginPct = 0.15;

        const margins = {
          left: width * leftMarginPct,
          right: width * rightMarginpct,
          top: height * topMarginPct,
          bottom: height * bottomMarginPct,
        };
        const w = width - margins.left - margins.right;
        const h = height - margins.top - margins.bottom;
        const extent = props.extent || [-1.0, 1.0];

        svg.current
          .append("text")
          .attr("id", "label")
          .attr("x", margins.left)
          .attr("y", margins.top)
          .attr("fill", "teal")
          .attr("class", "charttitle")
          .text(`Fund ${props.title}: ${allocation}%`);

        const g = svg.current
          .append("g")
          .attr("transform", `translate(${margins.left},${margins.top})`);

        const xScale = d3.scaleLinear().range([0, w]).domain(extent);

        let xAxis = svg.current
          .append("g")
          .attr(
            "transform",
            `translate(${margins.left},${h / 2 + margins.top})`
          )
          .call(
            d3.axisBottom(xScale).tickFormat(d3.format(".0%"))
            //   .ticks(tickLabels.length - 1)
            //   .tickFormat((d, i) => tickLabels[i])
          )
          .attr("pointer-events", "none");

        // let rect = g
        //   .append("rect")
        //   .attr("width", w)
        //   .attr("height", h)
        //   .attr("fill", "rgba(0,0,0,0)");

        // let xs = [];
        // for (var i = 0; i < nLines; i++) {
        //   xs.push(0);
        // }
        let band = g
          .selectAll(".uncertaintyLines")
          .data(props.data)
          .enter()
          .append("line")
          .attr("class", "uncertaintyLines")
          .attr("pointer-events", "none");

        band
          .attr("class", "uncertaintyLines")
          .attr("x1", function (d) {
            return xScale(d.value);
          })
          .attr("x2", function (d) {
            return xScale(d.value);
          })
          .attr("y1", h * topMarginPct)
          .attr("y2", h - h * topMarginPct)
          .attr("stroke", "orange")
          .attr("stroke-opacity", 0)
          .attr("stroke-width", 6);

        setInterval(function () {
          var index = Math.floor(Math.random() * band.size());
          if (band.size() !== 0) {
            let d = d3.select(band.nodes()[index]).data();

            band.sort(function (a, b) {
              // console.log(a);
              if (a.key === d[0].key) return 1;
              else return -1;
            });
          }

          band
            .transition()
            .duration(hopSpeed / 2)
            .style("z-index", function (d, i) {
              return i === index ? 999 : 1;
            })
            .style("stroke-opacity", function (d, i) {
              return showDist
                ? i === index
                  ? 0.8
                  : 0.2
                : i === index
                ? 0.8
                : 0;
            })
            .style("stroke", function (d, i) {
              return i === index ? "orange" : "lightgrey";
            });
        }, hopSpeed);

        // let line = g
        //   .append("line")
        //   .attr("x1", 5)
        //   .attr("x2", 5)
        //   .attr("y1", h * topMarginPct)
        //   .attr("y2", h - h * topMarginPct)
        //   .attr("stroke-width", 6)
        //   .attr("stroke", "orange")
        //   .style("pointer-events", "none");

        // rect.on("mousemove", function () {
        //   let coords = d3.mouse(this);
        //   if (!choiceMade) {
        //     line.attr("x1", coords[0]).attr("x2", coords[0]);
        //     choice = xScale.invert(coords[0]);

        //     if (props.setChoice) props.setChoice(choice);
        //   } else if (choiceMade && !uncertaintyMade) {
        //     let uncertaintySize = xScale.invert(coords[0]) - choice;
        //     let uncertaintyPixelSize = Math.abs(coords[0] - xScale(choice));
        //     CI = [choice - uncertaintySize, choice + uncertaintySize];

        //     CI = [
        //       d3.min(CI) > extent[0] ? d3.min(CI) : extent[0],
        //       d3.max(CI) < extent[1] ? d3.max(CI) : extent[0],
        //     ];

        //     xs = [];
        //     let randomize = d3.randomNormal(
        //       xScale(choice),
        //       uncertaintyPixelSize / 2
        //     );
        //     for (var i = 0; i < nLines; i++) {
        //       xs.push(randomize());
        //     }
        //     xs = xs.filter((r) => {
        //       return (
        //         r < xScale(choice) + uncertaintyPixelSize &&
        //         r > xScale(choice) - uncertaintyPixelSize &&
        //         r <= xScale(extent[1]) &&
        //         r >= xScale(extent[0])
        //       );
        //     });

        //     // band.exit().remove();
        //   }
        // });
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

  useEffect(() => {
    svg.current.select("#label").text(`Fund ${props.title}: ${allocation}%`);
  }, [props.allocation]);

  return (
    <div
      className="choiceContainer"
      style={{
        width: width,
        height: height,
        margin: "0 auto",
        marginBottom: "10px",
      }}
    >
      <svg
        className="choiceComponent"
        style={{ cursor: "pointer" }}
        width={"100%"}
        height={"100%"}
        ref={d3Container}
      />
    </div>
  );
};

/* App */
export default Hops;
