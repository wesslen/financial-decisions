import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import BinaryChoice from "../../components/choice/binaryChoice";
import DecisionDialog from "../../components/dialog/decisionDialog";
import AlertDialog from "../../components/dialog/alertDialog";
import Tweet from "../../components/tweet/tweet";
import LoadingCircle from "../../components/loading/loading";
import Instructions from "../../components/instructions/instructions";
import { useHistory } from "react-router-dom";
import Barchart from "../../components/visualization/barchart/barchart";
import * as d3 from "d3";
import { Button, Divider, Grid, Input } from "@material-ui/core";
import $ from "jquery";

// let index = 0;

const Task1Page = (props) => {
  //   console.log(props.setChoice);
  const history = useHistory();
  const [loadingOpacity, setLoadingOpacity] = useState(0);
  // const [data, setData] = useState([]);
    const [bonds, setBonds] = useState([]);
    const [stocks, setStocks] = useState([]);
    const [allocation, setAllocation] = useState(null);
    const [evalIndex,setEvalIndex] = useState(0);
    const [extent,setExtent] = useState([0,1]);
     const [left,setLeft] = useState("stocks");

  const divContainer = useRef(null);

  const handleAllocation = (event) => {
    let newVal = event.target.value;
    console.log(event.target.value);
    setAllocation(newVal);
  }


  const handleDecision = () => {
    let response = {allocation:allocation,left:left,time:Date.now()}
    console.log(allocation);
        axios.post("/api/response", response).then((response) => {
          console.log(response.data);
          setEvalIndex(response.data);
          // history.push("/instructions");
        });
    console.log("here we will post the user decision")
    console.log(evalIndex)
  };



  // useEffect(() => {
  //   async function fetchData() {
  //     const result = await axios.post("/api/data", {
  //       accIndex: props.accIndex,
  //     });
  //     setLoadingOpacity(0.8);
  //     setTimeout(() => {
  //       setLoadingOpacity(0);
  //       setData(result.data.data);
  //     }, 1000);
  //   }
  //   if (props.accIndex < 8) {
  //     fetchData();
  //   } else {
  //     axios.get("/rq2/init").then((res) => {
  //       console.log(res);
  //       history.push("/task2");
  //     });
  //   }
  // }, [props.accIndex]);

    useEffect(() => {
      async function fetchData() {
        const result = await axios.get("/api/data");
        let data = result.data;
        let stk = data.equities_sp.map((s, i) => {
          return { key: i, value: s };
        });
        let bnd = data.treasury_10yr.map((s, i) => {
          return { key: i, value: s };
        });
        let extent = d3.extent([...data.treasury_10yr, ...data.equities_sp]);
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
      <Instructions accAlias={1}>
        <h4>Task 1: Decision {evalIndex + 1}/7</h4>
        <p>
          In this page, you will make seven allocation decisions. For each
          one, you will be presented two Funds referenced in different
          evaluation periods of their returns. Your goal is to decide on
          the allocation between the two funds for a thirty (30) year investment.
        </p>
      </Instructions>
      <div>
        {" "}
        <Grid container spacing={1}>
          <Barchart
            extent={extent}
            data={left === "stocks" ? stocks : bonds}
          ></Barchart>
          <Barchart
            extent={extent}
            data={left === "stocks" ? bonds : stocks}
          ></Barchart>
        </Grid>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "10vh",
          }}
        >
          <p>
            Investment goal: <span> maximize annual rate of return </span> over
            a thirty (30) year investment period.
          </p>
          <p>
            Between 0% and 100%, how much do you want to allocate to Fund A?
          </p>
          <form noValidate autoComplete="off">
            {/*<TextField id="standard-basic" error ={this.state.errorText.length === 0 ? false : true } label="Standard" />*/}
            <Input
              id="Practice1"
              type="number"
              placeholder="Fund A allocation %"
              onChange={handleAllocation}
            ></Input>
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
