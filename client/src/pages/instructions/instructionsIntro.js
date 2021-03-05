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

const InstructionsIntro = (props) => {
  const history = useHistory();
  const classes = useStyles();

  const [bonds, setBonds] = useState([]);
  const [stocks, setStocks] = useState([]);
  const [extent, setExtent] = useState(null);
  const [evalPeriod, setEvalPeriod] = useState(null);
  const handleConsent = () => {
    history.push("/pre");
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


  return (
    <Container maxWidth="lg" className={classes.instructContainer}>
      <h3>Instructions</h3>
      <p>
        Welcome to this experiment!
      </p>
      <p>
        To optimize your experience, we highly recommend using Google Chrome on a desktop computer. Do not use a mobile device to take the experiment.
      </p>
      <p>
        {" "}
        Please maximize the browser window to your screen.
      </p>
      <p>
        Do not refresh your browser. If you do, you may have to restart the experiment.
      </p>
            <p>
        Please click Next to proceed to the Pre-questionnaire questions followed by the experiment instructions.
      </p>
      <img
        src={process.env.PUBLIC_URL + "/intro-table.png"}
        alt=""
        className={classes.image}
      />
      {/*<p>*/}
      {/*  In the next animation, the user decides to put their allocation near an*/}
      {/*  even mix of 50% and 50%.*/}
      {/*</p>*/}

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

export default InstructionsIntro;