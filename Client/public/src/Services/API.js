app.service('apiRoot', function ($http, $rootScope) {
  $rootScope.api = 'http://localhost:8080/'
  return {
    API_URL: $rootScope.api + 'api/',
    ViewModel_URL: $rootScope.api + 'viewmodels/',
  }
});
