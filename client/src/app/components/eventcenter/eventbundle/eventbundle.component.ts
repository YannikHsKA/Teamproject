import { Component, ElementRef, ViewChild } from '@angular/core';
import {EventService} from "../../../services/event.service";
import {Bundle} from "../../../model/Bundle";
import {Event} from "../../../model/Event";

@Component({
  moduleId: module.id,
  selector: 'eventbundle',
  templateUrl: `eventbundle.component.html`,
  styleUrls: [`eventbundle.component.css`]
})
export class EventbundleComponent  {
  @ViewChild('quote-carousel') carousel:ElementRef;

  event: Event;
  bundle: Bundle;

  constructor(private eventService: EventService){
    this.event = this.eventService.event;
    this.bundle = this.eventService.bundle;

    console.log(this.event);
    console.log(this.bundle);

    document.body.style.backgroundImage = "url('src/assets/admin.jpg')";
  }

  addBundle(bundleId: Number) {
    bundle.preventDefault();
    let newBundle = new Bundle();

    newBundle.title = this.bundle.title;
    newBundle.description = this.bundle.description;
    newBundle.picture = this.bundle.picture;


    this.eventService.addBundle(newBundle, this.event, bundleId)
      .subscribe();
  }

  /*ngAfterViewInit() {
      // sketchElement is usable
      var carousel = this.carousel.nativeElement;
      console.log(this.carousel);
    }
  goRight(test:String){
    console.log("hallo",test);



  //  console.log(carousel);
  //  carousel.carousel("next");
  }*/

}
