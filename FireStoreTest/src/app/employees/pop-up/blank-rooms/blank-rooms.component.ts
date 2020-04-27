import { Component, OnInit } from '@angular/core';
import { EmployeeService } from 'src/app/shared/employee.service';
import { Room } from 'src/app/shared/room.model';

@Component({
  selector: 'app-blank-rooms',
  templateUrl: './blank-rooms.component.html',
  styleUrls: ['./blank-rooms.component.css']
})
export class BlankRoomsComponent implements OnInit {

  constructor(public service : EmployeeService) { }

  ngOnInit(): void {
    this.service.getRooms().subscribe(actionArray4 =>{
      this.service.rooms = actionArray4.map(item4 =>{
        return {
          id : item4.payload.doc.id,
          ...item4.payload.doc.data() as Room
        } as Room;
      })
    });
  }

  tab_click(x){
    console.log(x);
  }
}
