import {Component} from '@angular/core';
import {Event} from '../../../model/Event';
import {EventService} from '../../../services/event.service';
import {Router} from '@angular/router';
import {LocalStorageService, SessionStorageService} from 'ng2-webstorage';
import {LocalStorage, SessionStorage} from 'ng2-webstorage';


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

  constructor(private eventService: EventService, private router: Router, private storage:SessionStorageService) {
    document.body.style.backgroundImage = "url('src/assets/admin.jpg')";
    document.body.style.backgroundPosition = "center center";
    document.body.style.backgroundRepeat = "no-repeat";
    document.body.style.backgroundAttachment = "fixed";
    document.body.style.backgroundSize = "cover";


    this.safebuttonclicked = false;
    this.eventService.safebuttonclicked = this.safebuttonclicked;

    this.eventService.getEvents()
      .subscribe(events => {
        console.log("eeveve",events);
        this.events = events;
      });

  }
  onCreate() {
    this.event = {
      title: "",
      start: "",
      end: "",
      bundles: [],
      articles: []
    }
    this.safebuttonclicked = true;
    this.storage.store('mode','create');
    this.eventService.safebuttonclicked = this.safebuttonclicked;
    this.eventService.event = this.event;
    this.router.navigate(['./eventdetail']);
  };
  onEdit(event: Event) {
    this.storage.store('mode','edit');
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
