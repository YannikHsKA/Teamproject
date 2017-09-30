import { Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from "@angular/router";
import { SessionStorageService} from 'ng2-webstorage';
import {Http, Headers, Response} from '@angular/http';
import {EventService} from "../../services/event.service";
import {Bundle} from "../../model/Bundle";
import {Event} from "../../model/Event";

@Component({
  moduleId: module.id,
  selector: 'detailedbundle',
  templateUrl: `detailedbundle.component.html`,
  styleUrls: [`detailedbundle.component.css`]
})


export class DetailedbundleComponent  {

  bundle_id: string;
  events: Event[];
  bundles: Bundle[];

constructor(private activatedRoute: ActivatedRoute, private storage: SessionStorageService, private http : Http, private eventService: EventService){
  this.eventService.getCurrentEvent()
    .subscribe(events => {
      this.events = events;
      this.bundles = this.events[0].bundles;

      if(this.bundles[0].theme == 1){
        document.body.style.backgroundImage = "url('src/assets/christable.jpg')";
      } else if(this.bundles[0].theme == 2){
        document.body.style.backgroundImage = "url('src/assets/sportbackground.jpg')";
      } else {
        document.body.style.backgroundImage = "url('src/assets/LIDL-Customer.jpg')";
      }

      document.body.style.backgroundPosition = "center center";
      document.body.style.backgroundRepeat = "no-repeat";
      document.body.style.backgroundAttachment = "fixed";
      document.body.style.backgroundSize = "cover";

    });


  this.bundle_id = this.storage.retrieve('bundle_id');
  console.log(this.bundle_id);


}



}
