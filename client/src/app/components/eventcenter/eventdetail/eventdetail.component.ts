import {Component} from '@angular/core';
import {Event} from "../../../model/Event";
import {Bundle} from "../../../model/Bundle";
import {EventService} from "../../../services/event.service";
import {BundleService} from "../../../services/bundle.service";
import {Router} from "@angular/router";
import {LocalStorageService, SessionStorageService} from 'ng2-webstorage';
import {LocalStorage, SessionStorage} from 'ng2-webstorage';


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
  bundles: Bundle[] = new Array();
  bundle: Bundle;
  safebuttonclicked: boolean;

  constructor(private eventService: EventService, private bundleService: BundleService, private router: Router, private storage:SessionStorageService) {

    if(this.eventService.safebuttonclicked == false){
      //working on edit mode - start with blank
      //load current Event + Bundles + Articles into Storage
      this.event = this.eventService.event;
      var bundletemp = this.event.bundles;

      //Transform from JSON to Array
      var count = 0;
      for (var propName in bundletemp) {
            this[propName] = bundletemp[propName];
            this.bundles[count] = this[propName];
            count++;
        }

      this.storage.store('event', this.event);
            console.log(this.bundles);

  }
    else{
      //working on create mode
      //start with empty default storage

      //build event
      this.event = new Event();
      this.event.title = "Sample Title";
      this.event.start = "Sample Start";
      this.event.end = "Sample End";

      //build bundles
      var n:number = 0;
      while(n < 2) {
        this.bundle = {
          title: "Please edit the Bundle",
          description :"Sample Description",
          picture:"...",
          id: n
        }
        this.bundles[n] = this.bundle;
        n++;
      }

      this.event.bundles = this.bundles;
    }
  }

  addEvent() {
    event.preventDefault();
    let newEvent = new Event();

    newEvent.title = this.event.title;
    newEvent.start = this.event.start;
    newEvent.end = this.event.end;
    newEvent.bundles = this.event.bundles;
    newEvent.articles = null;

    this.eventService.addEvent(newEvent)
      .subscribe();

  }

  updateEvent(event: Event) {
    var _event = {
      title: event.title,
      start: event.start,
      end: event.end,
      id: event.id,
      bundles: event.bundles,
      articles: event.articles
    };
    this.eventService.updateEvent(_event)
      .subscribe();

  }

  onEdit(bundle: Bundle)
  {
    event.preventDefault();
    this.storage.store('event',this.event);
    this.storage.store('bundle_id',bundle.id);

  }

  cancel()
  {
    event.preventDefault();
    this.storage.clear();
  }

}
