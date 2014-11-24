var app = angular.module('popViewer', ['btford.socket-io', 'ui.router', 'ui.bootstrap', 'd3']);

//======================== FACTORIES ==========================

app.factory('graphSocket', ['socketFactory', function (socketFactory) {
  return socketFactory();
}]);

//====================== CONTROLLERS ==========================
app.controller('HomeCtrl', ['$scope', function($scope){

}]);

app.controller('GraphsCtrl', ['$scope', 'graphSocket', function($scope, graphSocket){

$scope.run = function()
{
console.log("Running!");
}

}]);

//========================= CONFIG ==============================
app.config(function($stateProvider, $urlRouterProvider) {
  //
  // For any unmatched url, redirect to /state1
  $urlRouterProvider.otherwise("/home");
  //
  // Now set up the states
  $stateProvider
    .state('home', {
      url: "/home",
      templateUrl: "partials/home.html",
      controller: "HomeCtrl"
    })
    .state('home.graphs', {
      url: "/graphs",
      templateUrl: "partials/graphs.html",
      controller: "GraphsCtrl"
    });
});
