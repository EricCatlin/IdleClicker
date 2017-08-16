var neo4j = require('neo4j');

var GRAPH_URL = 'graph_url'
//tester b.yhKjYZCt6tML.nMX06nm3tmnWOJxm
//api password
export default callback => {
	// connect to a database if needed, then pass it to `callback`:
	callback(new neo4j.GraphDatabase(GRAPH_URL));
	//callback(new neo4j.GraphDatabase('http://api:password@localhost:7474'));
}
