const csv = require("csvtojson");

// function getReturns() {
//   this.getReturns = async function (csvPath, columnName, n) {
//     const getObj = async () => {
//       return csv().fromFile(csvPath);
//     };
//     let jsonObj = await getObj();
//     jsonObj.forEach((obj) => {
//       Object.keys(obj).forEach(function (key) {
//         obj[key] = +obj[key];
//       });
//     });
//     // console.log(jsonObj);
//     const r = [];
//     let iter = 10;
//     for (var i = 0; i < iter; i++){
//       let returns = this.bootstrap(columnName, n, jsonObj);
//       // console.log(returns);
//       let product = returns.reduce((product, value) => {
//         return product * value;
//       }, 1);
//       let geomMean = Math.pow(product, 1 / returns.length);
//       r.push(geomMean - 1)
//     }
//
//     return {
//       // returns: returns,
//       value: r.sort(),
//     };
//   };
//
//   this.bootstrap = function (columnName, n, dataObj) {
//     let bootstrap = [];
//     // console.log(dataObj);
//     for (var i = 0; i < n; i++) {
//       let randomIndex = Math.floor(Math.random() * dataObj.length);
//       bootstrap.push(dataObj[randomIndex]);
//     }
//     return bootstrap.map(function (pick) {
//       return pick[columnName] + 1;
//     });
//   };
// }

function getReturns() {
  this.getReturns = async function (csvPath, columnName, n) {
    const getObj = async () => {
      // https://github.com/Keyang/node-csvtojson/issues/285#issuecomment-728295610
      const res = await fetch(csvPath);
      const text = await res.text();
      const jsonArray = await csv().fromString(text);
      console.log(jsonArray);
      return jsonArray;
      // return csv().fromFile(csvPath);  // problem: can't use fs via csv in node
    };

    let jsonObj = await getObj();
    jsonObj.forEach((obj) => {
      Object.keys(obj).forEach(function (key) {
        obj[key] = +obj[key];
      });
    });

    const r = [];
    let iter = 10;
    for (var i = 0; i < iter; i++){
      let returns = this.bootstrap(columnName, n, jsonObj);
      // console.log(returns);
      let product = returns.reduce((product, value) => {
        return product * value;
      }, 1);
      let geomMean = Math.pow(product, 1 / returns.length);
      r.push(geomMean - 1)

    }

    return {
      // returns: returns,
      value: r.sort(),
    };
  };

  this.bootstrap = function (columnName, n, dataObj) {
    let bootstrap = [];
    // console.log(dataObj);
    for (var i = 0; i < n; i++) {
      let randomIndex = Math.floor(Math.random() * dataObj.length);
      bootstrap.push(dataObj[randomIndex]);
    }
    return bootstrap.map(function (pick) {
      return pick[columnName] + 1;
    });
  };
}

let gr = new getReturns();
let returns = gr.getReturns("./returns.csv", "treasury_10yr", 10);
// // console.log(returns);
returns.then(console.log);
