import {Injectable} from "@angular/core";
import {CognitoUtil} from "./cognito.service";
import {environment} from "../../environments/environment";

import {Stuff} from "../secure/useractivity/useractivity.component";
import * as AWS from "aws-sdk";


AWS.config.region = 'us-west-2';  //us-west-2 is Oregon


/**
 * Created by Eric Catlin
 */

@Injectable()
export class GraphDBService {
    constructor(public cognitoUtil: CognitoUtil) {
        console.log("GraphDBService: constructor");
    }

    getAWS() {
        return AWS;
    }
    getSavedGames() {
       
    }
   

}


