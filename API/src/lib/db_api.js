import GraphJS from '../lib/graph';

module.exports = {
    GetOutgoingRels: function (uuids, SubGraph, label, db) {
        return new Promise(function (resolve, reject) {
            if (!uuids) reject("No uuids");
            let query = `match (from_node)-[rel${label ? ":" + label : ''}]->(to_node) where from_node.uuid in {uuids} return from_node, rel, to_node`
            db.cypher({ query: query, params: { uuids } },
                (err, results) => {
                    if (err) reject(err);
                    results.map((relationship) => {
                        GraphJS.MergeRemoteRelationship(relationship, SubGraph);
                    })
                    resolve(results);
                });
        })
    },

    GetIncomingRels: function (uuids, SubGraph, label, db) {
        return new Promise(function (resolve, reject) {
            if (!uuids) reject("No uuids");
            let query = `match (from_node)-[rel${label ? ":" + label : ''}]->(to_node) where to_node.uuid in {uuids} return from_node, rel, to_node`
            db.cypher({ query: query, params: { uuids } },
                (err, results) => {
                    if (err) reject(err);
                    results.map((relationship) => {
                        GraphJS.MergeRemoteRelationship(relationship, SubGraph);
                    })
                    resolve(results);
                });
        });
    },
    AddRemoteNodeToSubgraph: function (uuid, SubGraph, db) {

        return new Promise(function (resolve, reject) {
            if (!uuid) reject();
            db.cypher({ query: `match (node {uuid:'${uuid}'}) return node` },
                (err, results) => {
                    if (err || results.length == 0 || !results[0].node) { reject(); return }
                    var result = results[0].node;
                    delete result._id;
                    if (SubGraph) GraphJS.MergeNode(result, SubGraph);
                    resolve(result)
                })
        })
    }
}