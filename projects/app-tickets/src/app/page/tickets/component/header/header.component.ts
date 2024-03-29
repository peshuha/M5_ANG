import {Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges} from '@angular/core';
import {MenuItem, MenuItemCommandEvent} from "primeng/api";
import {AuthService} from "lib-auth";
import {ActivatedRoute, Router} from "@angular/router";
import {Location} from "@angular/common";
import {UserService} from "../../../../service/user/user.service";
import {MenuType} from "../../../../model/imenu-type";
import {SearchStringService} from "../../service/search-string/search-string.service";

@Component({
  selector: 'sb-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy, OnChanges{

  @Input() mnuType: MenuType = "normal"
  @Output() OnSearch: EventEmitter<string> = new EventEmitter<string>()

  items: MenuItem[] | undefined;
  login = ""
  dtNow: number = Date.now();
  timer: number = 0;
  is_search = false

  constructor(
    private user: UserService,
    private auth: AuthService,
    private router: Router,
    private aroute: ActivatedRoute,
    private location: Location,
    private svcSearchString: SearchStringService
  ) {
    this.timer = setInterval(() => {
      this.dtNow = Date.now()
    }, 1000)
  }

  ngOnInit() {
    console.log("ngOnInit()", this.user.getUser()?.login)
    this.login = this.user.getUser()?.login || ""
    this.menuBuild()
  }

  ngOnDestroy(): void {
    if(this.timer) {
      clearInterval(this.timer)
      this.timer = 0
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.menuBuild()
  }

  OnSearchChange(e: Event) {
    const search = (e.target as HTMLInputElement).value
    this.OnSearch.emit(search)
    this.svcSearchString.setSearch(search)
  }

  private menuBuild() {
    this.items = [
      {
        label: 'Туры',
        routerLink: "tickets-list",
        icon: 'pi pi-fw pi-file'
      },
      this.mnuType === "extended" ? {
        label: 'Настройки',
        icon: 'pi pi-fw pi-cog',
        routerLink: "settings",
      } : {},
      {
        label: 'Поиск',
        icon: 'pi pi-fw pi-search',
        command: event => this.SearchToggle()
      },
      {
        label: 'Выход',
        icon: 'pi pi-fw pi-power-off',
        command: event => this.Logout()
      }
    ];
  }

  SearchToggle() {
    this.is_search = !this.is_search
  }

  Logout() {
    console.log("Logout", this.aroute)
    console.log("root", this.aroute.root)
    this.auth.SingOut()
    this.router.navigate(["/auth"], {relativeTo: this.aroute})
  }
}
