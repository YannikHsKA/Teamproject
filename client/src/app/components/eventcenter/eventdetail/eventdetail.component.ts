import {Component} from '@angular/core';
import {Event} from "../../../model/Event";
import {Bundle} from "../../../model/Bundle";
import {EventService} from "../../../services/event.service";
import {BundleService} from "../../../services/bundle.service";
import {Router} from "@angular/router";

@Component({
  moduleId: module.id,
  selector: 'eventdetail',
  templateUrl: `eventdetail.component.html`,
  styleUrls: [`eventdetail.component.css`]
})
export class EventdetailComponent {

  event: Event;
  title: string;
  start: string;
  end: string;
  createMode: boolean;
  bundles: Bundle[];
  bundle: Bundle;
  safebuttonclicked: boolean;

  constructor(private eventService: EventService, private bundleService: BundleService, private router: Router) {
    this.event = this.eventService.event;
    this.safebuttonclicked = this.eventService.safebuttonclicked;

    if(this.safebuttonclicked == false)
    {

    this.bundleService.getBundles(this.event)
      .subscribe(bundles => {
        this.bundles = bundles;
      });

    if(this.event.title == ""){
      this.createMode = true;
    } else{
      this.createMode = false;
    }
  }
    else
    {
      this.bundles = new Array();
      var bundle0 : Bundle = {
        title: "Please edit the bundle",
        description :"descr von bundle 1",
        picture:"url",
        bundleId: 0
      }
      var bundle1 : Bundle = {
        title: "Please edit the bundle",
        description :"descr von bundle 1",
        picture:"url",
        bundleId: 1
      }
      this.bundles[0] = bundle0;
      this.bundles[1] = bundle1;

      this.event.bundles = this.bundles;
    }

  }

  addEvent() {
    event.preventDefault();
    let newEvent = new Event();

    newEvent.title = this.event.title;
    newEvent.start = this.event.start;
    newEvent.end = this.event.end;

    this.eventService.addEvent(newEvent)
      .subscribe();

  }

  updateEvent(event: Event) {
    var _event = {
      title: event.title,
      start: event.start,
      end: event.end,
      id: event.id,
      bundles: event.bundles
    };
    this.eventService.updateEvent(_event)
      .subscribe();

  }

  onEdit(bundle: Bundle, event: Event) {
    this.eventService.event = event;
    this.eventService.bundle = bundle;
    this.router.navigate(['./eventbundle']);
  }

}
