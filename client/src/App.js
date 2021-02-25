import React from "react";
import NavBar from "./components/nav/nav";
import Container from "@material-ui/core/Container";
import BottomNav from "./components/bottomNav/bottomNav";
import Task1 from "./pages/study/task1-new";
import Task2 from "./pages/study/task2-new";
import PreSurveyPage from "./pages/survey/pre";
import PostSurveyPage from "./pages/survey/post";
import MidSurvey1Page from "./pages/survey/mid1";
import MidSurvey2Page from "./pages/survey/mid2";
import ConsentPage from "./pages/consent/consent";
// import InstructionsMainPage from "./pages/instructions/instructionMain";
import InstructionsCaptcha from "./pages/instructions/instructionsCaptcha";
import Instructions1Page from "./pages/instructions/instructions1";
import Instructions2Page from "./pages/instructions/instructions2";
// import Instructions3Page from "./pages/instructions/instructions3";
import Instructions4Page from "./pages/instructions/instructions4";
import Instructions5Page from "./pages/instructions/instructions5";
import Instructions6Page from "./pages/instructions/instructions6";
// import Instructions7Page from "./pages/instructions/instructions7";
import Instructions8Page from "./pages/instructions/instructions8";
import InstructionsTask2 from "./pages/instructions/instructionsTask2";
import Debrief from "./pages/debrief/debrief";
import axios from "axios";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import "./App.css";

// const App = () => {
class App extends React.Component {
  state = {
    answerCount: 0,
    accIndex: null,
    evalPeriodIndex: 0,
  };

  // componentWillMount() {
  //   // axios.get("/consent");
  // }

  componentDidMount() {
    this.setState({ accIndex: 0 });
    this.setState({ personIndex: 0 });
  }

  setAnswerCount = (newValue) => {
    this.setState({ answerCount: newValue });
  };

  setAccIndex = (newValue) => {
    this.setState({ accIndex: newValue });
  };

  setPersonIndex = (newValue) => {
    this.setState({ personIndex: newValue });
  };

  render() {
    return (
      <div
        className="app"
        style={{
          height: "100%",
          // overflow: "auto",
          lineHeight: "150%",

          overflow: "hidden",
        }}
      >
        <Router>
          <NavBar height={"7%"} className="navBar"></NavBar>
          <Container
            style={{ height: "86%", margin: "0 auto", width: "100%" }}
            id="root-container"
          >
            <Switch>
              <Route
                exact
                path="/"
                render={() => {
                  return <Redirect to="/consent" />;
                }}
              />
              <Route path="/consent" component={ConsentPage}></Route>
              <Route path="/pre" component={PreSurveyPage}></Route>
              {/*<Route path="/instructions" component={InstructionsMainPage}></Route>*/}
              <Route
                path="/instructionsCaptcha"
                component={InstructionsCaptcha}
              ></Route>
              <Route
                path="/instructions1"
                component={Instructions1Page}
              ></Route>
              <Route
                path="/instructions2"
                component={Instructions2Page}
              ></Route>
              {/*<Route path="/instructions3" component={Instructions3Page}></Route>*/}
              <Route
                path="/instructions4"
                component={Instructions4Page}
              ></Route>
              <Route
                path="/instructions5"
                component={Instructions5Page}
              ></Route>
              <Route
                path="/instructions6"
                component={Instructions6Page}
              ></Route>
              {/*<Route*/}
              {/*  path="/instructions7"*/}
              {/*  component={Instructions7Page}*/}
              {/*></Route>*/}
              <Route
                path="/instructions8"
                component={Instructions8Page}
              ></Route>
              <Route path="/task1">
                <Task1></Task1>
              </Route>
              <Route path="/mid1" component={MidSurvey1Page}>

              </Route>
              <Route
                  path="/instructionsTask2"
                  component={InstructionsTask2}>
              </Route>
              <Route path="/task2">
                <Task2
                  // answerCount={this.state.answerCount}
                  // setAnswerCount={this.setAnswerCount}
                  // personIndex={this.state.personIndex}
                  // setPersonIndex={this.setPersonIndex}
                ></Task2>
              </Route>
                              <Route path="/mid2" component={MidSurvey2Page}>

              </Route>
              <Route path="/post" component={PostSurveyPage}></Route>
              <Route path="/debrief" component={Debrief}></Route>
            </Switch>
          </Container>
          <BottomNav height="7%"></BottomNav>
          <div className="tooltip"></div>
        </Router>
      </div>
    );
  }
}

// const Consent = () => {
//   return <p className="test">consent</p>;
// };

// const Pre = () => {
//   return <p className="test">Pre</p>;
// };

// const Post = () => {
//   return <p className="test">Post</p>;
// };

export default App;
