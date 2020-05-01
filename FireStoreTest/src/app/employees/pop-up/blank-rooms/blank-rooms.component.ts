import { Component, OnInit } from '@angular/core';
import { EmployeeService } from 'src/app/shared/employee.service';
import { Room } from 'src/app/shared/room.model';

@Component({
  selector: 'app-blank-rooms',
  templateUrl: './blank-rooms.component.html',
  styleUrls: ['./blank-rooms.component.css']
})
export class BlankRoomsComponent implements OnInit {

  ACB1Rooms : number[] = [];
  ACB2Rooms : number[] = [];
  ACB3Rooms : number[] = [];

  constructor(public service : EmployeeService) { }

  ngOnInit(): void {
    this.service.getRooms().subscribe(actionArray4 =>{
      this.service.rooms = actionArray4.map(item4 =>{
        return {
          id : item4.payload.doc.id,
          ...item4.payload.doc.data() as Room
        } as Room;
      })
      this.refreshAvailableRooms();
    });
  }

  refreshAvailableRooms(){
      this.ACB1Rooms = [];
      this.ACB2Rooms = [];
      this.ACB3Rooms = [];
      this.ACB1Rooms = this.service.getRoomacrdBuil(1);
      this.ACB2Rooms = this.service.getRoomacrdBuil(2);
      this.ACB3Rooms = this.service.getRoomacrdBuil(3);
  }
  
}
