import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import * as Survey from "survey-react";
import "survey-react/survey.css";
import * as showdown from "showdown";

Survey.StylesManager.applyTheme("darkblue");

const PreSurveyPage = (props) => {
  const history = useHistory();
  const json = {
    pages: [
      {
        questions: [
          {
            type: "radiogroup",
            name: "Samuelson_Classic1",
            title:
              "You are offered the " +
              "opportunity to accept the following bet: <br/> Flip a fair coin and if you guess " +
              "correctly you win $200 but if you guess incorrectly you lose $100. " +
              "<br/> Would you accept this bet once?",
            isRequired: true,
            colCount: 2,
            choices: [
              "Yes, I would accept the bet.",
              "No, I would not accept the bet.",
            ],
          },
          {
            type: "radiogroup",
            name: "Samuelson_Classic100",
            title:
              "You are offered the same bet from #1: " +
              "would you accept this bet 100 times?",
            isRequired: true,
            colCount: 2,
            choices: [
              "Yes, I would accept the same bet 100 times.",
              "No, I would not accept the same bet 100 times.",
            ],
          },
        ],
      },
      {
        questions: [
          {
            type: "radiogroup",
            name: "Kahneman_1979_Gain",
            title:
              "In addition to whatever you own, you have been given $1,000. " +
              "<br/> You are now asked to choose between:",
            isRequired: true,
            colCount: 2,
            choices: [
              "A sure gain of $500",
              "A 50 percent chance to gain $1,000 and a 50 percent chance to gain nothing",
            ],
          },
          {
            type: "radiogroup",
            name: "Kahneman_1979_Loss",
            title:
              "In addition to whatever you own, you have been given $2,000. <br/> You are now " +
              "asked to choose between:",
            isRequired: true,
            colCount: 2,
            choices: [
              "A sure loss of $500",
              "A 50 percent chance to lose $1,000 and a 50 percent chance to gain nothing",
            ],
          },
          // {
          //   "type": "radiogroup",
          //   "name": "Grable1999",
          //   "title": "If you had to invest $20,000, which of the following investment choices would you find most appealing?",
          //   "isRequired": false,
          //   "colCount": 1,
          //   "choices": [
          //       "60% in low-risk investments 30% in medium-risk investments 10% in high-risk investments",
          //       "30% in low-risk investments 40% in medium-risk investments 30% in high-risk investments",
          //       "10% in low-risk investments 40% in medium-risk investments 50% in high-risk investments",
          //   ]
          // }
        ],
      },
      // {
      //   "questions": [
      //     {
      //       "type": "matrix",
      //       "name": "Guillemette2012",
      //       "title":
      //           "Suppose you have saved $500,000 for retirement in a diversified portfolio. " +
      //           "       \n    " +
      //           "By what percentage could the total value of your retirement assets drop before " +
      //           "you would begin to think about selling your investments and going to cash?",
      //       "columns": [
      //         {
      //           value: 1,
      //           text: "Yes: You would think about selling your investments"
      //         },
      //         {
      //           value: 2,
      //           text: "No: You would not think about selling your investments"
      //         }
      //       ],
      //       "isRequired": false,
      //       "colCount": 2,
      //       "rows": [
      //         {
      //           value: "drop10",
      //           text: "A 10% drop (retirement assets drop $50,000 to a value of $450,000)",
      //         }, {
      //           value: "drop20",
      //           text: "A 20% drop (retirement assets drop $100,000 to a value of $400,000)",
      //         },               {
      //           value: "drop30",
      //           text: "A 30% drop (retirement assets drop $150,000 to a value of $350,000)",
      //         },               {
      //           value: "drop40",
      //           text: "A 40% drop (retirement assets drop $200,000 to a value of $300,000)",
      //         },               {
      //           value: "drop50",
      //           text: "A 50% drop (retirement assets drop $250,000 to a value of $250,000)",
      //         }
      //       ],
      //     },
      //   ]
      // },
      {
        questions: [
          // {
          //   "type": "text",
          //   "name": "Guiso_2008",
          //   "title":
          //       "You are offered the " +
          //       "opportunity of acquiring a security permitting you, with the same " +
          //       "probability, either to gain $5,000 US dollars or to lose all the " +
          //       "capital invested. \n What is the most that you are prepared to pay for " +
          //       "this security?",
          //   "isRequired": false,
          // },
          {
            type: "matrix",
            name: "MankiwZeldes1991",
            title:
              "Suppose you are offered to choose between two investment opportunities under seven different scenarios.",
            columns: ["Investment A", "Investment B"],
            "isRequired": true,
            colCount: 2,
            rows: [
              {
                value: "crra_75k",
                text: "Scenario 1:", // CRRA of 30
              },
              {
                value: "crra1",
                text: "Scenario 2:", // CRRA of 1; see http://karlshell.com/wp-content/uploads/2015/09/WebPage.pdf
              },
              {
                value: "crra2",
                text: "Scenario 3:", // CRRA of 2
              },
              {
                value: "crra5",
                text: "Scenario 4:", // CRRA of 5
              },
              {
                value: "crra10",
                text: "Scenario 5:", // CRRA of 10
              },
              {
                value: "crra30",
                text: "Scenario 6:", // CRRA of 30
              },
              {
                value: "crra_50k",
                text: "Scenario 7:", // CRRA of 30
              },
            ],
            cells: {
              crra_75k: {
                "Investment A":
                  "50% chance of $100,000 and a 50% chance of $50,000",
                "Investment B": "100% certainty of $75,000", // dummies
              },
              crra1: {
                "Investment A":
                  "50% chance of $100,000 and a 50% chance of $50,000",
                "Investment B": "100% certainty of $70,711", // CRRA of 1; see http://karlshell.com/wp-content/uploads/2015/09/WebPage.pdf
              },
              crra2: {
                "Investment A":
                  "50% chance of $100,000 and a 50% chance of $50,000",
                "Investment B": "100% certainty of $66,667", // CRRA of 2
              },
              crra5: {
                "Investment A":
                  "50% chance of $100,000 and a 50% chance of $50,000",
                "Investment B": "100% certainty of $58,566", // CRRA of 5
              },
              crra10: {
                "Investment A":
                  "50% chance of $100,000 and a 50% chance of $50,000",
                "Investment B": "100% certainty of $53,991", // CRRA of 10
              },
              crra30: {
                "Investment A":
                  "50% chance of $100,000 and a 50% chance of $50,000",
                "Investment B": "100% certainty of $51,209", // CRRA of 30
              },
              crra_50k: {
                "Investment A":
                  "50% chance of $100,000 and a 50% chance of $50,000",
                "Investment B": "100% certainty of $50,000", // dummies
              },
            },
          },
        ],
      },
    ],
  };

  const onComplete = (survey, options) => {
    //Write survey results into database
    console.log("Survey results: " + JSON.stringify(survey.data));
    axios.post("/api/preq", survey.data).then((response) => {
      console.log(response);
      history.push("/instructionsCaptcha");
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

  //Create showdown markdown converter
  var converter = new showdown.Converter();
  model.onTextMarkdown.add(function (survey, options) {
    //convert the markdown text to html
    var str = converter.makeHtml(options.text);
    //remove root paragraphs <p></p>
    str = str.substring(3);
    str = str.substring(0, str.length - 4);
    //set html
    options.html = str;
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

export default PreSurveyPage;
