import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../shared/employee.service';
import { Employee } from '../shared/employee.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {
  p: number = 1;
  empolyeeList: Employee[];
  constructor(private employeeService: EmployeeService, private toastr: ToastrService) { }

  ngOnInit() {
    let x = this.employeeService.getData();
    x.snapshotChanges().subscribe(item => {
      this.empolyeeList = [];
      item.forEach(element => {
        let y = element.payload.toJSON();
        y["$key"] = element.key;
        this.empolyeeList.push(y as Employee);
      });
    });
  }

  onEdit(emp: Employee) {
    this.employeeService.selectedEmployee = Object.assign({},emp);
    window.scrollTo(0, 0);
  }

  onDelete(key: string) {
    if (confirm ('Are you sure to delete this record?') == true) {
    this.employeeService.deleteData(key);
    this.toastr.warning("Deleted Successfully", "Employee reigister");
    }
  }

}
