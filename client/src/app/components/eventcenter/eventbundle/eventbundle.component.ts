import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
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
  detail_status: boolean;
  bundle1_status: boolean;
  bundle2_status: boolean;
  notification_status: boolean;
  active_status: string;

  constructor(private eventService: EventService, private storage: SessionStorageService, private router: Router) {

    this.bundle_id = this.storage.retrieve('bundle_id');
    this.event = this.storage.retrieve('event');
    this.bundle = this.event.bundles[this.bundle_id];

    //Set NavigationBar Attributes
    this.detail_status = this.storage.retrieve('detail_status');
    this.bundle1_status = this.storage.retrieve('bundle1_status');
    this.bundle2_status = this.storage.retrieve('bundle2_status');
    this.notification_status = this.storage.retrieve('notification_status');

    switch (this.bundle_id) {
      case 0:
        this.active_status = "bundle1";
        this.bundle_id_text = "First";
        this.bundle1_active = true;
        this.bundle1_status = true;
        this.storage.store('bundle1_status', true);
        break;
      case 1:
        this.active_status = "bundle2";
        this.bundle_id_text = "Second";
        this.bundle2_status = true;
        this.storage.store('bundle2_status', true);
        break;
    }
  }

  backToEvent() {
    this.event.bundles[this.storage.retrieve('bundle_id')] = this.bundle;
    this.storage.store('event', this.event);
    this.storage.store('bundle_id', this.bundle_id);
  }
  backToBundle1() {
    this.storage.store('event', this.event);
    this.bundle_id_text = "First";
    this.bundle = this.event.bundles[0];
    this.storage.store('bundle_id', 0);
    this.bundle_id = 0;
    this.bundle1_active = true;
    this.active_status = "bundle1";
  }
  GoToArticles() {
    this.event.bundles[this.storage.retrieve('bundle_id')] = this.bundle;
    this.storage.store('event', this.event);
    this.storage.store('bundle_id', this.bundle_id);
    this.storage.store('active_status', this.active_status)
  }

  GoNext() {
    if (this.bundle_id == 0) {
      this.bundle_id = 1;
      this.bundle_id_text = "Second";
      this.bundle1_active = false;
      this.bundle = this.event.bundles[this.bundle_id];
      this.storage.store('event', this.event);
      this.storage.store('bundle_id', this.bundle_id);
      this.storage.store('active_status', "bundle2");
      this.storage.store('bundle2_status', "true");
      //Set NavigationBar Attributes
      this.detail_status = this.storage.retrieve('detail_status');
      this.notification_status = this.storage.retrieve('notification_status');
      this.bundle2_status = true;
      this.active_status = "bundle2";
      this.storage.store('bundle2_status', true);
      this.router.navigate(['/eventbundle']);
    }
    else {
      this.storage.store('event', this.event);
      this.storage.store('bundle_id', this.bundle_id);
      this.storage.store('bundle2_status', true);
      this.router.navigate(['./notificationcenter']);
    }

    this.eventService.updateEvent(this.storage.retrieve('event'))
      .subscribe();

  }


}
