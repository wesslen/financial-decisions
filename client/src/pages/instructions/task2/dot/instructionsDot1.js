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

const InstructionsDot1 = (props) => {
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
  

  return (
    <Container maxWidth="lg" className={classes.instructContainer}>
      <h3>Round 2 Instructions</h3>
      <ul>
        <li>
          You'll repeat the same task for new funds: C and D.
        </li>
        <li>
          However, in this round you view a quantile dot plot.
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
        {/*<Button*/}
        {/*  style={{ backgroundColor: "gray", color: "black" }}*/}
        {/*  variant="contained"*/}
        {/*  onClick={handleConsent}*/}
        {/*>*/}
        {/*  Continue*/}
        {/*</Button>*/}
      </div>
    </Container>
  );
};

export default InstructionsDot1;