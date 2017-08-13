import {Component, Input} from '@angular/core';
import {Event} from '../../model/Event';
import {EventService} from '../../services/event.service';
import {LocalStorageService, SessionStorageService} from 'ng2-webstorage';
import {Router} from '@angular/router';
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





  constructor(private eventService: EventService, private storage: SessionStorageService, private router: Router) {
this.event = eventService.getEvent();
this.email_active = false;
this.sms_active  = true;
this.whatsapp_active = false;

    document.body.style.backgroundImage = "url('src/assets/admin.jpg')";
    document.body.style.backgroundPosition = "center center";
    document.body.style.backgroundRepeat = "no-repeat";
    document.body.style.backgroundAttachment = "fixed";
    document.body.style.backgroundSize = "cover";
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


backToBundle2(){
  this.bundle_id = 1;
  this.storage.store('event',this.event);
  this.storage.store('bundle_id',this.bundle_id);
  this.router.navigate(['./eventbundle']);

}

saveNotification(){
    console.log("Send out messages")
}
}
