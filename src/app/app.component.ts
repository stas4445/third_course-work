import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService } from './_services';
import { UserService } from './_services';
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

    // get isGroup() {
    //     // if(!this.isAdmin) return this.user?.group?.includes(page);
    // }

    logout() {
        this.authenticationService.logout();
    }
}