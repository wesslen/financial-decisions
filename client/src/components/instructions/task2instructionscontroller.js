import React, { useRef, useEffect } from "react";
import InstructionsBarchart1 from "../../pages/instructions/task2/barchart/instructionsBarchart1";
import InstructionsDensity1 from "../../pages/instructions/task2/density/instructionsDensity1";
import InstructionsDot1 from "../../pages/instructions/task2/dot/instructionsDot1";
import InstructionsHops1 from "../../pages/instructions/task2/hops/instructionsHops1";
import InstructionsHopsdist1 from "../../pages/instructions/task2/hopsdist/instructionsHopsdist1";
import InstructionsInterval1 from "../../pages/instructions/task2/interval/instructionsInterval1";
import InstructionsPoint1 from "../../pages/instructions/task2/point/instructionsPoint1";
import InstructionsTable1 from "../../pages/instructions/task2/table/instructionsTable1";
import BarChart from "../visualization/barchart/barchart";
import Dotplot from "../visualization/dotplot/dotplotalt";
import Hops from "../visualization/hops/hops";
import PointPlot from "../visualization/pointplot/pointplot";
import Interval from "../visualization/interval/interval";
import Density from "../visualization/density/density";
import Table from "../visualization/table/table";

import {Route, Switch} from "react-router-dom";
import {
  Grid,
} from "@material-ui/core";
const InstructionController = (props) => {
  let vizType = props.vizType;

  switch (vizType) {
    case "barchart":
      // code block
      return (
          <Grid
            container
            direction="column"
            justify="center"
          >
          <InstructionsBarchart1>
          </InstructionsBarchart1>
        {/*<BarChart*/}
        {/*  title={props.title}*/}
        {/*  extent={props.extent}*/}
        {/*  allocation={props.allocation}*/}
        {/*  data={props.data}*/}
        {/*></BarChart>*/}
          </Grid>
      );
      break;
    case "dotplot":
      // code block
      return (
          <Grid
            container
            direction="column"
            justify="center"
          >
          <InstructionsDot1>
          </InstructionsDot1>
        {/*<Dotplot*/}
        {/*  title={props.title}*/}
        {/*  extent={props.extent}*/}
        {/*  allocation={props.allocation}*/}
        {/*  data={props.data}*/}
        {/*  nBins={50}*/}
        {/*></Dotplot>*/}
        </Grid>
      );
      break;
    case "hops":
      return (
          <Grid
            container
            direction="column"
            justify="center"
          >
          <InstructionsHops1>

          </InstructionsHops1>
        {/*<Hops*/}
        {/*  showDist={false}*/}
        {/*  title={props.title}*/}
        {/*  extent={props.extent}*/}
        {/*  allocation={props.allocation}*/}
        {/*  data={props.data}*/}
        {/*></Hops>*/}
            </Grid>
      );
      break;
    case "hopsdist":
      return (
          <Grid
            container
            direction="column"
            justify="center"
          >
          <InstructionsHopsdist1></InstructionsHopsdist1>
        {/*            <Hops*/}
        {/*  showDist={true}*/}
        {/*  title={props.title}*/}
        {/*  extent={props.extent}*/}
        {/*  allocation={props.allocation}*/}
        {/*  data={props.data}*/}
        {/*></Hops>*/}
            </Grid>
      );
      break;
    case "point":
      return (
          <Grid
            container
            direction="column"
            justify="center"
          >
          <InstructionsPoint1></InstructionsPoint1>
        {/*         <PointPlot*/}
        {/*  title={props.title}*/}
        {/*  extent={props.extent}*/}
        {/*  allocation={props.allocation}*/}
        {/*  data={props.data}*/}
        {/*></PointPlot>*/}
            </Grid>
      );
      break;
    case "interval":
      return (
          <Grid
            container
            direction="column"
            justify="center"
          >
          <InstructionsInterval1></InstructionsInterval1>
        {/*          <Interval*/}
        {/*  title={props.title}*/}
        {/*  extent={props.extent}*/}
        {/*  allocation={props.allocation}*/}
        {/*  data={props.data}*/}
        {/*></Interval>*/}
            </Grid>
      );
      break;
    case "density":
      return (
          <Grid
            container
            direction="column"
            justify="center"
          >
          <InstructionsDensity1></InstructionsDensity1>
        {/*          <Density*/}
        {/*  title={props.title}*/}
        {/*  extent={props.extent}*/}
        {/*  densityExtent={props.densityExtent}*/}
        {/*  allocation={props.allocation}*/}
        {/*  data={props.data}*/}
        {/*></Density>*/}
          </Grid>
      );
      break;
    case "table":
      return (
          <Grid
            container
            direction="column"
            justify="center"
          >
          <InstructionsTable1></InstructionsTable1>
        {/*      <Table*/}
        {/*  title={props.title}*/}
        {/*  extent={props.extent}*/}
        {/*  allocation={props.allocation}*/}
        {/*  data={props.data}*/}
        {/*></Table>*/}
            </Grid>
      );
      break;
    default:
      // code block
      return null;
  }
};

export default InstructionController;
