import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Container } from "@material-ui/core";
import { Grid } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
// import TextField from '@material-ui/core/TextField';
import Input from "@material-ui/core/Input";
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
    // axios.get("/consent").then((result) => {
    //   //   console.log(result.data);

    // });
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
      console.log(extent, "this is the extent of both datasets");
      setExtent(extent);
      setStocks(stk);
      setBonds(bnd);
    }
    fetchData();
  }, []);
  //DEMONSTRATING DATA VISUALIZATION, creating random data
  // function getRandomArbitrary(min, max) {
  //     return Math.random() * (max - min) + min;
  // }
  //
  // const data = [];
  // for (let i = 0; i < 21; i++) {
  //   data.push({ key: i, value: getRandomArbitrary(-.05,0.1) });
  // }
  // let gr = new getReturns();
  // const data = gr.getReturns("../../../public/returns.csv", "treasury_10yr", 10);
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
      <ul>
        <li>
          <span className={classes.emph}>Asset:</span> An economic resource with
          the expectation that it will provide a future benefit or returns (for
          example, individual stocks and bonds).
        </li>
        <li>
          <span className={classes.emph}>Fund:</span> A collection of assets
          held for diversification benefits. Examples of funds include mutual
          funds or exchange-traded funds (or ETF's). In this experiment, your
          investment options are between different funds. Each fund's name is
          masked.
        </li>
        <li>
          <span className={classes.emph}>Rate of Return:</span> Net gain or loss
          by investing in an asset over an evaluation period (for example, 1 or
          30 years), expressed as an{" "}
          <span className={classes.emph}>annualized percentage</span> of the
          investment’s initial cost.
        </li>
        <li>
          <span className={classes.emph}>Allocation:</span> Decision of how to
          apportion an investment between different funds. In this study, you
          will provide you allocation percentage when presented with two
          different assets' rates of returns under different scenarios and data
          visualizations. This number will be a percentage between 0% and 100%.
        </li>
        {/* use for Round 3 when introduce Time Horizon*/}
        {/*  <li>*/}
        {/*  <span className={classes.emph}>Time Horizon:</span> The amount of time before*/}
        {/*      you expect to retire. In this study, we may provide you with specified*/}
        {/*      time horizons (e.g., decide an allocation with the expectation to retire*/}
        {/*      in 1 or 30 years). You should make your decision based on this time horizon, not*/}
        {/*      your own personal retirement decision.*/}
        {/*</li>*/}
        <li>
          <span className={classes.emph}>Evaluation Period:</span> The relative
          timeframe in which the Rate of Returns are framed. In this study, we
          will provide returns between 1 to 30 year periods.
        </li>
        <li>
          <span className={classes.emph}>Investment Period:</span> The expected
          timeframe you plan to invest. In this study, your investment period
          will be 30 years.
        </li>
      </ul>
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
      <p>
        {" "}
        Consider two investments: Fund A and Fund B. The two charts provide each
        fund's possible annualized returns over a
        <span className={classes.emph}> five (5) year evaluation period</span>.
      </p>
      <Grid container className={classes.root} spacing={1}>
        <Barchart extent={extent} title="A" data={bonds}></Barchart>
        {/* <Dotplot data={data}></Dotplot> */}
        <Barchart extent={extent} title="B" data={stocks}></Barchart>
      </Grid>
      <div
        style={{
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <p>
          Investment goal:{" "}
          <span className={classes.emph}> maximize annual rate of return </span>{" "}
          over a thirty (30) year investment period.
        </p>
        <p>Between 0% and 100%, how much do you want to allocate to Fund A?</p>
        <form className={classes.root} noValidate autoComplete="off">
          {/*<TextField id="standard-basic" error ={this.state.errorText.length === 0 ? false : true } label="Standard" />*/}
          <Input
            id="Practice1"
            type="number"
            placeholder="Fund A allocation %"
          ></Input>
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
      <Grid container className={classes.root} spacing={1}>
        <Barchart
          // extent={extent}
          title="A"
          data={bonds}
        ></Barchart>
        <Barchart
          // extent={extent}
          title="B"
          data={stocks}
        ></Barchart>
      </Grid>
      <div
        style={{
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "stretch",
          textAlign: "center",
        }}
      >
        <p>
          Investment goal:{" "}
          <span className={classes.emph}> maximize annual rate of return </span>
          over a thirty (30) year investment period.
        </p>
        <p>Between 0% and 100%, how much do you want to allocate to Fund A?</p>
        <form className={classes.root} noValidate autoComplete="off">
          <Input
            id="Practice2"
            type="number"
            placeholder="Fund A allocation %"
          ></Input>
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
        <li> You'll evaluate a bar chart of the funds' returns.</li>
        <li>
          You'll have <b>two allocation decisions</b> for two funds' returns
          seven times.
        </li>
        <li>
          Each time the returns will be framed into a different evaluation
          period (e.g., framed as one year, five year, etc.) but on an
          annualized period.
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
          You'll evaluate a data visualizations of different funds' returns.
        </li>
        <li>
          Similar to Round 1, you'll also make <b>allocation decisions</b> on
          two different funds seven times with each time corresponding. However,
          the manner in which the returns are provided may change.
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
