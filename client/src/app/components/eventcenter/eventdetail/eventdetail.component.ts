import { Component } from '@angular/core';
import {Event} from "../../../model/Event";
import {EventService} from "../../../services/event.service";

@Component({
  moduleId: module.id,
  selector: 'eventdetail',
  templateUrl: `eventdetail.component.html`,
  styleUrls: [`eventdetail.component.css`]
})
export class EventdetailComponent  {

  event: Event;
  title: string;
  start: string;
  end: string;

  constructor(private eventService: EventService){
    this.event = {
      title: "",
      start: "",
      end: ""
    };
  }

  addEvent(){
    event.preventDefault();
    let newEvent = new Event();

    newEvent.title = this.event.title;
    newEvent.start = this.event.start;
    newEvent.end = this.event.end;


    this.eventService.addEvent(newEvent)
      .subscribe();

    console.log(newEvent);
  }
}
