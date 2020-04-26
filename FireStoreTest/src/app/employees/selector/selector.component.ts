import { Component, OnInit } from '@angular/core';
import { EmployeeService } from 'src/app/shared/employee.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { ToastrService } from 'ngx-toastr';
import { Departments } from 'src/app/shared/departments.model';
import { Routine } from 'src/app/shared/routine.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-selector',
  templateUrl: './selector.component.html',
  styleUrls: ['./selector.component.css']
})
export class SelectorComponent implements OnInit {

  Depts: Departments[];
  Sections: string[];
  TUES2D
  dept: string;
  Semesters: number[] = [1, 2, 3, 4, 5, 6, 7, 8];
  constructor(private service: EmployeeService, private firestore: AngularFirestore, private toastr: ToastrService, private router: Router) { 
  }

  ngOnInit(): void {
    this.service.getDepts().subscribe(actionArray => {
      this.Depts = actionArray.map(item => {
        return {
          id: item.payload.doc.id,
          ...item.payload.doc.data() as Departments
        } as Departments;
      })
    });

    this.service.getRoutines().subscribe(actionArray3 => {
      this.service.blocks = actionArray3.map(item3 => {
        return {
          id: item3.payload.doc.id,
          ...item3.payload.doc.data() as Routine
        } as Routine;
      });
    });
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

  setDept(Dept) {
    this.dept = Dept;
    this.service.s_Dept = Dept;
    for (var sec of this.Depts) {
      if (sec.Name == Dept) {
        this.Sections = sec.Sections;
      }
    }
  }

  setSec(Sec) {
    this.service.s_Sec = Sec;
  }

  setSem(Sem) {
    this.service.s_Sem = Sem;
  }

  onSubmit() {
    this.service.onSubmit();
  }

}
