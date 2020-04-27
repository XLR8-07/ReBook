import { Injectable } from '@angular/core';
import { Employee } from './employee.model';
import { AngularFirestore } from '@angular/fire/firestore';
import { Routine } from './routine.model';
import { ToastrService } from 'ngx-toastr';
import { Faculty } from './faculty.model';
import { Course } from './course.model';
import { Room } from './room.model';
import { Subject, Observable } from 'rxjs';
import { FormGroup, FormControl, Validators } from "@angular/forms";


@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  formData :Employee;
  routineFormData : Routine;
  s_Dept : string;
  s_Sec : string;
  s_Sem : number;
  f_Day : string = '';
  list = [];
  blocks : Routine[] = [];
  faculties : Faculty[];
  courses : Course[];
  rooms : Room[];
  RoomacrdBuil : number[];
  ButtonValue : boolean = false;
  listeners = new Subject<any>();

  inputRoutineForm : FormGroup = new FormGroup({
      ACBUIL : new FormControl('' , Validators.required),
      COURSE : new FormControl('' , Validators.required),
      DAY : new FormControl('' , Validators.required),
      DEPT : new FormControl(''),
      FACULTY : new FormControl('' , Validators.required),
      ROOM : new FormControl(null, Validators.required),
      SECTION : new FormControl(''),
      SEM : new FormControl(null),
      SPAN : new FormControl(null , Validators.required),
      START_HOUR : new FormControl(null , Validators.required),
      START_MIN : new FormControl(null, Validators.required)
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

  insertNewRoutine(routine : Routine){
    this.firestore.collection('Routine').add(routine).then(()=>{
      this.onSubmit();
    });
  }  
  onSubmit() {
    this.intializeForm(this.f_Day);
    this.refresh();
    this.getSlots();
    if(this.s_Dept != null && this.s_Sec != null && this.s_Sem != null){
      this.ButtonValue = true;
    }
    else{
      this.ButtonValue = false;
    }  //Routine showing

    for (var value of this.blocks) {
      if (value.DAY == 'MON') {
        this.MONList.push(value);
      }
      else if (value.DAY == 'TUE') {
        this.TUEList.push(value);
      }
      else if (value.DAY == 'WED') {
        this.WEDList.push(value);
      }
      else if (value.DAY == 'THU') {
        this.THUList.push(value);
      }
      else if (value.DAY == 'FRI') {
        this.FRIList.push(value);
      }
    }
    this.SlotsofMON = this.SlotProducer(this.MONList, 'MON');
    this.SlotsofTUE = this.SlotProducer(this.TUEList, 'TUE');
    this.SlotsofWED = this.SlotProducer(this.WEDList, 'WED');
    this.SlotsofTHU = this.SlotProducer(this.THUList, 'THU');
    this.SlotsofFRI = this.SlotProducer(this.FRIList, 'FRI');
  }

  SlotProducer(ArrayOfSlots: Routine[], dayOfWeek: string) {
    var tempList: Routine[] = [];
    var SlotsofDAY: Routine[][] = [];

    var srtH, srtM: number;

    if (ArrayOfSlots.length == 0) {
      var HourGap: number = 17 - 8;
      var MinGap: number = 0;
      var GenGapSpan: number = (HourGap * 60 + MinGap) / 25;

      tempList.push(this.GenBlankItem(GenGapSpan, 8, 0, dayOfWeek));
      SlotsofDAY.push(tempList);
      tempList = [];
    }


    else {
      if (ArrayOfSlots[0].START_HOUR != 8) {
        var HourGap: number = ArrayOfSlots[0].START_HOUR - 8;
        var MinGap: number = ArrayOfSlots[0].START_MIN;
        var GenGapSpan: number = (HourGap * 60 + MinGap) / 25;

        tempList.push(this.GenBlankItem(GenGapSpan, 8, 0, dayOfWeek));
        SlotsofDAY.push(tempList);
        tempList = [];
      }

      for (let i = 0; i < ArrayOfSlots.length; i++) {
        var tempForJ = i;
        for (let j = i; j < ArrayOfSlots.length; j++) {
          if (ArrayOfSlots[i].START_HOUR == ArrayOfSlots[j].START_HOUR && ArrayOfSlots[i].START_MIN == ArrayOfSlots[j].START_MIN) {
            tempList.push(ArrayOfSlots[j]);
            tempForJ = j;

          }
        }

        i = tempForJ;
        // console.log(i);
        SlotsofDAY.push(tempList);
        tempList = [];

        if (i < ArrayOfSlots.length - 1) {
          var HourGap: number = ArrayOfSlots[i + 1].START_HOUR - ArrayOfSlots[i].START_HOUR;
          var MinGap: number = ArrayOfSlots[i + 1].START_MIN - ArrayOfSlots[i].START_MIN;
          var GenGapSpan: number = (HourGap * 60 + MinGap) / 25;
          //console.log("Before Minus : "+GenGapSpan)
          GenGapSpan = GenGapSpan - ArrayOfSlots[i].SPAN;

          //console.log(GenGapSpan);

          if (GenGapSpan > 0) {

            //starting min & hours for blank slots
            srtH = ArrayOfSlots[i].START_HOUR + Math.floor((ArrayOfSlots[i].SPAN * 25) / 60);
            srtM = ArrayOfSlots[i].START_MIN + ((ArrayOfSlots[i].SPAN * 25) % 60);

            if (srtM > 59) {
              srtH = srtH + 1;
              srtM = srtM - 60;
            }
            //-----------

            tempList.push(this.GenBlankItem(GenGapSpan, srtH, srtM, dayOfWeek));
            SlotsofDAY.push(tempList);
            tempList = [];
          }
        }
      }

      var HourGap: number = 17 - ArrayOfSlots[ArrayOfSlots.length - 1].START_HOUR;
      var MinGap: number = 0 - ArrayOfSlots[ArrayOfSlots.length - 1].START_MIN;
      var GenGapSpan: number = (HourGap * 60 + MinGap) / 25;
      GenGapSpan = GenGapSpan - ArrayOfSlots[ArrayOfSlots.length - 1].SPAN;
      //console.log("Ending : "+GenGapSpan);

      if (GenGapSpan > 0) {
        //starting min & hours for blank slots
        srtH = ArrayOfSlots[ArrayOfSlots.length - 1].START_HOUR + Math.floor((ArrayOfSlots[ArrayOfSlots.length - 1].SPAN * 25) / 60);
        srtM = ArrayOfSlots[ArrayOfSlots.length - 1].START_MIN + ((ArrayOfSlots[ArrayOfSlots.length - 1].SPAN * 25) % 60);

        if (srtM > 59) {
          srtH = srtH + 1;
          srtM = srtM - 60;
        }
        //-----------

        tempList.push(this.GenBlankItem(GenGapSpan, srtH, srtM, dayOfWeek));
        SlotsofDAY.push(tempList);
        tempList = [];
      }
    }

    return SlotsofDAY;
  }

  GenBlankItem(GenGapSpan: number, SrtH: number, SrtM: number, Pday: string) {
    var tempRoutine: Routine = {
      id: null,
      ACBUIL: null,
      COURSE: '',
      DAY: Pday,
      DEPT: '',
      FACULTY: '',
      ROOM: null,
      SECTION: '',
      SEM: null,
      SPAN: GenGapSpan,
      START_HOUR: SrtH,
      START_MIN: SrtM
    }
    return tempRoutine;
  }

  refresh() {
    this.MONList = [];
    this.TUEList = [];
    this.WEDList = [];
    this.THUList = [];
    this.FRIList = [];
  }

  intializeForm(Day : string){
    this.inputRoutineForm.setValue({
      ACBUIL : '' ,
      COURSE : '' , 
      DAY : Day , 
      DEPT : this.s_Dept,
      FACULTY : '' ,
      ROOM : null,
      SECTION : this.s_Sec,
      SEM : this.s_Sem,
      SPAN : null,
      START_HOUR : null ,
      START_MIN : null
    });
  }
}
