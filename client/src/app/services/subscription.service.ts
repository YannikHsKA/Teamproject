import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import {User} from "../model/User";

@Injectable()
export class SubscriptionService{
  constructor(private http:Http){
    console.log('Subscription Service initialized..');
  }

  addUser(newUser: User){
if (newUser.whatsapp == 1) {
  var data = new FormData();
  data.append("api_key", "1709510af522e46ea619b11642f3c3a8_4552_b41a2200d6875bf6bda88332cb");
  data.append("usernumber", newUser.phonenumber);

  var xhr = new XMLHttpRequest();
  xhr.withCredentials = false;

  xhr.addEventListener("readystatechange", function () {
    if (this.readyState === 4) {
      console.log(this.responseText);
    }
  });

  xhr.open("POST", "https://api.whatsbroadcast.com/v071/set_start");

  xhr.send(data);

}
    var headers_api = new Headers();
    headers_api.append('Content-Type', 'application/json');
    return this.http.post('/api/subscribe', JSON.stringify(newUser), {headers: headers_api});
  }


}
