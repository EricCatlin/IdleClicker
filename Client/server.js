'use strict';

// require('dotenv').config();

const bodyParser = require('body-parser'),
      express = require('express'),
      cors = require('cors'),
      
      app = express();

var server;

app.use(cors());

// Parse body as JSON
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// Client App Directory
app.use(express.static('public'));

// Route auth check/catchall middleware
app.use(function(req, res, next) {
  if (req.originalUrl.split('/')[1] !== 'api'){
    res.sendfile(__dirname+'/public/index.html');
  } else {
    next();
  }
});

// Serve Application
app.set('port', process.env.PORT || 3300);

server = app.listen(app.get('port'), function() {
  console.log('anne.client server serving on port ' + server.address().port);
});
