import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Student } from '../_models';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const students = new Array<Student> (
      {id: 1, group: 1, firstName: 'Ярослав', lastName: 'Воронков'},
      {id: 2, group: 1, firstName: 'Глеб', lastName: 'Сорокин'},
      {id: 3, group: 1, firstName: 'Дарья', lastName: 'Федорова'},  
      {id: 4, group: 1, firstName: 'Алексей', lastName: 'Давыдов'},  
      {id: 5, group: 2, firstName: 'Михаил', lastName: 'Леонтьев'},
      {id: 6, group: 2, firstName: 'Виктор', lastName: 'Исаев'},
      {id: 7, group: 2, firstName: 'Анфиса', lastName: 'Давыдова'},
      {id: 8, group: 3, firstName: 'Денис', lastName: 'Гантеля'},
      {id: 9, group: 3, firstName: 'Вера', lastName: 'Карасёва'},
    );
   
    // какие же классные костыли я придумала
    return { students }; 
  }

  
  
  constructor() { }
}
