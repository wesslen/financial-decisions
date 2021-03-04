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
import * as d3 from "d3";
import BarChart from "../../../../components/visualization/barchart/barchart";
// import VizController from "../../../../components/visualization/task2vizController/task2vizcontroller";
import {
  kernelDensityEstimator,
  kernelEpanechnikov,
} from "../../../../functions/kde";

import * as Survey from "survey-react";
import "survey-react/survey.css";

Survey.StylesManager.applyTheme("darkblue");

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
  page: {
    height: "500px",
    width: "100%",
    margin: "20px",
  },
}));

const InstructionsBarchart1 = (props) => {
  const history = useHistory();
  const classes = useStyles();

  const json = {
    questions: [
      {
        type: "radiogroup",
        name: "Barchart_Instruction2",
        title: "What does each bar stand for?",
        isRequired: true,
        choices: [
          "Wrong answer 1",
          "Wrong answer 2",
          "Correct answer",
          "Wrong answer 3",
        ],
        correctAnswer: "Correct answer",
      },
    ],
  };

  const model = new Survey.Model(json);
  model.showCompletedPage = false;

  model.onValidateQuestion.add(function (s, options) {
   if (options.name == 'Barchart_Instruction2') {
       if(options.value != 'Correct answer') {
            options.error = "Your answer is not correct. Please try again.";
        }
    }
});

  // const [bonds, setBonds] = useState([]);
  // const [stocks, setStocks] = useState([]);
  // const [extent, setExtent] = useState([-0.2, 0.2]); // hard coded for instructions1
  // const [loadingOpacity, setLoadingOpacity] = useState(0);
  // const [pageOpacity, setPageOpacity] = useState(1);
  // const [evalPeriod, setEvalPeriod] = useState(1);
  // const [allocationLeft, setAllocationLeft] = useState(null);
  // const [allocationRight, setAllocationRight] = useState(null);
  // const [allocationTextLeft, setAllocationTextLeft] = useState("");
  // const [allocationTextRight, setAllocationTextRight] = useState("");
  // const [disabled, setDisabled] = useState(true);

  // const [alert, setAlert] = useState(false);
  // const [left, setLeft] = useState("stocks");
  //const [densityExtent, setDensityExtent] = useState([0, 0.5]);

  const [page, setPage] = useState(0);

  const handlePage = () => {
    let newPage = page + 1;
    console.log(newPage);
    if (newPage < 2) {
      setPage(newPage);
    } else {
      history.push("/task2");
    }
  };
  // setExtent(extent);
  // setEvalPeriod(30);
  // setLoadingOpacity(0.8);
  //setPageOpacity(0.2);
  // Just to create an illusion of loading so users know data has changed.
  // setTimeout(() => {
  //   Math.random() < 0.5 ? setLeft("stocks") : setLeft("bonds");
  //   setDisabled(true);
  //   setAllocationLeft(null);
  //   setAllocationTextLeft("");
  //   setAllocationRight(null);
  //   setAllocationTextRight("");
  //   // setStocks(stocks);
  //   // setBonds(bonds);
  //   setLoadingOpacity(0.8);
  //   setPageOpacity(0.2);
  // }, 1000);
  //
  // const handleAllocationLeft = (event) => {
  //   let newVal = parseInt(event.target.value, 10);
  //
  //   // newVal = parseInt(newVal);
  //   // console.log(event.target.value);
  //   // setAllocationText(newVal);
  //   setAllocationTextLeft(newVal);
  //   if (newVal !== null) {
  //     setAllocationTextRight(100 - newVal);
  //   }
  //
  //   // ryan added: to keep as values between 0 and 100
  //   // doesn't work correctly for integer component yet... need to check that
  //   // what this doesn't do: prompt the user. need to create a front end warning too for this.
  //   if (newVal > -1 && newVal < 101 && Number.isInteger(newVal)) {
  //     setDisabled(false);
  //     setAlert(false);
  //     setAllocationLeft(newVal);
  //     setAllocationTextLeft(newVal);
  //     setAllocationRight(100 - newVal);
  //     setAllocationTextRight(100 - newVal);
  //   } else {
  //     setAlert(true);
  //     setAllocationLeft(null);
  //     setAllocationTextLeft("");
  //     setAllocationRight(null);
  //     setAllocationTextRight("");
  //     setDisabled(true);
  //   }
  // };
  //
  // const handleAllocationRight = (event) => {
  //   let newVal = parseInt(event.target.value, 10);
  //
  //   // newVal = parseInt(newVal);
  //   // console.log(event.target.value);
  //   // setAllocationText(newVal);
  //   setAllocationTextRight(newVal);
  //   if (newVal !== null) {
  //     setAllocationTextLeft(100 - newVal);
  //   }
  //
  //   // ryan added: to keep as values between 0 and 100
  //   // doesn't work correctly for integer component yet... need to check that
  //   // what this doesn't do: prompt the user. need to create a front end warning too for this.
  //   if (newVal > -1 && newVal < 101 && Number.isInteger(newVal)) {
  //     setDisabled(false);
  //     setAlert(false);
  //     setAllocationLeft(100 - newVal);
  //     setAllocationTextLeft(100 - newVal);
  //     setAllocationRight(newVal);
  //     setAllocationTextRight(newVal);
  //   } else {
  //     setAlert(true);
  //     setAllocationLeft(null);
  //     setAllocationTextLeft("");
  //     setAllocationRight(null);
  //     setAllocationTextRight("");
  //     setDisabled(true);
  //   }
  // };
  //
  // const getDensityExtent = (stocks, bonds, extent) => {
  //   let x = d3.scaleLinear().domain(extent).nice();
  //   var kde = kernelDensityEstimator(kernelEpanechnikov(0.05), x.ticks(40));
  //
  //   var density1 = kde(
  //     stocks.map(function (d) {
  //       return d.value;
  //     })
  //   );
  //   var density2 = kde(
  //     bonds.map(function (d) {
  //       return d.value;
  //     })
  //   );
  //
  //   let maxDensity1 = d3.max(density1.map((d) => d[1]));
  //   let maxDensity2 = d3.max(density2.map((d) => d[1]));
  //
  //   return [0, d3.max([maxDensity1, maxDensity2])];
  // };
  //
  // const handleConsent = () => {
  //   history.push("/task2");
  // };
  //
  // function getRandomArbitrary(min, max) {
  //   return Math.random() * (max - min) + min;
  // }

  return (
    <Container maxWidth="lg" className={classes.instructContainer}>
      <div style={{ height: "40%" }}>
        <div
          style={{ display: page === 0 ? "" : "none" }}
          className={classes.page}
        >
          <h3>Round 2 Instructions</h3>
          <ul>
            <li>You'll repeat the same task for new funds: C and D.</li>
            <li>You will use the same <b>bar chart</b> as round 1.</li>
          </ul>
        </div>
        {/*<div*/}
        {/*  style={{ display: page === 1 ? "" : "none" }}*/}
        {/*  className={classes.page}*/}
        {/*>*/}
        {/*  <img*/}
        {/*    src={process.env.PUBLIC_URL + "/barchart-instructions2.png"}*/}
        {/*    //src={process.env.PUBLIC_URL + "/uncertainty2.gif"}*/}
        {/*    alt=""*/}
        {/*    style={{ width: 400 }}*/}
        {/*    className={classes.image}*/}
        {/*  />*/}
        {/*  <ul>*/}
        {/*    <li>[Add in description of this plot.]</li>*/}
        {/*  </ul>*/}
        {/*</div>*/}


        {/*<div*/}
        {/*  style={{*/}
        {/*    width: "100%",*/}
        {/*    // height: "60%",*/}
        {/*    margin: "0 auto",*/}
        {/*    overflow: "auto",*/}
        {/*    paddingTop: "30px",*/}
        {/*    paddingBottom: "30px",*/}
        {/*    display: page === 2 ? "" : "none",*/}
        {/*  }}*/}
        {/*  className={classes.page}*/}
        {/*>*/}
        {/*  <Survey.Survey model={model} /> /!*onComplete={onComplete}*!/*/}
        {/*</div>*/}
                <div
          style={{ display: page === 1 ? "" : "none" }}
          className={classes.page}
        >
          <h3>Round 2 Instructions</h3>
          <ul>
            <li>Like Round 1, you will be provided returns across different evaluation periods.</li>
            <li>And you will make your allocation decision based on a 30 year investment period.</li>
            <li>Press Next to proceed to Round 2</li>
          </ul>
        </div>
      </div>
      <Button
        style={{ backgroundColor: "gray", color: "black" }}
        variant="contained"
        onClick={handlePage}
      >
        Next
      </Button>
    </Container>
  );
};

