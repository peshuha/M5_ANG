import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "lib-auth";
import {MessageService} from "primeng/api";

@Component({
  selector: 'sb-sign',
  templateUrl: './sign.component.html',
  styleUrl: './sign.component.scss'
})
export class SignComponent implements OnInit{
  public login: string | null = "";
  public password: string | null = "";
  public card: string | null = "";
  public has_card = false;
  public error_message: string = "";

  constructor(
    private authService: AuthService,
    private msgService: MessageService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.login = this.authService.GetSavedLogin()
  }

  OnClick() {
    this.error_message = ""
    try {
      this.authService.Authorize(this.login, this.password)
      this.msgService.add({ severity: 'success', summary: 'Успешно!', detail: `Добро пожаловать, ${this.login}`})
      this.router.navigate(["tickets"])
    }
    // @ts-ignore
    catch (e: Error) {
      this.msgService.add({ severity: 'error', summary: 'Error!', detail: e.message})
      this.error_message = e.message
    }
  }
}
