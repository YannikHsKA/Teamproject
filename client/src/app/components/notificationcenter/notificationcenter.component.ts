import {Component, Input} from '@angular/core';
import {Event} from '../../model/Event';
import {EventService} from '../../services/event.service';
import {LocalStorageService, SessionStorageService} from 'ng2-webstorage';
import {Router} from '@angular/router';
import {Notification} from "../../model/Notification";
@Component({
  moduleId: module.id,
  selector: 'notificationcenter',
  templateUrl: `notificationcenter.component.html`,
  styleUrls: ['notificationcenter.component.css']
})
export class NotificationcenterComponent {
  event: Event;
  whatsapp_active : boolean;
  sms_active : boolean;
  email_active : boolean;
  bundle_id: number;
  notification: Notification;
  notifications: Notification[];
  events : Event[];




  constructor(private eventService: EventService, private storage: SessionStorageService, private router: Router) {
//this.event = eventService.getEvent();
    this.event = this.storage.retrieve('event');
this.email_active = false;
this.sms_active  = true;
this.whatsapp_active = false;
this.notification = new Notification();

    document.body.style.backgroundImage = "url('src/assets/admin.jpg')";
    document.body.style.backgroundPosition = "center center";
    document.body.style.backgroundRepeat = "no-repeat";
    document.body.style.backgroundAttachment = "fixed";
    document.body.style.backgroundSize = "cover";


/*
    this.notification = new Notification();
    this.notification.whatsapp_text= "WhatsApp, SMS, Email";
    this.notification.time= new Date();
    this.notification.sms_text= "12";
    this.notification.email_text ="12";
    this.notification.whatsapp_receiver= 12;

    this.notifications = [];
    this.notifications.push(this.notification);
    this.notifications.push(this.notification);

*/

if( this.event.notifications) {

  this.notifications = []
  Object.keys(this.event.notifications).forEach(key => {
    console.log(this.event.notifications[key]); //value
    console.log(key); //key
    this.notifications.push(this.event.notifications[key])
  });
}


/*
 this.event.notifications = Array.from(this.event.notifications);
    var arr = [];
    data.forEach(obj, function(value, key){
      arr.push(value);
    });

    */
    console.log("BUNDLEID", this.notifications);

  }

  switchLane (btn: string){
switch (btn)
{
  case "whatsapp":
    this.whatsapp_active = true;
    this.sms_active = false;
    this.email_active = false;
    break;
  case "sms":
    this.email_active = false;
    this.sms_active = true;
    this.whatsapp_active = false;
    break;
    case "email":
      this.email_active = true;
      this.sms_active = false;
      this.whatsapp_active = false;
      break;

}
  }

  ngOnDestroy(){
    document.body.style.backgroundImage = "none";
  }

  addNotification() {
    var newNotification = new Notification();
    newNotification.whatsapp_text = this.notification.whatsapp_text;
    newNotification.sms_text = this.notification.sms_text;
    newNotification.email_text = this.notification.email_text;
    newNotification.time = new Date();
    newNotification.whatsapp_receiver =132;
    newNotification.id ="1";
    var eventid: String = this.event.id;
    var temp = "";
    this.eventService.addNotification(newNotification, eventid)
      .subscribe(result => temp);
    console.log("create Notification", temp);
    if( this.event.notifications) {
      this.notifications = []
      Object.keys(this.event.notifications).forEach(key => {
        //console.log(this.event.notifications[key]); //value
        // console.log(key); //key
        this.notifications.push(this.event.notifications[key])
      });
    }
    this.notifications = [];
    this.notifications.push(newNotification);



    this.storage.store('bundle_id', this.bundle_id);
    this.storage.store('event', event);
    this.storage.store('mode', 'edit');



  }


backToBundle2(){
  this.bundle_id = 1;
  this.storage.store('event',this.event);
  this.storage.store('bundle_id',this.bundle_id);
  this.router.navigate(['./eventbundle']);

}

onResend(event:Event){
  console.log("Reopen Message");
}

saveNotification(){
    console.log("Send out messages")
  this.addNotification();
}
  hack(val: any) {
    return Array.from(val);
  }



}
