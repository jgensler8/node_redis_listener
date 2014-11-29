angular

.module('d3', [])

.factory('d3Service', function()
{
  return d3;
})

.directive('streamgraph', ['d3Service', '$window', function(d3Service, $window)
{
  return {
    restrict: 'EA',
    scope: {
      newval: '='
    },
    link: function(scope, element, attrs) {
      // Browser onresize event
      window.onresize = function() {
            scope.$apply();
      };

      // Watch for resize event
      scope.$watch(function() {
            return angular.element($window)[0].innerWidth;
      }, function() {
            scope.render(scope.data);
      });

      scope.render = function(data) {
       var n = 40,
           data = d3.range(n).map(function(){return 0});

       var margin = {top: 20, right: 20, bottom: 20, left: 40},
           width = 960 - margin.left - margin.right,
           height = 500 - margin.top - margin.bottom;

       var x = d3.scale.linear()
                 .domain([0, n - 1])
                 .range([0, width]);

       var y = d3.scale.linear()
                 .domain([0, 50])
                 .range([height, 0]);

       var line = d3.svg.line()
                    .x(function(d, i) { return x(i); })
                    .y(function(d, i) { return y(d); });

      var svg = d3.select(element[0])
                  .append("svg")
                    .attr("width", width + margin.left + margin.right)
                    .attr("height", height + margin.top + margin.bottom)
                  .append("g")
                    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


      svg.append("defs").append("clipPath")
         .attr("id", "clip")
      .append("rect")
         .attr("width", width)
         .attr("height", height);

      svg.append("g")
         .attr("class", "x axis")
         .attr("transform", "translate(0," + y(0) + ")")
      .call(d3.svg.axis().scale(x).orient("bottom"));

      svg.append("g")
         .attr("class", "y axis")
      .call(d3.svg.axis().scale(y).orient("left"));

      var path = svg.append("g")
         .attr("clip-path", "url(#clip)")
      .append("path")
         .datum(data)
         .attr("class", "line")
         .attr("d", line);

      tick();

      function tick() {
        data.push(scope.newval);

        // redraw the line, and slide it to the left
        path
          .attr("d", line)
          .attr("transform", null)
        .transition()
          .duration(500)
          .ease("linear")
          .attr("transform", "translate(" + x(-1) + ",0)")
          .each("end", tick);

        // pop the old data point off the front
        data.shift();
      }

      } 
    }}
}]);
