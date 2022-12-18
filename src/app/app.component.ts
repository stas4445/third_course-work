import { Component } from '@angular/core';
import { AuthenticationService } from './_services';
// import { StudentService } from './_services';
import { User, Role } from './_models';

@Component({
    selector: 'app',
    templateUrl: 'app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent {
    user!: User;

    constructor(private authenticationService: AuthenticationService) {
        this.authenticationService.user.subscribe(x => this.user = x);
    }


    get isAdmin() {
        return this.user && this.user.role === Role.Admin;
    }


    logout() {
        this.authenticationService.logout();
    }
}