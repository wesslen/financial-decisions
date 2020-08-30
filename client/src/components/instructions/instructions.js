import React from "react";
import { Typography, Divider } from "@material-ui/core";
import { ConnectionStates } from "mongoose";
import Histogram from "../visualization/histogram/histogram";

const Instructions = (props) => {
  const data = [];
  for (let i = 0; i < 500; i++) {
    data.append({ value: Math.floor(Math.random() * 1000) });
  }
  return (
    <div
      style={{
        // textAlign: "center",
        width: "60%",
        margin: "0 auto",
      }}
    >
      <Typography variant="h5" align="center">
        Twitter Account{" "}
        <span style={{ fontWeight: "bold" }}>{props.accAlias}</span>
      </Typography>
      <div>{props.children}</div>
      <Histogram data={data}></Histogram>
      <Divider></Divider>
    </div>
  );
};

export default Instructions;
