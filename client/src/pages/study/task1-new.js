import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
// import BinaryChoice from "../../components/choice/binaryChoice";
// import DecisionDialog from "../../components/dialog/decisionDialog";
// import AlertDialog from "../../components/dialog/alertDialog";
// import Tweet from "../../components/tweet/tweet";
import LoadingCircle from "../../components/loading/loading";
import Instructions from "../../components/instructions/instructions";
import { useHistory } from "react-router-dom";
import Barchart from "../../components/visualization/barchart/barchart";
import * as d3 from "d3";
import {
  Button,
  Divider,
  Grid,
  InputAdornment,
  TextField,
  Typography,
} from "@material-ui/core";
// import $ from "jquery";

// let index = 0;

const Task1Page = (props) => {
  //   console.log(props.setChoice);
  const history = useHistory();
  const [loadingOpacity, setLoadingOpacity] = useState(0);
  const [pageOpacity, setPageOpacity] = useState(1);
  // const [data, setData] = useState([]);
  const [bonds, setBonds] = useState([]);
  const [stocks, setStocks] = useState([]);
  const [allocationLeft, setAllocationLeft] = useState(null);
  const [allocationRight, setAllocationRight] = useState(null);
  const [allocationTextLeft, setAllocationTextLeft] = useState("");
  const [allocationTextRight, setAllocationTextRight] = useState("");
  const [disabled, setDisabled] = useState(true);
  const [alert, setAlert] = useState(false);
  const [evalIndex, setEvalIndex] = useState(0);
  const [evalPeriod, setEvalPeriod] = useState(null);
  const [extent, setExtent] = useState(null);
  const [left, setLeft] = useState("stocks");

  const divContainer = useRef(null);

  // function isInt(value) {
  //   return !isNaN(value) &&
  //          parseInt(Number(value)) === value &&
  //          !isNaN(parseInt(value, 10));
  // }

  const handleAllocationLeft = (event) => {
    let newVal = parseInt(event.target.value, 10);

    // newVal = parseInt(newVal);
    // console.log(event.target.value);
    // setAllocationText(newVal);
    setAllocationTextLeft(newVal);
    if (newVal !== null) {
      setAllocationTextRight(100 - newVal);
    }

    // ryan added: to keep as values between 0 and 100
    // doesn't work correctly for integer component yet... need to check that
    // what this doesn't do: prompt the user. need to create a front end warning too for this.
    if (newVal > -1 && newVal < 101 && Number.isInteger(newVal)) {
      setDisabled(false);
      setAlert(false);
      setAllocationLeft(newVal);
      setAllocationTextLeft(newVal);
      setAllocationRight(100 - newVal);
      setAllocationTextRight(100 - newVal);
    } else {
      setAlert(true);
      setAllocationLeft(null);
      setAllocationTextLeft("");
      setAllocationRight(null);
      setAllocationTextRight("");
      setDisabled(true);
    }
  };

  const handleAllocationRight = (event) => {
    let newVal = parseInt(event.target.value, 10);

    // newVal = parseInt(newVal);
    // console.log(event.target.value);
    // setAllocationText(newVal);
    setAllocationTextRight(newVal);
    if (newVal !== null) {
      setAllocationTextLeft(100 - newVal);
    }

    // ryan added: to keep as values between 0 and 100
    // doesn't work correctly for integer component yet... need to check that
    // what this doesn't do: prompt the user. need to create a front end warning too for this.
    if (newVal > -1 && newVal < 101 && Number.isInteger(newVal)) {
      setDisabled(false);
      setAlert(false);
      setAllocationLeft(100 - newVal);
      setAllocationTextLeft(100 - newVal);
      setAllocationRight(newVal);
      setAllocationTextRight(newVal);
    } else {
      setAlert(true);
      setAllocationLeft(null);
      setAllocationTextLeft("");
      setAllocationRight(null);
      setAllocationTextRight("");
      setDisabled(true);
    }
  };

  // const handleAllocationLeft = (event) => {
  //   let newVal = +event.target.value;
  //   // newVal = parseInt(newVal);
  //   // console.log(event.target.value);
  //   // setAllocationText(newVal);
  //   setAllocationTextLeft(newVal);
  //   if (newVal !== null) {
  //     setAllocationTextRight(100 - newVal);
  //   }
  //   if (!newVal) {
  //     setAllocationLeft(null);
  //     setAllocationTextLeft("");
  //     setAllocationRight(null);
  //     setAllocationTextRight("");
  //     setDisabled(true);
  //   }
  //   // ryan added: to keep as values between 0 and 100
  //   // doesn't work correctly for integer component yet... need to check that
  //   // what this doesn't do: prompt the user. need to create a front end warning too for this.
  //   else if (
  //     newVal > -1 &&
  //     newVal < 101 &&
  //     Number.isInteger(newVal) &&
  //     newVal
  //   ) {
  //     setDisabled(false);
  //     setAllocationLeft(newVal);
  //     setAllocationRight(100 - newVal);
  //   } else {
  //     alert(
  //       "Please input a number between 0 and 100 with no decimals or percentage."
  //     );
  //     setDisabled(true);
  //   }
  // };

  // const handleAllocationRight = (event) => {
  //   let newVal = +event.target.value;
  //   // newVal = parseInt(newVal);
  //   // console.log(event.target.value);
  //   // setAllocationText(newVal);
  //   setAllocationTextRight(newVal);
  //   if (newVal !== null) {
  //     setAllocationTextLeft(100 - newVal);
  //   }
  //   if (!newVal) {
  //     setAllocationLeft(0);
  //     setAllocationTextLeft("");
  //     setAllocationRight(0);
  //     setAllocationTextRight("");
  //     setDisabled(true);
  //   }
  //   // ryan added: to keep as values between 0 and 100
  //   // doesn't work correctly for integer component yet... need to check that
  //   // what this doesn't do: prompt the user. need to create a front end warning too for this.
  //   else if (
  //     newVal > -1 &&
  //     newVal < 101 &&
  //     Number.isInteger(newVal) &&
  //     newVal
  //   ) {
  //     setDisabled(false);
  //     setAllocationRight(newVal);
  //     setAllocationLeft(100 - newVal);
  //   } else {
  //     alert(
  //       "Please input a number between 0 and 100 with no decimals or percentage."
  //     );
  //     setDisabled(true);
  //   }
  // };

  const handleDecision = () => {
    let response = {
      allocationLeft: allocationLeft,
      allocationRight: allocationRight,
      left: left,
      time: Date.now(),
      task: "task1",
    };
    console.log(response);
    axios.post("/api/response", response).then((response) => {
      console.log(response.data);
      setEvalIndex(response.data);
      // history.push("/instructions");
    });
    // console.log("here we will post the user decision");
    // console.log(evalIndex);
  };

  useEffect(() => {
    async function fetchData() {
      //for dev, comment this for prod.
      // const consent = evalIndex === 0 ? await axios.get("/api/consent") : null;
      const result = await axios.get("/api/data");
      let data = result.data.data;
      let stk = data.equities_sp.map((s, i) => {
        return { key: i, value: s };
      });
      let bnd = data.treasury_10yr.map((s, i) => {
        return { key: i, value: s };
      });
      let extent = d3.extent([...data.treasury_10yr, ...data.equities_sp]);
      let maxExtent = d3.max(extent);
      extent = [-maxExtent, maxExtent];
      setExtent(extent);
      setEvalPeriod(result.data.evalPeriod);
      setLoadingOpacity(0.8);
      setPageOpacity(0.2);
      // Just to create an illusion of loading so users know data has changed.
      setTimeout(() => {
        Math.random() < 0.5 ? setLeft("stocks") : setLeft("bonds");
        setDisabled(true);
        setAllocationLeft(null);
        setAllocationTextLeft("");
        setAllocationRight(null);
        setAllocationTextRight("");
        setStocks(stk);
        setBonds(bnd);
        setLoadingOpacity(0);
        setPageOpacity(1);
      }, 1000);
    }
    // fetchData();
    if (evalIndex < 7) {
      fetchData();
    } else {
      history.push("/mid1");
    }
  }, [evalIndex]);

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        margin: "0 auto",
        overflow: "auto",
        paddingTop: "30px",
        opacity: pageOpacity,
      }}
      ref={divContainer}
    >
      <Instructions evalPeriod={evalPeriod} style={{ height: "20%" }}>
        <h4 style={{ textAlign: "center" }}>
          Round 1: Decision {evalIndex + 1}/7
        </h4>
        {/*<p>*/}
        {/*  For each one,*/}
        {/*  you will be presented two Funds referenced in different evaluation*/}
        {/*  periods of their returns. Your goal is to decide on the allocation*/}
        {/*  between the two funds for a thirty (30) year investment.*/}
        {/*</p>*/}
      </Instructions>
      <div
        style={{
          width: "90%",
          // paddingLeft: "50",
          height: "80%",
          margin: "0 auto",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
        }}
      >
        <p>
          <span style={{ fontWeight: "bold" }}>Objective</span>:{" "}
          <span style={{ textDecorationLine: "underline" }}>
            {" "}
            maximize expected rate of return{" "}
          </span>{" "}
          over a{" "}
          <span style={{ fontWeight: "bold" }}>
            thirty (30) year period.
          </span>{" "}
          {/*planning horizon.*/}
        </p>

        <Grid container spacing={1} style={{ height: "60%" }}>
          <Barchart
            // title={evalIndex < 4 ? "A" : "B"}
            title="A"
            extent={extent}
            allocation={
              allocationLeft !== null ? allocationLeft : "Insert a value in "
            }
            data={left === "stocks" ? stocks : bonds}
          ></Barchart>
          <Barchart
            title="B"
            extent={extent}
            allocation={
              allocationRight !== null ? allocationRight : "Insert a value in "
            }
            data={left === "stocks" ? bonds : stocks}
          ></Barchart>
        </Grid>
        <div
          style={{
            justifyContent: "center",
            alignItems: "center",
            height: "10vh",
            textAlign: "center",
          }}
        >
          <p>
            {/*<span style={{ fontWeight: "bold" }}>Evaluation Period</span>:{" "}*/}
            <span> Rates of returns </span> are averaged and annualized over a{" "}
            <span style={{ fontWeight: "bold" }}>{evalPeriod} year</span>{" "}
            evaluation period.
          </p>
          <p>
            <span style={{ color: alert ? "red" : "black" }}>
              Between 0% and 100%
            </span>
            , how much of your investment do you want to allocate to each fund?
          </p>{" "}
          <form noValidate autoComplete="off">
            {/*<TextField id="standard-basic" error ={this.state.errorText.length === 0 ? false : true } label="Standard" />*/}
            {/*<Input*/}
            {/*  id="Practice1"*/}
            {/*  type="number"*/}
            {/*  placeholder="Fund A allocation %"*/}
            {/*  onChange={handleAllocation}*/}
            {/*></Input>*/}
            <TextField
              id="Practice1"
              label="Fund A allocation %"
              type="number"
              color="secondary"
              value={allocationTextLeft}
              style={{ width: 150 }}
              /*endAdornment={<InputAdornment position="end">%</InputAdornment>}*/
              onChange={handleAllocationLeft}
            />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <TextField
              id="Practice2"
              label="Fund B allocation %"
              type="number"
              color="secondary"
              value={allocationTextRight}
              style={{ width: 150 }}
              /*endAdornment={<InputAdornment position="end">%</InputAdornment>}*/
              onChange={handleAllocationRight}
            />{" "}
            <p> </p>
            <Button
              disabled={disabled}
              variant="contained"
              onClick={handleDecision}
            >
              Make Decision
            </Button>
          </form>
        </div>
      </div>
      <LoadingCircle opacity={loadingOpacity}></LoadingCircle>
    </div>
  );
};

export default Task1Page;
