app.config(function ($sceProvider, $httpProvider) {
  // prevent browsers(IE) from caching $http responses
  if (!$httpProvider.defaults.headers.get) {
    $httpProvider.defaults.headers.get = {
      'Cache-Control': 'no-cache',
      'Pragma': 'no-cache'
    };
  };

  $sceProvider.enabled(false);
});
