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

  function createData(trial, user_allocation, simulated_returns, simulated_percentile, incentive) {
    return { trial, user_allocation, simulated_returns, simulated_percentile, incentive };
  }

  const terms = [
    createData(
      "1",
      "34%",
      "24.4%",
      "78%",
      "$0.01"
    ),
    createData(
      "2",
      "54%",
      "29.4%",
      "50%",
      "$0.02"
    ),
    createData(
      "3",
      "23%",
      "25.4%",
      "84%",
      "$0.00"
    ),
    createData(
      "4",
      "95%",
      "50.6%",
      "5%",
      "$0.04"
    ),
    createData(
      "5",
      "78%",
      "47.4%",
      "23%",
      "$0.03"
    ),
    createData(
      "6",
      "28%",
      "24.4%",
      "74%",
      "$0.03"
    ),
    createData(
      "7",
      "50%",
      "24.4%",
      "74%",
      "$0.03"
    ),
    createData(
      "8",
      "29%",
      "24.4%",
      "74%",
      "$0.03"
    ),
    createData(
      "9",
      "45%",
      "24.4%",
      "74%",
      "$0.03"
    ),
    createData(
      "10",
      "49%",
      "24.4%",
      "74%",
      "$0.03"
    ),
    createData(
      "11",
      "57%",
      "24.4%",
      "74%",
      "$0.03"
    ),
    createData(
      "12",
      "86%",
      "24.4%",
      "74%",
      "$0.03"
    ),
    createData(
      "13",
      "15%",
      "24.4%",
      "74%",
      "$0.03"
    ),
    createData(
      "14",
      "12%",
      "24.4%",
      "74%",
      "$0.03"
    ),
  ];

  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);

// https://reactjs.org/docs/faq-ajax.html
//   useEffect(() => {
//     async function fetchData() {
//       const responses = axios.get("/api/response");
//       let res = responses.data.responses;
//       fetch("http://rw-simulation.herokuapp.com/get_returns?stock=")
//           .then(res => res.json())
//           .then(
//               (result) => {
//                 setIsLoaded(true);
//                 setItems(result);
//               },
//               // Note: it's important to handle errors here
//               // instead of a catch() block so that we don't swallow
//               // exceptions from actual bugs in components.
//               (error) => {
//                 setIsLoaded(true);
//                 setError(error);
//               }
//           )
//       }
//
//       fetchData();
//   }, [])

  return (
    <Container maxWidth="lg" className={classes.instructContainer}>
      <h3>Thank you!</h3>
      <p>
        You have completed the study. Your MTurk code is [insert code]. Please enter this in the text box on Amazon MTurk as a proof of your completion of
this study.
      </p>
      <p>
        For this study, the funds you observed were traditional asset benchmarks used commonly in retirement investment decisions.
        Since this study's objective is to study the effect of data visualizations on your investment decisions, the visualization that
        was provided to you was assigned randomly from different data visualizations than what other participants viewed. We did this so we
        could better measure the effect of the data visualization on individual decisions, holding all other factors constant.

      </p>
      <p>
        Your total compensation will be $1.00 (Base) + $[sum of trial incentive column].
      </p>
      <p>
      <TableContainer>
        <Table className={classes.table} aria-label="simple table" style={{width: 400}}>
          <TableHead>
            <TableRow>
              <TableCell>Trial</TableCell>
              <TableCell>User Allocation</TableCell>
              <TableCell>Simulated Returns</TableCell>
              <TableCell>Simulated Percentiles</TableCell>
              <TableCell>Trial Incentive</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {terms.map((row) => (
              <TableRow key={row.name}>
                <TableCell component="th" scope="row">
                  {row.trial}
                </TableCell>
                <TableCell>{row.user_allocation}</TableCell>
                <TableCell>{row.simulated_returns}</TableCell>
                <TableCell>{row.simulated_percentile}</TableCell>
                <TableCell>{row.incentive}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      </p>



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