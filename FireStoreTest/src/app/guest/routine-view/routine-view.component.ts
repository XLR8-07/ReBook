import { Component, OnInit } from '@angular/core';
import { Routine } from 'src/app/shared/routine.model';
import { EmployeeService } from 'src/app/shared/employee.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-routine-view',
  templateUrl: './routine-view.component.html',
  styleUrls: ['./routine-view.component.css']
})
export class RoutineViewComponent implements OnInit {

  Routines: Routine[];
  slots: Routine[];
  arrTue: Routine[][];
  num: number[] = [1,2,3,4,5,6];
  num2: number[] = [1];
  dayRoutine : Routine [] = [];
  sortedRoutine : Routine [] = [];
  counter = 0;
  
  WED : Routine [];
  c : number =0;

  constructor(public service: EmployeeService, private firestore: AngularFirestore, private toastr: ToastrService
    , private dialog : MatDialog) { }

  ngOnInit(): void {
    this.refreshRoutine();
  }

  refreshRoutine(){
    this.service.getRoutines().subscribe(actionArray3 => {
      this.service.blocks = actionArray3.map(item3 => {
        return {
          id: item3.payload.doc.id,
          ...item3.payload.doc.data() as Routine
        } as Routine;
      });
    });
    this.service.onSubmit();
    
  }

  borderTracer(j : Routine , i : Routine[]){
    var index : number;
    var flag : boolean = false;
    if(i[0] == j){
      return "#FFF";
    }
    return "#DDD";
  }

}
