angular.module('anne.client', [
  'ui.router',
]);

const app = angular.module('anne.client');

app.run(function ($rootScope, $state, $location, GraphJS) {
  $rootScope.GraphJS = GraphJS;
  $rootScope.$state = $state;
  $rootScope.previousState;
  $rootScope.currentState;
  $rootScope.$on('$stateChangeSuccess', function (ev, to, toParams, from, fromParams) {
    $rootScope.previousState = from.name;
    $rootScope.previousParams = fromParams;
    $rootScope.currentState = to.name;
    $rootScope.currentParams = toParams;
    console.log('Previous state:' + $rootScope.previousState)
    console.log('Current state:' + $rootScope.currentState)
  });
});