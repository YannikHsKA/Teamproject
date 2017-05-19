import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import {User} from "../../../Users";

@Injectable()
export class SettingsService{
  constructor(private http:Http){
    console.log('Settings Service initialized..');
  }

  updateSettings(user: User){
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('/api/updatesetting', JSON.stringify(user), {headers: headers});
  }
}
