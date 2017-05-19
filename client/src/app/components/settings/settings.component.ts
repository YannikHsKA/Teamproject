import {Component, Input} from '@angular/core';
import {SettingsService} from '../../services/settings.service';
import {User} from "../../../../Users";
import {VerificationService} from '../../services/verification.service';
@Component({
  moduleId: module.id,
  selector: 'settings',
  templateUrl: `settings.component.html`
})
export class SettingsComponent {
  user: User;
  phonenumber: String;
  email: String;
  whatsapp_toggle: boolean;
  email_toggle: boolean;
  sms_toggle: boolean;

  constructor(private settingsservice: SettingsService, private verificationService: VerificationService) {
    this.user = this.verificationService.user;
    console.log(this.user);

    if (this.user.sms == 1) {
      this.sms_toggle = true;
    } else {
      this.sms_toggle = false;
    }

    if (this.user.whatsapp == 1) {
      this.whatsapp_toggle = true;
    } else {
      this.whatsapp_toggle = false;
    }
//    if (this.user.email == 1) {
//      this.email_toggle = true;
//    } else {
//      this.email_toggle = false;
//    }
    this.email = "example@mail.com"
    this.phonenumber = this.user.phonenumber;
    console.log(this);
  }


  switch(toggle: String) {
    //  console.log(toggle);
    switch (toggle) {

      case 'whatsapp':
        this.whatsapp_toggle = !this.whatsapp_toggle;
        break;
      case 'sms':
        this.sms_toggle = !this.sms_toggle;
        break;
      case 'email':
        this.email_toggle = !this.email_toggle;
        break;
    }

  }

  saveSettings() {

  }

}
