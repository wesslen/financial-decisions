import React, { useRef, useEffect } from "react";
import InstructionsBarchart1 from "../../pages/instructions/task2/barchart/instructionsBarchart1";
import InstructionsDensity1 from "../../pages/instructions/task2/density/instructionsDensity1";
import InstructionsDot1 from "../../pages/instructions/task2/dot/instructionsDot1";
import InstructionsHops1 from "../../pages/instructions/task2/hops/instructionsHops1";
import InstructionsHopsdist1 from "../../pages/instructions/task2/hopsdist/instructionsHopsdist1";
import InstructionsInterval1 from "../../pages/instructions/task2/interval/instructionsInterval1";
import InstructionsPoint1 from "../../pages/instructions/task2/point/instructionsPoint1";
import InstructionsTable1 from "../../pages/instructions/task2/table/instructionsTable1";
import {Route, Switch} from "react-router-dom";

const InstructionController = (props) => {
  let vizType = props.vizType;

  switch (vizType) {
    case "barchart":
      // code block
      return (
          <Route
             path="/instructionsBarchart1"
             component={InstructionsBarchart1}
          ></Route>
      );
      break;
    case "dotplot":
      // code block
      return (

          <Route
             path="/instructionsDot1"
             component={InstructionsDot1}
          ></Route>
      );
      break;
    case "hops":
      return (
          <Route
             path="/instructionsHops1"
             component={InstructionsHops1}
          ></Route>
      );
      break;
    case "hopsdist":
      return (
          <Route
             path="/instructionsHopsdist1"
             component={InstructionsHopsdist1}
          ></Route>
      );
      break;
    case "point":
      return (
          <Route
             path="/instructionsPoint1"
             component={InstructionsPoint1}
          ></Route>
      );
      break;
    case "interval":
      return (
          <Route
             path="/instructionsInterval1"
             component={InstructionsInterval1}
          ></Route>
      );
      break;
    case "density":
      return (
          <Route
             path="/instructionsDensity1"
             component={InstructionsDensity1}
          ></Route>
      );
      break;
    case "table":
      return (
          <Route
             path="/instructionsTable1"
             component={InstructionsTable1}
          ></Route>
      );
      break;
    default:
      // code block
      return null;
  }
};

export default InstructionController;
