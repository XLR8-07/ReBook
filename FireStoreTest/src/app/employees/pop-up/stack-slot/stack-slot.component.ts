import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { EmployeeService } from 'src/app/shared/employee.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { MatDialogRef } from '@angular/material/dialog';
import { Faculty } from 'src/app/shared/faculty.model';
import { Course } from 'src/app/shared/course.model';
import { Room } from 'src/app/shared/room.model';

@Component({
  selector: 'app-stack-slot',
  templateUrl: './stack-slot.component.html',
  styleUrls: ['./stack-slot.component.css']
})
export class StackSlotComponent implements OnInit {

  DAYS : string[] = ['MON', 'TUE', 'WED', 'THU', 'FRI'];
  ACBUILS: number[] = [1,2,3];
  roomsAcrdACBUIL : number [] = [];
  DayControl = new FormControl('',Validators.required);
  ACBUILControl = new FormControl('',Validators.required);
  CourseControl = new FormControl('',Validators.required);
  FacultyControl = new FormControl('',Validators.required);

  
  
  constructor(public service: EmployeeService, private fireStore: AngularFirestore, private toastr: ToastrService,  private dialogRef: MatDialogRef<StackSlotComponent>) { }


  ngOnInit(): void {
    this.service.getFaculties().subscribe(actionArray1 =>{
      this.service.faculties = actionArray1.map(item1 =>{
        return{
          id : item1.payload.doc.id,
          ...item1.payload.doc.data() as Faculty
        } as Faculty;
      })
    });

    this.service.getCourses().subscribe(actionArray5 =>{
      this.service.courses = actionArray5.map(item5 => {
        return{
          id: item5.payload.doc.id,
          ...item5.payload.doc.data() as Course
        } as Course;
      })
    });
  }

  getROOMS(acbuil : number){
    this.roomsAcrdACBUIL = [] ;
    this.service.getRooms().subscribe(actionArray4 =>{
      this.service.rooms = actionArray4.map(item4 =>{
        return {
          id : item4.payload.doc.id,
          ...item4.payload.doc.data() as Room
        } as Room;
      })
      for(var room of this.service.rooms){
        if(room.ACBUIL == acbuil){
          this.roomsAcrdACBUIL.push(room.RoomNo);
        }
      }
    });
  }

  onSubmit()
  {
    
    let data = Object.assign({}, this.service.inputRoutineForm.value);
    delete data.id;
    this.fireStore.doc('Routine/'+this.service.UpdatingID).update(data).then(()=>{
      this.service.onSubmit();
      this.dialogRef.close();
    });
  }

}
