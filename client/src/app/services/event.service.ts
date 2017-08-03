import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import {Event} from "../model/Event";

@Injectable()
export class EventService {

  constructor(private http: Http) {
    console.log('Event Service initialized..');
  }


  getEvents(){
    return this.http.get('/api/getevents')
      .map(res => res.json());
  }

  addEvent(newEvent: Event){
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('/api/createevent', JSON.stringify(newEvent), {headers: headers});
  }
}
