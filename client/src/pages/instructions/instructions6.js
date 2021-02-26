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
import Barchart from "../../components/visualization/barchart/barchart-intro";
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

const Instructions6 = (props) => {
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
      history.push("/instructions8");
    }, 1000);
  };

  // useEffect(() => {
  //   async function fetchData() {
  //     const result = await axios.get("/api/data");
  //     let data = result.data.data;
  //     setEvalPeriod(result.data.evalPeriod);
  //     let stk = data.equities_sp.map((s, i) => {
  //       return { key: i, value: s };
  //     });
  //     let bnd = data.treasury_10yr.map((s, i) => {
  //       return { key: i, value: s };
  //     });
  //     let extent = d3.extent([...data.treasury_10yr, ...data.equities_sp]);
  //     console.log(extent, "this is the extent of both datasets");
  //     setExtent(extent);
  //     setStocks(stk);
  //     setBonds(bnd);
  //   }
  //   fetchData();
  // }, []);
  //DEMONSTRATING DATA VISUALIZATION, creating random data
  function getRandomArbitrary(min, max) {
    // var myrng = new Math.seedrandom('hello.');
    // return myrng * (max - min) + min;
    return Math.random() * (max - min) + min;
  }

  // const stks_sim1 = [];
  // const bnds_sim1 = [];
  // const stks_sim2 = [];
  // const bnds_sim2 = [];
  // for (let i = 0; i < 41; i++) {
  //   stks_sim1.push({ key: i, value: getRandomArbitrary(-0.3, 0.3) });
  //   bnds_sim1.push({ key: i, value: getRandomArbitrary(-0.08, 0.08) });
  //   stks_sim2.push({ key: i, value: getRandomArbitrary(-0.1, 0.1) });
  //   bnds_sim2.push({ key: i, value: getRandomArbitrary(-0.05, 0.05) });
  // }

  // let extent1 = d3.extent([
  //   ...stks_sim1.map((d) => d.value),
  //   ...bnds_sim1.map((d) => d.value),
  // ]);
  // let maxExtent1 = d3.max(extent1);

  // extent1 = [-maxExtent1, maxExtent1];
  // console.log(extent1, "Asdasd");

  // let extent2 = d3.extent([
  //   ...stks_sim2.map((d) => d.value),
  //   ...bnds_sim2.map((d) => d.value),
  // ]);
  // let maxExtent2 = d3.max(extent2);
  // extent2 = [-maxExtent2, maxExtent2];

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

      setExtent([-0.1, 0.1]);
      setEvalPeriod(1);
      setLoadingOpacity(0.8);
      setPageOpacity(0.2);
      // Just to create an illusion of loading so users know data has changed.
      setTimeout(() => {
        Math.random() < 0.5 ? setLeft("stocks") : setLeft("bonds");
        setAllocation(null);
        setAllocationText("");
        setStocks(stks_sim2);
        setBonds(bnds_sim2);
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
                <p>
          In this study, you'll be provided two funds (e.g., Fund Y and Z). You to decide how to allocate your retirement investment.
        </p>
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

                <p>
          <span style={{ fontWeight: "bold" }}>Objective</span>:{" "}
          <span className={classes.emph}> maximize expected annual rate of return </span>
          over a thirty (30) years.
        </p>

        <Grid
          container
          className={classes.root}
          spacing={1}
          style={{ height: "100%" }}
        >
          <Barchart
            extent={extent}
            title="Y"
            data={stocks}
            allocation={allocation !== null ? allocation : "Insert a value in "}
          ></Barchart>
          <Barchart
            extent={extent}
            title="Z"
            data={bonds}
            allocation={allocation !== null ? 100 - allocation : "Insert a value in "}
          ></Barchart>
        </Grid>
             <div
        style={{
          justifyContent: "center",
          alignItems: "center",
          // height: "10vh",
          textAlign: "center",
        }}
      >
        <p>
          {/*<span style={{ fontWeight: "bold" }}>Evaluation Period</span>:{" "}*/}
          In this example, rates of returns are now framed in <span style={{ fontWeight: "bold" }}>thirty (30) year</span> returns, averaged and annualized.
        </p>
        <p>Between 0% and 100%, how much do you want to allocate to each fund?</p>
        <form className={classes.root} noValidate autoComplete="off">
          <TextField
            id="Practice2"
            label="Fund Y allocation %"
            type="number"
            color="secondary"
            value={allocationText}
            style = {{width: 150}}
            /*endAdornment={<InputAdornment position="end">%</InputAdornment>}*/
            onChange={handleAllocation}
          />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <TextField
            id="Practice3"
            label="Fund Z allocation %"
            type="number"
            color="secondary"
            value={100-  allocationText}
            style = {{width: 150}}
            /*endAdornment={<InputAdornment position="end">%</InputAdornment>}*/
            // onChange={handleAllocation}
          />
          <h4> </h4>
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
      </div>

      {/* 
      <div
        style={{
          textAlign: "center",
          paddingTop: "10px",
          paddingBottom: "10px",
        }}
      >
        <Button
          style={{ backgroundColor: "gray", color: "black" }}
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

export default Instructions6;
