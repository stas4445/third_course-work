import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ArgumentOutOfRangeError } from 'rxjs/internal/util/ArgumentOutOfRangeError';
import { skip, take, map } from 'rxjs/operators';
import { Group, Page, Student } from '../_models';
import { group } from 'console';


@Injectable({
  providedIn: 'root'
})
export class StudentService {

  public clickCount: number = 0;

  // public creationDate: Date = new Date();

  constructor(
    private httpClient: HttpClient
  ) { }

  private studentsUrl = "/_services/students";

  // public increase() {
  //   this.clickCount++;
  // }

  // public getStudents(page: number, itemsPerPage: number): Observable<Page> {
  //   var students = this.httpClient.get<Student[]>(this.studentsUrl);
  //   return this.GetPageData(students, page, itemsPerPage);
  // }

  public getStudents(): Observable<Student[]> {
    return this.httpClient.get<Student[]>(this.studentsUrl);
  }

  public addStudent(student: Student): Observable<Student> {
    return this.httpClient.post<Student>(this.studentsUrl, student);
  }


  // private GetPageData(students: Observable<Array<Student>>, page: number, itemsPerPage: number): Observable<Page> {
  //   if (page <= 0) {
  //     throw Error("page number should be > 0");
  //   }

  //   var startIndex = itemsPerPage * (page - 1);
  //   return students
  //     .pipe(
  //       map(data => {
  //         var slicedData = itemsPerPage > 0
  //           ? data.slice(startIndex, startIndex + itemsPerPage)
  //           : data;
  //         return new Page(data.length, slicedData);
  //       }
  //       ));
  // }

}
