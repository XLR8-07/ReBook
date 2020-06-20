import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../shared/employee.service';

@Component({
  selector: 'app-guest',
  templateUrl: './guest.component.html',
  styleUrls: ['./guest.component.css']
})
export class GuestComponent implements OnInit {

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
