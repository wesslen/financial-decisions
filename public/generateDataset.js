const csv = require("csvtojson");
const path = require("path");
const fs = require('fs');
const seedrandom = require('seedrandom');
const gmean = require("gmean");


function getReturns(seed) {
  console.log(seed);
  var rng = seedrandom(seed);
  this.getReturns = async function ( n_bootstrap,n_simul) {
    
    // make sure the csv file is in the same folder.
    let csvPath = path.join(__dirname, "returns.csv");
    const getObj = async () => {
      return csv().fromFile(csvPath);
    };

    let jsonObj = await getObj();

    jsonObj.forEach((obj) => {
      Object.keys(obj).forEach(function (key) {
        obj[key] = +obj[key];
      });
    });

    const r = {
      equities_sp: [],
      treasury_10yr:[]
    };
    let iter = n_simul;
      for (var i = 0; i < iter; i++){
        let returns = this.bootstrap( n_bootstrap, jsonObj);
        Object.keys(r).forEach((returnColumn)=>{
          let rColumn = returns.map((f)=>f[returnColumn]+1)

          let geomMean = gmean(rColumn);
          r[returnColumn].push(geomMean - 1)
        })
    }

    return r;
  };

  this.bootstrap = function ( n, dataObj) {
    let bootstrap = [];
    for (var i = 0; i < n; i++) {
      let randomIndex = Math.floor(rng() * dataObj.length);
      bootstrap.push(dataObj[randomIndex]);
    }
    return bootstrap;
  };
}
// let gr = new getReturns();
// let returns = gr.getReturns(path.join(__dirname,"returns.csv"), 1 , 10);

// returns.then(console.log);

module.exports = getReturns;
