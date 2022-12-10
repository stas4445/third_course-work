import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { StudentService } from '../_services/student.service';
import { Role, Student } from '../_models';
import { User } from '../_models';
import { AuthenticationService, UserService } from '../_services';
import { filter } from 'rxjs';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-journal1',
  templateUrl: './journal1.component.html',
  styleUrls: ['./journal1.component.scss']
})
export class Journal1Component implements OnInit {

  // public page!: number;

  // public anyPage: any;

  // public collectionSize!: number;
  // public itemsPerPage: number = 5;


  public students: Array<Student> = [];

  loading = false;
  user: User;
  userFromApi!: User;

  clicks: number = 1;

  clicked1(event: any) {
    this.clicks--;
    if (this.clicks == 0) {
      this.clicks = 1;
    }
    this.studentsService.getStudents().subscribe(s => this.students = s.filter(u => u.group == this.clicks));
  }
  clicked2(event: any) {
    this.clicks++;
    if (!this.userFromApi.groups.includes(this.clicks)) {
      this.clicks = 1;
    }
    this.studentsService.getStudents().subscribe(s => this.students = s.filter(u => u.group == this.clicks));
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
    // this.students = this.students.filter(s => s.group == this.user.groups?.includes(this.clicks));
    // this.page = 1;
    // this.loadPage();
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
    this.studentsService.getStudents().subscribe(s => this.students = s.filter(u => u.group == this.clicks));
  }



  // onPageChanged(event: any) {
  //   this.loadPage();
  // }


  // private loadPage() {
  //   // this.studentsService.getStudents().subscribe(u => {
  //   //   if (this.user.groups?.includes(this.clicks)) {
  //   //     this.students = u;
  //   //   }
  //   // });
  //   // this.studentsService.getStudents(this.page, this.itemsPerPage).pipe()
  //   //   .subscribe(p => {
  //   //     debugger;
  //   //     // if(this.user.group?.includes(this.page)){
  //   //       this.students = p.rows;
  //   //       // p.rows = this.students?.filter(s => s.group == this.page);
  //   //       // this.itemsPerPage = this.students.length;
  //   //     // }
  //   //     this.collectionSize = p.totalCount;

  //   //   });
  // }


}
