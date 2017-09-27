import {Component} from '@angular/core';
import {Event} from "../../../model/Event";
import {Bundle} from "../../../model/Bundle";
import {Article} from "../../../model/Article";
import {EventService} from "../../../services/event.service";
import {BundleService} from "../../../services/bundle.service";
import {Router} from "@angular/router";
import {SessionStorageService} from 'ng2-webstorage';



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
  detail_status: boolean;
  bundle1_status: boolean;
  active_status: string;
  hidden: boolean = false;
  countdown: number;
  articleFilter: any = {name: ''}
  currentArticle: Article;

  constructor(private eventService: EventService, private bundleService: BundleService, private router: Router, private storage: SessionStorageService) {

    //Set NavigationBar Attributes
    this.detail_status = true;
    this.bundle1_status = this.storage.retrieve('bundle1_status');
    this.active_status = "detail";

    if (this.storage.retrieve("mode") == "edit")
    {
      this.createMode = false;
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
    else
      {
      console.log("CREATE MODE");

      //Status for Navigation Bar
      this.storage.store('bundle1_status', false);
      this.storage.store('detail_status', true);


      //working on create mode
      //start with empty default storage
      this.createMode = true;
      this.event.title = "Sample Title";
      this.event.notifications = null;

      //build bundles
      var n: number = 0;
      while (n < 2) {
        this.bundle = {
          title: "Please edit the Bundle",
          id: n,
          description: "Sample Description",
          smartscore: "0.00",
          articles: null,
          discount: "none",
          theme: 1,
        }
        this.bundles[n] = this.bundle;
        n++;
      }
      this.event.bundles = this.bundles;
      this.storage.store('event', this.event);
    }

    this.eventService.getArticles()
      .subscribe(articles => {
        this.articles = articles;
      });

  }

  addEvent() {
    let newEvent = new Event();
    newEvent.title = this.event.title;
    newEvent.cweek = this.event.cweek;
    newEvent.bundles = this.event.bundles;
    newEvent.notifications = this.event.notifications;
    this.bundle_id = 0;
    this.storage.store('bundle_id', this.bundle_id);
    this.storage.store('event', this.event);
    this.storage.store('detail_status', true);

    var that = this;
    function closeModal() {
      document.getElementById("closemodal").click();
      that.router.navigate(['/eventbundleselection']);
    }
    function countdown() {
      that.countdown = that.countdown - 1;
    }
    setInterval(countdown, 1000);
    let countdownReal:number = Math.floor(Math.random() * (8000 - 3000) ) + 3000;
    setTimeout(closeModal, countdownReal);
    this.countdown = parseInt((countdownReal/1000).toFixed(0));

    if(this.currentArticle){
      this.storage.store('article', this.currentArticle);
    }
  }

  updateEvent(event: Event) {
    var _event = {
      title: event.title,
      id: event.id,
      cweek: event.cweek,
      bundles: event.bundles,
      notifications: event.notifications,
    };
    this.bundle_id = 0;
    this.storage.store('bundle_id', this.bundle_id);
    //Save in Storage
    this.storage.store('event', this.event);
    this.event = _event;
    this.eventService.updateEvent(this.event)
      .subscribe();
  }

  cancel() {
    event.preventDefault();
    this.storage.clear();
    this.router.navigate(["/eventoverview"]);
  }

  selectArticle(item: Article, event: any){
    this.currentArticle = item;
  }

}
