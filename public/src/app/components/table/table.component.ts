import { Component, OnInit } from '@angular/core';
import { Employee } from '../../../models/Employee';
import { EmployeeService } from '../../../services/employee.service';


@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

  employees: Employee[];
  selectedEmployee: Employee;
  loaded: boolean = false;

  constructor(private employeeService: EmployeeService) { }

  ngOnInit() {
    this.employeeService.stateClear.subscribe(clear => {
      if (clear) {
        this.selectedEmployee = {
          id: '',
          firstName: '',
          lastName: '',
          position: '',
          location: '',
          salary: null,
          date: ''
        }
      }
    });

    this.employeeService.getEmployees().subscribe(employees => {
      this.employees = employees;
      this.loaded = true;
    });
  }

  onSelect(employee: Employee) {
    this.employeeService.setFormEmployee(employee);
    this.selectedEmployee = employee;
  }

  onDelete(employee: Employee) {
    if (confirm('Are you sure you want to delete this Employee?')) {
      this.employeeService.deleteEmployee(employee);
    }
  }


}
