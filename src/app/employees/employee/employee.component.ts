import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../shared/employee.service';
import { NgForm } from '@angular/forms';
import { Employee } from '../shared/employee.model';
import { ToastrService } from 'ngx-toastr';


// 43:12 stop


@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  constructor(private employeeService: EmployeeService, private toastr: ToastrService) { }

  ngOnInit() {
    this.resetForm();
  }

  onSubmit(employeeForm: NgForm) {
    if(employeeForm.value.$key == null)
    this.employeeService.insertData(employeeForm.value);
    else
    this.employeeService.updateData(employeeForm.value);
    this.resetForm(employeeForm);
    this.toastr.success('Submitted Successfully', 'Employee Register');

  }

  resetForm(employeeForm?: NgForm) {
    if(employeeForm != null)
    employeeForm.reset();
    this.employeeService.selectedEmployee = {
      $key: null,
      name: '',
      position: '',
      office: '',
      salary: 0,
    };

  }
}
