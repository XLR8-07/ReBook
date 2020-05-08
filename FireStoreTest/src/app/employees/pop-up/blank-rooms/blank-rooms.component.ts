import { Component, OnInit, AfterViewInit } from '@angular/core';
import { EmployeeService } from 'src/app/shared/employee.service';
import { Room } from 'src/app/shared/room.model';
import { MatTabChangeEvent } from '@angular/material/tabs';

@Component({
  selector: 'app-blank-rooms',
  templateUrl: './blank-rooms.component.html',
  styleUrls: ['./blank-rooms.component.css']
})
export class BlankRoomsComponent implements AfterViewInit,OnInit {

  ACB1Rooms : number[] = [];
  ACB2Rooms : number[] = [];
  ACB3Rooms : number[] = [];
  defaultIndex : number = 1;

  constructor(public service : EmployeeService) { }
  ngAfterViewInit() {
    if(this.service.f_ACBUIL == null){
      console.log("NO ACBUIL");
    }
    else{
      this.ACB1Rooms = [];
      this.ACB1Rooms = (this.service.getRoomacrdBuil(1));
    }
  }

  ngOnInit(): void {
    this.defaultIndex = this.service.f_ACBUIL-1;
    this.service.getRooms().subscribe(actionArray4 =>{
      this.service.rooms = actionArray4.map(item4 =>{
        return {
          id : item4.payload.doc.id,
          ...item4.payload.doc.data() as Room
        } as Room;
      })
      if(this.service.f_ACBUIL == 1){
        this.ACB1Rooms = this.service.getRoomacrdBuil(1);
      }
      else if(this.service.f_ACBUIL == 2){
        this.ACB2Rooms = this.service.getRoomacrdBuil(2);
      }
      else if(this.service.f_ACBUIL == 3){
        this.ACB3Rooms = this.service.getRoomacrdBuil(3);
      }
    });
  }

  tabChanged(tabChangeEvent: MatTabChangeEvent): void {
    var acbuil = tabChangeEvent.index+1;

    if(acbuil == 1){
      this.ACB1Rooms = [];
      this.ACB1Rooms = (this.service.getRoomacrdBuil(acbuil));
    }
    else if(acbuil == 2){
      this.ACB2Rooms = [];
      this.ACB2Rooms = (this.service.getRoomacrdBuil(acbuil));
    }
    else if(acbuil == 3){
      this.ACB3Rooms = [];
      this.ACB3Rooms = (this.service.getRoomacrdBuil(acbuil));
    }
    
  }
  
}
