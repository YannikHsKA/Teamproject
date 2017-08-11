import { Component, ElementRef, ViewChild } from '@angular/core';
import {Input} from '@angular/core';
import {LocalStorageService, SessionStorageService} from 'ng2-webstorage';
import {LocalStorage, SessionStorage} from 'ng2-webstorage';
import {Event} from "../../../model/Event";
import {Bundle} from "../../../model/Bundle";


@Component({
  moduleId: module.id,
  selector: 'eventbundle',
  templateUrl: `eventbundle.component.html`,
  styleUrls: [`eventbundle.component.css`]
})
export class EventbundleComponent  {

  event: Event;
  bundle : Bundle;

  constructor(private storage:SessionStorageService){
    var event = this.storage.retrieve('event');
    var bundle_id = this.storage.retrieve('bundle_id');
    this.event = event;
    this.bundle = this.event.bundles[bundle_id];

  }

  back(){
    this.event.bundles[this.storage.retrieve('bundle_id')] = this.bundle;
    //Save in Storage
    this.storage.store('event',this.event);
  }

  GoToArticles()
  {
    this.event.bundles[this.storage.retrieve('bundle_id')] = this.bundle;
    //Save in Storage
    this.storage.store('event',this.event);
  }


}
