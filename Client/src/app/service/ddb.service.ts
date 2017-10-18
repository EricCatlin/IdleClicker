import {Injectable} from "@angular/core";
import {CognitoUtil} from "./cognito.service";
import {environment} from "../../environments/environment";

import {Stuff} from "../secure/useractivity/useractivity.component";
import * as AWS from "aws-sdk";
import * as DynamoDB from "aws-sdk/clients/dynamodb";
var DOC = require("dynamodb-doc");

AWS.config.region = 'us-west-2';  //us-west-2 is Oregon
//create the ddb object
var ddb = new AWS.DynamoDB();

/**
 * Created by Vladimir Budilov
 */

@Injectable()
export class DynamoDBService {
    constructor(public cognitoUtil: CognitoUtil) {
        console.log("DynamoDBService: constructor");
    }

    getAWS() {
        return AWS;
    }
    getSavedGames() {
        var params = {
            Key: {
              name: {S: 'John Mayo-Smith'},
              city: {S: 'New York'}
            },
            AttributeUpdates: {
              food: {
                Action: 'PUT',
                Value: {S: 'chocolate'}
              }
            },
            TableName: 'clicker_db',
            ReturnValues: 'ALL_NEW'
          };

          ddb.updateItem(params, function(err, data) {
            if (err) { return console.log(err); }
            console.log("We updated the table with this: " + JSON.stringify(data));
        });
    }
    getLogEntries(mapArray: Array<Stuff>) {
        console.log("DynamoDBService: reading from DDB with creds - " + AWS.config.credentials);
        var params = {
            TableName: environment.ddbTableName,
            KeyConditionExpression: "userId = :userId",
            ExpressionAttributeValues: {
                ":userId": this.cognitoUtil.getCognitoIdentity()
            }
        };

        var clientParams:any = {};
        if (environment.dynamodb_endpoint) {
            clientParams.endpoint = environment.dynamodb_endpoint;
        }
        var docClient = new DynamoDB.DocumentClient(clientParams);
        docClient.query(params, onQuery);

        function onQuery(err, data) {
            if (err) {
                console.error("DynamoDBService: Unable to query the table. Error JSON:", JSON.stringify(err, null, 2));
            } else {
                // print all the movies
                console.log("DynamoDBService: Query succeeded.");
                data.Items.forEach(function (logitem) {
                    mapArray.push({type: logitem.type, date: logitem.activityDate});
                });
            }
        }
    }

    writeLogEntry(type: string) {
        try {
            let date = new Date().toString();
            console.log("DynamoDBService: Writing log entry. Type:" + type + " ID: " + this.cognitoUtil.getCognitoIdentity() + " Date: " + date);
            this.write(this.cognitoUtil.getCognitoIdentity(), date, type);
        } catch (exc) {
            console.log("DynamoDBService: Couldn't write to DDB");
        }

    }

    write(data: string, date: string, type: string): void {
        console.log("DynamoDBService: writing " + type + " entry");

        let clientParams:any = {
            params: {TableName: environment.ddbTableName}
        };
        if (environment.dynamodb_endpoint) {
            clientParams.endpoint = environment.dynamodb_endpoint;
        }
        var DDB = new DynamoDB(clientParams);

        // Write the item to the table
        var itemParams =
            {
                TableName: environment.ddbTableName,
                Item: {
                    userId: {S: data},
                    activityDate: {S: date},
                    type: {S: type}
                }
            };
        DDB.putItem(itemParams, function (result) {
            console.log("DynamoDBService: wrote entry: " + JSON.stringify(result));
        });
    }

}


