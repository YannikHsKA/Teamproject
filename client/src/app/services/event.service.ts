import {Injectable} from '@angular/core';
import {Http, Headers, Response} from '@angular/http';
import 'rxjs/add/operator/map';
import {Event} from "../model/Event";
import {Notification} from "../model/Notification";
import {Observable} from 'rxjs';
import {LocalStorageService, SessionStorageService} from 'ng2-webstorage';
import {LocalStorage, SessionStorage} from 'ng2-webstorage';
import {Article} from "../model/Article";

@Injectable()
export class EventService {

  event: Event;
  event_temp: Event;
  safebuttonclicked: boolean;
  storage_temp: SessionStorageService;

  constructor(private http: Http, private storage: SessionStorageService) {
    console.log('Event Service initialized..');
  }


  getEvents() {
    return this.http.get('/api/getevents')
      .map(res => res.json());
  }

  getArticles() {
    return this.http.get('/api/getarticles')
      .map(res => res.json());
  }

  getCurrentEvent() {
    return this.http.get('/api/getcurrentevent')
      .map(res => res.json());
  }

  addEvent(newEvent: Event) {
    console.log("addEvent",newEvent);
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('/api/createevent', JSON.stringify(newEvent), {headers: headers}).map(this.extractData);
  }

  addNotification(newNotification: Notification, eventid: String) {
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('/api/createnotification/' + eventid, JSON.stringify(newNotification), {headers: headers}).map(this.extractData);
  }


  createPdf(event: Event) {
    //Bundle 1
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    console.log("create PDF for Event :" + event.title);
    var body = JSON.stringify(event);
    this.http.post('/api/createpdf', body, {headers: headers})
      .subscribe(data => {
      }, error => {
        console.log(JSON.stringify(error.json()));
      });
  }

  updateEvent(event: Event) {
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('/api/updateevent', JSON.stringify(event), {headers: headers});
  }

  updateCurrentEvent(event: Event) {

    console.log(event);

    event.notifications = null;

    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    this.http.post('/api/updatecurrentevent', JSON.stringify(event), {headers: headers})
      .subscribe(data => {
      }, error => {
        console.log(JSON.stringify(error.json()));
      });
  }

  deleteEvent(event: Event) {
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('/api/deleteevent', JSON.stringify(event), {headers: headers});
  }

  private extractData(res: Response) {
    let body = res.text();
    this.storage_temp = new SessionStorageService();
    this.event_temp = new Event();
    this.event_temp = this.storage_temp.retrieve('event');
    this.event_temp.id = body;
    this.storage_temp.store('event', this.event_temp);
  }
}
