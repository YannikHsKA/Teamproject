import { Component, ElementRef, ViewChild } from '@angular/core';
import {Input} from '@angular/core';


@Component({
  moduleId: module.id,
  selector: 'eventbundle',
  templateUrl: `eventbundle.component.html`,
  styleUrls: [`eventbundle.component.css`]
})
export class EventbundleComponent  {
  @ViewChild('quote-carousel') carousel:ElementRef;

  ngAfterViewInit() {
      // sketchElement is usable
      var carousel = this.carousel.nativeElement;
      console.log(this.carousel);
    }
  goRight(test:String){
    console.log("hallo",test);



  //  console.log(carousel);
  //  carousel.carousel("next");
  }

}
