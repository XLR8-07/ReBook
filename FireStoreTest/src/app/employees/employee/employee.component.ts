import { Component, OnInit } from '@angular/core';
import { EmployeeService } from 'src/app/shared/employee.service';
import { NgForm } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  constructor(public service: EmployeeService, private fireStore: AngularFirestore, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.resetForm();
  }

  resetForm(form?:NgForm)
  {
    if(form != null)
      form.resetForm();
    this.service.formData={
      id : null,
      fullName: '',
      empCode: '',
      postion: '',
      mobile: ''
    }
  }

  onSubmit(form: NgForm)
  {
    let data = Object.assign({},form.value);
    delete data.id;
    if(form.value.id == null)
      this.fireStore.collection('employees').add(data);
    else
      this.fireStore.doc('employees/'+form.value.id).update(data);  
    this.resetForm(form);
    this.toastr.success("INSERTED SUCCESSFULLY!!","Registration");
  }

}
