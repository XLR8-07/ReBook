import { Injectable } from '@angular/core';
import { User } from './user.model';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  private checkRole(user: User){
    if (!user) return false
    else if(user.Role == "Editor")  return true
    else return false
  }
}
