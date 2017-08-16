app.service('HomeViewModels', function ($http, $rootScope, apiRoot) {
  const ViewModel_URL = apiRoot.ViewModel_URL + "home/";
  return {
    get: function (post_data) {
      return $http.post(ViewModel_URL + 'home')
        .then(function (resp) {
          if (resp.status == 200) return resp.data;
          return;
        }).catch(function (err) {
          throw err.data
        });
    }
  }
});
