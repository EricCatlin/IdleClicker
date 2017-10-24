import {Injectable} from "@angular/core";
import {CognitoUtil} from "./cognito.service";
import {environment} from "../../environments/environment";
import {Stuff} from "../secure/useractivity/useractivity.component";
import * as AWS from "aws-sdk";
import { HttpClient } from '@angular/common/http';

/**
 * Created by Eric Catlin
 */

@Injectable()
export class GraphDBService {
    constructor(public cognitoUtil: CognitoUtil, private http: HttpClient) {
        console.log("GraphDBService: constructor");
    }

    getAWS() {
        return AWS;
    }
    results: string[];
    getSavedGames() {
        console.log("tried to get saved games");
        this.http.get('http://localhost:8080/api/games/savedgames/f43f6320-f198-4dea-8809-0e03dfba6fb2').subscribe(data => {
            // Read the result field from the JSON response.
            return data;
          });
      
    }
    writeLogEntry(action: string){
        console.log("tried to write log entries",action);        
    }

    getLogEntries(logs: Stuff[]){
        console.log("tried to get log entries",logs);
    }
   

}


