app.config(function ($locationProvider, $stateProvider, $urlRouterProvider, $compileProvider) {
  $locationProvider.html5Mode(true);
  $compileProvider.debugInfoEnabled(true);

  $stateProvider
    .state('root', {
      abstract: true,
      url: "/",
      templateUrl: 'Views/index.html'
    })
    .state('root.home', {
      url: "home",
      templateUrl: "Views/Home/index.html",
    })

  // catchall route
  $urlRouterProvider.otherwise('/home');
});
