import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import {User} from "../model/User";
import {Notification} from "../model/Notification"
@Injectable()
export class NotificationService {

  notification: Notification;

  constructor(private http: Http) {
    console.log('Notification Service initialized..');
  }

  sendWhatsapp(notification: Notification){
    console.log("Send out whatsapp")
    let object = {api_key: '1709510af522e46ea619b11642f3c3a8_4552_b41a2200d6875bf6bda88332cb', whatsapp_text: ''};
    object.whatsapp_text=notification.whatsapp_text;

    var data = new FormData();
    data.append("api_key", "1709510af522e46ea619b11642f3c3a8_4552_b41a2200d6875bf6bda88332cb");
    data.append("caption", notification.whatsapp_text + " Webseite: https://goo.gl/CqL91L");
    data.append("msg_type", "image");
    data.append("content", "https://storage.googleapis.com/lidl-smart.appspot.com/currentBundle.jpg");
    //https://whatsbroadcast.me/en/images/telegram-img.jpg
    //  https://storage.cloud.google.com/lidl-smart.appspot.com/currentBundle.jpg
    var xhr = new XMLHttpRequest();
    xhr.withCredentials = false;

    xhr.addEventListener("readystatechange", function () {
      if (this.readyState === 4) {
        console.log(this.responseText);
      }
    });
    xhr.open("POST", "https://api.whatsbroadcast.com/v071/send_newsletter");
    xhr.send(data);
  }


  sendSMS(notification : Notification){

    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    console.log("Send Update for all User:" + notification + "via SMS");
    var body = JSON.stringify(notification);
    this.http.post('/api/sendSMSNewsletter', body, {headers: headers})
      .subscribe(data => {

      }, error => {
        console.log(JSON.stringify(error.json()));
      });
  }

  sendEmail(notification: Notification){


    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    console.log("Send Newsletter for all Users:" + notification + "via Email");
    var body = JSON.stringify(notification);
    this.http.post('/api/sendEmailNewsletter', body, {headers: headers})
      .subscribe(data => {

      }, error => {
        console.log(JSON.stringify(error.json()));
      });


  }

}
