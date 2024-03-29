import { Injectable } from '@angular/core';
import {TicketRestService} from "../rest/ticket-rest.service";
import {Observable, ReplaySubject} from "rxjs";
import {ITour} from "../../../../model/itour";

@Injectable()
export class TicketService {

  // Кэшируем (пока) туры
  private tours: ITour[] | null = null
  // Создаем подписной объект для получателя
  private sbjTours: ReplaySubject<ITour[]> = new ReplaySubject<ITour[]>();

  constructor(
    private rest: TicketRestService
  ) { }

  getTickets(): Observable<ITour[]> {
    // Загружаем
    this.LoadTours()
    // Отдаем подписку
    return this.sbjTours
  }

  public getTicket(id: string | null): ITour | null {
    if(!id || !this.tours) {
      return null
    }

    return this.tours.find((tour) => tour.id.toLowerCase() === id.toLowerCase()) || null
  }

  private LoadTours() {
    // Избегаем повторных вызовов
    if(this.tours) {
      return
    }

    this.tours = []
    this.rest.getTickets().subscribe((data) => {
      this.tours = data
      // Публикуем появление данных
      this.sbjTours.next(this.tours)
    })
  }
}
