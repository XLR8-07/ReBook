import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeListComponent } from './employees/employee-list/employee-list.component';
import { EmployeeComponent } from './employees/employee/employee.component';
import { EmployeesComponent } from './employees/employees.component';
import { AdminComponent } from './admin/admin.component';
import { AppComponent } from './app.component';

const routes : Routes = [
  {path: '' , component: AdminComponent},
  {path: 'app' ,component: EmployeesComponent},
  {path: 'employee-list' , component: EmployeeListComponent},
  {path : 'employee', component : EmployeeComponent}
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
