import {
  AfterContentInit, AfterViewChecked,
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
  ViewChild
} from '@angular/core';
import {TicketService} from "../../service/ticket/ticket.service";
import {ITour} from "../../../../model/itour";
import {SearchStringService} from "../../service/search-string/search-string.service";
import {Observable, ReplaySubject} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";
import {ItemsSelectorDirective} from "../../../../directive/items-selector.directive";


@Component({
  selector: 'sb-tickets-list',
  templateUrl: './tickets-list.component.html',
  styleUrl: './tickets-list.component.scss',

})
export class TicketsListComponent implements OnInit, OnDestroy, AfterViewInit, AfterContentInit, AfterViewChecked {

  inloading = true
  tickets: ITour[] | undefined;
  tourFilter: Observable<string> | undefined
  elActivator: ReplaySubject<string> = new ReplaySubject<string>();

  @ViewChild("diSelector", {read: ItemsSelectorDirective, static: false}) diSelector?: ItemsSelectorDirective;
  // @ViewChild(ItemsSelectorDirective) diSelector2?: ItemsSelectorDirective;

  constructor(
    private svcTickets: TicketService,
    private svcSearch: SearchStringService,
    private router: Router,
    private aroute: ActivatedRoute,
    private changeDetector : ChangeDetectorRef
  ) {
  }
  ngOnInit(): void {
    this.svcTickets.getTickets().subscribe((data) => {
      this.tickets = data
      this.inloading = false
    })

    // Подписываемся на получение строки-фильтра
    this.tourFilter = this.svcSearch.getSearch()

    // Используем активацию директивы
    this.elActivator.subscribe((id: string) => {
      console.log("elActivator.subscribe", id)
      this.router.navigate(["../ticket", id], {relativeTo: this.aroute})
    })
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      console.log("TicketsListComponent::ngAfterViewInit()", this.diSelector)
      if(this.diSelector) {
        this.diSelector?.ContainerClassRemove("bgBlue")
        this.diSelector?.ContainerClassAdd("bgRed")
      }

    }, 0)
  }
  ngAfterContentInit(): void {
    if(this.diSelector) {
      this.diSelector?.ContainerClassRemove("bgBlue")
      this.diSelector?.ContainerClassRemove("bgRed")
      this.diSelector?.ContainerClassAdd("bgYellow")
    }
  }

  ngOnDestroy(): void {
    this.elActivator.unsubscribe()
  }

  // Используем активацию своим методом чз DoubleClick
  OnDoubleClick(ticket: ITour) {
    console.log("OnDoubleClick(e:Event)", ticket.id)
    this.router.navigate(["../ticket", ticket.id], {relativeTo: this.aroute})
  }

  OnItemSelectorInitialize() {
    console.log("TicketsListComponent::OnItemSelectorInitialize()", this.diSelector)
    this.diSelector?.ContainerClassRemove("bgRed")
    this.diSelector?.ContainerClassAdd("bgBlue")

  }

  ngAfterViewChecked(): void {
    this.changeDetector.detectChanges()
  }

 }
