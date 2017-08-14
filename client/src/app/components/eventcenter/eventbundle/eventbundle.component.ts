import { Component, ElementRef, ViewChild } from '@angular/core';
import {Input} from '@angular/core';
import {LocalStorageService, SessionStorageService} from 'ng2-webstorage';
import {LocalStorage, SessionStorage} from 'ng2-webstorage';
import {Event} from "../../../model/Event";
import {Bundle} from "../../../model/Bundle";
import {Router} from '@angular/router';
import {EventService} from "../../../services/event.service";


@Component({
  moduleId: module.id,
  selector: 'eventbundle',
  templateUrl: `eventbundle.component.html`,
  styleUrls: [`eventbundle.component.css`]
})
export class EventbundleComponent {

  event: Event;
  bundle: Bundle;
  bundle_id: number;
  bundle1_active: boolean;
  bundle_id_text: string;

  constructor(private eventService: EventService, private storage: SessionStorageService, private router: Router) {
    var event = this.storage.retrieve('event');
    this.bundle_id = this.storage.retrieve('bundle_id');
    this.event = event;
    this.bundle = this.event.bundles[this.bundle_id];

    console.log("BUNDLEID", this.bundle_id);

    switch (this.bundle_id) {
      case 0:
        this.bundle_id_text = "First";
        this.bundle1_active = true;
        break;
      case 1:
        this.bundle_id_text = "Second";
        this.bundle1_active = false;
        break;
    }
  }

  backToEvent() {
    this.event.bundles[this.storage.retrieve('bundle_id')] = this.bundle;
    //Save in Storage
    this.storage.store('event', this.event);
    this.storage.store('bundle_id', this.bundle_id);
  }
  backToBundle1() {
    this.storage.store('event', this.event);
    this.bundle_id = 0;
    this.bundle_id_text = "First";
    this.bundle = this.event.bundles[this.bundle_id];
    this.storage.store('bundle_id', this.bundle_id);
    this.bundle1_active = true;
  }
  GoToArticles() {
    this.event.bundles[this.storage.retrieve('bundle_id')] = this.bundle;
    this.storage.store('event', this.event);
    this.storage.store('bundle_id', this.bundle_id);
  }

  GoNext() {
    console.log(this.bundle_id);
    if (this.bundle_id == 0) {
      this.bundle_id = 1;
      this.bundle_id_text = "Second";
      this.bundle = this.event.bundles[this.bundle_id];
      this.storage.store('event', this.event);
      this.storage.store('bundle_id', this.bundle_id);
      this.bundle1_active = false;
      this.router.navigate(['/eventbundle']);
    }
    else {
      this.storage.store('event', this.event);
      this.storage.store('bundle_id', this.bundle_id);
      this.router.navigate(['./notificationcenter']);
    }

    this.eventService.updateEvent(this.storage.retrieve('event'))
      .subscribe();

  }


}
