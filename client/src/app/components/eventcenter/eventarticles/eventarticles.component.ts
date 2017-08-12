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
  event:Event;
  defaultarticle:Article;
  articles: Article[] = new Array();

  constructor(private eventService: EventService,private router: Router, private storage:SessionStorageService) {
    //load articles from database
    //if no articles - add default ones

    console.log(this.storage.retrieve('event'));
    if(this.storage.retrieve('event').articles == undefined)
    {
      console.log("NEW");
      //Create Default Article
      //build articles
      var n:number = 0;
      while(n < 3) {
        this.defaultarticle = {
          ean: 815,
          id: n,
          title: "Article",
          currency: "€",
          price :"12,99",
          picture:"...",
        }
        this.articles[n] = this.defaultarticle;
        n++;
      }

      console.log("init",this.articles);
    }
    else{
      console.log("OLD");
      //show existing
      this.event = this.storage.retrieve('event');
      console.log(this.event);
      this.articles = this.event.articles;
    }



  }

  back()
  {
    //back to Bundle
    //save entries
    this.event = this.storage.retrieve('event');
    this.event.articles = this.articles;
    this.storage.store('event',this.event);
  }


  save(event:Event)
  {
    //Event wird gespeichert
    //schreibe alle einträge in die Datenbank
    //lösche storage
    this.event = this.storage.retrieve('event');
    this.event.articles = this.articles;
    console.log(this.storage.retrieve('mode'));

    //Check Create oder Edit
    if(this.storage.retrieve('mode') == "create")
    {
      this.eventService.addEvent(this.event)
        .subscribe();
    }
    else{
      this.eventService.updateEvent(this.event)
        .subscribe();
    }

    this.storage.clear();

  }




}
