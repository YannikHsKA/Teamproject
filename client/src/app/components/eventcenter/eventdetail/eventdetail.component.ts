import {Component} from '@angular/core';
import {Event} from "../../../model/Event";
import {Bundle} from "../../../model/Bundle";
import {Article} from "../../../model/Article";
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
  bundle_id: number;
  event: Event = new Event();
  createMode: boolean = false;
  bundles: Bundle[] = new Array();
  articles: Article[] = new Array();
  bundle: Bundle;

  constructor(private eventService: EventService, private bundleService: BundleService, private router: Router, private storage: SessionStorageService) {

    if (this.storage.retrieve("mode") == "edit") {
      this.createMode = false;
      console.log("test", this.eventService.event);
      switch (this.eventService.event) {
        case undefined:
          this.event = this.storage.retrieve('event');
          break;
        default:
          this.event = this.eventService.event;
          break;
      }

      var bundletemp = this.event.bundles;

      //Transform from JSON to Array
      var count = 0;
      for (var propName in bundletemp) {
        this[propName] = bundletemp[propName];
        this.bundles[count] = this[propName];
        count++;
      }
      this.storage.store('event', this.event);
    }
    else {
      console.log("CREATE MODE");
      //working on create mode
      //start with empty default storage
      this.createMode = true;
      this.event.title = "Sample Title";
      this.event.start = "Sample Start";
      this.event.end = "Sample End";

      //build bundles
      var n: number = 0;
      while (n < 2) {
        this.bundle = {
          title: "Please edit the Bundle",
          description: "Sample Description",
          picture: "...",
          articles: null,
          id: n
        }
        this.bundles[n] = this.bundle;
        n++;
      }
      this.event.bundles = this.bundles;
      this.storage.store('event', this.event);
    }
  }

  addEvent() {
    let newEvent = new Event();
    newEvent.title = this.event.title;
    newEvent.start = this.event.start;
    newEvent.end = this.event.end;
    newEvent.bundles = this.event.bundles;
    this.bundle_id = 0;

    var temp = "";
    this.eventService.addEvent(this.event)
      .subscribe(result => temp);
    console.log("create", temp);
    this.storage.store('bundle_id', this.bundle_id);
    this.storage.store('event', newEvent);
    this.storage.store('mode', 'edit');


  }

  updateEvent(event: Event) {
    var _event = {
      title: event.title,
      start: event.start,
      end: event.end,
      id: event.id,
      bundles: event.bundles,
    };
    this.bundle_id = 0;
    this.storage.store('bundle_id', this.bundle_id);
    //Save in Storage
    this.storage.store('event', this.event);
    this.event = _event;
    this.eventService.updateEvent(this.event)
      .subscribe();
  }
  /*
    onEdit(bundle: Bundle)
    {
      event.preventDefault();
      this.storage.store('event',this.event);
      this.storage.store('bundle_id',bundle.id);

    }*/

  cancel() {
    event.preventDefault();
    this.storage.clear();
    this.router.navigate(["/eventoverview"]);
  }

}
