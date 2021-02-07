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
import LoadingCircle from "../../components/loading/loading";

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

const Instructions5 = (props) => {
  const history = useHistory();
  const classes = useStyles();

  const [bonds, setBonds] = useState([]);
  const [stocks, setStocks] = useState([]);
  const [extent, setExtent] = useState(null);
  const [evalPeriod, setEvalPeriod] = useState(null);
  const [loadingOpacity, setLoadingOpacity] = useState(0);
  const [pageOpacity, setPageOpacity] = useState(1);
  // const [data, setData] = useState([]);
  const [allocation, setAllocation] = useState(null);
  const [disabled, setDisabled] = useState(true);
  const [allocationText, setAllocationText] = useState("");
  const [evalIndex, setEvalIndex] = useState(0);
  const [left, setLeft] = useState("stocks");

  const handleConsent = () => {
    setLoadingOpacity(0.8);
    setPageOpacity(0.2);
    // Just to create an illusion of loading so users know data has changed.
    setTimeout(() => {
      setLoadingOpacity(0);
      setPageOpacity(1);
      history.push("/instructions6");
    }, 1000);
  };

  // function onChange(value) {
  //   if (value !== null) {
  //     setDisabled(false);
  //   }
  //   console.log("Captcha value:", value);
  // }

  //DEMONSTRATING DATA VISUALIZATION, creating random data
  function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
  }

  useEffect(() => {
    async function fetchData() {
      const stks_sim1 = [];
      const bnds_sim1 = [];
      const stks_sim2 = [];
      const bnds_sim2 = [];
      for (let i = 0; i < 41; i++) {
        stks_sim1.push({ key: i, value: getRandomArbitrary(-0.3, 0.3) });
        bnds_sim1.push({ key: i, value: getRandomArbitrary(-0.08, 0.08) });
        stks_sim2.push({ key: i, value: getRandomArbitrary(-0.1, 0.1) });
        bnds_sim2.push({ key: i, value: getRandomArbitrary(-0.05, 0.05) });
      }

      let extent1 = d3.extent([
        ...stks_sim1.map((d) => d.value),
        ...bnds_sim1.map((d) => d.value),
      ]);
      let maxExtent1 = d3.max(extent1);

      extent1 = [-maxExtent1, maxExtent1];
      console.log(extent1, "Asdasd");

      let extent2 = d3.extent([
        ...stks_sim2.map((d) => d.value),
        ...bnds_sim2.map((d) => d.value),
      ]);
      let maxExtent2 = d3.max(extent2);
      extent2 = [-0.3, 0.3];

      setExtent(extent1);
      setEvalPeriod(1);
      setLoadingOpacity(0.8);
      setPageOpacity(0.2);
      // Just to create an illusion of loading so users know data has changed.
      setTimeout(() => {
        Math.random() < 0.5 ? setLeft("stocks") : setLeft("bonds");
        setAllocation(null);
        setAllocationText("");
        setStocks(stks_sim1);
        setBonds(bnds_sim1);
        setLoadingOpacity(0);
        setPageOpacity(1);
      }, 1000);
    }
    fetchData();
  }, []);

  const handleAllocation = (event) => {
    let newVal = +event.target.value;
    // newVal = parseInt(newVal);
    // console.log(event.target.value);
    // setAllocationText(newVal);
    setAllocationText(newVal);
    // ryan added: to keep as values between 0 and 100
    // doesn't work correctly for integer component yet... need to check that
    // what this doesn't do: prompt the user. need to create a front end warning too for this.
    if (newVal > -1 && newVal < 101 && Number.isInteger(newVal)) {
      setDisabled(false);
      setAllocation(newVal);
    } else {
      alert(
        "Please input a number between 0 and 100 with no decimals or percentage."
      );
      setDisabled(true);
    }
  };

  return (
    <Container maxWidth="lg" className={classes.instructContainer}>
      <hr />
      <h3>Let's practice:</h3>
      <p> Consider two investments: Fund A and Fund B.</p>
      <div
        style={{
          width: "90%",
          // paddingLeft: "50",
          height: "40%",
          margin: "0 auto",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Grid
          container
          className={classes.root}
          spacing={1}
          style={{ height: "100%" }}
        >
          <Barchart
            extent={extent}
            title="A"
            data={stocks}
            allocation={allocation !== null ? allocation : "Insert a value in "}
          ></Barchart>{" "}
          {/*extent={extent}*/}
          {/* <Dotplot data={data}></Dotplot> */}
          <Barchart
            extent={extent}
            title="B"
            data={bonds}
            allocation={allocation !== null ? allocation : "Insert a value in "}
          ></Barchart>{" "}
          {/*extent={extent}*/}
        </Grid>
      </div>
      <div
        style={{
          justifyContent: "center",
          alignItems: "center",
          // height: "10vh",
          textAlign: "center",
        }}
      >
        <p>
          <span style={{ fontWeight: "bold" }}>Objective</span>:{" "}
          <span className={classes.emph}> maximize annual rate of return </span>{" "}
          over a thirty (30) years.
        </p>
        <p>
          {/*<span style={{ fontWeight: "bold" }}>Evaluation Period</span>:{" "}*/}
          <span> Rates of returns </span> are averaged and annualized over a{" "}
          <span style={{ fontWeight: "bold" }}>five (5) year</span> evaluation
          period.
        </p>
        <p>Between 0% and 100%, how much do you want to allocate to Fund A?</p>
        <form className={classes.root} noValidate autoComplete="off">
          {/*<TextField id="standard-basic" error ={this.state.errorText.length === 0 ? false : true } label="Standard" />*/}
          {/*<Input*/}
          {/*  id="Practice1"*/}
          {/*  type="number"*/}
          {/*  placeholder="Fund A allocation %"*/}
          {/*></Input>*/}
          <TextField
            id="Practice1"
            label="Fund A allocation %"
            type="number"
            color="secondary"
            value={allocationText}
            /*endAdornment={<InputAdornment position="end">%</InputAdornment>}*/
            onChange={handleAllocation}
          />
          <p> </p>
          <Button
            disabled={disabled}
            style={{
              backgroundColor: disabled ? "lightgrey" : "gray",
              color: "black",
            }}
            variant="contained"
            onClick={handleConsent}
          >
            Make Decision
          </Button>
        </form>
      </div>
      {/* <div
        style={{
          textAlign: "center",
          paddingTop: "10px",
          paddingBottom: "10px",
        }}
      >
        <Button
          disabled={disabled}
          style={{
            backgroundColor: disabled ? "lightgrey" : "gray",
            color: "black",
          }}
          variant="contained"
          onClick={handleConsent}
        >
          Continue
        </Button>
      </div> */}
      <LoadingCircle opacity={loadingOpacity}></LoadingCircle>
    </Container>
  );
};

export default Instructions5;
