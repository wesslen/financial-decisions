import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import * as Survey from "survey-react";
import "survey-react/survey.css";

Survey.StylesManager.applyTheme("darkblue");

const PreSurveyPage = (props) => {
  const history = useHistory();
  const json = {
    "questions": [
      {
        type: "radiogroup",
        name: "gender",
        title: "What is your gender?",
        isRequired: true,
        colCount: 1,
        choices: ["Female", "Male", "Other", "Prefer not to say"],
      },
      {
        type: "radiogroup",
        name: "race",
        title: "What is your race/ethnicity?",
        isRequired: true,
        hasNone: true,
        colCount: 2,
        choices: [
          "White/Caucasian/European",
          "African American/Black",
          "Native American",
          "Hispanic/Latino",
          "East Asian, e.g. Chinese, Japanese, South-East Asian",
          "Indian, Pakistani, Bangladeshi, or any other Asian",
          "Middle Eastern",
          "Pacific Islander",
          "Australian Aboriginal",
        ],
      },
      {
        type: "radiogroup",
        name: "education",
        title: "What is your highest level of education?",
        isRequired: true,
        colCount: 1,
        choices: [
          "High School",
          "Undergraduate",
          "Masters/Professional",
          "Doctorate",
          "Prefer not to say",
        ],
      },
      {
        name: "age",
        type: "text",
        inputType: "number",
        title: "What is your age?",
        isRequired: true,
      },
      {
        type: "radiogroup",
        name: "stocks",
        title: "Do you currently own any individual stocks, bonds, or funds (mutual funds or exchange-traded funds, ETFs)",
        isRequired: true,
        colCount: 1,
        choices: ["Yes", "No", "Prefer not to say"],
      },
    ],
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
