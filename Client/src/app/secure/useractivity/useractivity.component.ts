import {Component} from "@angular/core";
import {UserLoginService} from "../../service/user-login.service";
import {LoggedInCallback} from "../../service/cognito.service";
import {Router} from "@angular/router";
import {GraphDBService} from "../../service/graphdb.service";


export class Stuff {
    public type: string;
    public date: string;
}

@Component({
    selector: 'awscognito-angular2-app',
    templateUrl: './useractivity.html'
})
export class UseractivityComponent implements LoggedInCallback {

    public logdata: Array<Stuff> = [];

    constructor(public router: Router, public ddb: GraphDBService, public userService: UserLoginService) {
        this.userService.isAuthenticated(this);
        console.log("in UseractivityComponent");
    }

    isLoggedIn(message: string, isLoggedIn: boolean) {
        if (!isLoggedIn) {
            this.router.navigate(['/home/login']);
        } else {
            console.log("scanning DDB");
            this.ddb.getLogEntries(this.logdata);
        }
    }

}
