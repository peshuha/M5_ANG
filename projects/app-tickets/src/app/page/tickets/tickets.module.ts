import { NgModule } from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';

import { TicketsRoutingModule } from './tickets-routing.module';
import {AsideComponent} from "./component/aside/aside.component";
import {FooterComponent} from "./component/footer/footer.component";
import {HeaderComponent} from "./component/header/header.component";
import { TicketsComponent } from './tickets.component';
import {MenubarModule} from "primeng/menubar";
import {InputTextModule} from "primeng/inputtext";
import { TicketsListComponent } from './component/tickets-list/tickets-list.component';
import {TicketRestService} from "./service/rest/ticket-rest.service";
import {TicketService} from "./service/ticket/ticket.service";
import {FormsModule} from "@angular/forms";
import { ToursPipe } from './pipe/tours/tours.pipe';
import {DropdownModule} from "primeng/dropdown";
import {HttpClientModule} from "@angular/common/http";
import {MenuType} from "../../model/imenu-type";
import {ItemsSelectorDirective} from "../../directive/items-selector.directive";
import { SettingsComponent } from './component/settings/settings.component';
import {SearchStringService} from "./service/search-string/search-string.service";
import { TicketInfoComponent } from './component/module/ticket-info/ticket-info/ticket-info.component';


@NgModule({
  declarations: [
    AsideComponent,
    FooterComponent,
    HeaderComponent,
    TicketsComponent,
    TicketsListComponent,
    ToursPipe,
    ItemsSelectorDirective,
    SettingsComponent,
    TicketInfoComponent
  ],
  imports: [
    CommonModule,
    TicketsRoutingModule,
    MenubarModule,
    InputTextModule,
    FormsModule,
    DropdownModule,
    HttpClientModule,
    NgOptimizedImage,
  ],
  providers: [
    TicketRestService,
    TicketService,
    SearchStringService
  ]
})
export class TicketsModule {
}
