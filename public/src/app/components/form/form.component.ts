import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../../../services/employee.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  id: string;
  firstName: string;
  lastName: string;
  position: string;
  location: string;
  salary: number;
  date: any;

  isNew: boolean = true;

  constructor(private employeeService: EmployeeService) { }

  ngOnInit() {
    // Subscribe to the selected Employee
    this.employeeService.selectedEmployee.subscribe(employee => {
      if (employee.id !== null) {
        this.isNew = false;
        this.id = employee.id;
        this.firstName = employee.firstName;
        this.lastName = employee.lastName;
        this.position = employee.position;
        this.location = employee.location;
        this.salary = employee.salary;
        this.date = employee.date;
      }
    });
  }

  onSubmit() {
    // check for new Employee
    if (this.isNew) {
      const newEmployee = {
        id: this.generateId(),
        firstName: this.firstName,
        lastName: this.lastName,
        position: this.position,
        location: this.location,
        salary: this.salary,
        date: new Date()
      };
      // Add Employee
      this.employeeService.addEmployee(newEmployee);
    } else {
      // Create Employee to be updated
      const updateEmployee = {
        id: this.id,
        firstName: this.firstName,
        lastName: this.lastName,
        position: this.position,
        location: this.location,
        salary: this.salary,
        date: new Date()
      };
      // Update Employee
      this.employeeService.updateEmployee(updateEmployee);
    }
     // Clear the state
    this.clearState();
  }

  clearState() {
    this.isNew = true;
    this.id = '';
    this.firstName = '';
    this.lastName = '';
    this.position = '';
    this.location = '';
    this.salary = null;
    this.date = '';
    this.employeeService.clearState();
  }

  generateId() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }
}



