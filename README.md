# vanilla-line-chart [![Build Status](https://travis-ci.org/n3-charts/line-chart-vanilla.svg?branch=dev)](https://travis-ci.org/n3-charts/line-chart) [![Coverage Status](https://coveralls.io/repos/n3-charts/line-chart-vanilla/badge.svg?branch=dev&pouet=tut)](https://coveralls.io/r/n3-charts/line-chart-vanilla?branch=dev) [![Join the chat at https://gitter.im/n3-charts/line-chart-vanilla](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/n3-charts/line-chart-vanilla)

[![Join the chat at https://gitter.im/n3-charts/line-chart-vanilla](https://badges.gitter.im/n3-charts/line-chart-vanilla.svg)](https://gitter.im/n3-charts/line-chart-vanilla?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

**vanilla-line-chart** is an easy-to-use JavaScript library for creating beautiful charts in plain JavaScript and it is built on top of [D3.js][d3-home].

[![n3-charts lead image](https://cloud.githubusercontent.com/assets/2969388/12079874/36579ec8-b249-11e5-8c7f-ee3f724ff886.png)](http://codepen.io/chaosmail/pen/xZgPmp/)

This a vanillaJS Version of [n3-line-charts][n3-home] and still under heavy development. Go check out our well tested AngularJS directive instead.

## Getting started

You can install **vanilla-line-chart** by forking this repo.

```
git clone git@github.com:n3-charts/line-chart-vanilla.git
cd line-chart-vanilla
npm install
gulp
```

Next, you need to reference *LineChart.js* and *LineChart.css* in your *index.html* file.

```
<script src=".tmp/build/LineChart.js"></script>
<link rel="stylesheet" href=".tmp/build/LineChart.css">
```

Here is an example how your HTML file should look like.

```html
<!doctype html>
<html ng-app="app">
  <head>
    <!-- Reference AngularJS and D3.js -->
    <script src="node_modules/d3/d3.min.js"></script>
    <!-- Reference vanilla-line-chart -->
    <script src=".tmp/build/LineChart.js"></script>
    <link rel="stylesheet" href=".tmp/build/LineChart.css">
  </head>
  <body>
    <div id="chart" style="height:500px"></div>
    <script>
      var data = {
        dataset: [
          {x: 0, y: 0, other_y: 0, val_2: 0, val_3: 0},
          ...
         ]
       };

      var options = {
        axes: {x: { key: "x" }},
        series: [ ... ], ...
      };

      var lineChart = new n3Charts.LineChart("#chart", options, data);
      lineChart.update();
    </script>
  </body>
</html>
```

## Authors

**vanilla-line-chart** is made with love and care by [Christoph Körner](https://github.com/chaosmail) & [Sébastien Fragnaud](https://github.com/lorem--ipsum).

[d3-home]: https://d3js.org/ "D3.js"
[n3-home]: http://n3-charts.github.io/line-chart "n3-charts Home"
[n3-examples]: http://n3-charts.github.io/line-chart/#/examples "n3-charts Examples"
[n3-releases]: https://github.com/n3-charts/line-chart/releases "n3-charts Releases"
[n3-gitter]: https://gitter.im/n3-charts/line-chart "n3-charts Gitter"
[n3-issue]: https://github.com/n3-charts/line-chart/issues
[n3-contribution]: https://github.com/n3-charts/line-chart/wiki/Contribution
