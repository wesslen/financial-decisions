import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import * as Survey from "survey-react";
import "survey-react/survey.css";

Survey.StylesManager.applyTheme("darkblue");

const PreSurveyPage = (props) => {
  const history = useHistory();
  const json = {
    "pages": [
      {
        "questions": [
          {
            "type": "radiogroup",
            "name": "Grable2003_1",
            "title":
                "In addition to whatever you own, you have been given $1,000. You are now\n" +
                "asked to choose between:",
            "isRequired": false,
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
                "In addition to whatever you own, you have been given $2,000. You are now " +
                "asked to choose between:",
            "isRequired": false,
            "colCount": 2,
            "choices": [
              "A sure loss of $500",
              "A 50 percent chance to lose $1,000 and a 50 percent chance to gain nothing",
            ],
          },
          {
            "type": "radiogroup",
            "name": "Grable1999",
            "title": "If you had to invest $20,000, which of the following investment choices would you find most appealing?",
            "isRequired": false,
            "colCount": 1,
            "choices": [
                "60% in low-risk investments 30% in medium-risk investments 10% in high-risk investments",
                "30% in low-risk investments 40% in medium-risk investments 30% in high-risk investments",
                "10% in low-risk investments 40% in medium-risk investments 50% in high-risk investments",
            ]
          }
        ]
      },
      {
        "questions": [
          {
            "type": "matrix",
            "name": "Guillemette2012",
            "title":
                "Suppose you have saved $500,000 for retirement in a diversified portfolio. " +
                "       \n    " +
                "By what percentage could the total value of your retirement assets drop before " +
                "you would begin to think about selling your investments and going to cash?",
            "columns": [
              {
                value: 1,
                text: "Yes: You would think about selling your investments"
              },
              {
                value: 2,
                text: "No: You would not think about selling your investments"
              }
            ],
            "isRequired": false,
            "colCount": 2,
            "rows": [
              {
                value: "drop10",
                text: "A 10% drop (retirement assets drop $50,000 to a value of $450,000)",
              }, {
                value: "drop20",
                text: "A 20% drop (retirement assets drop $100,000 to a value of $400,000)",
              },               {
                value: "drop30",
                text: "A 30% drop (retirement assets drop $150,000 to a value of $350,000)",
              },               {
                value: "drop40",
                text: "A 40% drop (retirement assets drop $200,000 to a value of $300,000)",
              },               {
                value: "drop50",
                text: "A 50% drop (retirement assets drop $250,000 to a value of $250,000)",
              }
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
            "isRequired": false,
          },
          {
            "type": "matrix",
            "name": "MankiwZeldes1991",
            "title":
                "Suppose you are offered to choose between two investment opportunities. " +
                "Investment 1 you have a 50% chance of $100,000 and a 50% chance of $50,000." +
                "Under which scenarios would you instead an Investment 2 of:",
            "columns": [
              {
                value: 1,
                text: "Accept Investment 2 / Reject Investment 1"
              },
              {
                value: 2,
                text: "Reject Investment 2 / Accept Investment 2"
              }
            ],
            "isRequired": false,
            "colCount": 2,
            "rows": [
              {
                value: "crra1",
                text: "100% certainty of $70,711", // CRRA of 1; see http://karlshell.com/wp-content/uploads/2015/09/WebPage.pdf
              }, {
                value: "crra2",
                text: "100% certainty of $66,667", // CRRA of 2
              },               {
                value: "crra5",
                text: "100% certainty of $58,566", // CRRA of 5
              },               {
                value: "crra10",
                text: "100% certainty of $53,991", // CRRA of 10
              },               {
                value: "crra30",
                text: "100% certainty of $51,209", // CRRA of 30
              }
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
            "isRequired": false,
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
                "You are offered the " +
                "opportunity the same bet: flip a fair coin and if you guess " +
                "correctly you win $200 but if you guess incorrectly you lose $100. " +
                "Would you accept this bet 100 times?",
            "isRequired": false,
            "colCount": 2,
            "choices": [
              "Yes, I would accept the same bet 100 times.",
              "No, I would not accept the same bet 100 times.",
            ],
          },
        ]
      },
    ]
  };


  const onComplete = (survey, options) => {
    //Write survey results into database
    console.log("Survey results: " + JSON.stringify(survey.data));
    axios.post("/api/preq", survey.data).then((response) => {
      console.log(response);
      history.push("/instructions");
    });
  };
  //   console.log(props.setChoice);

  //   useEffect(() => {
  //     async function fetchData() {
  //       const result = await axios("/study/getData");
  //       // console.log(result.data);
  //       console.log(result.data);
  //     }

  //     fetchData();
  //   }, []);
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

export default PreSurveyPage;
