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
  // const [data, setData] = useState([]);
  const [bonds, setBonds] = useState([]);
  const [stocks, setStocks] = useState([]);
  const [allocation, setAllocation] = useState(null);
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

  const handleAllocation = (event) => {
    let newVal = event.target.value;
    console.log(event.target.value);
    // ryan added: to keep as values between 0 and 100
    // doesn't work correctly for integer component yet... need to check that
    // what this doesn't do: prompt the user. need to create a front end warning too for this.
    if (newVal > -1 && newVal < 101) setAllocation(newVal);
  };

  const handleDecision = () => {
    let response = { allocation: allocation, left: left, time: Date.now() };
    console.log(allocation);
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
      const result = await axios.get("/api/data");
      let data = result.data.data;
      setEvalPeriod(result.data.evalPeriod);
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
      console.log(extent, "this is the extent of both datasets");
      setLoadingOpacity(0.8);
      setTimeout(() => {
        setLoadingOpacity(0);
        Math.random() < 0.5 ? setLeft("stocks") : setLeft("bonds");
        setAllocation(null);
        setStocks(stk);
        setBonds(bnd);
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
        paddingBottom: "30px",
      }}
      ref={divContainer}
    >
      <Instructions evalPeriod={evalPeriod}>
        <h4>Round 1: Decision {evalIndex + 1}/7</h4>
        {/*<p>*/}
        {/*  For each one,*/}
        {/*  you will be presented two Funds referenced in different evaluation*/}
        {/*  periods of their returns. Your goal is to decide on the allocation*/}
        {/*  between the two funds for a thirty (30) year investment.*/}
        {/*</p>*/}
      </Instructions>
      <div
        style={{
          width: "80%",
          paddingLeft: "240px",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {" "}
        <Grid container spacing={1}>
          <Barchart
            // title={evalIndex < 4 ? "A" : "B"}
            title="A"
            extent={extent}
            allocation={allocation}
            data={left === "stocks" ? stocks : bonds}
          ></Barchart>
          <Barchart
            title="B"
            extent={extent}
            allocation={100 - allocation}
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
              /*endAdornment={<InputAdornment position="end">%</InputAdornment>}*/
              onChange={handleAllocation}
            />{" "}
            <p> </p>
            <Button variant="contained" onClick={handleDecision}>
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
