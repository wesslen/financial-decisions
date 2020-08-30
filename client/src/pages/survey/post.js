import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import * as Survey from "survey-react";
import "survey-react/survey.css";

Survey.StylesManager.applyTheme("orange");

const PostSurveyPage = (props) => {
  const history = useHistory();
  const json = {
    elements: [
      {
        type: "radiogroup",
        name: "Guillemette2012",
        title:
          "Suppose you have saved $500,000 for retirement in a diversified portfolio. " +
            "By what percentage could the total value of your retirement assets drop before" +
            "you would begin to think about selling your investments and going to cash?",
        isRequired: true,
        colCount: 5,
        choices: [
          "A 10% drop (retirement assets drop $50,000 to a value of $450,000)",
          "A 20% drop (retirement assets drop $100,000 to a value of $400,000)",
          "A 30% drop (retirement assets drop $150,000 to a value of $350,000)",
          "A 40% drop (retirement assets drop $200,000 to a value of $300,000)",
          "A 50% drop (retirement assets drop $250,000 to a value of $250,000)",
        ],
      },
      {
        type: "radiogroup",
        name: "Grable2003_1",
        title:
          "In addition to whatever you own, you have been given $1,000. You are now\n" +
            "asked to choose between:",
        isRequired: true,
        colCount: 2,
        choices: [
          "A sure gain of $500",
          "A 50 percent chance to gain $1,000 and a 50 percent chance to gain nothing",
        ],
      },
      {
        type: "radiogroup",
        name: "Grable2003_2",
        title:
          "In addition to whatever you own, you have been given $1,000. You are now\n" +
            "asked to choose between:",
        isRequired: true,
        colCount: 2,
        choices: [
          "A sure gain of $500",
          "A 50 percent chance to lose $1,000 and a 50 percent chance to lose nothing",
        ],
      },
      {
        type: "radio",
        name: "emotions",
        isRequired: true,
        title:
          "Emotional state: This question consists of a number of words that describe different feelings and emotions. Read each item and then mark the appropriate answer in the space next to that word.\
        Indicate to what extent you have felt like this in the right now. Use the following scale to record your answers.",
        columns: [
          "Very slightly/Not at all",
          "A little",
          "Moderately",
          "Quite a bit",
          "Extremely",
        ],
        rows: [
          "Alert",
          "Ashamed",
          "Upset",
          "Nervous",
          "Determined",
          "Attentive",
          "Hostile",
          "Active",
          "Afraid",
          "Inspired",
        ],
      },
    ],
  };

  const onComplete = (survey, options) => {
    //Write survey results into database
    console.log("Survey results: " + JSON.stringify(survey.data));
    axios.post("/api/postq", survey.data).then((response) => {
      console.log(response);
      history.push("/study");
    });
  };

  const model = new Survey.Model(json);
  model.showCompletedPage = false;
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        margin: "0 auto",
        overflow: "auto",
        paddingTop: "30px",
        paddingBottm: "30px",
      }}
    >
      <Survey.Survey model={model} onComplete={onComplete} />
    </div>
  );
};

export default PostSurveyPage;
