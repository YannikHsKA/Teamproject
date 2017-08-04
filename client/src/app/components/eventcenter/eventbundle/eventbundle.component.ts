import { Component } from '@angular/core';
import { Event } from '../../../model/Event';
import { EventService } from '../../../services/event.service'
import {Input} from '@angular/core';
import {ControlValueAccessor} from '@angular/forms';

@Component({
  moduleId: module.id,
  selector: 'eventbundle',
  templateUrl: `eventbundle.component.html`,
  styleUrls: [`eventbundle.component.css`]
})
export class EventbundleComponent  {
 @Input() eventtitle : String;

  constructor(){

  }
  goRight(){

    console.log("hallo",this.eventtitle);
  }

}
