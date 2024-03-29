import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {IMenuType, MenuType} from "../../../../model/imenu-type";
import {DropdownChangeEvent} from "primeng/dropdown";

@Component({
  selector: 'sb-aside',
  templateUrl: './aside.component.html',
  styleUrls: ["./aside.component.scss"]
})
export class AsideComponent implements OnInit{

  menu: IMenuType[] = []
  selectedMenu: IMenuType | null = null;
  @Output() mnuChanged: EventEmitter<MenuType> = new EventEmitter<MenuType>()

  ngOnInit(): void {
    this.menu = [
      {type: "normal", label: "Обычный"},
      {type: "extended", label: "Расширенный"}
    ]
    this.selectedMenu = this.menu[0];
  }

  OnChange(event: DropdownChangeEvent) {
    console.log("OnChange(event: DropdownChangeEvent)", (event.value as IMenuType).type)
    console.log("selectedMenu", this.selectedMenu)
    this.mnuChanged.emit((event.value as IMenuType).type)
  }
}
