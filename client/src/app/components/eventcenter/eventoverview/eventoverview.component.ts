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
  safebuttonclicked: boolean;

  constructor(private eventService: EventService, private router: Router) {
    this.eventService.getEvents()
      .subscribe(events => {
        this.events = events;
      });
    document.body.style.backgroundImage = "url('src/assets/admin.jpg')";
    document.body.style.backgroundPosition = "center center";
    document.body.style.backgroundRepeat = "no-repeat";
    document.body.style.backgroundAttachment = "fixed";
    document.body.style.backgroundSize = "cover";
  }

  onCreate() {
    this.event = {
      title: "",
      start: "",
      end: ""
    };

    this.safebuttonclicked = true;
    this.eventService.safebuttonclicked = this.safebuttonclicked;
    this.eventService.event = this.event;
    this.router.navigate(['./eventdetail']);
  }

  onEdit(event: Event) {
    console.log("event",event);
    this.eventService.event = event;
    this.router.navigate(['./eventdetail']);
  }

  onNotify(event: Event) {
    this.eventService.event = event;
    this.router.navigate(['./notificationcenter'])
  }

  onDelete(event: Event) {
    var events = this.events;

    this.eventService.deleteEvent(event)
      .subscribe((data => {
        for (var i = 0; i < events.length; i++) {
          if (events[i].id == event.id) {
            events.splice(i, 1);
          }
        }
      }))
  }

}
