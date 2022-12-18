import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Student } from '../_models';


@Injectable({
  providedIn: 'root'
})
export class StudentService {

  constructor(
    private httpClient: HttpClient
  ) { }

  private studentsUrl = "/_services/students";


  public getStudents(): Observable<Student[]> {
    return this.httpClient.get<Student[]>(this.studentsUrl);
  }

  public addStudent(student: Student): Observable<Student> {
    return this.httpClient.post<Student>(this.studentsUrl, student);
  }

  deleteStudent(id: any): Observable<Student> {
    const url = `${this.studentsUrl}/${id}`;
    return this.httpClient.delete<Student>(url);
  }

}
