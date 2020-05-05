import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../shared/employee.service';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit {

  constructor(public service: EmployeeService) { }

  ngOnInit(): void {
  }

  locator(){
    if(this.service.ButtonValue == true){
      return '0em';
    }
    return 'auto';
  }
 

}
