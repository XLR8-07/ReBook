import { Component, OnInit } from '@angular/core';
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { LoginComponent } from './login/login.component';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
  }

  GuestClick(){
    console.log("LOGGED IN AS GUEST!");
  }

  EditorClick(){
    console.log("LOGGED IN AS EDITOR!");

    const dialogconfig = new MatDialogConfig();
    dialogconfig.disableClose = false;
    dialogconfig.autoFocus = true;
    dialogconfig.width = "30%";
    
    this.dialog.open(LoginComponent,dialogconfig);
  }

}
