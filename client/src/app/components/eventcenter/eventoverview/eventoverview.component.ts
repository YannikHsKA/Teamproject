import {Component} from '@angular/core';
import {Event} from '../../../model/Event';
import {EventService} from '../../../services/event.service';
import {Router} from '@angular/router';
import {Bundle} from "../../../model/Bundle";

@Component({
  moduleId: module.id,
  selector: 'eventoverview',
  templateUrl: `eventoverview.component.html`,
  styleUrls: [`eventoverview.component.css`]
})
export class EventoverviewComponent {

  events: Event[];
  event: Event;
  bundles: Bundle[];
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
    this.bundles = new Array();
    var bundle0 : Bundle = {
      title: "Please edit the bundle",
      description :"descr of bundle 1",
      picture:"url",
      bundleId: 0
    }
    var bundle1 : Bundle = {
      title: "Please edit the bundle",
      description :"descr of bundle 1",
      picture:"url",
      bundleId: 1
    }
    this.bundles[0] = bundle0;
    this.bundles[1] = bundle1;

    this.event = {
      title: "",
      start: "",
      end: "",
      bundles: this.bundles
    };

    this.safebuttonclicked = true;
    this.eventService.safebuttonclicked = this.safebuttonclicked;
    this.eventService.event = this.event;
    this.router.navigate(['./eventdetail']);
  }

  onEdit(event: Event) {
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
