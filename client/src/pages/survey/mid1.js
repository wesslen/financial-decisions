import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import * as Survey from "survey-react";
import "survey-react/survey.css";
import * as showdown from "showdown";

Survey.StylesManager.applyTheme("darkblue");

const MidSurvey1Page = (props) => {
  const history = useHistory();
  const json = {
    questions: [
      {
        type: "comment",
        name: "Mid1",
        title:
          "How did you use the charts to complete the task?" +
          " Please do your best to describe what sorts of visual properties you looked for and how you used them.",
        isRequired: true,
      },
    ],
  };

  const onComplete = (survey, options) => {
    //Write survey results into database
    console.log("Survey results: " + JSON.stringify(survey.data));
    axios.post("/api/mid1", survey.data).then((response) => {
      console.log(response);
      history.push("/InstructionsTask2");
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

export default MidSurvey1Page;
