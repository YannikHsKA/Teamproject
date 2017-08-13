import { Component, ElementRef, ViewChild } from '@angular/core';
import {Input} from '@angular/core';
import {LocalStorageService, SessionStorageService} from 'ng2-webstorage';
import {LocalStorage, SessionStorage} from 'ng2-webstorage';
import {Event} from "../../../model/Event";
import {Bundle} from "../../../model/Bundle";
import {Router} from '@angular/router';


@Component({
  moduleId: module.id,
  selector: 'eventbundle',
  templateUrl: `eventbundle.component.html`,
  styleUrls: [`eventbundle.component.css`]
})
export class EventbundleComponent  {

  event: Event;
  bundle : Bundle;
  bundle_id: number;
  bundle1_active: boolean;

  constructor(private storage:SessionStorageService, private router: Router){
    var event = this.storage.retrieve('event');
    this.bundle_id = this.storage.retrieve('bundle_id');
    this.event = event;
    this.bundle = this.event.bundles[this.bundle_id];
if (this.bundle_id==0){
  this.bundle1_active = true;
} else{
  this.bundle1_active = false;
}
  }

  backToEvent(){
    this.event.bundles[this.storage.retrieve('bundle_id')] = this.bundle;
    //Save in Storage
    this.storage.store('event',this.event);
    this.storage.store('bundle_id',this.bundle_id);
  }
backToBundle1(){
  this.storage.store('event',this.event);
  this.bundle_id = 0;
  this.storage.store('bundle_id',this.bundle_id);
  this.bundle1_active = true;
}
  GoToArticles()
  {
    this.event.bundles[this.storage.retrieve('bundle_id')] = this.bundle;
    //Save in Storage
    this.storage.store('event',this.event);
    this.storage.store('bundle_id',this.bundle_id);
  }

  save()
  {

   // this.event.bundles[this.bundle_id] = this.bundle;
    //Save in Storage
    if (this.bundle_id == 0){
      this.bundle_id = 1;
      this.bundle1_active= false;

      this.storage.store('event',this.event);
      this.storage.store('bundle_id',this.bundle_id);
      this.router.navigate(['./eventbundle']);

    } else{

      this.storage.store('event',this.event);
      this.storage.store('bundle_id',this.bundle_id);

      this.router.navigate(['./notificationcenter']);
    }

  }


}
