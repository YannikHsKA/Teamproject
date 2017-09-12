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
  selector: 'eventarticles',
  templateUrl: `eventarticles.component.html`,
  styleUrls: [`eventarticles.component.css`]
})
export class EventarticlesComponent {
  event: Event;
  defaultarticle: Article;
  articles: Article[] = new Array();
  bundle_id_text: string;
  bundle1_active: boolean;
  detail_status: boolean;
  bundle1_status: boolean;
  bundle2_status: boolean;
  notification_status: boolean;
  active_status: string;

  constructor(private eventService: EventService, private router: Router, private storage: SessionStorageService) {

    //Set NavigationBar Attributes
    this.detail_status = this.storage.retrieve('detail_status');
    this.bundle1_status = this.storage.retrieve('bundle1_status');
    this.bundle2_status = this.storage.retrieve('bundle2_status');
    this.notification_status = this.storage.retrieve('notification_status');
    this.active_status = this.storage.retrieve('active_status');


    //load articles from database
    //if no articles - add default ones
    switch (this.storage.retrieve("bundle_id")) {
      case 0:
        this.bundle_id_text = "First";
        this.bundle1_active = true;
        break;
      case 1:
        this.bundle_id_text = "Second";
        this.bundle1_active = false;
        break;
    }

    if (this.storage.retrieve('event').bundles[this.storage.retrieve("bundle_id")].articles == null || this.storage.retrieve('event').bundles[this.storage.retrieve("bundle_id")].articles == undefined) {
      var n: number = 0;
      while (n < 3) {
        this.defaultarticle = {
          ean: 815,
          name: "Article",
          preis: "12,99",
          discount: "10%",
          discountpreis: "1,23€"
        }
        this.articles[n] = this.defaultarticle;
        n++;
      }
    }
    else {
      this.event = this.storage.retrieve('event');
      this.articles = this.event.bundles[this.storage.retrieve('bundle_id')].articles;
    }
  }

  back() {
    //back to Bundle
    //save entries
    this.event = this.storage.retrieve('event');
    this.event.bundles[this.storage.retrieve('bundle_id')].articles = this.articles;
    this.storage.store('event', this.event);
  }



  GoToSecond() {

    this.event = this.storage.retrieve('event');
    this.event.bundles[this.storage.retrieve('bundle_id')].articles = this.articles;
    this.storage.store('event', this.event);
    this.storage.store('bundle_id', 1);
    this.storage.store('bundle2_status', true);
    this.storage.store('active_status', 'bundle2');

    //Save in DB
    this.eventService.updateEvent(this.event)
      .subscribe();
  }


}
