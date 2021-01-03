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

const InstructionsMain = (props) => {
  const history = useHistory();
  const classes = useStyles();

  const [bonds, setBonds] = useState([]);
  const [stocks, setStocks] = useState([]);
  const [extent, setExtent] = useState(null);
  const [evalPeriod, setEvalPeriod] = useState(null);
  const handleConsent = () => {
    history.push("/task1");
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
      <h3>Study Instructions</h3>
      <h3>Please read carefully</h3>
      <p>
        This study's goal is to understand the effect of{" "}
        <b>different data visualizations </b>
        on <b>investment financial decisions</b>.
      </p>
      <p>
        You will view data visualizations of <b>investment rates of return</b>{" "}
        of different asset funds.
      </p>
      <p>
        {" "}
        You will decide how to <b>allocate a hypothetical investment</b> between
        two assets as a percentage (0% to 100%).
      </p>
      <p>
        Your goal is to <b>maximize</b> your <b>expected return </b>
        given your allocation decision over a thirty (30) year period.
      </p>
      <p className={classes.emph}>Compensation for Study Completion:</p>
      <p>
        <ul>
          <li>
            If you complete the study, you will receive <b>$1.25</b>.
          </li>
          <li>
            You are eligible for <b>optional incentives of up to $1.40</b>{" "}
            depending on your decisions.
          </li>
          <li>
            For each task (i.e., allocation decision), a model will simulate
            hypothetical results.
          </li>
          <li>
            You will receive up to $0.10 per task for higher simulated rate of
            returns.
          </li>
        </ul>
      </p>
      <p className={classes.emph}>Definitions:</p>
      <TableContainer>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Term</TableCell>
              <TableCell>Definition</TableCell>
              <TableCell>Examples</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {terms.map((row) => (
              <TableRow key={row.name}>
                <TableCell component="th" scope="row">
                  {row.term}
                </TableCell>
                <TableCell>{row.definition}</TableCell>
                <TableCell>{row.examples}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <hr />
      <p>Let's consider an example:</p>
      <p>
        In the animation below, a user is selecting their allocation decision
        given the returns provided.
      </p>
      <p>[INSERT GIF OF EXAMPLE]</p>
      {/*<img*/}
      {/*  src={process.env.PUBLIC_URL + "/uncertainty1.gif"}*/}
      {/*  alt=""*/}
      {/*  className={classes.image}*/}
      {/*/>*/}
      {/*<p>*/}
      {/*  In the next animation, the user decides to put their allocation near an*/}
      {/*  even mix of 50% and 50%.*/}
      {/*</p>*/}
      {/*<img*/}
      {/*  src={process.env.PUBLIC_URL + "/uncertainty2.gif"}*/}
      {/*  alt=""*/}
      {/*  className={classes.image}*/}
      {/*/>*/}
      <hr />
      <h4>Let's practice:</h4>
      <p> Consider two investments: Fund A and Fund B.</p>
      <div
        style={{
          width: "80%",
          paddingLeft: "240px",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Grid container className={classes.root} spacing={1}>
          <Barchart extent={extent1} title="A" data={bnds_sim1}></Barchart>{" "}
          {/*extent={extent}*/}
          {/* <Dotplot data={data}></Dotplot> */}
          <Barchart extent={extent1} title="B" data={stks_sim1}></Barchart>{" "}
          {/*extent={extent}*/}
        </Grid>
      </div>
      <div
        style={{
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <p>
          <span style={{ fontWeight: "bold" }}>Objective</span>:{" "}
          <span className={classes.emph}> maximize annual rate of return </span>{" "}
          over a thirty (30) year planning horizon.
        </p>
        <p>
          <span style={{ fontWeight: "bold" }}>Evaluation Period</span>:{" "}
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
          />
          <p> </p>
          <Button variant="contained">Make Decision</Button>
        </form>
      </div>
      <hr />
      <h4>Another scenario:</h4>
      <p>
        {" "}
        Consider the same funds (Fund A and B) with possible annual rate of
        returns over a
        <span className={classes.emph}>
          {" "}
          twenty-five (25) year evaluation period
        </span>
        .{/*<span className={classes.highlight}>*/}
        {/*  {" "}*/}
        {/*  Use the interactive chart below for your decision.*/}
        {/*</span>*/}
      </p>
      <div
        style={{
          width: "80%",
          paddingLeft: "240px",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Grid container className={classes.root} spacing={1}>
          <Barchart extent={extent2} title="A" data={stks_sim2}></Barchart>
          <Barchart extent={extent2} title="B" data={bnds_sim2}></Barchart>
        </Grid>
      </div>
      <div
        style={{
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "stretch",
          textAlign: "center",
        }}
      >
        <p>
          <span style={{ fontWeight: "bold" }}>Objective</span>:{" "}
          <span className={classes.emph}> maximize annual rate of return </span>
          over a thirty (30) year planning horizon.
        </p>
        <p>
          <span style={{ fontWeight: "bold" }}>Evaluation Period</span>:{" "}
          <span> Rates of returns </span> are averaged and annualized over a{" "}
          <span style={{ fontWeight: "bold" }}>twenty-five (25) year</span>{" "}
          evaluation period.
        </p>
        <p>Between 0% and 100%, how much do you want to allocate to Fund A?</p>
        <form className={classes.root} noValidate autoComplete="off">
          {/*<Input*/}
          {/*  id="Practice2"*/}
          {/*  type="number"*/}
          {/*  placeholder="Fund A allocation %"*/}
          {/*></Input>*/}
          <TextField
            id="Practice2"
            label="Fund A allocation %"
            type="number"
            color="secondary"
          />
          <h4> </h4>
          <Button variant="contained">Make Decision</Button>
        </form>
      </div>
      {/*<BinaryChoice*/}
      {/*  choiceDomain={[0.0, 1.0]}*/}
      {/*  responseIndex={"instructions"}*/}
      {/*  // handleResponse={handleResponse}*/}
      {/*  question="What investment allocation do want between Asset A and B?"*/}
      {/*  tickLabels={["Asset A", "50% / 50%", "Asset B"]}*/}
      {/*></BinaryChoice>*/}
      <hr />
      <h4>What you will do in this study</h4>
      <ul>
        <li>
          In two different rounds, you will make allocation decisions between
          two funds.
        </li>
        <li>
          Your goal is to maximize your expected returns over a thirty (30) year
          period.
        </li>
      </ul>
      <h4>Round 1</h4>
      <ul>
        <li>
          You'll have <b>seven</b> allocation decisions for two funds.
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
      <h4>Round 2</h4>
      <ul>
        <li>
          {" "}
          Repeat Round 1 but with (1) different funds and (2) a different data
          visualization.
        </li>
      </ul>
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

export default InstructionsMain;
