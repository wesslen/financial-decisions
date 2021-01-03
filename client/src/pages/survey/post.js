import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import * as Survey from "survey-react";
import "survey-react/survey.css";

Survey.StylesManager.applyTheme("darkblue");

const PostSurveyPage = (props) => {
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
    ],
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
