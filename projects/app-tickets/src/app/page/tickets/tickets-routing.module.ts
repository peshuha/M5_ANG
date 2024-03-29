import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {TicketsComponent} from "./tickets.component";
import {TicketsListComponent} from "./component/tickets-list/tickets-list.component";
import {authGuard} from "../../guard/auth.guard";
import {SettingsComponent} from "./component/settings/settings.component";
import {TicketInfoComponent} from "./component/module/ticket-info/ticket-info/ticket-info.component";

const routes: Routes = [
  {
    path: '', component:TicketsComponent,
    title: "Продажа туров",
    children: [
      {
        path: "ticket/:id",
        title: "Детальная инфо о туре",
        // pathMatch: "full"
        loadChildren: () => import("./component/module/ticket-info/ticket-info.module").then(m => m.TicketInfoModule)
      },
      {
        path: "tickets-list", component: TicketsListComponent,
        title: "Внимание распродажа!",
        // pathMatch: "full"
      },
      {
        path: "settings", component: SettingsComponent,
        title: "Подкрутим установки! ;)",
      }
    ],

  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TicketsRoutingModule { }
