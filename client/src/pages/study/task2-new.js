import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { jStat } from "jstat";
import VizController from "../../components/visualization/task2vizController/task2vizcontroller";
import LoadingCircle from "../../components/loading/loading";
import Instructions from "../../components/instructions/instructions";
import DotPlot from "../../components/visualization/dotplot/dotplotalt";
import { useHistory } from "react-router-dom";
import * as d3 from "d3";
import {
  Button,
  Divider,
  Grid,
  InputAdornment,
  TextField,
  Typography,
} from "@material-ui/core";
import {
  kernelDensityEstimator,
  kernelEpanechnikov,
} from "../../functions/kde";
// import $ from "jquery";

// let index = 0;

const Task2Page = (props) => {
  const history = useHistory();
  const [loadingOpacity, setLoadingOpacity] = useState(0);
  const [pageOpacity, setPageOpacity] = useState(1);
  const [bonds, setBonds] = useState([]);
  const [stocks, setStocks] = useState([]);
  const [allocationLeft, setAllocationLeft] = useState(null);
  const [allocationRight, setAllocationRight] = useState(null);
  const [allocationTextLeft, setAllocationTextLeft] = useState("");
  const [allocationTextRight, setAllocationTextRight] = useState("");
  const [disabled, setDisabled] = useState(true);
  const [evalIndex, setEvalIndex] = useState(0);
  const [evalPeriod, setEvalPeriod] = useState(null);
  const [extent, setExtent] = useState(null);
  const [densityExtent, setDensityExtent] = useState([0, 0.5]);
  const [left, setLeft] = useState("stocks");
  const [alert, setAlert] = useState(false);
  //vizTypes : hops,
  const [visType, setVisType] = useState("interval");

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

  const getDensityExtent = (stocks, bonds, extent) => {
    let x = d3.scaleLinear().domain(extent).nice();
    var kde = kernelDensityEstimator(kernelEpanechnikov(0.05), x.ticks(40));

    var density1 = kde(
      stocks.map(function (d) {
        return d.value;
      })
    );
    var density2 = kde(
      bonds.map(function (d) {
        return d.value;
      })
    );

    let maxDensity1 = d3.max(density1.map((d) => d[1]));
    let maxDensity2 = d3.max(density2.map((d) => d[1]));

    return [0, d3.max([maxDensity1, maxDensity2])];
  };

  const handleDecision = () => {
    let response = {
      allocationLeft: allocationLeft,
      allocationRight: allocationRight,
      left: left,
      time: Date.now(),
      task: "task2",
    };

    axios.post("/api/response", response).then((response) => {
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
      const result = await axios.get("/api/data" + "?numsimulations=33");
      console.log(result.data.treatment);
      setVisType(result.data.treatment);
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
      let densityExtent = getDensityExtent(stk, bnd, extent);
      setDensityExtent(densityExtent);
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
      history.push("/mid2");
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
          Round 2: Decision {evalIndex + 1}/7
        </h4>
      </Instructions>
      <div
        style={{
          width: "90%",
          // paddingLeft: "50",
          height: "45%",
          margin: "0 auto",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
        }}
      >
        {" "}
        <p>
          <span style={{ fontWeight: "bold" }}>Objective</span>:{" "}
          <span style={{ textDecorationLine: "underline" }}>
            {" "}
            maximize expected rate of return{" "}
          </span>{" "}
          over a <span style={{ fontWeight: "bold" }}>
            thirty (30) year period.
          </span>{" "}
          {/*planning horizon.*/}
        </p>
        {visType == "barchart" ? (
          <Grid container spacing={1} style={{ height: "60%" }}>
            <VizController
              // title={evalIndex < 4 ? "A" : "B"}
              vizType={visType}
              title="C"
              extent={extent}
              densityExtent={densityExtent}
              allocation={
                allocationLeft !== null ? allocationLeft : "Insert a value in "
              }
              data={left === "stocks" ? stocks : bonds}
            ></VizController>
            <VizController
              vizType={visType}
              title="D"
              extent={extent}
              densityExtent={densityExtent}
              allocation={
                allocationRight !== null
                  ? allocationRight
                  : "Insert a value in "
              }
              data={left === "stocks" ? bonds : stocks}
            ></VizController>
          </Grid>
        ) : (
          <div>
            <VizController
              // title={evalIndex < 4 ? "A" : "B"}
              vizType={visType}
              title="C"
              extent={extent}
              densityExtent={densityExtent}
              allocation={
                allocationLeft !== null ? allocationLeft : "Insert a value in "
              }
              data={left === "stocks" ? stocks : bonds}
            ></VizController>
            <VizController
              vizType={visType}
              title="D"
              extent={extent}
              densityExtent={densityExtent}
              allocation={
                allocationRight !== null
                  ? allocationRight
                  : "Insert a value in "
              }
              data={left === "stocks" ? bonds : stocks}
            ></VizController>
          </div>
        )}
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
          </p>

          <form noValidate autoComplete="off">
            {/*<TextField id="standard-basic" error ={this.state.errorText.length === 0 ? false : true } label="Standard" />*/}
            {/*<Input*/}
            {/*  id="Practice1"*/}
            {/*  type="number"*/}
            {/*  placeholder="Fund A allocation %"*/}
            {/*  onChange={handleAllocation}*/}
            {/*></Input>*/}
            <TextField
              id="Task1"
              label="Fund C allocation %"
              type="number"
              color="secondary"
              value={allocationTextLeft}
              style={{ width: 150 }}
              InputProps={{
                inputProps: {
                  max: 100,
                  min: 0,
                },
              }}
              // InputProps={{ inputProps: { min: 0, max: 10 } }}
              /*endAdornment={<InputAdornment position="end">%</InputAdornment>}*/
              onChange={handleAllocationLeft}
            />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <TextField
              id="Task2"
              label="Fund D allocation %"
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

export default Task2Page;
