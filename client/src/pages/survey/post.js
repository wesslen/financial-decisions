import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import * as Survey from "survey-react";
import "survey-react/survey.css";

Survey.StylesManager.applyTheme("darkblue");

const PostSurveyPage = (props) => {
  const history = useHistory();
  let json;
  json = {
    "pages": [
      {
        "questions": [
          {
            "type": "radiogroup",
            "name": "Grable2003_1",
            "title":
                "In addition to whatever you own, you have been given $1,000. You are now\n" +
                "asked to choose between:",
            "isRequired": true,
            "colCount": 2,
            "choices": [
              "A sure gain of $500",
              "A 50 percent chance to gain $1,000 and a 50 percent chance to gain nothing",
            ],
          },
          {
            "type": "radiogroup",
            "name": "Grable2003_2",
            "title":
                "In addition to whatever you own, you have been given $1,000. You are now " +
                "asked to choose between:",
            "isRequired": true,
            "colCount": 2,
            "choices": [
              "A sure loss of $500",
              "A 50 percent chance to lose $1,000 and a 50 percent chance to lose nothing",
            ],
          },
        ]
      },
      {
        "questions": [
          {
            "type": "checkbox",
            "name": "Guillemette2012",
            "title":
                "Suppose you have saved $500,000 for retirement in a diversified portfolio.\n " +
                "By what percentage could the total value of your retirement assets drop before " +
                "you would begin to think about selling your investments and going to cash?",
            "isRequired": true,
            "colCount": 5,
            "choices": [
              "A 10% drop (retirement assets drop $50,000 to a value of $450,000)",
              "A 20% drop (retirement assets drop $100,000 to a value of $400,000)",
              "A 30% drop (retirement assets drop $150,000 to a value of $350,000)",
              "A 40% drop (retirement assets drop $200,000 to a value of $300,000)",
              "A 50% drop (retirement assets drop $250,000 to a value of $250,000)",
            ],
          },
        ]
      },
      {
        "questions": [
          {
            "type": "text",
            "name": "Guiso_2008",
            "title":
                "You are offered the " +
                "opportunity of acquiring a security permitting you, with the same " +
                "probability, either to gain $5,000 US dollars or to lose all the " +
                "capital invested. \n What is the most that you are prepared to pay for " +
                "this security?",
            "isRequired": true,
          },
          {
            "type": "checkbox",
            "name": "MankiwZeldes1991",
            "title":
                "Suppose you are offered to choose between two investment opportunities. " +
                "Investment 1 you have a 50% chance of $100,000 and a 50% chance of $50,000." +
                "Under which scenarios would you instead an Investment 2 of:",
            "isRequired": true,
            "colCount": 5,
            "choices": [
              "100% certainty of $70,711", // CRRA of 1; see http://karlshell.com/wp-content/uploads/2015/09/WebPage.pdf
              "100% certainty of $66,667", // CRRA of 2
              "100% certainty of $58,566", // CRRA of 5
              "100% certainty of $53,991", // CRRA of 10
              "100% certainty of $51,209", // CRRA of 30
            ],
          },
          {
            "type": "radio",
            "name": "emotions",
            "isRequired": true,
            "title":
                "Emotional state: This question consists of a number of words that describe different feelings and emotions. Read each item and then mark the appropriate answer in the space next to that word.\
              Indicate to what extent you have felt like this in the right now. Use the following scale to record your answers.",
            "columns": [
              "Very slightly/Not at all",
              "A little",
              "Moderately",
              "Quite a bit",
              "Extremely",
            ],
            "rows": [
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
        ]
      },
      {
        "questions": [
          {
            "type": "radiogroup",
            "name": "Samuelson_Classic1",
            "title":
                "We would like to ask you a hypothetical question that we would like you " +
                "to answer as if the situation was a real one. \n You are offered the " +
                "opportunity to accept the following bet: flip a fair coin and if you guess " +
                "correctly you win $200 but if you guess incorrectly you lose $100. " +
                "Would you accept this bet?",
            "isRequired": true,
            "colCount": 2,
            "choices": [
              "Yes, I would accept the bet.",
              "No, I would not accept the bet.",
            ],
          },
          {
            "type": "radiogroup",
            "name": "Samuelson_Classic100",
            "title":
                "We would like to ask you a hypothetical question that we would like you " +
                "to answer as if the situation was a real one. \n You are offered the " +
                "opportunity to accept the following bet: flip a fair coin and if you guess " +
                "correctly you win $200 but if you guess incorrectly you lose $100. " +
                "Would you accept this bet 100 times?",
            "isRequired": true,
            "colCount": 2,
            "choices": [
              "Yes, I would accept the same bet 100 times.",
              "No, I would not accept the same bet 100 times.",
            ],
          },
        ]
      },
      {
        "questions": [
          {
            type: "rating",
            name: "satisfaction",
            title: "How satisfied are you with the study?",
            minRateDescription: "Not Satisfied",
            maxRateDescription: "Completely satisfied"
          },
          {
            "type": "comment",
            "name": "suggestions",
            "title": "Do you have any feedback on the study?"
          },
        ]
      }
    ]
  };

  const onComplete = (survey, options) => {
    //Write survey results into database
    console.log("Survey results: " + JSON.stringify(survey.data));
    axios.post("/api/postq", survey.data).then((response) => {
      console.log(response);
      history.push("/debrief");
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
        paddingBottom: "30px",
      }}
    >
      <Survey.Survey model={model} onComplete={onComplete} />
    </div>
  );
};

export default PostSurveyPage;
