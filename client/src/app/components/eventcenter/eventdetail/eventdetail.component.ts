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
      console.log("if?????");
      var bundle : Bundle = {
        title: "Please edit the bundle",
        description :"descr von bundle 1",
        picture:"url"
      }
      console.log("bundle",bundle);
      this.bundles[0] = bundle;
      this.bundles[1] = bundle;
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
      id: event.id
    };
    this.eventService.updateEvent(_event)
      .subscribe();

  }

  onAdd()
  {
        this.router.navigate(['./eventbundle']);
  }

  onDelete(num: String)
  {
    event.preventDefault();
    var id = this.event.id;
  }

}
