import {Component} from '@angular/core';
import {Event} from '../../../model/Event';
import {EventService} from '../../../services/event.service';
import {Router} from '@angular/router';

@Component({
  moduleId: module.id,
  selector: 'eventoverview',
  templateUrl: `eventoverview.component.html`,
  styleUrls: [`eventoverview.component.css`]
})
export class EventoverviewComponent {

  events: Event[];
  event: Event;

  constructor(private eventService: EventService, private router: Router) {
    this.eventService.getEvents()
      .subscribe(events => {
        this.events = events;
        console.log(this.events);
      });
  }

  onCreate() {
    this.event = {
      title: "",
      start: "",
      end: ""
    };
    this.eventService.event = this.event;
    this.router.navigate(['./eventdetail']);
  }

  onEdit(event: Event) {
    this.eventService.event = event;
    this.router.navigate(['./eventdetail']);
  };

}
