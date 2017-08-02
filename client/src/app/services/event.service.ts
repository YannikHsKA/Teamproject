import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class EventService {

  constructor(private http: Http) {
    console.log('Event Service initialized..');
  }


  getEvents(){
    return this.http.get('/api/getevents')
      .map(res => res.json());
  }
}
