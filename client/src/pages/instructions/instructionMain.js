import React from "react";
import axios from "axios";
import { Button, Container } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import BinaryChoice from "../../components/choice/binaryChoice";

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

  return (
    <Container maxWidth="lg" className={classes.instructContainer}>
      <h3>Study Instructions</h3>
      <h3>Please read carefully</h3>
      <p>
        The goal of this study is to understand the effect of <b>different data visualizations </b>
          on <b>investment financial decisions for retirement</b>.
      </p>
      <p>
        You will view different data visualizations that display possible <b>rates of return</b> on <b>investment
            assets</b>. In each of the 12 different tasks, you will view <b>data visualizations</b> for
          the <b>investment returns</b> for two assets. You will then make a decision
          on how you would <b>allocate a hypothetical investment for retirement</b> between the two
          different assets as a percentage (0% to 100%). Your goal is to <b>maximize</b> your <b>expected return </b>
          given your allocation decision.
      </p>
        <p>
            For completing the study, you will receive <b>$2.50</b>. You are eligible for <b>optional incentives of up to $1.20</b> depending on your
            decisions. For each task (i.e., allocation decision), a model will simulate hypothetical
            results. Your bonus will be dependent on your relative performance compared to others:
            top 10% receive $0.10, top 11-25% receive $0.05.
        </p>
      <p className={classes.emph}>
        Definitions:
      </p>
      <ul>
          <li>
          <span className={classes.emph}>Asset:</span> An economic resource with the
            expectation that it will provide a future benefit or returns (for example,
              individual stocks and bonds).
          </li>
          <li>
          <span className={classes.emph}>Rate of Return:</span> Net gain or loss
          by investing in an asset over an evaluation period (for example, 1 or 30 years),
              expressed as a percentage of the investment’s initial cost.
          </li>
          <li>
          <span className={classes.emph}>Allocation:</span> Decision of how to
              apportion an investment between different assets. In this study, you
              will provide you allocation percentage when presented with two different
              assets' rates of returns under different scenarios and data visualizations.
              This number will be a percentage between 0% and 100%.
        </li>
          <li>
          <span className={classes.emph}>Time Horizon:</span> The amount of time before
              you expect to retire. In this study, we may provide you with specified
              time horizons (e.g., decide an allocation with the expectation to retire
              in 1 or 30 years). You should make your decision based on this time horizon, not
              your own personal retirement decision.
        </li>
          <li>
          <span className={classes.emph}>Evaluation Period:</span> The relative timeframe in which
              the Rate of Returns are framed. In this study, we will provide returns as either 1 year
              or 30 year returns.
        </li>
      </ul>
      <p>
        {" "}
        Since, these subjects cannot always be rated with very high certainty,
        so we are using a method that allows you to state your beliefs about
        these concepts, while also stating how uncertain you are about your
        choice.
      </p>
      <hr />
      <p>So let's look at an example of a task</p>
      <p>
        In the animation below, a user is selecting their allocation decision given the returns provided.
          They determine to
      </p>
      <img
        src={process.env.PUBLIC_URL + "/uncertainty1.gif"}
        alt=""
        className={classes.image}
      />
      <p>
        In the next animation, we can see a user decides to alloca
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
        Imagine a scenario in which you are submiting your belief about
        how credible a source of news on Twitter is: <br />
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
        Use the figure below to make your decision
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
        Let's imagine you are assessing the credibility of another source of news
        on Twitter: <br />
        you believe that{" "}
        <span className={classes.emph}>the source is very Not Credible</span>,
        and you are
        <span className={classes.emph}> very uncertain</span> of your judgment.{" "}
        <br />
        <br />
        <span className={classes.highlight}>
          {" "}
          use the chart below to show your decision
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
      <h4>What will you go through in this study</h4>
      <ul>
        <li>You will evaluate 16 accounts</li>
        <li>
          Tweets from these accounts, include text, and might include images
        </li>
        <li>
          You will evaluate Credibility and Political Orientation of all 16
          accounts using the method we just discussed.
        </li>
        <li>
          For each account, we ask that you write in two text boxes, how the the
          text and images influenced your judgment. If the account had no
          images, you can type N/A in the respective box.
        </li>
      </ul>
      <h4>For each account</h4>
      <ul>
        <li>
          {" "}
          You will go through tweets one by one and evalute how Biased each
          tweet is.
        </li>
        <li>You can click on "View More Tweets" to see the next one.</li>
        <li>
          Whenever you feel like you have made your judgment about that account,
          click on "Make a decision"
        </li>
        <li>
          A popup will appear and you will answer the questions about each
          account
        </li>
      </ul>
      <h4>There are Two tasks</h4>
      <ul>
        <li>Task 1 includes 8 accounts. Tweets are about different topics.</li>
        <li>
          Task 2 include 8 other accounts. Tweets for each account are filtered
          to focus on tweets about specific identities.
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
