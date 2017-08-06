import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import {User} from "../model/User";

@Injectable()
export class SettingsService {
  constructor(private http: Http) {
    console.log('Settings Service initialized..');
  }

  updateSettings(user: User) {
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    console.log("Update User:" + user);
    var body = JSON.stringify(user);
    this.http.post('/api/updatesettings', body, {headers: headers})
      .subscribe(data => {
    }, error => {
      console.log(JSON.stringify(error.json()));
    });
  }

  sendWhatsAppUpdate(subscribe_flag: String, user: User){

    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    console.log("Send Update for User:" + user + "via Whatsapp");
    var body = JSON.stringify(user);

    if (subscribe_flag == "subscribe"){
      this.http.post('/api/sendWhatsAppUpdate_subscribe', body, {headers: headers})
        .subscribe(data => {

        }, error => {
          console.log(JSON.stringify(error.json()));
        });
    } else if (subscribe_flag =="unsubscribe"){
      this.http.post('/api/sendWhatsAppUpdate_unsubscribe', body, {headers: headers})
        .subscribe(data => {

        }, error => {
          console.log(JSON.stringify(error.json()));
        });
    }
  }


  sendEmailUpdate(subscribe_flag: String, user: User){
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    console.log("Send Update for User:" + user + "via Email");
    var body = JSON.stringify(user);

    if (subscribe_flag == "subscribe"){
      this.http.post('/api/sendEmailUpdate_subscribe', body, {headers: headers})
        .subscribe(data => {

        }, error => {
          console.log(JSON.stringify(error.json()));
        });
    } else if (subscribe_flag =="unsubscribe"){
      this.http.post('/api/sendEmailUpdate_unsubscribe', body, {headers: headers})
        .subscribe(data => {

        }, error => {
          console.log(JSON.stringify(error.json()));
        });
    }


  }

  sendSMSUpdate(subscribe_flag: String, user:User){
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    console.log("Send Update for User:" + user + "via SMS");
    var body = JSON.stringify(user);


    if (subscribe_flag == "subscribe"){
      this.http.post('/api/sendSMSUpdate_subscribe', body, {headers: headers})
        .subscribe(data => {

        }, error => {
          console.log(JSON.stringify(error.json()));
        });
    } else if (subscribe_flag =="unsubscribe"){
      this.http.post('/api/sendSMSUpdate_unsubscribe', body, {headers: headers})
        .subscribe(data => {

        }, error => {
          console.log(JSON.stringify(error.json()));
        });
    }
  }

}
