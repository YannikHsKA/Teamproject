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

  constructor(private eventService: EventService, private router: Router, private storage: SessionStorageService) {
    document.body.style.backgroundImage = "url('src/assets/admin.jpg')";
    document.body.style.backgroundPosition = "center center";
    document.body.style.backgroundRepeat = "no-repeat";
    document.body.style.backgroundAttachment = "fixed";
    document.body.style.backgroundSize = "cover";

    this.eventService.getEvents()
      .subscribe(events => {
        this.events = events;
      });

  }
  onCreate() {
    this.storage.clear();
    this.storage.store('mode', 'create');
    this.router.navigate(['./eventdetail']);
  }

  onPublish(event: Event) {
    this.eventService.updateCurrentEvent(event);
    this.storage.clear();
    this.eventService.createPdf(event);
    this.storage.store('event', event);

    var that = this;
    function doBoth() {

      document.getElementById("closemodal").click();
      that.router.navigate(['./notificationcenter']);
    }
    setTimeout(doBoth, 5500);

  }

  onEdit(event: Event) {
    this.storage.clear();
    this.storage.store('mode', 'edit');
    this.storage.store('bundle_id', 0);
    this.eventService.event = event;
    this.router.navigate(['./eventdetail']);
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
