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

    document.body.style.backgroundImage = "url('src/assets/LIDL-Customer.jpg')";
    document.body.style.backgroundPosition = "center center";
    document.body.style.backgroundRepeat = "no-repeat";
    document.body.style.backgroundAttachment = "fixed";
    document.body.style.backgroundSize = "cover";
  }

  switchLane (btn: Object){

  }

  ngOnDestroy(){
    document.body.style.backgroundImage = "none";
  }



}
