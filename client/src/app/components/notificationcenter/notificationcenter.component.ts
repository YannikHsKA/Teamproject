import {Component, Input} from '@angular/core';
import {User} from "../../model/User";
import {TaskRunner} from "protractor/built/taskRunner";
@Component({
  moduleId: module.id,
  selector: 'notificationcenter',
  templateUrl: `notificationcenter.component.html`,
  styleUrls: ['notificationcenter.component.css']
})
export class NotificationcenterComponent {
  user: User;
  whatsapp_active : boolean;
  sms_active : boolean;
  email_active : boolean;




  constructor() {

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



}
