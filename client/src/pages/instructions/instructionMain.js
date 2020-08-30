import React from "react";
import axios from "axios";
import { Button, Container } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import BinaryChoice from "../../components/choice/binaryChoice";
import Histogram from "../../components/visualization/histogram/histogram";

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
  const handleConsent = () => {
    history.push("/task1");
    // axios.get("/consent").then((result) => {
    //   //   console.log(result.data);

    // });
  };
  //DEMONSTRATING DATA VISUALIZATION, creating random data
  const data = [];
  for (let i = 0; i < 500; i++) {
    data.push({ value: Math.floor(Math.random() * 1000) });
  }

  return (
    <Container maxWidth="lg" className={classes.instructContainer}>
      <h3>Study Instructions</h3>
      <h3>Please read carefully</h3>
      <p>
        The goal of this study is to understand the effect of{" "}
        <b>different data visualizations </b>
        on <b>investment financial decisions for retirement</b>.
      </p>
      <p>
        You will view data visualizations of <b>investment rates of return</b>.
        In each of the 12 tasks, you will view data visualizations of the{" "}
        <b>rates of returns</b> for two assets. You will then decide how you
        would <b>allocate a hypothetical investment</b> for retirement between
        the two assets as a percentage (0% to 100%).
      </p>
      <p>
        Your goal is to <b>maximize</b> your <b>expected return </b>
        given your allocation decision.
      </p>
      <p>
        For completing the study, you will receive <b>$2.50</b>. You are
        eligible for <b>optional incentives of up to $1.20</b> depending on your
        decisions. For each task (i.e., allocation decision), a model will
        simulate hypothetical results. Your bonus will be dependent on your
        relative performance compared to others: top 10% receive $0.10, top
        11-25% receive $0.05.
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
          will provide returns as either 1 year or 30 year returns.
        </li>
      </ul>
      {/*<p>*/}
      {/*  {" "}*/}
      {/*  Since, these subjects cannot always be rated with very high certainty,*/}
      {/*  so we are using a method that allows you to state your beliefs about*/}
      {/*  these concepts, while also stating how uncertain you are about your*/}
      {/*  choice.*/}
      {/*</p>*/}
      <hr />
      <p>Let's consider an example:</p>
      <p>
        In the animation below, a user is selecting their allocation decision
        given the returns provided. They determine to put more of their
        investment into Asset B than Asset A.
      </p>
      <img
        src={process.env.PUBLIC_URL + "/uncertainty1.gif"}
        alt=""
        className={classes.image}
      />
      <p>
        In the next animation, the user decides to put their allocation near an
        even mix of 50% and 50%.
      </p>
      <img
        src={process.env.PUBLIC_URL + "/uncertainty2.gif"}
        alt=""
        className={classes.image}
      />
      <hr />
      <h4>Let's practice:</h4>
      <p>
        {" "}
        Imagine a scenario in which you are submiting your belief about how
        credible a source of news on Twitter is: <br />
        Assume you believe that{" "}
        <span className={classes.emph}> the source is very Credible</span>, and
        you are
        <span className={classes.emph}> very certain</span> of your decision.
      </p>
      <p>
        First use your mouse to hover on the chart. <br />
        Click to select the line that best represents your belief. <br />
        Then use the mouse to select the range of plusible alternatives that
        represents how uncertain you are about your belief.
      </p>
      <span className={classes.highlight}>
        {" "}
        Use the interactive chart below for your decision
      </span>
      :
      <BinaryChoice
        choiceDomain={[0.0, 1.0]}
        responseIndex={"instructions"}
        // handleResponse={handleResponse}
        question="What investment allocation do want between Asset A and B?"
        tickLabels={["Asset A", "50% / 50%", "Asset B"]}
      ></BinaryChoice>
      <hr />
      <h4>Another scenario:</h4>
      <p>
        {" "}
        Let's imagine you are assessing the credibility of another source of
        news on Twitter: <br />
        you believe that{" "}
        <span className={classes.emph}>the source is very Not Credible</span>,
        and you are
        <span className={classes.emph}> very uncertain</span> of your judgment.{" "}
        <br />
        <br />
        <span className={classes.highlight}>
          {" "}
          Use the interactive chart below for your decision.
        </span>
      </p>
      <BinaryChoice
        choiceDomain={[0.0, 1.0]}
        responseIndex={"instructions"}
        // handleResponse={handleResponse}
        question="What investment allocation do want between Asset A and B?"
        tickLabels={["Asset A", "50% / 50%", "Asset B"]}
      ></BinaryChoice>
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
        <li> You'll evaluate a histogram of the assets' returns.</li>
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
      <Histogram data={data}></Histogram>
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
