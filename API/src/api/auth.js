import { Router } from 'express';
var _ = require('lodash');
import GraphJS from '../lib/graph';
var uuidv1 = require('uuid/v1');
import Validators from "../lib/validators";
var http = require('http');


//api.use('/node', nodes({config, db}));
export default ({ config, db, io }) => {
	let api = Router();


	//Get specific node by uuid
	api.get('/:uuid', (req, res) => {
		let SubGraph = {};
		GraphJS.AddRemoteNodeToSubgraph(req.params.uuid, SubGraph, db,
			(result) => {
				res.send(SubGraph);
			},
			(error) => {
				res.status(500).send(error);
			}
		)
	})

	//Get specific node by uuid
	api.delete('/:uuid', (req, res) => {

		let SubGraph = {};
		let node = null;
		GraphJS.AddRemoteNodeToSubgraph(req.params.uuid, SubGraph, db,
			(result) => {
				node = result;
			},
			(error) => {
				res.status(500).send({ message: "Cannot find node" });
				return;
			}
		)
		db.cypher({ query: `match (n) where n.uuid = '${req.params.uuid}' MATCH ()-->(n) return n` }, (err, result) => {
			if (result && result.length == 0) {
				db.cypher({ query: `match (n) where n.uuid = '${req.params.uuid}' OPTIONAL MATCH (n)-[e]->() delete n,e RETURN n` }, (err, result) => {
					io.to(node.labels[0]).emit("delete.node", SubGraph);
					//http.post('http://localhost:8080/relay', {to:node.labels, message:SubGraph});
					res.send(true);
				})
			} else {
				res.status(500).send({ message: "Cannot delete node with dependencies" });
			}
		})
	})

	//Put node by uuid
	api.put('/', (req, res) => {
		if (!req.body.initial || !req.body.revised) { res.send("missing either 'revised', or 'initial'"); return; }

		let initial_props = req.body.initial.properties;
		let revised_props = req.body.revised.properties;

		let validator_errors = Validators.Node(req.body.revised);
		if (validator_errors) { res.status(500).send({ message: validator_errors }); return }


		let query = `MATCH (n {uuid:'${initial_props.uuid}'}) `;

		Object.keys(revised_props).forEach((key) => {
			if (key == 'uuid') return;
			if (revised_props[key] !== initial_props[key]) {
				//One line to get Type name as string of property type (Builtins only, no customs)
				let type = Object.prototype.toString.call(revised_props[key]).slice(8, -1);
				if (type == "String") {
					query += ` SET n.${key} = '${revised_props[key]}'`
				} else {
					query += ` SET n.${key} = ${revised_props[key]}`
				}
			}
		});
		query += ' RETURN n'
		db.cypher({ query }, (err, result) => {
			let SubGraph = {};
			GraphJS.AddRemoteNodeToSubgraph(result[0].n.properties.uuid, SubGraph, db, (node) => { io.to(req.body.revised.labels[0]).emit("post.node", SubGraph); res.send(node); })
		})
	})

	//Post node 
	api.post('/', (req, res) => {
		if (!req.body.revised) { res.status(500).send({ message: "missing node to write. " }); return; }
		if (!req.body.author_uuid) { res.status(500).send({ message: "missing author_uuid" }); return; }

		let revised_props = req.body.revised.properties;

		let validator_errors = Validators.Node(req.body.revised);
		if (validator_errors) { res.status(500).send({ message: validator_errors }); return }
		let new_uuid = uuidv1();
		//Need to convert ...labels[0] to an iterated string builder for the whole array
		let query = `MATCH (p:Person {uuid:'${req.body.author_uuid}'}) CREATE (n:${req.body.revised.labels[0]} {uuid:'${new_uuid}'})-[a:author{uuid:'${uuidv1()}'}]->(p) `;

		Object.keys(revised_props).forEach((key) => {
			//One line to get Type name as string of property type (Builtins only, no customs)
			let type = Object.prototype.toString.call(revised_props[key]).slice(8, -1);
			if (type == "String") {
				query += ` SET n.${key} = '${revised_props[key]}'`
			} else {
				query += ` SET n.${key} = ${revised_props[key]}`
			}
		});

		query += ' RETURN n'

		console.log(query);
		db.cypher({ query }, (err, result) => {
			let SubGraph = {};
			GraphJS.AddRemoteNodeToSubgraph(new_uuid, SubGraph, db, (node) => { io.to(req.body.revised.labels[0]).emit("post.node", SubGraph); res.send(SubGraph); })
		})
	})

	return api;
}
