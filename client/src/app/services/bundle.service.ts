import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import {Event} from "../model/Event";

@Injectable()
export class BundleService {

  event: Event;

  constructor(private http: Http) {
    console.log('Bundle Service initialized..');
  }

  deleteBundle(event: Event,bundle: String) {
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('/api/deletebundle/'+bundle, JSON.stringify(event), {headers: headers});
  }

  getBundles(event:Event) {
    return this.http.get('/api/geteventbundles/'+event.id)
      .map(res => res.json());
  }
}
