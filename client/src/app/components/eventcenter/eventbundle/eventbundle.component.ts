import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import {Input} from '@angular/core';
import {LocalStorageService, SessionStorageService} from 'ng2-webstorage';
import {LocalStorage, SessionStorage} from 'ng2-webstorage';
import {Event} from "../../../model/Event";
import {Bundle} from "../../../model/Bundle";
import {Article} from "../../../model/Article";
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
  chosen_bundle: Bundle;
  bundle_id: number;
  bundle1_active: boolean;
  bundle_id_text: string;
  detail_status: boolean;
  bundle1_status: boolean;
  bundle2_status: boolean;
  notification_status: boolean;
  active_status: string;
  articles: Article[] = new Array();
  discounts: String[] = new Array();
  type: number;
  themevalue:number;

  constructor(private eventService: EventService, private storage: SessionStorageService, private router: Router) {


    this.type = 1;
    document.body.style.backgroundImage = "url('src/assets/admin.jpg')";
    document.body.style.backgroundPosition = "center center";
    document.body.style.backgroundRepeat = "no-repeat";
    document.body.style.backgroundAttachment = "fixed";
    document.body.style.backgroundSize = "cover";

    console.log("WORKING MODE: "+this.storage.retrieve("mode") );

    if (this.storage.retrieve("mode") == "edit") {

      this.event = this.storage.retrieve('event');
      this.chosen_bundle = this.event.bundles[0];
      this.bundle = this.chosen_bundle;
      this.themevalue = this.bundle.theme;
    }
    else{
      this.themevalue = 1;
      this.bundle_id = this.storage.retrieve('bundle_id');
      this.event = this.storage.retrieve('event');
      this.bundle = this.event.bundles[this.bundle_id];
      this.chosen_bundle = this.storage.retrieve('bundle');
      this.event.bundles[0].discount = "none";
      this.event.bundles[0].articles = this.chosen_bundle.articles;

      for (var i = 0; i < 3; i++) {
        var res = this.chosen_bundle.articles[i].preis;
        this.event.bundles[0].articles[i].discount = "none";
        this.event.bundles[0].articles[i].discountpreis = this.event.bundles[0].articles[i].preis;
      }

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

    this.handleChangePure(parseFloat(this.chosen_bundle.articles[0].preis.split("€")[0]) * 0.1);

  }

  backToEvent() {
    //Navigate back to Event
    this.event.bundles[this.storage.retrieve('bundle_id')] = this.bundle;
    this.storage.store('event', this.event);
    this.storage.store('bundle_id', this.bundle_id);
    this.router.navigate(['./eventdetail']);
  }

  saveEvent() {
    //Read current list of articles
    this.event.bundles[0].articles = this.chosen_bundle.articles;

    //Update or Create
    if (this.storage.retrieve("mode") == "edit")
      this.eventService.updateEvent(this.event).subscribe();
    else
      this.eventService.addEvent(this.event).subscribe();

    //Navigate to Overview
    this.router.navigate(['./eventoverview']);
  }

  handleChangePure(num: number) {
    //handle change for pure bundling
    this.event.bundles[0].discount = num.toString();
    for (var i = 0; i < 3; i++) {
      var res = this.chosen_bundle.articles[i].preis.split("€");
      this.discounts[i] = (parseFloat(res[0]) * num).toFixed(2).toString().concat("€");
      this.event.bundles[0].articles[i].discount = num.toString();
      this.event.bundles[0].articles[i].discountpreis = this.discounts[i].toString();
    }

  }
  handleChangeMixed(i: number, num: number) {
    //handle change for mixed bundling
    var res = this.chosen_bundle.articles[i].preis.split("€");
    this.discounts[i] = (parseFloat(res[0]) * num).toFixed(2).toString().concat("€");
    this.event.bundles[0].articles[i].discount = num.toString();
    this.event.bundles[0].articles[i].discountpreis = this.discounts[i].toString();
  }

  handleBundleTypeChange(num: number) {
    //handle change between Pure and Mixed Bundling
    this.type = num;
    for (var i = 0; i < 3; i++) {
      this.discounts[i] = (parseFloat(this.chosen_bundle.articles[i].preis.split("€")[0])).toString().concat("€");
    }
  }

  handleThemeChange(num: number)
  {
    //handle change in Theme selection
    this.event = this.storage.retrieve('event');
    this.event.bundles[0].theme = num;
    this.storage.store('event', this.event);

  }

}
