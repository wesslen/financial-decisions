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

const InstructionsTask2 = (props) => {
  const history = useHistory();
  const classes = useStyles();

  const [bonds, setBonds] = useState([]);
  const [stocks, setStocks] = useState([]);
  const [extent, setExtent] = useState(null);
  const [evalPeriod, setEvalPeriod] = useState(null);
  const handleConsent = () => {
    history.push("/task2");
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
    return Math.random() * (max - min) + min;
  }

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
  extent2 = [-maxExtent2, maxExtent2];

  function createData(term, definition, examples) {
    return { term, definition, examples };
  }

  const terms = [
    createData(
      "Assets",
      "An economic resource with\n" +
        "the expectation that it will provide a future benefit or returns.",
      "Stocks, Bonds, Funds (Mutual Funds, ETFs), Real Estate"
    ),
    createData(
      "Fund",
      "A collection of assets held for diversification benefits. In this study, your\n" +
        "investment options are between different funds. Each fund's name is\n" +
        "masked.",
      "Mutual Funds and exchange-traded funds (or ETF's)"
    ),
    createData(
      "Allocation",
      "Decision of how to\n" +
        "apportion an investment between different funds. In this study, you\n" +
        "will decide an allocation percentage after viewing two\n" +
        "different funds' rates of returns under different scenarios and data\n" +
        "visualizations.",
      "0% to 100%"
    ),
    createData(
      "Rate of Return",
      "Net gain or loss\n" +
        "by investing in an asset over an evaluation period. It will be expressed as an annualized percentage of the\n" +
        "investment’s initial cost.",
      "-5%, 7%, 12%"
    ),
    createData(
      "Evaluation Period",
      "The relative\n" +
        "          timeframe in which the rate of returns are framed. In this study, we\n" +
        "          will provide returns between 1 to 30 year periods.",
      "1 year to 30 years"
    ),
    createData(
      "Planning Horizon",
      "The expected\n" +
        "          timeframe you plan to invest. In this study, your planning horizon\n" +
        "          will be 30 years.",
      "30 years"
    ),
  ];

  return (
    <Container maxWidth="lg" className={classes.instructContainer}>
      <h3>Round 2 Instructions</h3>
      <ul>
        <li>
          Info info info.
        </li>
        <li>
          Your goal is to maximize your expected returns over a thirty (30) year
          period.
        </li>
      </ul>
      <h4>Round 2</h4>
      <ul>
        <li>
          You'll have <b>seven</b> allocation decisions for two new funds: C and D.
        </li>
        <li>
          Each decision will show funds' rate of returns framed as different
          evaluation periods (e.g., one year period, thirty year period).
        </li>
        <li>
          Your goal is to maximize your expected returns over a thirty (30) year
          period.
        </li>
      </ul>
      {/*<h4>Round 2</h4>*/}
      {/*<ul>*/}
      {/*  <li>*/}
      {/*    {" "}*/}
      {/*    Repeat Round 1 but with different funds and a different data*/}
      {/*    visualization.*/}
      {/*  </li>*/}
      {/*  <li>*/}
      {/*    {" "}*/}
      {/*    Instructions will be provided before on how to interpret the new data visualization.*/}
      {/*  </li>*/}
      {/*</ul>*/}
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
      </div>
    </Container>
  );
};

export default InstructionsTask2;