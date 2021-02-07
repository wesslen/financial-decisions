import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Button,
  Container,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
} from "@material-ui/core";
import { Grid } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
// import Input from "@material-ui/core/Input";
// import BinaryChoice from "../../components/choice/binaryChoice";
// import Histogram from "../../components/visualization/histogram/histogram";
import Barchart from "../../components/visualization/barchart/barchart";
import Dotplot from "../../components/visualization/dotplot/dotplot";
import * as d3 from "d3";

const useStyles = makeStyles((theme) => ({
  emph: {
    fontWeight: "bold",
  },
  highlight: {
    fontWeight: "bold",
    color: "red",
  },
  instructContainer: {
    height: "100%",
    margin: "0 auto",
    overflow: "auto",
  },
  image: {
    width: "50%",
    display: "block",
    margin: "auto",
  },
}));

const Debrief = (props) => {
  const history = useHistory();
  const classes = useStyles();




  return (
    <Container maxWidth="lg" className={classes.instructContainer}>
      <h3>Thank you!</h3>
      <p>
        You have completed the study. Your MTurk code is:
      </p>
      <p>
        [insert in table that shows results. 14 rows x 5 columns. each row is a trial.
        column 1 = trial number (1 to 14). column 2 = allocation decision. column 3 = simulated return for allocation decision.
        column 4 = percentile of simulated (e.g., 0.12 = 12th percentile, 0.88 = 88th percentile]. column 5 = resulted incentive (top 20% = $0.04, 21-40th% percentile = $0.03, ...)
      </p>
      {/*<img*/}
      {/*  src={process.env.PUBLIC_URL + "/uncertainty1.gif"}*/}
      {/*  alt=""*/}
      {/*  className={classes.image}*/}
      {/*/>*/}
      {/*<p>*/}
      {/*  In the next animation, the user decides to put their allocation near an*/}
      {/*  even mix of 50% and 50%.*/}
      {/*</p>*/}
      {/*<img*/}
      {/*  src={process.env.PUBLIC_URL + "/uncertainty2.gif"}*/}
      {/*  alt=""*/}
      {/*  className={classes.image}*/}
      {/*/>*/}
      <div
        style={{
          textAlign: "center",
          paddingTop: "10px",
          paddingBottom: "10px",
        }}
      >

      </div>
    </Container>
  );
};

export default Debrief;