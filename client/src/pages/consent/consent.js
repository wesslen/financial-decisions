import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Container } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";

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

const Consent = (props) => {
  const d = new Date();
  const history = useHistory();
  const handleConsent = () => {
    axios.get("/api/consent").then((result) => {
      //   console.log(result.data);
      history.push("/pre");
    });
  };
  const classes = useStyles();
  const [overflow, setOverflow] = useState(true);

  useEffect(() => {
    window.addEventListener("beforeprint", () => {
      setOverflow(false);
    });
    window.addEventListener("afterprint", () => {
      setOverflow(true);
    });
  }, []);

  return (
    <Container
      maxWidth="md"
      className={classes.instructContainer}
      id="consent-container"
    >
      <div style={{ textAlign: "center" }}>
        <img
          src={process.env.PUBLIC_URL + "/university.png"}
          height="120px"
        ></img>
      </div>
      <h1>Consent to Participate in a Research Study</h1>
      <p>
        <b>Title of Project:</b> Retirement Decision-Making with Interactive Data Visualizations
      </p>
      <p>
        <b>Principal investigator:</b> Ryan Wesslen, College of Computing and
        Informatics
      </p>
      <p>
        <b>Faculty Adviser:</b> Dr. Wenwen Dou, College of Computing and
        Informatics
      </p>
      <p>
        <b>Co-PIs:</b> Dr. Doug Markant (Department of Psychological Science),
        Alireza Karduni (College of Computing and Informatics)
      </p>

      <p>
        You are invited to participate in a research study. Participation in
        this research study is voluntary. The information provided on this form
        is to help you decide whether or not to participate.
      </p>

      <h2>Important Information You Need to Know</h2>
      <ul>
        <li>
          The goal of this study is to understand the effect of <b>different data visualizations </b>
          on <b>investment financial decisions for retirement</b>. You will view data visualizations of <b>investment rates of return</b>. In each of the 14 tasks, you will view data visualizations of
          the <b>rates of returns</b> for two assets. You will then decide
          how you would <b>allocate a hypothetical investment</b> for retirement between the two
           assets as a percentage (0% to 100%).
        </li>
        <li>
          We are asking individuals who are age 18 or older and fluent in
          English to participate. Participation will take approximately 10
          minutes in total.
        </li>
        <li>
          For completing the study, you will receive <b>$1.25</b>. You are eligible for <b>optional incentives of up to $1.40</b> depending on your
            decisions. For each task (i.e., allocation decision), a model will simulate hypothetical
            results. Your bonus will be dependent on your relative performance compared to all possible scenarios using
          historical data simulations.
        </li>
        <li>
          Please read this form in order to decide whether to participate in
          this research study.
        </li>
      </ul>

      <h2>Why are we doing this study?</h2>
      <p>
        The purpose of this study is to understand how different data visualizations
          may affect financial retirement decisions. You will be provided different
          simulated investment returns of different investable assets. You will then
          be asked to determine how much of investment funds you would allocate
          between the two assets in order to achieve the highest expected return.
          Please note that not all the details of this study are shared with you before the study.
          After you complete the study, we will explain in more detail information about the study.
      </p>

      <h2>Why are you being asked to be in this research study?</h2>
      <p>
        You are being asked to be in this study because you are age 18 and older
        and are fluent in English.
      </p>

      <h2>What will happen if I take part in this study?</h2>
      <p>
        If you choose to participate in this study, you will complete a
        computer-based task in which you will make decisions about h. After completing the task, you will be
        asked some questions about your experience as well as basic demographic
        questions (age, level of education, self-identified gender). Your total time
        commitment if you choose to participate will be approximately 10
        minutes.
      </p>

      <h2>What benefits might I experience?</h2>
      <p>
        You will not benefit directly from being in this study. The broader
        benefits of this research include improved scientific understanding of
        how to improve retirement investment decisions with interactive data visualizations.
      </p>

      <h2>What risks might I experience?</h2>
      <p>
        We will show you simulated investment returns based on
          popular asset prices. There is a small chance you may mistake
          these returns for true values and could incorrectly affect your
          own personal investment decisions. Please do not take the investment
          returns in this study as actual nor take any information from this study
          to affect your own personal financial decisions.
      </p>

      <h2>How will my information be protected?</h2>
      <p>
        Research data collected as part of this study will remain confidential
        to the fullest extent possible and will only be disclosed with your
        permission or as required by law. Identifiable information (Amazon
        Mechanical Turk IDs) will be stored separately from all other data
        collected during this study. Records of your responses during the task
        will be linked to identifiable data (your MTurk ID) only for payment
        purposes; your information will be permanently deleted when your payment
        is processed. Until that point any identifiable information will be
        stored in protected databases accessible only to the researchers or
        University administrators, on University-managed infrastructure.
      </p>

      <h2>How will my information be used after the study is over?</h2>
      <p>
        After the study is complete, study data may be shared with other
        researchers for use in other studies or as may be needed for publishing
        our results. The data we share will NOT include information that could
        identify you.
      </p>

      <h2>Will I receive an incentive for taking part in this study?</h2>
      <p>
        You will receive a minimum payment of $1.25 through Amazon Mechanical
        Turk upon completion of the study. In addition, you are eligible
        for additional incentives between $0.14 to $1.40. If you decide to withdraw from the
        study prior to completion you will not be eligible for payment.
      </p>

      <h2>What are my rights if I take part in this study?</h2>
      <p>
        It is up to you to decide to be in this research study. Participating in
        this study is voluntary. Even if you decide to be part of the study now,
        you may change your mind and stop at any time. You do not have to answer
        any questions you do not want to answer.
      </p>

      <h2>
        Who can answer my questions about this study and my rights as a
        participant?
      </h2>
      <p>
        For questions about this research, you may contact Ryan Wesslen
        (rwesslen@uncc.edu) and Dr. Wenwen Dou (wdou1@uncc.edu). If you have
        questions about your rights as a research participant, or wish to obtain
        information, ask questions, or discuss any concerns about this study
        with someone other than the researcher(s), please contact the Office of
        Research Protections and Integrity at 704-687-1871 or uncc-irb@uncc.edu.
      </p>

      <h2>Consent to Participate</h2>
      <p>
        By submitting this form you are agreeing to be in this study. Make sure
        you understand what the study is about before you submit. You may use
        the button below to download a PDF version of this form for your
        records. If you have any questions about the study after you submit this
        form, you can contact the study team using the information provided
        above.
      </p>

      <p>
        I understand what the study is about and my rights as a participant. I
        agree to take part in this study.
      </p>

      <p>
        <b>Date:</b>
        {d.toString()}
      </p>

      <Button
        style={{ backgroundColor: "lightgrey", color: "black" }}
        onClick={window.print}
      >
        <span></span> Print a copy of this page
      </Button>
      <hr />
      <div
        style={{
          textAlign: "center",
          paddingTop: "10px",
          paddingBottom: "10px",
        }}
      >
        <Button
          style={{ backgroundColor: "#1DA1F2", color: "black" }}
          variant="contained"
          onClick={handleConsent}
        >
          Give Consent
        </Button>
      </div>
    </Container>
  );
};

export default Consent;