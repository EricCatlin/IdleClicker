import { Router } from 'express';
var _ = require('lodash');
import GraphJS from '../lib/graph';
import GraphAPI from '../lib/db_api';
var uuidv1 = require('uuid/v1');
import Validators from "../lib/validators";
var http = require('http');


//api.use('/node', nodes({config, db}));
export default ({ config, db, io }) => {
	let api = Router();


	//Get all games saved by user userId
	api.get('/savedgames/:userId', (req, res) => {
		let SubGraph = {};
		let GetPivot = GraphAPI.AddRemoteNodeToSubgraph(req.params.userId, SubGraph, db);
		GetPivot.then(() => {
			let Outgoing = GraphAPI.GetOutgoingRels([req.params.userId], SubGraph, "saved_game", db);
			Outgoing.then(() => res.send(SubGraph))
			Outgoing.catch((error) => res.status(500).send(error));
		});
		GetPivot.catch((error)=>res.status(500).send(error));		
})

	

return api;
}
