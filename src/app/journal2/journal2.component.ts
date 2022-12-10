import { Component, OnInit } from '@angular/core';
import { User } from '../_models';
import { AuthenticationService, UserService } from '../_services';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-journal2',
  templateUrl: './journal2.component.html',
  styleUrls: ['./journal2.component.scss']
})
export class Journal2Component implements OnInit {

  loading = false;
  user: User;
  userFromApi!: User;

  constructor(private userService: UserService, private authenticationService: AuthenticationService) {
    this.user = this.authenticationService.userValue;
   }

  ngOnInit(): void {
    this.loading = true;
    this.userService.getById(this.user.id).pipe(first()).subscribe(user => {
      this.loading = false;
      this.userFromApi = user;
    });
  }

}
