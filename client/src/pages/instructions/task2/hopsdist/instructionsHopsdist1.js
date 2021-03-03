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

import * as d3 from "d3";
import * as Survey from "survey-react";


Survey.StylesManager.applyTheme("darkblue");

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
    page: {
    height: "500px",
    width: "100%",
    margin: "20px",
  },
}));

const InstructionsHopsdist1 = (props) => {
  const history = useHistory();
  const classes = useStyles();


  const json = {
    questions: [
      {
        type: "radiogroup",
        name: "Hopsdist_Instruction2",
        title: "What does each line stand for?",
        isRequired: true,
        choices: [
          "Wrong answer 1",
          "Wrong answer 2",
          "Correct answer",
          "Wrong answer 3",
        ],
        correctAnswer: "Correct answer",
      },
    ],
  };

  const model = new Survey.Model(json);
  model.showCompletedPage = false;
  // model.showNavigationButtons = false;

  model.onValidateQuestion.add(function (s, options) {
   if (options.name == 'Hopsdist_Instruction2') {
       if(options.value != 'Correct answer') {
            options.error = "Your answer is not correct. Please try again.";
        }
    }
});

  const [page, setPage] = useState(0);

  const handlePage = () => {
    let newPage = page + 1;
    console.log(newPage);
    if (newPage < 4) {
      setPage(newPage);
    } else {
      history.push("/task2");
    }
  };
  //
  // const [bonds, setBonds] = useState([]);
  // const [stocks, setStocks] = useState([]);
  // const [extent, setExtent] = useState(null);
  // const [evalPeriod, setEvalPeriod] = useState(null);
  // const handleConsent = () => {
  //   history.push("/task2");
  // };

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
  

  return (
    <Container maxWidth="lg" className={classes.instructContainer}>
      <div style={{ height: "50%" }}>
        <div
          style={{ display: page === 0 ? "" : "none" }}
          className={classes.page}
        >
          <h3>Round 2 Instructions</h3>
          <ul>
            <li>You'll repeat the same task for new funds: C and D.</li>
            <li>However, now you will view a <b>hypothetical outcome plot</b> of the returns.</li>
            <li>
              Your goal is to maximize your expected returns over a thirty (30)
              year period.
            </li>
          </ul>
        </div>
        <div
          style={{ display: page === 1 ? "" : "none" }}
          className={classes.page}
        >
          <img
            src={process.env.PUBLIC_URL + "/barchart-instructions2.png"}
            //src={process.env.PUBLIC_URL + "/uncertainty2.gif"}
            alt=""
            style={{ width: 400 }}
            className={classes.image}
          />

                      <ul>
            <li>[Add in description and change this plot for HOPs with dist]</li>
          </ul>
        </div>


        <div
          style={{
            width: "100%",
            // height: "60%",
            margin: "0 auto",
            overflow: "auto",
            paddingTop: "30px",
            paddingBottom: "30px",
            display: page === 2 ? "" : "none",
          }}
          className={classes.page}
        >
          <Survey.Survey model={model} /> {/*onComplete={onComplete}*/}
        </div>
                                <div
          style={{ display: page === 3 ? "" : "none" }}
          className={classes.page}
        >
          <h3>Round 2 Instructions</h3>
          <ul>
            <li>Press Next to proceed to Round 2</li>
          </ul>
        </div>
      </div>
      <Button
        style={{ backgroundColor: "gray", color: "black" }}
        variant="contained"
        onClick={handlePage}
      >
        Next
      </Button>
    </Container>
  );
};

export default InstructionsHopsdist1;