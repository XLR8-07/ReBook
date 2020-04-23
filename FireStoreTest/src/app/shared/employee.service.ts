import { Injectable } from '@angular/core';
import { Employee } from './employee.model';
import { AngularFirestore } from '@angular/fire/firestore';
import { Routine } from './routine.model';
import { ToastrService } from 'ngx-toastr';
import { Faculty } from './faculty.model';
import { Course } from './course.model';
import { Room } from './room.model';
import { Subject } from 'rxjs';
import { FormGroup, FormControl } from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  formData :Employee;
  routineFormData : Routine;
  s_Dept : string;
  s_Sec : string;
  s_Sem : number;
  list = [];
  blocks : Routine[] = [];
  faculties : Faculty[];
  courses : Course[];
  rooms : Room[];
  RoomacrdBuil : number[];
  ButtonValue : boolean = false;
  listeners = new Subject<any>();

  inputRoutineForm : FormGroup = new FormGroup({
      $id : new FormControl(null),
      ACBUIL : new FormControl(''),
      COURSE : new FormControl(''),
      DAY : new FormControl(''),
      DEPT : new FormControl(''),
      FACULTY : new FormControl(''),
      ROOM : new FormControl(null),
      SECTION : new FormControl(''),
      SEM : new FormControl(null),
      SPAN : new FormControl(null),
      START_HOUR : new FormControl(null),
      START_MIN : new FormControl(null)
  });

  SlotsofMON : Routine[][] = [];
  SlotsofTUE : Routine[][] = [];
  SlotsofWED : Routine[][] = [];
  SlotsofTHU : Routine[][] = [];
  SlotsofFRI : Routine[][] = [];

  MONList : Routine[] = [];
  TUEList : Routine[] = [];
  WEDList : Routine[] = [];
  THUList : Routine[] = [];
  FRIList : Routine[] = [];
  RoutineRef: any;
  constructor(private firestore: AngularFirestore, private toastr : ToastrService) { }

  getFaculties()
  {
    return this.firestore.collection('Faculties').snapshotChanges();
  }

  getEmployees()
  {
    return this.firestore.collection('employees').snapshotChanges();
  }

  getRoutines()
  {
    //return this.firestore.collection('Routine').snapshotChanges();
    this.RoutineRef = this.firestore.collection<Routine>('Routine',ref => ref.orderBy('START_HOUR').orderBy('START_MIN'));
    return this.RoutineRef.snapshotChanges();
  }

  getDepts()
  {
    return this.firestore.collection('departments').snapshotChanges();
  }

  getRooms()
  {
    return this.firestore.collection('Rooms').snapshotChanges();
  }
  
  getCourses()
  {
    return this.firestore.collection('Courses').snapshotChanges();
  }
  
  getSlots()
  {
    
    this.getRoutines().subscribe(actionArray3 => {
      this.blocks = actionArray3.map(item3 => {
        return {
          id: item3.payload.doc.id,
          ...item3.payload.doc.data() as Routine
        } as Routine;
      });
    });

    this.list = [];
    for (var val of this.blocks){
      if(val.DEPT==this.s_Dept && val.SECTION == this.s_Sec && val.SEM == this.s_Sem){
        this.list.push(val);
        //console.log(val.FACULTY);
      }
    }
    
    if(this.list.length == 0)
    {
      this.toastr.warning("Create a Routine!!","NEW");
      this.blocks = this.list;
    }
    else{
      this.blocks = this.list;
      this.toastr.success("Selected Successfully!!","EDIT");
    }
      
  }

  getRoomacrdBuil(acbuil : number){
    this.RoomacrdBuil = [];
    for(var value of this.rooms){
      if(acbuil == value.ACBUIL)
        this.RoomacrdBuil.push(value.RoomNo);
    }
    return this.RoomacrdBuil;
  }
  
}
