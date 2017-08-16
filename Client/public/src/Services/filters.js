app.filter('titleCase', function() {
    return function(input) {
      input = input || '';
      return input.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
    };
  });

  app.filter('numKeys', function() {
    return function(json) {
        var keys = Object.keys(json)
        return keys.length;
    }
});

  app.filter('railsFullDate', function() {
    return function(digits) {
       return new Date(digits * 1000);
    }
});