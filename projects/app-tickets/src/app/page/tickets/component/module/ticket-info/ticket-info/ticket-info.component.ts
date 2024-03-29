import {Component, OnInit} from '@angular/core';
import {TicketService} from "../../../../service/ticket/ticket.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ITour} from "../../../../../../model/itour";

@Component({
  selector: 'app-ticket-info',
  templateUrl: './ticket-info.component.html',
  styleUrl: './ticket-info.component.scss'
})
export class TicketInfoComponent implements OnInit{

  tour: ITour | null = null
  constructor(
    private svcTickets: TicketService,
    private router: Router,
    private aroute: ActivatedRoute
  ) {
  }

  ngOnInit(): void {

    const id = this.aroute.snapshot.paramMap.get("id")
    this.tour = this.svcTickets.getTicket(id)
    if(!this.tour) {
      this.router.navigate(["/unknown"])
    }
  }

}
