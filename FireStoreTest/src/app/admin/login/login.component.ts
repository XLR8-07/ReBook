import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  LoginForm: FormGroup = new FormGroup({
    UserID : new FormControl('',Validators.required),
    Password : new FormControl('',Validators.required),
});

  constructor(private router: Router,private dialogRef: MatDialogRef<LoginComponent>) { }

  ngOnInit(): void {
  }

  onSubmit(){
    console.log("FORM SUBMITTED!");
    this.router.navigate(['app']);
    this.dialogRef.close();
  }
}
