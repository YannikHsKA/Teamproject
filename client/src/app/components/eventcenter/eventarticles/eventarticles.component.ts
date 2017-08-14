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

  constructor(private eventService: EventService, private router: Router, private storage: SessionStorageService) {
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

    if (this.storage.retrieve('event').bundles[this.storage.retrieve("bundle_id")].articles == null) {
      var n: number = 0;
      while (n < 3) {
        this.defaultarticle = {
          ean: 815,
          id: n,
          title: "Article",
          currency: "€",
          price: "12,99",
          picture: "...",
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

    //Save in DB
    this.eventService.updateEvent(this.event)
      .subscribe();
  }


}
