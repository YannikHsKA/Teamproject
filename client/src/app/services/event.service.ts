import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import {Event} from "../model/Event";
import {Bundle} from "../model/Bundle";

@Injectable()
export class EventService {

  event: Event;
  bundle: Bundle;
  createbuttonclicked: boolean;

  constructor(private http: Http) {
    console.log('Event Service initialized..');
  }


  getEvents() {
    return this.http.get('/api/getevents')
      .map(res => res.json());
  }

  getEvent(){
    return this.event;
  }

  addEvent(newEvent: Event) {
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('/api/createevent', JSON.stringify(newEvent), {headers: headers});
  }

  updateEvent(event: Event) {
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('/api/updateevent', JSON.stringify(event), {headers: headers});
  }

  deleteEvent(event: Event) {
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('/api/deleteevent', JSON.stringify(event), {headers: headers});
  }
}
