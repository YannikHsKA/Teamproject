import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import {User} from "../../../User";

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
      alert('ok');
    }, error => {
      console.log(JSON.stringify(error.json()));
    });
  }

  sendWhatsAppUpdate(subscribe_flag: String, user: User){

  }


  sendEmailUpdate(subscribe_flag: String, user: User){

  }

  sendSMSUpdate(subscribe_flag: String, user:User){

  }
  
}