export default InstructionsBarchart1;


        // <div
        //   style={{
        //     width: "90%",
        //     // paddingLeft: "50",
        //     // height: "60%",
        //     // margin: "0 auto",
        //     alignItems: "center",
        //     justifyContent: "center",
        //     textAlign: "center",
        //     display: page === 2 ? "" : "none",
        //   }}
        //   className={classes.page}
        // >
        //   <Grid container spacing={1} style={{ height: "60%" }}>
        //     <BarChart
        //       title="C"
        //       extent={extent}
        //       allocation={
        //         allocationLeft !== null ? allocationLeft : "Insert a value in "
        //       }
        //       data={props.bonds}
        //       page={page}
        //     ></BarChart>
        //     <BarChart
        //       title="D"
        //       extent={extent}
        //       allocation={
        //         allocationRight !== null
        //           ? allocationRight
        //           : "Insert a value in "
        //       }
        //       data={props.stocks}
        //       page={page}
        //     ></BarChart>
        //   </Grid>
        //   <div
        //     style={{
        //       justifyContent: "center",
        //       alignItems: "center",
        //       height: "10vh",
        //       textAlign: "center",
        //     }}
        //   >
        //     <p>
        //       {/*<span style={{ fontWeight: "bold" }}>Evaluation Period</span>:{" "}*/}
        //       <span> Rates of returns </span> are averaged and annualized over a{" "}
        //       <span style={{ fontWeight: "bold" }}>{evalPeriod} year</span>{" "}
        //       evaluation period.
        //     </p>
        //     <p>
        //       <span style={{ color: alert ? "red" : "black" }}>
        //         Between 0% and 100%
        //       </span>
        //       , how much of your investment do you want to allocate to each
        //       fund?
        //     </p>
        //     <form noValidate autoComplete="off">
        //       {/*<TextField id="standard-basic" error ={this.state.errorText.length === 0 ? false : true } label="Standard" />*/}
        //       {/*<Input*/}
        //       {/*  id="Practice1"*/}
        //       {/*  type="number"*/}
        //       {/*  placeholder="Fund A allocation %"*/}
        //       {/*  onChange={handleAllocation}*/}
        //       {/*></Input>*/}
        //       <TextField
        //         id="Task1"
        //         label="Fund C allocation %"
        //         type="number"
        //         color="secondary"
        //         value={allocationTextLeft}
        //         style={{ width: 150 }}
        //         InputProps={{
        //           inputProps: {
        //             max: 100,
        //             min: 0,
        //           },
        //         }}
        //         // InputProps={{ inputProps: { min: 0, max: 10 } }}
        //         /*endAdornment={<InputAdornment position="end">%</InputAdornment>}*/
        //         onChange={handleAllocationLeft}
        //       />
        //       &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        //       <TextField
        //         id="Task2"
        //         label="Fund D allocation %"
        //         type="number"
        //         color="secondary"
        //         value={allocationTextRight}
        //         style={{ width: 150 }}
        //         /*endAdornment={<InputAdornment position="end">%</InputAdornment>}*/
        //         onChange={handleAllocationRight}
        //       />{" "}
        //       <p> </p>
        //       {/*<Button*/}
        //       {/*  disabled={disabled}*/}
        //       {/*  variant="contained"*/}
        //       {/*  onClick={handleDecision}*/}
        //       {/*>*/}
        //       {/*  Make Decision*/}
        //       {/*</Button>*/}
        //     </form>
        //   </div>
        // </div>