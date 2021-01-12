const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const responseSchema = require("../models/response");
const randomstring = require("randomstring");
// const getReturns = require('../../public/generateDataset');
const getReturns = require("../functions/generateDataset");

//experiment functions ef.choose(list), ef.getRandomInt; ef.shuffle(list);
const ef = require("../functions/experimenhtFunctions");
// get returns
const gr = new getReturns("task1");

const Response = mongoose.model("response", responseSchema);

router.post("/preq", (req, res) => {
  // console.log(req.body);
  let usertoken = req.session.usertoken;
  Response.findOneAndUpdate(
    { usertoken: usertoken },
    { prequestionnaire: req.body },
    (err, doc) => {
      if (err) req.status(404).send(err);
      else res.json(req.body);
    }
  );
});

router.get("/debrief", (req, res) => {
  if (req.session.completed) {
    res.status(200).json({ token: req.session.usertoken });
  } else {
    res.status(200).send({
      token: "you have skiped pages. Please complete the study first.",
    });
  }
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
router.post("/response", (req, res) => {
  let usertoken = req.session.usertoken;
  let resp = req.body;
  let evalPeriod = req.session.evalPeriods[req.session.evalPeriodIndex];
  resp["evalPeriod"] = evalPeriod;
  let response = {};
  console.log(resp);
  response[`responses.${evalPeriod}`] = resp;
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
  let evalPeriod = req.session.evalPeriods[req.session.evalPeriodIndex];
  let returns = gr.getReturns(evalPeriod, 33);
  returns.then((result) => {
    res.json({ data: result, evalPeriod: evalPeriod });
  });
});

router.get("/consent", (req, res) => {
  if (!req.session.consent) {
    let usertoken = randomstring.generate(8);
    req.session.usertoken = usertoken;
    req.session.evalPeriods = getEvaluationPeriods();
    req.session.evalPeriodIndex = 0;
    req.session.treatment = getTreatment();

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
    "hops1",
    "hops2",
    "cdf",
    "text",
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

module.exports = router;
