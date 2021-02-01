import React, { useRef, useEffect } from "react";
import BarChart from "../barchart/barchart";
import Dotplot from "../dotplot/dotplotalt";
import Hops from "../hops/hops";

const VizController = (props) => {
  let vizType = props.vizType;

  switch (vizType) {
    case "dotplot":
      // code block
      return (
        <Dotplot
          title={props.title}
          extent={props.extent}
          allocation={props.allocation}
          data={props.data}
        ></Dotplot>
      );
      break;
    case "hops":
      return (
        <Hops
          title={props.title}
          extent={props.extent}
          allocation={props.allocation}
          data={props.data}
        ></Hops>
      );
      break;
    default:
      // code block
      return null;
  }
};

export default VizController;
