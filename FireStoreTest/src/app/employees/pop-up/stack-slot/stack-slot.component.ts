import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { EmployeeService } from 'src/app/shared/employee.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { MatDialogRef } from '@angular/material/dialog';

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
