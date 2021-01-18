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
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
import * as Survey from "survey-react";
import "survey-react/survey.css";

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
}));

const Instructions4 = (props) => {
  const history = useHistory();
  const classes = useStyles();

  const json = {
    title: "Comprehension Questions",
      "questions": [
          {
            "type": "radiogroup",
            "name": "learning1",
            "title":
                "In this study, how many years in the future are you investing for retirement?",
            "isRequired": true,
            "colCount": 5,
            "choices": [
              "1 year",
              "10 years",
              "20 years",
              "30 years",
              "50 years"
            ],
            "correctAnswer": "30 years"
          },
          {
            "type": "radiogroup",
            "name": "learning2",
            "title":
                "For each task, your role is to choose:",
            "isRequired": true,
            "colCount": 1,
            "choices": [
              "which fund is the least risky",
              "the amount of income to invest for retirement",
              "how to divide your retirement investment between two funds",
              "the interest rate to save for retirement"
            ],
            "correctAnswer": "how to divide your retirement investment between two funds"
          },
          {
            "type": "radiogroup",
            "name": "learning3",
            "title": "How do you receive additional incentives in this study?",
            "isRequired": true,
            "colCount": 1,
            "choices": [
                "Your decisions lead to better simulated results",
                "You complete the study as quickly as possible",
                "You fail to complete the post-questionnaire",
                "You interact more with the visualizations (e.g., click on it)"
            ],
            "correctAnswer": "Your decisions lead to better simulated results"
          }
        ]
  };


  const onComplete = (survey, options) => {
    //Write survey results into database
    let response = { learning1: {survey: survey.data, time: Date.now() }};
    // console.log("Survey results: " + JSON.stringify(survey.data));
    axios.post("/api/learning1", response).then((response) => {
      console.log(response);
      history.push("/instructions5");
    });
  };

  const model = new Survey.Model(json);
  model.showCompletedPage = false;

  model.onValidateQuestion.add(function (s, options) {
   if (options.name == 'learning1') {
       if(options.value != '30 years') {
            options.error = "#1 is not correct. Please give another answer";
        }
    }
   else if (options.name == 'learning2') {
       if(options.value != 'how to divide your retirement investment between two funds') {
            options.error = "#2 is not correct. Please give another answer";
        }
    }
   else if (options.name == 'learning3') {
       if(options.value != 'Your decisions lead to better simulated results') {
            options.error = "#3 is not correct. Please give another answer";
        }
    }
});

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        margin: "0 auto",
        overflow: "auto",
        paddingTop: "30px",
        paddingBottom: "30px",
      }}
    >
      <Survey.Survey model={model} onComplete={onComplete} />
    </div>
  );
};

export default Instructions4;