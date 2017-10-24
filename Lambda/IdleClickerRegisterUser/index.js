
var neo4j = require('neo4j');

var GRAPH_URL = 'http://api:b.5cjVfnAolUkc.L7xAbITrjoCQA6nT@hobby-aagmlhhaanncgbkebkidmepl.dbs.graphenedb.com:24789/db/data/'

exports.handler = (event, context, callback) => {
    var db = new neo4j.GraphDatabase(GRAPH_URL)
    let query = `CREATE (n:User { userId = "${event.userName}", nickname = "${event.request.userAttributes.nickname}", email = "${event.request.userAttributes.email}" } ) return n`;
    db.cypher({ query }, (err, result) => {
       console.log(result);
    })
    context.succeed(event);
};


