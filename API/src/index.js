import http from 'http';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import initializeDb from './db';
import middleware from './middleware';
import api from './api';


import config from './config.json';
let uuidv1 = require('uuid/v1');
let url = require('url');

//Esgtablish server and socket
let app = express();
app.server = http.createServer(app);
var io = require('socket.io')(app.server);

// logger
app.use(morgan('dev'));

// 3rd party middleware
app.use(cors({
	exposedHeaders: config.corsHeaders
}));

app.use(bodyParser.json({
	limit: config.bodyLimit
}));

// connect to db
initializeDb(db => {

	// internal middleware
	app.use(middleware({ config, db }));

	// api router
	app.use('/api', api({ config, db, io }));


	app.server.listen(process.env.PORT || config.port, () => {
		console.log(`Started on port ${app.server.address().port}`);
	});
	// global entry point for new connections
	io.sockets.on('connection', function (socket) {
		var ns = url.parse(socket.handshake.url, true).query.ns;
		socket.join(ns);
	});
	
});

export default app;
