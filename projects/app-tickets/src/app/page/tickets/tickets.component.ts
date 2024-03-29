import {Component} from '@angular/core';
import {MenuType} from "../../model/imenu-type";

@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.component.html',
  styleUrl: './tickets.component.scss'
})
export class TicketsComponent{

  mnuType: MenuType = "normal";
  search = ""

  OnMenuTypeSelect(tp: MenuType) {
    console.log("OnMenuTypeSelect", tp)
    this.mnuType = tp;
  }

  OnSearchChange(search: string) {
    this.search = search;
  }
}
