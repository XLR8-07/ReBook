import { Component, OnInit } from '@angular/core';
import { EmployeeService } from 'src/app/shared/employee.service';
import { Employee } from 'src/app/shared/employee.model';
import { AngularFirestore } from '@angular/fire/firestore';
import { ToastrService } from 'ngx-toastr';
import { Routine } from 'src/app/shared/routine.model';
import { getTranslationDeclStmts } from '@angular/compiler/src/render3/view/template';
import { Room } from 'src/app/shared/room.model';


@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {

  list: Employee[];
  //blocks : Routine[];
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
  i; l; leftChain; rightChain;


  constructor(public service: EmployeeService, private firestore: AngularFirestore, private toastr: ToastrService) { }
  ngOnInit(): void {
    this.service.getEmployees().subscribe(actionArray2 => {
      this.list = actionArray2.map(item2 => {
        return {
          id: item2.payload.doc.id,
          ...item2.payload.doc.data() as Employee
        } as Employee;
      })

      /*this.service.getEmployees().subscribe(actionArray =>{
        this.list = actionArray.map(item =>{
          return item.payload.doc.data() as Employee 
        });*/

    });

    /*this.service.getRoutines().subscribe(actionArray3 => {
      this.service.blocks = actionArray3.map(item3 => {
        return {
          id: item3.payload.doc.id,
          ...item3.payload.doc.data() as Routine
        } as Routine;
      });
    });*/

    
    
  }

  /*onEdit(emp:Employee){
    //this.service.formData = Object.assign({},emp);
    this.service.formData = emp;
    
  }*/

  onEdit(routine: Routine) {
    this.service.getRoomacrdBuil(routine.ACBUIL);
    this.service.routineFormData = routine;
    //this.service.routineFormData = Object.assign({},routine);
  }

  /*onDelete(id:string)
  {
    if(confirm("ARE YOU SURE TO DELETE?")){
      this.firestore.doc('employees/'+id).delete();
      this.toastr.warning("DELETED SUCCESSFULLY!!","Registration");
    }
  }*/
  onDelete(id: string) {
    if (confirm("ARE YOU SURE TO DELETE?")) {
      this.firestore.doc('Routine/' + id).delete();
      this.toastr.warning("DELETED SUCCESSFULLY!!", "Registration");
    }
  }

  
  setCharAt(str, index, chr) {
    if (index > str.length - 1) return str;
    return str.substr(0, index) + chr + str.substr(index + 1);
  }


  /*sortRoutine(day : string){
    this.dayRoutine = [];
    this.sortedRoutine = [];
    //console.log(this.service.blocks.length);
    for(var routine of this.service.blocks){
      if(routine.DAY == day){
        this.dayRoutine.push(routine);
        //console.log('DAYROUTINE ',this.dayRoutine, this.counter);
        this.counter++;
      }
    }
    //this.sort(this.dayRoutine);
    //return this.sortedRoutine;
  }

  sort(array){
    this.sortedRoutine = [];
    console.log("fucntion call : " +this.counter);
    for(var a of array){
      for(var b of array){
        if(a.START_HOUR > b.START_HOUR){
          if(!this.find(this.sortedRoutine,a)){
            this.sortedRoutine.push(a);
          }
        }
        else{
          if(!this.find(this.sortedRoutine,b))
            this.sortedRoutine.push(b);
          }
        }
      }
    this.counter++;
    }

    find(array,a){
      var result = false;
      var araykeys = Object.keys(array);
      var akeys = Object.keys(a);
      for(var v1 of araykeys){
        for(var v2 of akeys){
          if(array[v1] == a[v2]){
            result = true;
          }
          else{
            result = false;
            break;
          }
        }
      }
      return result;
  }*/



}
  // sortMe(routine : Routine){
  //   for(let i = 0 ; i< routine.START.length ; i++){
  //     if (routine.START.charAt(i) == ':'){
  //       var st = this.setCharAt(routine.START, i, '.');
  //         this.carrier = {
  //           id: routine.id,
  //           ACBUIL: routine.ACBUIL,
  //           COURSE: routine.COURSE,
  //           DAY: routine.DAY,
  //           DEPT: routine.DEPT,
  //           FACULTY: routine.FACULTY,
  //           ROOM: routine.ROOM,
  //           SECTION: routine.SECTION,
  //           SEM: routine.SEM,
  //           SPAN: routine.SPAN,
  //           START: +st
  //         }
  //         this.carriers.push(this.carrier);
  //         console.log(this.carriers);
  //     }
  //   }
    
  // }


