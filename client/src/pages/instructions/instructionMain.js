import React , {useState,useEffect} from "react";
import axios from "axios";
import { Button, Container } from "@material-ui/core";
import {Grid} from "@material-ui/core"
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
// import TextField from '@material-ui/core/TextField';
import Input from '@material-ui/core/Input';
import BinaryChoice from "../../components/choice/binaryChoice";
import Histogram from "../../components/visualization/histogram/histogram";
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

  const handleConsent = () => {
    history.push("/task1");
    // axios.get("/consent").then((result) => {
    //   //   console.log(result.data);

    // });
  };

  useEffect(()=>{
        async function fetchData() {
          const result = await axios.get("/api/data");
          let data = result.data;
          let stk = data.equities_sp.map((s,i)=>{
          return { key: i, value:s }
          })
          let bnd = data.treasury_10yr.map((s, i) => {
            return { key: i, value: s };
          });
          let extent = d3.extent([...data.treasury_10yr, ...data.equities_sp]);
          console.log(extent, 'this is the extent of both datasets');
          setStocks(stk);
          setBonds(bnd);
        }
        fetchData();
  },[])
  //DEMONSTRATING DATA VISUALIZATION, creating random data
  function getRandomArbitrary(min, max) {
      return Math.random() * (max - min) + min;
  }

  const data = [];
  for (let i = 0; i < 21; i++) {
    data.push({ key: i, value: getRandomArbitrary(-.05,0.1) });
  }
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
        of two assets.
      </p>
      <p>
        {" "}
        You will decide how to <b>allocate a hypothetical investment</b> between
        the two assets as a percentage (0% to 100%).
      </p>
      <p>
        Your goal is to <b>maximize</b> your <b>expected return </b>
        given your allocation decision.
      </p>
      <p className={classes.emph}>Compensation for Study Completion:</p>
      <p>
        <ul>
          <li>
            If you complete the study, you will receive <b>$2.50</b>.
          </li>
          <li>
            You are eligible for <b>optional incentives of up to $1.20</b>{" "}
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
          <span className={classes.emph}>Rate of Return:</span> Net gain or loss
          by investing in an asset over an evaluation period (for example, 1 or
          30 years), expressed as a percentage of the investment’s initial cost.
        </li>
        <li>
          <span className={classes.emph}>Allocation:</span> Decision of how to
          apportion an investment between different assets. In this study, you
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
        Consider two investments: Asset A and Asset B. The two charts provide
        each asset's possible annualized returns over a
        <span className={classes.emph}> five (5) year evaluation period</span>.
      </p>
      {/*<p>*/}
      {/*  First use your mouse to hover on the chart. <br />*/}
      {/*  Click to select the line that best represents your belief. <br />*/}
      {/*  Then use the mouse to select the range of plusible alternatives that*/}
      {/*  represents how uncertain you are about your belief.*/}
      {/*</p>*/}
      {/*<span className={classes.highlight}>*/}
      {/*  {" "}*/}
      {/*  Use the interactive chart below for your decision*/}
      {/*</span>*/}
      <Grid container className={classes.root} spacing={1}>
        <Barchart data={bonds}></Barchart>
        {/* <Dotplot data={data}></Dotplot> */}
        <Barchart data={stocks}></Barchart>
      </Grid>
      {/*<BinaryChoice*/}
      {/*  choiceDomain={[0.0, 1.0]}*/}
      {/*  responseIndex={"instructions"}*/}
      {/*  // handleResponse={handleResponse}*/}
      {/*  question="What investment allocation do want between Asset A and B?"*/}
      {/*  tickLabels={["Asset A", "50% / 50%", "Asset B"]}*/}
      {/*></BinaryChoice>*/}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "10vh",
        }}
      >
        <p>
          Investment goal:{" "}
          <span className={classes.emph}> maximize annual rate of return </span>{" "}
          over a five (5) year evaluation period.
        </p>
        <p>Between 0% and 100%, how much do you want to allocate to Asset A?</p>
        <form className={classes.root} noValidate autoComplete="off">
          {/*<TextField id="standard-basic" error ={this.state.errorText.length === 0 ? false : true } label="Standard" />*/}
          <Input
            id="Practice1"
            type="number"
            placeholder="Asset A allocation %"
          ></Input>
          <Button variant="contained">Make Decision</Button>
        </form>
      </div>
      <hr />
      <h4>Another scenario:</h4>
      <p>
        {" "}
        Consider two different investments (Asset C and D) with possible annual
        rate of returns over a
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
        <Barchart data={data}></Barchart>
        <Barchart data={data}></Barchart>
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
          Investment goal:{" "}
          <span className={classes.emph}> maximize annual rate of return </span>
          over a twenty-five (25) year evaluation period.
        </p>
        <p>Between 0% and 100%, how much do you want to allocate to Asset C?</p>
        <form className={classes.root} noValidate autoComplete="off">
          <Input
            id="Practice2"
            type="number"
            placeholder="Asset A allocation %"
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
        <li>You will evaluate six scenarios.</li>
        <li>
          In each one, you will make two allocation decisions based on the
          assets' returns with an evaluation period of either 1 year or 30
          years.
        </li>
      </ul>
      <h4>Round 1</h4>
      <ul>
        <li> You'll evaluate a bar chart of the assets' returns.</li>
        <li>
          You'll have <b>two allocation decisions</b> for two assets' returns in
          either 1 year or 30 year evaluation period.
        </li>
        <li>For each task</li>
      </ul>
      <h4>Round 2</h4>
      <ul>
        <li>
          {" "}
          You'll evaluate a different data visualization of the assets' returns.
        </li>
        <li>
          Similar to Round 1, you'll also make <b>two allocation decisions</b>{" "}
          on two assets' returns in either 1 year or 30 year evaluation periods.
        </li>
      </ul>
      <h4>Round 3</h4>
      <ul>
        <li>
          {" "}
          You'll evaluate the same data visualization in Round 2 but under{" "}
          <b>four different scenarios</b>.
        </li>
        <li>
          In each scenario, you will be provided your goal time horizon and
          required rate of return.
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
