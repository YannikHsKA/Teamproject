import { Component } from '@angular/core';
import { Event } from '../../../model/Event';
import { EventService } from '../../../services/event.service'

@Component({
  moduleId: module.id,
  selector: 'eventoverview',
  templateUrl: `eventoverview.component.html`,
  styleUrls: [`eventoverview.component.css`]
})
export class EventoverviewComponent  {

  events: Event[];

  /*constructor(private eventService: EventService){
      this.eventService.getEvents()
        .subscribe(events => {
          this.events = events;
        })
  }*/

}
