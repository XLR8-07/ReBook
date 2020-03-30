import { Component, OnInit } from '@angular/core';
import { EmployeeService } from 'src/app/shared/employee.service';
import { Employee } from 'src/app/shared/employee.model';
import { AngularFirestore } from '@angular/fire/firestore';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {

  list : Employee[]
  constructor(private service : EmployeeService, private firestore: AngularFirestore, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.service.getEmployees().subscribe(actionArray =>{
      this.list = actionArray.map(item =>{
        return {
          id : item.payload.doc.id,
          ...item.payload.doc.data() as Employee
        } as Employee;
      })

      /*this.service.getEmployees().subscribe(actionArray =>{
        this.list = actionArray.map(item =>{
          return item.payload.doc.data() as Employee 
        });*/

    });
  }

  onEdit(emp:Employee){
    //this.service.formData = Object.assign({},emp);
    this.service.formData = emp;
  }

  onDelete(id:string)
  {
    if(confirm("ARE YOU SURE TO DELETE?")){
      this.firestore.doc('employees/'+id).delete();
      this.toastr.warning("DELETED SUCCESSFULLY!!","Registration");
    }
  }

}
