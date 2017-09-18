import {Component, Input} from '@angular/core';
import {Event} from '../../model/Event';
import {Http, Headers, Response} from '@angular/http';
import {EventService} from '../../services/event.service';
import {NotificationService} from '../../services/notification.service';
import {SessionStorageService} from 'ng2-webstorage';
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
  whatsapp_active: boolean;
  sms_active: boolean;
  email_active: boolean;
  amazon_active: boolean;
  bundle_id: number;
  detail_status: boolean;
  bundle1_status: boolean;
  select_status: boolean;
  notification_status: boolean;
  active_status: string;
  notification: Notification;
  notifications: Notification[];
  events: Event[];




  constructor(private notificationService: NotificationService, http: Http, private eventService: EventService, private storage: SessionStorageService, private router: Router) {
    this.event = this.storage.retrieve('event');
    this.email_active = false;
    this.sms_active = true;
    this.whatsapp_active = false;
    this.amazon_active = false;
    //Set NavigationBar Attributes
    this.detail_status = this.storage.retrieve('detail');
    this.bundle1_status = this.storage.retrieve('bundle1_status');
    this.select_status = this.storage.retrieve('select_status');
    this.notification_status = true;
    this.active_status = "notification";
    this.notification = new Notification();

    document.body.style.backgroundImage = "url('src/assets/admin.jpg')";
    document.body.style.backgroundPosition = "center center";
    document.body.style.backgroundRepeat = "no-repeat";
    document.body.style.backgroundAttachment = "fixed";
    document.body.style.backgroundSize = "cover";



    if (this.event.notifications) {

      this.notifications = []
      Object.keys(this.event.notifications).forEach(key => {
        console.log(this.event.notifications[key]); //value
        console.log(key); //key
        this.notifications.push(this.event.notifications[key])
      });
    }


    console.log("BUNDLEID", this.notifications);

  }

  switchLane(btn: string) {
    switch (btn) {
      case "whatsapp":
        this.whatsapp_active = true;
        this.sms_active = false;
        this.email_active = false;
        this.amazon_active = false;
        break;
      case "sms":
        this.email_active = false;
        this.sms_active = true;
        this.whatsapp_active = false;
        this.amazon_active = false;
        break;
      case "email":
        this.email_active = true;
        this.sms_active = false;
        this.whatsapp_active = false;
        this.amazon_active = false;
        break;
      case "amazon":
        this.amazon_active = true;
        this.email_active = false;
        this.sms_active = false;
        this.whatsapp_active = false;
    }
  }

  ngOnDestroy() {
    document.body.style.backgroundImage = "none";
  }

  addNotification() {
    var newNotification = new Notification();
    if (!this.notification.whatsapp_text) {
      newNotification.whatsapp_text = "no Text";
    } else {
      console.log("Whatsapp Text vorhanden");
      newNotification.whatsapp_text = this.notification.whatsapp_text;
      this.notificationService.sendWhatsapp(this.notification);

    }
    if (this.notification.sms_text) {
      newNotification.sms_text = this.notification.sms_text;
      console.log("SMS Text vorhanden");
      this.notificationService.sendSMS(this.notification);
    } else {
      newNotification.sms_text = "no Text";
    }
    if (this.notification.email_text) {
      newNotification.email_text = this.notification.email_text;
      console.log("Email Text vorhanden");
      this.notificationService.sendEmail(this.notification);
    } else {
      newNotification.email_text = "no Text";
    }
    newNotification.time = new Date();
    newNotification.whatsapp_receiver = 2;
    newNotification.id = "0";
    var eventid: String = this.event.id;
    var temp = "";

    this.eventService.addNotification(newNotification, eventid)
      .subscribe(result => temp);
    console.log("create Notification", temp);
    if (this.event.notifications) {
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


  backToBundle2() {
    this.bundle_id = 0;
    this.storage.store('event', this.event);
    this.storage.store('bundle_id', this.bundle_id);
    this.router.navigate(['./eventbundle']);

  }

  onResend(event: Event) {
    console.log("Reopen Message");
  }




  hack(val: any) {
    return Array.from(val);
  }



}
