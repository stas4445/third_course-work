import { Component } from '@angular/core';
import { first } from 'rxjs/operators';

import { Role, User } from '../_models';
import { UserService, AuthenticationService } from '../_services';

@Component({
    templateUrl: 'home.component.html',
    styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
    loading = false;
    user: User;
    userFromApi!: User;

    constructor(
        private userService: UserService,
        private authenticationService: AuthenticationService
    ) {
        this.user = this.authenticationService.userValue;
    }
    get isAdmin() {
        return this.user && this.user.role === Role.Admin;
      }
    ngOnInit() {
        this.loading = true;
        this.userService.getById(this.user.id).pipe(first()).subscribe(user => {
            this.loading = false;
            this.userFromApi = user;
        });
    }
}