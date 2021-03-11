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
import InstructionController from "../../components/instructions/task2instructionscontroller";

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
    overflowX: "hidden",
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
  const [evalIndex, setEvalIndex] = useState(0);

  const [loadingOpacity, setLoadingOpacity] = useState(0);
  const [pageOpacity, setPageOpacity] = useState(1);
  const [data, setData] = useState([]);
  const [allocation, setAllocation] = useState(null);
  // const [disabled, setDisabled] = useState(true);
  const [allocationText, setAllocationText] = useState("");
  const [left, setLeft] = useState("stocks");
  const [page, setPage] = useState(0);
  const [disabled, setDisabled] = useState(false);

  const [visType, setVisType] = useState("");

  // const handleClick = () => {
  //   history.push("/task2");
  // };

  const handleDisabled = () => {
    setDisabled(false);
  };

  const handleClick = () => {
    let newPage = page + 1;
    console.log(newPage);
    if (newPage < 2) {
      setPage(newPage);
      setDisabled(true);
    } else {
      history.push("/task2");
    }
  };

  useEffect(() => {
    async function fetchData() {
      const result = await axios.get("/api/changeround");
      const consent = evalIndex === 0 ? await axios.get("/api/consent") : null;
      const result2 = await axios.get("/api/data" + "?numsimulations=33");
      console.log(result2.data.treatment);
      setVisType(result2.data.treatment);
      // setVisType("point");
      //setVisType("table");
      let data = result2.data.data;

      // simulate

      const stks_sim1 = [];
      const bnds_sim1 = [];
      for (let i = 0; i < 41; i++) {
        stks_sim1.push({ key: i, value: getRandomArbitrary(-0.2, 0.2) });
        bnds_sim1.push({ key: i, value: getRandomArbitrary(-0.08, 0.08) });
      }

      let extent1 = d3.extent([
        ...stks_sim1.map((d) => d.value),
        ...bnds_sim1.map((d) => d.value),
      ]);
      let maxExtent1 = d3.max(extent1);

      extent1 = [-maxExtent1, maxExtent1];
      // console.log(extent1, "Asdasd");

      setExtent([-0.1, 0.1]);
      setEvalPeriod(1);
      setLoadingOpacity(0.8);
      setPageOpacity(0.2);
      // Just to create an illusion of loading so users know data has changed.
      setTimeout(() => {
        Math.random() < 0.5 ? setLeft("stocks") : setLeft("bonds");
        setAllocation(null);
        setAllocationText("");
        setStocks(stks_sim1);
        setBonds(bnds_sim1);
        setLoadingOpacity(0);
        setPageOpacity(1);
      }, 1000);
    }
    fetchData();
  }, []);
  //DEMONSTRATING DATA VISUALIZATION, creating random data
  function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
  }

  return (
    <Container maxWidth="lg">
      <InstructionController
        // title={evalIndex < 4 ? "A" : "B"}
        style={{ overflowX: "hidden" }}
        page={page}
        vizType={visType}
        stocks={stocks}
        bonds={bonds}
        setDisabled={handleDisabled}
      ></InstructionController>
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
      <hr></hr>
      <div
        style={{
          textAlign: "center",
          paddingTop: "10px",
          paddingBottom: "10px",
        }}
      >
        <Button
          style={{
            backgroundColor: disabled ? "lightgrey" : "gray",
            color: "black",
          }}
          variant="contained"
          onClick={handleClick}
          disabled={disabled}
        >
          Continue
        </Button>
      </div>
      {/*</div>*/}
    </Container>
  );
};

export default InstructionsTask2;
