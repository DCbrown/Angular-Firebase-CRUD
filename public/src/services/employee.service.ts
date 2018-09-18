import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import {Employee} from '../models/Employee';


@Injectable()
export class EmployeeService {

  employees: Employee[];

  private employeeSource = new BehaviorSubject<Employee>({
    id: null,
    firstName: null,
    lastName: null,
    position: null,
    location: null,
    salary: null,
    date: null
  });

  selectedEmployee = this.employeeSource.asObservable();

  private stateSource = new BehaviorSubject<boolean>(true);

  stateClear = this.stateSource.asObservable();

  constructor() {

    this.employees = [];

  }

  getEmployees(): Observable<Employee[]> {
    if (localStorage.getItem('employees') === null) {
      this.employees = [];
    } else {
      this.employees = JSON.parse(localStorage.getItem('employees'));
    }
    return of(this.employees.sort((a, b) => {
      return b.date = a.date;
    }));
  }

  setFormEmployee(employee: Employee) {
    this.employeeSource.next(employee);
  }

  addEmployee(employee: Employee) {
    this.employees.unshift(employee);

  // Add to local storage
  localStorage.setItem('employees', JSON.stringify(this.employees));
  }

  updateEmployee(employee: Employee) {
    this.employees.forEach((cur, index) => {
      if (employee.id === cur.id) {
        this.employees.splice(index, 1);
      }
    });
    this.employees.unshift(employee);

    // Update to storage
    localStorage.setItem('employees', JSON.stringify(this.employees));
  }

  deleteEmployee(employee: Employee) {
    this.employees.forEach((cur, index) => {
      if (employee.id === cur.id) {
        this.employees.splice(index, 1);
      }
    });

    // Delete to local storage
    localStorage.setItem('employees', JSON.stringify(this.employees));
  }

  clearState() {
    this.stateSource.next(true);
  }
}
