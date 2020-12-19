/*
 * REUSABLE CHART COMPONENTS
 * https://gist.github.com/fmnguyen/06b64e15852ec7c2d9cf51181ccdeb00
 * likely better to use: https://observablehq.com/@ale0xb/quantile-dotplots
 */
function quantileDotplot() {

  var margin = { 'top': 10, 'right': 40, 'left': 10, 'bottom': 20 },
    width = 500,
    height = 200,
    svg,
    chartWrapper,
    data,
    partitionWidth = 1,
    nDots = 20,
    xBins,
    yExtent,
    x0,
    x,
    y,
    xAxis,
    yAxis,
    dotRadius,
    selection;

  function chart(selection) {
    this.selection = selection
    var that = this;
    selection.each(function(data, i) {
      init(data, that);
    })
  }

  function init(data, that) {
    // initialize our x, y scales, x and y axis and initial svg and wrapper for our chart
    svg = that.selection;

    // if there is no selection, create a wrapper for our chart
    if(svg.select('g').empty()) {
      chartWrapper = svg.append('g')
      chartWrapper.append('g').attr('class', 'x axis');
      chartWrapper.append('g').attr('class', 'y axis');
    } else {
      chartWrapper = svg.select('g')
    }

    chart.render(data);
  }

  chart.render = function(data) {
    // format the distribution parameters as points for a quantile dotplot
    console.log('before',data);
    data = formatDataFromParams(data);
    console.log('after',data);
    // use the updated margins with the current parent width
    updateDimensions(svg.node().parentNode.getBoundingClientRect().width)
    // update axes and scaling
    setAxesScales(data);

    // then continue rendering the chart
    x0.range([0, width]);
    x.range([0, width]);
    y.range([height, 0]);
    dotRadius = Math.abs(y(1.0 / nDots) - y(0)) / 2; // half the height of one dot

    // change tick values based on data
    yTicksN = 6;
    yTickVals = Array.apply(null, {length: yTicksN + 1}).map(function(val, idx){ return idx; }).map(function(elem) {
      return yExtent[1] * elem / yTicksN;
    });
    yAxis.scale(y)
      .ticks(yTicksN)
      .tickSize(4)
      .tickValues(yTickVals)
      .tickPadding(7);
    xTicksN = 10;
    xTickVals = Array.apply(null, {length: xTicksN + 1}).map(function(val, idx){ return idx; }).map(function(elem) {
      return (xBins[xBins.length - 1] - xBins[0]) * elem / xTicksN + xBins[0];
    });
    xAxis.scale(x)
      .ticks(xTicksN)
      .tickSize(4)
      .tickValues(xTickVals)
      .tickPadding(7);

    // set svg and chartWrapper dimensions
    svg.attr('width', width + margin.right + margin.left)
      .attr('height', height + margin.top + margin.bottom + 20);
    chartWrapper.attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

    // create and translate the y axis
    svg.select('.y.axis')
      .attr('transform', 'translate(' + width + ', 0)')
        .call(yAxis);

    // create and translate the x axis
    svg.select('.x.axis')
      .attr('transform', 'translate(0,' + height + ')')
      .call(xAxis);

    // now, update and edit the bar charts
    var dot = chartWrapper.selectAll('.g-dot')
      .data(data);

    // enter set
    dot.enter().append('circle')
      .attr('class', 'g-dot')
        .attr("cx", function(d) {
          return x0(d.bin);
        })
        .attr("cy", function(d) {
            return y(0) - d.idx * 2 * dotRadius - dotRadius; })
        .attr("r", 0)
        .transition()
          .duration(500)
          .attr("r", function(d) {
          return (d.length==0) ? 0 : dotRadius; });

    // update set
    dot.attr("cx", function(d) {
      return x0(d.bin);
    })
    .attr("cy", function(d) {
        return y(0) - d.idx * 2 * dotRadius - dotRadius; })
    .attr("r", 0)
    .transition()
      .duration(500)
      .attr("r", function(d) {
      return (d.length==0) ? 0 : dotRadius; });

    // exit set
    dot.exit()
      .transition()
        .duration(1000)
        .attr("r", 0)
        .remove();
  }

  // format data for quantile dotplots from distribution parameters
  function formatDataFromParams(data) {
    // determine x values in which to bin dots
    var distMin = Math.floor(jStat.normal.inv(0.001, data.m, data.sd)),
      distMax = Math.ceil(jStat.normal.inv(0.999, data.m, data.sd)),
      partitionMidpoints = [];
    for (var i = distMin; i <= distMax; i += partitionWidth) {
      partitionMidpoints.push(i - partitionWidth / 2);
    }
    // generate nDots points to display based on distribution parameters
    var plotData = [],
      lastBin = partitionMidpoints[0] - 1, // dummy value
      countInBin = 0;
    for (var i = 0; i < 1; i += (1.0 / nDots)) {
      // get distribution value at this quantile and corresponding bin
      var rawValue = jStat.normal.inv(i, data.m, data.sd),
        binMidpoint = partitionMidpoints.reduce(function(closest, curr) {
          // find and return the partition midpoint which is closest to the raw value
          // of the distribution at this quantile (this might not be the right way to bin points)
          if (Math.abs(closest - rawValue) > Math.abs(curr - rawValue)) {
            return curr;
          } else {
            return closest;
          }
        });
      // how many dots in this bin?
      if (binMidpoint === lastBin) {
        countInBin++;
      } else {
        countInBin = 0;
      }
      plotData.push({
        'quantile': i,
        'value': rawValue,
        'bin': binMidpoint,
        'idx': countInBin
      });
      lastBin = binMidpoint;
    }
    return plotData;
  }

  // set the current axes scales based on the current data
  function setAxesScales(data) {
    xBins = data.map(function(d) { return d.bin; });
    // var maxDots = data.reduce(function(maxCount, curr, i, arr) {
    //   // count the number of dots in current bin
    //   var count = 0;
    //   for (var j = i; j < arr.length; j++) {
    //     if (arr[j].bin === curr.bin) {
    //       count++;
    //     }
    //   }
    //   // return the largest count so far
    //   if (count > maxCount) {
    //     return count;
    //   } else {
    //     return maxCount;
    //   }
    // }, 0);
    // yExtent = [0, maxDots/nDots];
    yExtent = [0, 1];

    x0 = d3.scalePoint()
      .domain(xBins)
      .padding(0.2);

    x = d3.scaleLinear()
      .domain([xBins[0], xBins[xBins.length - 1]]);

    y = d3.scaleLinear()
          .domain(yExtent);

    xAxis = d3.axisBottom()
      .scale(x);
    yAxis = d3.axisRight()
      .scale(y);
  }

  // set width and height state based on current window
  function updateDimensions(winWidth) {
    width = winWidth - margin.left - margin.right;
    height = width * 0.625;
  }

  // getter and setter functions
  chart.margin = function(_) {
    if (!arguments.length) return margin;
    margin = _;
    return chart;
  };

  chart.width = function(_) {
    if (!arguments.length) return width;
    width = _;
    return chart;
  };

  chart.height = function(_) {
    if (!arguments.length) return height;
    height = _;
    return chart;
  };

  chart.partitionWidth = function(_) {
    if (!arguments.length) return partitionWidth;
    partitionWidth = _;
    return chart;
  };

  chart.nDots = function(_) {
    if (!arguments.length) return nDots;
    nDots = _;
    return chart;
  };

  chart.init = function(_) {
    if (!arguments.length) return init;
    init = _;
    return chart;
  };

  return chart;
}