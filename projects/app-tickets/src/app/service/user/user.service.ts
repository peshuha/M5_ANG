import { Injectable } from '@angular/core';
import {AuthService} from "lib-auth";
import {IUser} from "../../model/iuser";

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private user: IUser | null = null;
  constructor(private auth: AuthService) {
    this.user = {
      login:  <string>auth.GetLogin()
    }
  }

  getUser(): IUser | null {
    return this.user;
  }

  setUser(user: IUser): void {
    this.user = user;
  }
}
