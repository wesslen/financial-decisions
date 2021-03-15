const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const responseSchema = require("../models/response");
const randomstring = require("randomstring");
//experiment functions ef.choose(list), ef.getRandomInt; ef.shuffle(list);
const ef = require("../functions/experimenhtFunctions");
const getReturns = require("../functions/generateDataset");
const axios = require("axios");

// get returns
// const gr = new getReturns("task1");

const Response = mongoose.model("response", responseSchema);

router.post("/mid1", (req, res) => {
  // console.log(req.body);
  let usertoken = req.session.usertoken;
  Response.findOneAndUpdate(
    { usertoken: usertoken },
    { mid1: req.body },
    (err, doc) => {
      if (err) req.status(404).send(err);
      else res.json(req.body);
    }
  );
});

router.post("/mid2", (req, res) => {
  // console.log(req.body);
  let usertoken = req.session.usertoken;
  Response.findOneAndUpdate(
    { usertoken: usertoken },
    { mid2: req.body },
    (err, doc) => {
      if (err) req.status(404).send(err);
      else res.json(req.body);
    }
  );
});

router.get("/debrief", (req, res) => {
  let usertoken = req.session.usertoken;
  Response.findOneAndUpdate(
    { usertoken: usertoken },
    { endTime: Date.now() },
    (err, doc) => {
      if (err) req.status(404).send(err);
      if (req.session.completed) {
        res.status(200).json({ token: usertoken });
      } else {
        res.status(200).send({
          token: "you have skipped pages. Please complete the study first.",
        });
      }
    }
  );
});

router.get("/changeround", (req, res) => {
  console.log(req.session.round);
  req.session.round = 2;
  req.session.seed = "task2";
  // req.session.evalPeriods = getEvaluationPeriods();
  req.session.evalPeriodIndex = 0;
  console.log(req.session.round);
  res.status(200).send("changing to round 2");
});

router.get("/getincentives", (req, res) => {
  let usertoken = req.session.usertoken;
  Response.findOne({ usertoken: usertoken }, { responses: 1, _id: 0 }).then(
    (document) => {
      let responses = document.responses;
      let stockResponses = [];
      Object.keys(responses).forEach((roundKey) => {
        let round = responses[roundKey];
        Object.keys(round).forEach((respKey) => {
          let resp = round[respKey];
          let stockResponse =
            resp.left === "stocks" ? resp.allocationLeft : resp.allocationRight;
          // console.log(stockResponse);
          stockResponses.push(stockResponse);
        });
      });
      let stockResponsesString = JSON.stringify(stockResponses);
      axios
        .get(
          `https://rw-simulation.herokuapp.com/get_returns_array?stock_array=${stockResponsesString}`
        )
        .then((response) => {
          let incentives = response.data;
          Response.findOneAndUpdate(
            { usertoken: usertoken },
            { incentives: incentives },
            (err, doc) => {
              if (err) req.status(404).send(err);
              else res.status(200).json(incentives);
            }
          );
        })
        .catch((error) => {
          console.log(error);
          res.status(404).json([]);
        });
    }
  );
});

router.post("/preq", (req, res) => {
  // console.log(req.body);
  let usertoken = req.session.usertoken;
  req.session.completed = true;
  Response.findOneAndUpdate(
    { usertoken: usertoken },
    { prequestionnaire: req.body },
    (err, doc) => {
      if (err) req.status(404).send(err);
      else res.status(200).json(req.body);
    }
  );
});

router.post("/postq", (req, res) => {
  // console.log(req.body);
  let usertoken = req.session.usertoken;
  req.session.completed = true;
  Response.findOneAndUpdate(
    { usertoken: usertoken },
    { postquestionnaire: req.body },
    (err, doc) => {
      if (err) req.status(404).send(err);
      else res.status(200).json(req.body);
    }
  );
});

router.post("/attention1", (req, res) => {
  let usertoken = req.session.usertoken;
  Response.findOneAndUpdate(
    { usertoken: usertoken },
    { attention1: req.body },
    (err, doc) => {
      if (err) req.status(404).send(err);
      else res.status(200).json(req.body);
    }
  );
});

router.post("/learning1", (req, res) => {
  let usertoken = req.session.usertoken;
  Response.findOneAndUpdate(
    { usertoken: usertoken },
    { learning1: req.body },
    (err, doc) => {
      if (err) req.status(404).send(err);
      else res.status(200).json(req.body);
    }
  );
});

router.post("/incentives", (req, res) => {
  let usertoken = req.session.usertoken;
  Response.findOneAndUpdate(
    { usertoken: usertoken },
    { incentives: req.body, endTime: Date.now() },
    (err, doc) => {
      if (err) req.status(404).send(err);
      else res.status(200).json(req.body);
    }
  );
});

router.post("/response", (req, res) => {
  let usertoken = req.session.usertoken;
  let resp = req.body;
  let evalPeriod = req.session.evalPeriods[req.session.evalPeriodIndex];
  let round = req.session.round;
  resp["evalPeriod"] = evalPeriod;
  let response = {};
  // response[`responses.${round}.${evalPeriod}`] = resp;
  response[`responses.${round}.${req.session.evalPeriodIndex}`] = resp;
  Response.findOneAndUpdate({ usertoken: usertoken }, response, (err, doc) => {
    if (err) req.status(404).send(err);
    else {
      req.session.evalPeriodIndex++;
      res.status(200).json(req.session.evalPeriodIndex);
    }
  });
});

router.get("/data", (req, res) => {
  console.log(req.session.evalPeriods);
  console.log(req.session.evalPeriodIndex);
  console.log(req.query);
  let numSimulations = +req.query.numsimulations || 33;
  let evalPeriod = req.session.evalPeriods[req.session.evalPeriodIndex];

  // create if then statement for task1 vs task2

  let gr = new getReturns(req.session.seed); // modified
  let returns = gr.getReturns(evalPeriod, numSimulations);
  returns.then((result) => {
    res.json({
      data: result,
      evalPeriod: evalPeriod,
      treatment: req.session.treatment,
    });
  });
});

router.get("/consent", (req, res) => {
  if (!req.session.consent) {
    req.session.seed = "sample"; // examples for task 2 created by task1-example; actual uses "sample"
    let usertoken = randomstring.generate(8);
    req.session.usertoken = usertoken;
    req.session.evalPeriods = getEvaluationPeriods();
    req.session.evalPeriodIndex = 0;
    req.session.treatment = getTreatment();
    req.session.round = 1;
    let newResponse = new Response({
      usertoken: usertoken,
      evalPeriods: req.session.evalPeriods,
      treatment: req.session.treatment,
    });

    newResponse.save(function (err) {
      if (err) console.log(err);
      res.send({
        token: usertoken,
      });
    });
  } else {
    res.send({
      token: req.session.usertoken,
    });
  }
});

const getEvaluationPeriods = () => {
  let first = shuffle([1, 30]);
  let second = shuffle([5, 10, 15, 20, 25]);
  let allYears = [...first, ...second];
  return allYears;
};

const getTreatment = () => {
  let treatment = choose([
    "dotplot",
    "hops",
    "hopsdist",
    "point",
    "interval",
    "density",
    "table",
    "barchart",
  ]);
  return treatment;
};

function choose(choices) {
  var index = Math.floor(Math.random() * choices.length);
  return choices[index];
}

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

function shuffle(array) {
  var currentIndex = array.length,
    temporaryValue,
    randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}
// let r = gr.getReturns(0, 33);
// console.log(r);
// for (var i = 0; i < 10; i++) {
//   gr.getReturns(0, 33);
// }

module.exports = router;
