import { Injectable } from '@angular/core';
import {LocalStorageService} from 'lib-common'
import {IUser} from "./iuser";
import {log} from "@angular-devkit/build-angular/src/builders/ssr-dev-server";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private CONST_KEY_STORAGE_LOGIN: string = "_login"
  private CONST_KEY_STORAGE_TOKEN: string = "_token"
  private CONST_KEY_STORAGE_USERS: string = "_users"
  private login: string = ""

  constructor(
    private storageService: LocalStorageService
  ) {
  }

  public IsSingIn(): boolean{
    return !!this.storageService.getItem(this.CONST_KEY_STORAGE_TOKEN)
  }

  public GetSavedLogin(): string | null {
    return this.storageService.getItem(this.CONST_KEY_STORAGE_LOGIN)
  }

  public Authorize(login: string | null, password: string | null, save: boolean = false): void|never {

    if(!login) {
      throw  new Error("login is empty")
    }

    // Получаем users
    const users: IUser[] | never = JSON.parse(this.storageService.getItem(this.CONST_KEY_STORAGE_USERS) || "")

    if(!users?.find(user => user.login === login)) {
      throw new Error("login incorrect")
    }

    if(!users?.find(user => user.login === login && user.password === password)) {
      throw new Error("wrong password")
    }

    this.login = login || "";
    this.storageService.setItem(this.CONST_KEY_STORAGE_TOKEN, "Ok")

    if(this.login !== this.GetSavedLogin()) {

      this.storageService.removeItem(this.CONST_KEY_STORAGE_LOGIN)
      if(save) {
        this.storageService.setItem(this.CONST_KEY_STORAGE_LOGIN, this.login)
      }
    }
  }

  public SingOut(): void {
    console.log("SingOut")
    this.login = ""
    this.storageService.removeItem(this.CONST_KEY_STORAGE_TOKEN)
  }
  public GetLogin(): string | null {
    return this.storageService.getItem(this.CONST_KEY_STORAGE_LOGIN);
  }

  public Register(login:string, password: string, email: string, save: boolean): void {

    console.log("auth.register")

    if(!login) {
      throw  new Error("login is empty")
    }

    if(!password) {
      throw  new Error("password is empty")
    }

    // Получаем users
    const data = this.storageService.getItem(this.CONST_KEY_STORAGE_USERS)
    let users: IUser[] = [];
    if(data) {
      users = <IUser[]>JSON.parse(data)
    }

    // Запоминаем нового участника
    this.storageService.setItem(this.CONST_KEY_STORAGE_USERS, JSON.stringify([
      ...users.filter(user => user.login !== login)
      , <IUser>{
        login,
        password,
        email
      }
      ]))

    this.Authorize(login, password, save)
  }
}
