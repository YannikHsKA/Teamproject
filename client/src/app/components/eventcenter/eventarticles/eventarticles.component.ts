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

  articles: Article[] = new Array();

  constructor(private router: Router, private storage:SessionStorageService) {

  }

  back()
  {
    //back to Bundle
    //save entries
  }


  save()
  {
    //Event wird gespeichert
  }


}
