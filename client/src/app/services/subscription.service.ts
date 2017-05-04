import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import {User} from "../../../Users";

@Injectable()
export class SubscriptionService{
  constructor(private http:Http){
    console.log('Subscription Service initialized..');
  }

  addUser(newUser: User){
    console.log(newUser);
    var headers = new Headers();
    headers.append('Content-Typte', 'application/json'); //TODO: application/x-www-form-urlencoded ??
    return this.http.post('/api/subscribe', JSON.stringify(newUser), {headers: headers})
      .map(res => res.json());
  }
}
