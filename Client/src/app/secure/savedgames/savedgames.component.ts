import {Component} from "@angular/core";
import {UserLoginService} from "../../service/user-login.service";
import {LoggedInCallback} from "../../service/cognito.service";
import {Router} from "@angular/router";
import { HttpClient } from '@angular/common/http';

export class Stuff {
    public type: string;
    public date: string;
}

@Component({
    selector: 'awscognito-angular2-app',
    templateUrl: './savedgames.html'
})
export class SavedGamesComponent implements LoggedInCallback {

    public logdata: Array<Stuff> = [];
    public saved_games = null;
    constructor(public router: Router, public http: HttpClient, public userService: UserLoginService) {
        this.userService.isAuthenticated(this);
        console.log("in SavedGamesComponent");
    }

    isLoggedIn(message: string, isLoggedIn: boolean) {
        if (!isLoggedIn) {
            this.router.navigate(['/home/login']);
        } else {
            console.log("scanning DDB");
            console.log(this.userService);
            this.http.get('http://localhost:8080/api/games/savedgames/f43f6320-f198-4dea-8809-0e03dfba6fb2').subscribe(data => {
                // Read the result field from the JSON response.
                this.saved_games =  data;
                console.log(this.saved_games);
              });
        }
    }

}
