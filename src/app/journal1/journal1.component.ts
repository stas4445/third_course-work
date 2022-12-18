import { Component, OnInit} from '@angular/core';
import { StudentService } from '../_services/student.service';
import { Role, Student } from '../_models';
import { User } from '../_models';
import { AuthenticationService, UserService } from '../_services';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-journal1',
  templateUrl: './journal1.component.html',
  styleUrls: ['./journal1.component.scss']
})
export class Journal1Component implements OnInit {

  public students: Array<Student> = [];

  loading = false;
  user: User;
  userFromApi!: User;

  clicks = 0;
  ruCollator = new Intl.Collator('ru-RU');

  clicked1(event: any) {
    this.clicks--;
    if (this.clicks == -1) {
      this.clicks = 0;
    }
    this.studentsService.getStudents().subscribe(s => this.students = s.filter(u => u.group == this.userFromApi.groups[this.clicks]).sort((a, b) => this.ruCollator.compare(a.lastName, b.lastName)));
  }
  clicked2(event: any) {
    this.clicks++;
    if (!this.userFromApi.groups.includes(this.userFromApi.groups[this.clicks])) {
      this.clicks = 0;
    }
    this.studentsService.getStudents().subscribe(s => this.students = s.filter(u => u.group == this.userFromApi.groups[this.clicks]).sort((a, b) => this.ruCollator.compare(a.lastName, b.lastName)));
  }

  add(firstName: string, lastName: string, group: any) {
    firstName = firstName.trim();
    lastName = lastName.trim();
    group = group.trim();
    if (!firstName && !lastName && !group) { return; }
    this.studentsService.addStudent({ firstName, lastName, group } as Student)
      .subscribe(student => {
        this.students.push(student);
      });
  }

  delete(student: Student): void {
    this.students = this.students.filter(s => s !== student);
    this.studentsService.deleteStudent(student.id).subscribe();
  }

  get isAdmin() {
    return this.user && this.user.role === Role.Admin;
  }

  constructor(private studentsService: StudentService, private userService: UserService, private authenticationService: AuthenticationService) {
    this.user = this.authenticationService.userValue;
  }


  ngOnInit(): void {
    this.getStudents();
    this.loading = true;
    this.userService.getById(this.user.id).pipe(first()).subscribe(user => {
      this.loading = false;
      this.userFromApi = user;
    });

  }

  getStudents(): void {
    this.studentsService.getStudents().subscribe(s => this.students = s.filter(u => u.group == this.user.groups[this.clicks]).sort((a, b) => this.ruCollator.compare(a.lastName, b.lastName)));
  }

}
