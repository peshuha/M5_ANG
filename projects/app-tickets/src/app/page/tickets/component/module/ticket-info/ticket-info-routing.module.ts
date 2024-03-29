import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {TicketInfoComponent} from "./ticket-info/ticket-info.component";

const routes: Routes = [
  {
    path: "",
    component: TicketInfoComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TicketInfoRoutingModule { }
