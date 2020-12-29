import React from "react";
import { Typography, Divider } from "@material-ui/core";
import { ConnectionStates } from "mongoose";
import Histogram from "../visualization/histogram/histogram";


const Instructions = (props) => {

  return (
    <div
      style={{
        // textAlign: "center",
        width: "60%",
        margin: "0 auto",
      }}
    >
      <Typography variant="h5" align="center">
        Evaluation Period of {" "}
        <span style={{ fontWeight: "bold" }}>{props.evalPeriodIndex}</span>
          Years
      </Typography>
      <div>{props.children}</div>
      <Divider></Divider>
    </div>
  );
};

export default Instructions;
