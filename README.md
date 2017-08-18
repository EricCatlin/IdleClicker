# ANNE
A example ANNE stack app (AngularJS, NodejS, Neo4j, Express)

Accompanying the standard npm neo4j driver is a custom JS Graph Manipulation library in `/API/src/lib/graph.js`

This js library standardizes a method of interacting with graph data allowing for Addition, Subtraction, and the computation of differences between any 2 subgraphs.

**Subgraph** - Standard collection of Nodes and Rels
```json
{"nodes":{"uuid":"NodeObject"}, "rels":{"uuid":"RelObject"}}
```
**Node** - Standard Node Object
```json
{"labels":[], "properties":{"uuid":"string", "arbitrary_props":""}}
```
**Rel** - Standard Relationship object
```json
{"type":"type_string", "properties":{"uuid":"string", "arbitrary_props":""}, "from_id" : "uuid", "to_id":"uuid"}
```
**Subgraph Indexes** - These additional fields add no additional information to the Subgraph but do provide convenient O(1) lookups within the subgraph
```json
{"nodes":{"uuid":"NodeObject"}, "rels":{"uuid":"RelObject"}, "node_label_index":{"label":["uuid_array"]}, "incoming":{"rel_type":{"to_node_uuid":["rel_uuid_array"]}}, "outgoing":{"rel_type":{"from_node_uuid":["rel_uuid_array"]}} }
```
**Differences** - Computed differences between any two Subgraphs. 
```json
{"Extra":"Subgraph", "Missing":"Subgraph", "Updated":{"nodes":{"updated":{"prop_titles":["node_uuid_array"]},"new":{"prop_titles":["node_uuid_array"]},"missing":{"prop_titles":["node_uuid_array"]}}, "rels":{"updated":{"prop_titles":["rel_uuid_array"]},"new":{"prop_titles":["rel_uuid_array"]},"missing":{"prop_titles":["rel_uuid_array"]}}}}
```

These JS Graph Management structures power the ANNE Stack operations, and can be performed Client-Side or Server-Side giving a standard messaging model to update state in either the DB or within a client application
