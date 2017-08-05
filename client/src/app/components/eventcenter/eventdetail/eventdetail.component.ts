import {Component} from '@angular/core';
import {Event} from "../../../model/Event";
import {EventService} from "../../../services/event.service";

@Component({
  moduleId: module.id,
  selector: 'eventdetail',
  templateUrl: `eventdetail.component.html`,
  styleUrls: [`eventdetail.component.css`]
})
export class EventdetailComponent {

  event: Event;
  title: string;
  start: string;
  end: string;
  createMode: boolean;

  constructor(private eventService: EventService) {
    this.event = this.eventService.event;
    if(this.event.title == ""){
      this.createMode = true;
    } else{
      this.createMode = false;
    }
    document.body.style.backgroundImage = "url('src/assets/admin.jpg')";
  }

  addEvent() {
    event.preventDefault();
    let newEvent = new Event();

    newEvent.title = this.event.title;
    newEvent.start = this.event.start;
    newEvent.end = this.event.end;

    this.eventService.addEvent(newEvent)
      .subscribe();
  }

  updateEvent(event: Event) {
    var _event = {
      title: event.title,
      start: event.start,
      end: event.end,
      id: event.id
    };
    this.eventService.updateEvent(_event)
      .subscribe();
  }
}
