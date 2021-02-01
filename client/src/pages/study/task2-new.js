import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
// import BinaryChoice from "../../components/choice/binaryChoice";
// import DecisionDialog from "../../components/dialog/decisionDialog";
// import AlertDialog from "../../components/dialog/alertDialog";
// import Tweet from "../../components/tweet/tweet";
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
// import $ from "jquery";

// let index = 0;

const Task2Page = (props) => {
  const history = useHistory();
  const [loadingOpacity, setLoadingOpacity] = useState(0);
  const [pageOpacity, setPageOpacity] = useState(1);
  const [bonds, setBonds] = useState([]);
  const [stocks, setStocks] = useState([]);
  const [allocation, setAllocation] = useState(null);
  const [disabled, setDisabled] = useState(true);
  const [allocationText, setAllocationText] = useState("");
  const [evalIndex, setEvalIndex] = useState(0);
  const [evalPeriod, setEvalPeriod] = useState(null);
  const [extent, setExtent] = useState(null);
  const [left, setLeft] = useState("stocks");
  //vizTypes : hops,
  const [visType, setVisType] = useState("hops");

  const divContainer = useRef(null);

  // function isInt(value) {
  //   return !isNaN(value) &&
  //          parseInt(Number(value)) === value &&
  //          !isNaN(parseInt(value, 10));
  // }

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

  const handleDecision = () => {
    let response = {
      allocation: allocation,
      left: left,
      time: Date.now(),
      task: 2,
    };
    console.log(allocation);
    axios.post("/api/response", response).then((response) => {
      setEvalIndex(response.data);
      // history.push("/instructions");
    });
    // console.log("here we will post the user decision");
    // console.log(evalIndex);
  };

  useEffect(() => {
    async function fetchData() {
      const consent = evalIndex === 0 ? await axios.get("/api/consent") : null;
      const result = await axios.get("/api/data" + "?numsimulations=20");
      let data = result.data.data;
      console.log(data);
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
        setAllocation(null);
        setAllocationText("");
        //   console.log(stk);
        //   console.log(bnd);
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
      history.push("/post");
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
          height: "80%",
          margin: "0 auto",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {" "}
        <Grid container spacing={1} style={{ height: "50%" }}>
          <VizController
            // title={evalIndex < 4 ? "A" : "B"}
            vizType={visType}
            title="A"
            extent={extent}
            allocation={allocation !== null ? allocation : "Insert a value in "}
            data={left === "stocks" ? stocks : bonds}
          ></VizController>
          <VizController
            vizType={visType}
            title="B"
            extent={extent}
            allocation={
              allocation !== null ? 100 - allocation : "Insert a value in "
            }
            data={left === "stocks" ? bonds : stocks}
          ></VizController>
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
            <span style={{ fontWeight: "bold" }}>Objective</span>:{" "}
            <span style={{ textDecorationLine: "underline" }}>
              {" "}
              maximize investment rate of return{" "}
            </span>{" "}
            over a <span style={{ fontWeight: "bold" }}>
              thirty (30) year
            </span>{" "}
            planning horizon.
          </p>
          <p>
            <span style={{ fontWeight: "bold" }}>Evaluation Period</span>:{" "}
            <span> Rates of returns </span> are averaged and annualized over a{" "}
            <span style={{ fontWeight: "bold" }}>{evalPeriod} year</span>{" "}
            evaluation period.
          </p>
          <p>
            Between 0% and 100%, how much of your investment do you want to
            allocate to Fund A?
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
              id="Practice1"
              label="Fund A allocation %"
              type="number"
              color="secondary"
              value={allocationText}
              /*endAdornment={<InputAdornment position="end">%</InputAdornment>}*/
              onChange={handleAllocation}
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
